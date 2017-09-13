# Firebase :fire:

>Store and sync data between users and devices in realtime using a cloud-hosted, noSQL database. Updated data syncs across connected devices in milliseconds, and data remains available if your app goes offline, providing a great user experience regardless of network connectivity.

## Instruktioner

* Gå till [**`Firebase`**](https://firebase.google.com/) och skapa ett nytt konto om du inte redan har det.

* Tryck sedan på **Get started** på startsidan. Tryck sedan på **Add Project** och skapa ett nytt projekt, kom ihåg att välja **Sweden**.

<p align="center"><img src="https://i.imgur.com/1WlVTX9.png" height="400"></p>

* Försök sedan att hitta den stora röda knappen, du ser den till höger. Kopiera JavaScript-delen utan script-taggarna och lägg konfigurationsobjektet i en ny fil som du kan döpa till `'firebase.js'`. Det borde se ut som nedan fast med dina egna nycklar och config.

<img src="https://i.imgur.com/gwqJGmS.png" align="right" height="200" width="auto">



```js
//firebase.js
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSy23hasnjdbakd9312fkjg",
    authDomain: "react-example-474c2.firebaseapp.com",
    databaseURL: "https://react-example-474c2.firebaseio.com",
    projectId: "react-example-474c2",
    storageBucket: "react-example-474c2.appspot.com",
    messagingSenderId: "55448588490"
};

firebase.initializeApp(config);
export default firebase;

```

* Importera sedan  `firebase` from den filen som du nyss skapade. Observera att vi importerar filen och inte npm-paketet. För vi måste först initiera firebase med konfigurationen som vi gjorde i steget innan.

```js
//Import your config-file not the npm-package directly
import firebase from './firebase';
```

* Importera `firebase` from din `firebase.js` i varje komponent där du ska använda `firebase`.

### Skriv data till `firebase`

`push` skapar ett nytt objekt i databasen och skapar automatiskt ett unikt ID som är kopplat till det objektet.

### `push`
```js

const todo = {
    text: "Learn Firebase",
    completed: false
}

//Push generates a unique ID for your object
firebase.database().ref(`/todos`).push(todo);

// -KtFrwFN5vgH_U2wtmpL : { text: "Learn Firebase", completed: false }

```

### `set`

När vi redan har ett skapat objekt och vi ska ändra det så måste vi referera till objektet via dess ID, sedan använder vi `set` för att uppdatera det objektet. **Detta uppdaterar hela objektet, inte bara vissa egenskaper**

```js
firebase.database().ref(`/todos/-KtFrwFN5vgH_U2wtmpL`)
    .set({ text: "Learn Firebase", completed: true });
```


### `on`

Lyssnar på om något värde uppdateras. Om vi lyssnar på `todos` så kommer denna funktion att triggas varje gång vi antingen lägger till ett nytt objekt med `push` eller ändrar ett existerande objekt med `set`. Denna lyssnar på ALLT.

```js
firebase.database().ref(`/todos`).on('value', function(snapshot){
    console.log(snapshot.val());
})
```


### `once`

Hämtar ett värde 1 gång. Detta är ingen lyssnar som `on`. Detta är mer som ett vanligt API-kall, du hämtar värdet en gång sen är du klar.

```js
firebase.database().ref(`/todos`).once('value', function(snapshot){
    console.log(snapshot.val());
})
```

Kan även skrivas som promise eftersom det inte är en lyssnare:

```js
firebase.database().ref(`/todos`).once('value')
    .then(snapshot => console.log(snapshot.val()))

```

### `remove`

Tar bort ett visst värde, bra om vi har ett ID.

```js
firebase.database().ref(`/todos/-KtFrwFN5vgH_U2wtmpL`).remove();
```


## Övningar
 
1. **TODO-APPLIKATION** fast med `firebase`, du kan återanvända mycket av din kod sedan tidigare. Det som ska ändras är själva APIt vi kallar på.
 * Du ska ha en knapp med en `onClick` som skickar in ett värde till firebase. `onClick`-funktionen ska kalla på `firebase.database().ref('todos')push()` för att lägga till ett nytt objekt i databasen. Värdet som ska läggas till hämtar du från `state`. Du måste alltså också ha något sorts `input`-fält.
 * Du ska sedan hämta ut dessa värden som du pushar in med `firebase.database().ref('todos').on('value')`. Funktionen har en callback, det värde du får tillbaka från dessa callbacks ska du lagra i `state`. Sedan ska du rendera ut detta `state` så att du får ut dina todos i ditt gränssnitt. Se exempel ovan för syntax. Du kan för det mesta återanvända kod från tidigare övningar. Det är bara hur värdet hämtas som är annorlunda.
 * Till varje _todo_ ska det finnas en `onClick` som tar bort en todo från databasen. Du ska alltså kalla på `firebase.database().ref().remove()` i din `onClick`. För att ta bort ett objekt behöver du dess `key`, se exempel ovan.
 * Till varje _todo_ ska det också finnas en `onClick` som ändrar om värdet är `completed`. Här måste vi alltså använda `firebase.database().ref().set();`. Vi behöver `key` samt de ursprungliga värdena.
 * Vad blir det för skillnad genom att använda `on` och `once`. När kan det ena vara bra över det andra? 
 * Skapa en funktion som ändrar `completed` till `true` eller `false`. Vilken funktion i firebase API ska du använda då? Få detta att även reflekteras i ditt UI.

2. Skapa flera "kollektioner" i din databas. Så fort du vill skapa en samling av något så är det bara att använda en ny `ref()`. `.ref("users")`, `ref("comments")`



# Lösningsförslag

En del av logiken, gränssnittet får ni sköta själva.
```jsx
import React, { Component } from 'react';
import firebase from './firebase';

export default class App extends Component{
    state ={
        todos: [],
        todoValue: ''
    }
    
    componentDidMount(){
        //A snapshot of our database is returned everytime
        //the db is updated: when we use `set`, `push` etc.
        // Convert it to an array, remember to use
        //.val() to get the actual values.
        firebase.database().ref(`todos`).on('value', (snapshot) => {
            const todos = toArray(snapshot.val());
            this.setState({ todos: todos })
        })
    }
        
    addTodo = (e) => {
       e.preventDefault();
       //Create a new object with value from inputfield, value
       //saved in state
       const objectToPush = {
          name: this.state.todoValue,
          completed: false
       }
       //And push the object, callbacks are optional, could be 
       //a good idea to catch errors and display som helper logs
       firebase.database().ref(`todos`).push(objectToPush)
        .then(()=> { console.log('Pushed!') })
        .catch(error => { console.log('You messed up', error) })
    }

    removeTodo = (key) => {
        //If we have the key we can do pretty much anything
        //the location of the todo is "todos/key". So we use that as a ref.
        //Every value inside the todo is accessed by "todos/key/value"
        firebase.database().ref(`todos/${key}`).remove()
            .then(()=> {console.log('Removed!')})
            .catch(error => {console.log('You messed up', error)})
    }

    toggleCompleted = (todo) => {
        //Everything is an object. 'completed' is an object inside 'todos/key'
        //so we can choose to set only that value. We just negate the current
        //value we have: !todo.value.completed
        firebase.database().ref(`todos/${todo.key}/completed`)
            .set(!todo.value.completed);
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value})

    render(){
        //Remember the anonymous function around our onclicks when we
        //send arguments to our component functions. Send the key
        //or the whole object, your choice.
        const list = this.state.todos.map(todo => 
            <div key={todo.key}>
                <p>{todo.value.name}</p>
                <button onClick={() => {this.removeTodo(todo.key)}}> Remove </button>
                <button onClick={() => {this.toggleCompleted(todo)}}> Done </button>
            </div>
        )
        return(
            <div>
                <form onSubmit={this.addTodo}>
                    <input 
                        type="text" 
                        value={this.state.todoValue} 
                        onChange={this.onChange} 
                        name="todoValue"/>
                    <input type="submit" value="Add Todo" />
                </form>
                { list }
            </div>

            )
    }
}


/** 
 * Helper function to convert object of objects to an array of objects,
 * easier to traverse with `map` for example
 **/
function toArray(firebaseObject) {
  let array = []
  for(let item in firebaseObject){
    array.push({ key: item, value: firebaseObject[item] })
  }
  return array;
}
```
