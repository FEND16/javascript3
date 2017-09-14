# Firebase Listeners

I  `firebase` kan vi lyssna på t.e.x `value`. Detta betyder att vi lyssnar på **alla** värdeförändringar i hela samlingen:

```js
firebase.database().ref("todos").on('value', (snapshot) => {
    
    //This contains the whole list, getting ALL values and listening
    //to every change. We may or may not want that.
    console.log(snapshot.val());
})

```

Så för att göra det mer optimerat så kan vi lyssna på speciella värdeförändringar i vår database. Vi har flera olika listeners som hjälper oss med detta.

## `child_added`

Lyssnar på när ett nytt objekt eller värde pushas in i vår databas. **callback returnerar det tillagda objektet**

```js
firebase.database().ref("todos").on('child_added', (snapshot) => {
    console.log(snapshot.val());
})
```


## `child_removed`

Lyssnar på när ett nytt objekt eller värde tas bort med `.remove()` från vår databas. **callback returnerar det borttagna objektet**

```js
firebase.database().ref("todos").on('child_removed', (snapshot) => {
    console.log(snapshot.val());
})
```

## `child_changed`

Lyssnar på när ett nytt objekt eller värde uppdateras med `.set()` i vår databas. **callback returnerar det uppdaterade objektet**


```js
firebase.database().ref("todos").on('child_changed', (snapshot) => {
    console.log(snapshot.val());
})
```

**Du behöver alltså alla tre om du ska ersätta `.on('value')`. Men du hämtar mindre data och du får mer kontroll över vad som sker.**

### Övningar

* Byt ut din `.on('value')` till `child_added`, `child_removed` samt `child_changed` och få din applikation att fungera som den gjorde med `on('value')`.


# Sortering & filtrering

Du kan välja att antingen sortera din databas i `firebase` eller `react`. Det gör för det mesta inte så står skillnad. Gör du det direkt i JavaScript så använd `.map()`, `filter()`, `.reduce()` samt `.sort()` som tidigare. Det finns dock flera olika inbyggda sortering och filtreringsfunktioner i `firebase`, dock så beter sig vissa inte som man förväntar sig i alla fall. Du kan läsa om dem här:

