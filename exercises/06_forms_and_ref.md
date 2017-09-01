# Forms and Refs 

Vi ska fortsätta på tidigare övning gällande filmerna som renderas ut i vårt UI med hjälp av `fetch`, `this.setState({})` och `map`. Vi ska utöka vår applikation med fler inputfält och filtering.

* [**Forms @ react documentation**](https://facebook.github.io/react/docs/forms.html)
    *  Exempel ur dokumentationen på olika inputfält     


## Övningar

### Inputs

1. Om du inte redan har gjort det från föregående övning, implementera en sökfunktion som söker igenom arrayen med filmer och visar _'live'_ sökresultat när man söker i inputfältet. **Ett lösningsförslag för att filtera ut filmer finns här: [`03_movie_search.js`](../code/03_movie_search.js)**
2. Plocka ut några eller alla genrer som finns i listan. Skapa en `<select>` som innehåller `<option>`-taggar med dessa genres. Koppla en `onChange` till `<select>`-taggen och gör så att listan filtreras efter den genren som du väljer.
3. Skapa en `<input type="checkbox">`-tagg som togglar om t.ex. er `<Header>` ska visas på sidan eller inte. **Obs: På `<input type="checkbox">` vill man kolla efter `e.target.checked`**
4. Skapa en till `<input type="checkbox">` som togglar om listan ska visa poster-bilderna eller inte.
5. Fortsätt implementera _LoginForm_ som vi gjorde under lektionen. Få det att fungera i din applikation så att användarnamn och lösenord loggas ut eller visas någonstans i din applikation när vi trycker på login-knappen.
6. Lägg in validering så att lösenordet måste vara minst 8 tecken långt för att kunna läggas in. Om det inte är 8 tecken långt, visa upp ett error av något slag.
7. Implementera flera olika valideringar så att du får olika error beroende på vad felet är. T.ex.: visa och fokusera olika inputfält beroende på om lösenordet är fel eller användarnamnet är fel, validera om det är en valid email-adress.
8. Vid "lyckad" inloggning, se till så att hela applikationen får tillgång till användarens data och den visas upp någonstans på sidan.


### Extra - Info om refs

Refs har några få användningsområden och ska användas sparsamt. Men det hjälper en att förstå lite mer om hur React fungerar. Vi kan alltid komma åt DOMen som vanligt om vi vill även om det inte är reactigt:

```js
const inputValue = document.getElementById('myInput').value;
```

`refs` fungerar lite enligt samma logik, den sparar all information i DOMen istället för React, men vi vill ha informationen i React så att vi kan manipulera den enklare. Men vi kan referera till en vis __nod__ i DOMen om vi vill:

```jsx
handleChange = () => {
    //Reference to the node saved in our component
    console.log(this.input.value)
}
render(){
    return(
    <div>
        <input
            ref={node => {this.input = node;}} { /* Save the node to this.input */}
            name="inputValue"
            placeholder="Input using refs"
            onChange={this.handleChange}
            />
    </div>
    );
}
```


Om vi har denna nod så kan vi fokusera den, det kan vara användbart: 

```jsx
componentDidMount(){
    this.input.focus();
}
```