* [**Filtering Data @ Firebase Documentation**](https://firebase.google.com/docs/database/web/lists-of-data#filtering_data)

### `orderByChild()`

**Alla filteringar nedan måste användas i kombination med t.ex. `orderByChild()`**. `orderByChild()` sorterar data som returneras utifrån en viss egenskap. Har du t.ex. en datum-egenskap där du lagrar när en todo har skapats så kan du direkt returnera en sorterad lista.

```js
firebase.database().ref("todos").orderByChild("date")
    .on('value', (snapshot) => {
        console.log(snapshot.val())
    })
```

#### EN SAK ATT TÄNKA PÅ MED `orderByChild()`

Värdet som returneras när metoden används med `.on()` är sorterad. Men det är inte säkert att browsern tolkar objektet som returneras som sorterad. Alla objekt är **by default osorterade**. Det betyder att du måste hantera detta med en loop:

```js
firebase.database().ref("todos").orderByChild("date")
    .on('value', (snapshot) => {
        let sortedList = [];
        //Loop the snapshot, forEach is built into firebase
        snapshot.forEach(item => {
            sortedList.push(item.val());
        })
        this.setState({todos: sortedList});
    })
```

**Detta behöver du dock inte göra om du använder i kombination med `child_added`.**

[**Source**](https://stackoverflow.com/a/33897213/5836872)


## `limitToLast()` & `limitToFirst()`

Väljer de X första eller de X sista. Denna måste kombineras med `orderByChild()`
```js
firebase.database()
    .ref("todos")
    .orderByChild("date")
    .limitToFirst(10) //Grab the first 10
    .on('value', (snapshot) => {
        let sortedList = [];
        //Loop the snapshot, forEach is built into firebase
        snapshot.forEach(item => {
            //Push each child value into an array
            sortedList.push(item.val());
        })
        //Then set the state
        this.setState({todos: sortedList});
    })
```

## `startAt()`

Väljer ett startvärde där sorteringen/filtreringen ska börja

```js
firebase.database()
    .ref("todos")
    .orderByChild("date")
    .startAt("2012-01-01") //Grab from this date and forward/backward
    .on('value', (snapshot) => {
        console.log(snapshot.val())
    })

```

## `endAt()`

Samma som `startAt()`, hämta värden tills du når detta värde. 

```js
firebase.database()
    .ref("todos")
    .orderByChild("date")
    .endAt("2012-01-01") //Grab up to this date
    .on('value', (snapshot) => {
        console.log(snapshot.val())
    })
```

## `equalTo()`

Om du ska söka efter ett viss specifikt värde:

```js
firebase.database()
    .ref("todos")
    .orderByChild("date")
    .equalTo("2012-01-01") //Grab this date only, if multiple, it will select multiple values
    .on('value', (snapshot) => {
        console.log(snapshot.val())
    })

```


## Övningar - sortering

1. Importera [`listOfEmployees.json`](listOfEmployees.json) i din databas. Under **Database**, klicka på de 3 prickarna i hörnet och välj: **Import JSON**
![Import JSON](https://i.imgur.com/pvImzQQ.png)
2. Hämta informationen från databasen via `firebase` och sortera informationen som kommer tillbaka enligt dessa kriterier:
    * Sortera så att de som är äldst kommer först i listan
    * Sortera så att de 10 yngsta visas 
    * Sortera så att de som är födda mellan 1985 och 1995 visas
    * Sortera efter alla personer som har `Customer` som job description
    * Sortera efter de som har mindre än `300` på sitt bankkonto
    * **Special case**: sortera efter de som har ett efternamn som börjar på **B**. Se detta för att lösa denna: [Firebase Queries @ YouTube](https://www.youtube.com/watch?v=sKFLI5FOOHs&feature=youtu.be&t=5m52s)
3. Sortera din egen todo-list. Sortera efter innehåll, vem som skrivit todon eller när den har skapats t.ex.

### Lösningsförslag

#### `child_added`, `child_removed`, `child_changed`

```js
componentDidMount(){

    firebase.database().ref("todos")
        .on('child_added', (snapshot) => {
            //Copy previous state array
            let todos = [...this.state.todos];
            //Push new value into array, you can also add the key with 
            // 'snapshot.key'
            const newTodo = {
                value: snapshot.val(), 
                key: snapshot.key
            }
            todos.push(newTodo);
            //Set the new array
            this.setState({ todos: todos })
        })

    firebase.database().ref("todos")
        .on('child_removed', (snapshot) => {
          //Filter the previous state
          let todos = this.state.todos
            //If the key of the removed child equals the current
            //looped item, do not return it. Result is every object
            //except the removed item
            .filter(item => item.key !== snapshot.key)
          this.setState({ todos: todos })
        })

    firebase.database().ref("todos")
        .on('child_changed', (snapshot) => {
          //Loop through the state
          
          let todos = this.state.todos
            .map((item) => { 
            //if the changed item is the current looped item
                if(item.key === snapshot.key) {
                    //Object assign === merge the old object with 
                    //the new object.
                    return Object.assign({}, item, snapshot.val()) 
                }else{
                    return item;
                }
            })
      })
}


//Alternative syntax för the `child_changed` solution
let messages = this.state.messages
          .map(item => { 
            //if the changed item is the current looped item
            return item.key === snapshot.key ?  
                //Object assign === merge the old object with 
                //the new object.
                Object.assign({}, item, snapshot.val()) 
                //else, just return the item
                : item
          })
```

#### Sortering

```js
firebase.database().ref("employees")
    .orderByChild("born")
```

```js
firebase.database().ref("employees")
    .orderByChild("born")
    .limitToLast(10)
```

```js
firebase.database().ref("employees")
    .orderByChild("born")
    .startAt("1985-01-01")
    .endAt("1995-01-01")
```

```js
firebase.database.ref("employees")
    .orderByChild("jobDescription")
    .equalTo("Customer")
```

```js
firebase.database().ref("employees")
    .orderByChild("amountOnBank")
    .startAt(30)
```

```js
firebase.database().ref('employees')
    .orderByChild('lastName')
    .startAt('b')
    .endAt("b\uf8ff") 
    //\uf8ff is a unicode character, it should not appear in real text or 
    //database input. It's a bit hacky but it works. End at 'b' and then something that shouldn't exist
```
