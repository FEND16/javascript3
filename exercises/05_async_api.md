# Hämta data från API i React

* [**Introduktion**](#introduktion)
* [**Övningar**](#ovningar)
* [**Handle CORS Client-side**](https://gist.github.com/jesperorb/6ca596217c8dfba237744966c2b5ab1e)
    * Om ni använder något annat API och får problem med **CORS** så läs detta.

## Introduktion

Statisk data är ju lite trist, när vi skapar applikationer vill vi jobba med levande och dynamisk data från externa (eller internal) källor. Som tur är finns det galet många publika API:er (_Application Programmable Interface_) att hämta data ifrån. 

Det "enklaste" sättet är att använda [`fetch API`](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) som är __native__ till JavaScript och har [bra coverage (Can I Use)](http://caniuse.com/#search=fetch) på de flesta webbläsare.

### `fetch`

fetch använder sig utav JavaScripts [Promises](https://davidwalsh.name/promises) som innehåller ett värde som eventuellt är tillgängligt:
>The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.

Det finns en väldigt bra playground för om man vill testa sig fram till hur Promises fungerar: [**Promisees**](https://bevacqua.github.io/promisees/)

Problemet med att kalla på API:er är att vi aldrig vet hur lång tid det tar att få tillbaka informationen eftersom den hämtas _asynkront_ och därför följer inte **AJAX** det "vanliga" kodflödet (alltså att det inte körs exakt rad för rad. Förövrigt är även `this.setState({})` asynkront :sunglasses:).

---

**MÅSTE-VIDEO FÖR ATT FATTA ASYNKRONITET I JAVASCRIPT:**

[**What the heck is the event loop anyway? by Philip Roberts**](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

---

**Viktigt att förstå att det alltid är ett Promise som returneras och att ett Promise innehåller vårt värde. Vi måste plocka ut vår JSON från detta Promise!**

```js
//skinny version
fetch("https://api.me/get")
    .then(response => response.json())           //Get JSON, implicit return
    .then(json => console.log(json))    //Log the JSON
```

```js
//fat version
fetch("https://api.me/get")
    .then(function(response){
        return response.json()
    })
    .then(function(json){ 
        console.log(json)
    });
```

När vi har har fått tillbaka vår data `json` kan vi lagra informationen i `state`!

---

Om man inte vill använda `fetch` så finns det massa andra bibliotek: [axios](https://github.com/mzabriskie/axios), [superagent](https://visionmedia.github.io/superagent/), [reqwest](https://github.com/ded/reqwest), [request](https://github.com/request/request) för att nämna några. Men `fetch` är det som är native till JavaScript.


## Övningar

## Hämta filmer!

För att underlätta testningen av att hämta information via API så ska vi i övningarna hämta data från detta temporära API:

* [`https://fend-api.herokuapp.com/movies`](https://fend-api.herokuapp.com/movies)
    *Om du inte vill ha ut alla typ 120 filmer så kan man sätta en limit i urlen: [`https://fend-api.herokuapp.com/movies?_limit=20`](https://fend-api.herokuapp.com/movies?_limit=20)

API:et innehåller en array av objekt som är hämtad från IMDB:s databas. Ni ska rendera ut innehållet på er sida. Om ni vill t.ex. köra något css-ramverk så ladda ner det och importera det: `import './bootstrap.css`.

1. Använd `fetch` för att hämta arrayen från urlen ovan och lagra arrayen i ditt `state`. Detta kan göras via att kalla på en funktion som hämtar informationen eller att du laddar in informationen direkt via `componentDidMount()`. Om du är osäker på om du lyckats kan du alltid logga: `console.log(this.state)`.
2. Skapa en komponent som ska vara till för varje film, komponenten ska skriva ut filmens title, betyg samt bild på ett välformatterat sätt. Använd t.e.x bootstrap om du inte orkar cssa själv. Filmen kan vara t.ex. ett `Card` från bootstrap. Använd sedan en loop för att skapa en komponent för varje film:
```js
//ofullständigt exempel
import Card from './Card';
//För varje film i state, skapa en ny komponent.
const movies = this.state.movies.map(movie => <Card title={movie.title} grade={movie.grade} poster={movie.posterUrl} />)
```
3. Implementera så att man kan filtera innehållet. Återanvänd ert inputfält från tidigare i veckan och få det att istället filtrera filmerna. Filtrera t.ex. på filmens namn. Tänk tillbaka på hur du gjorde i JS1.

#### Extra

Fetch hanterar `GET` som default. Om vi vill göra något annat än en `GET` måste vi specifiera det i inställningarna. Inställningarna är ett objekt som skickas med som argument till `fetch`. Vi måste sätta metoden samt säga vilket innehåll vi ska skicka med. Du kan använda `POST`, `PATCH` och `DELETE` på alla objekt i APIet egentligen men det finns även en samling med "notes" i APIet som du kan använda:

```js
fetch("https://fend-api.herokuapp.com/notes", {
    method: 'POST',
    body: { "text" : "Hello!", completed: false }
});
```

1. Testa att posta en _"todo"_ till [`https://fend-api.herokuapp.com/notes`](https://fend-api.herokuapp.com/notes) med hjälp av `fetch`. Värdet du skickar in ska skickas in i din request ska plockas från ett input-fält. Använd tidigare kod. Värdena som du skickar med hämtas via `state`. Statet sätts via dina event-funktioner (`onChange` t.ex.).
2. Fortsätt implementera en todoapplikation fast med detta remote API. Fast den ska kommunicera via detta API. Så applikationen ska först hämta informationen som ni gjorde med filmerna. Sedan ska varje _todo_ ha en checkbox. När man checkar i checkboxen ska ett API-call skickas till API:et som ändra `completed` på er _todo_. __Detta betyder att du måste i din komponent någonstans spara `id`__ så att du checkar i rätt _todo_. Checkbox returnerar true eller false. Checkboxar kan också lyssna på `onChange`.
3. Vilka fler saker från er gamla todo-applikation saknas? Två olika listor? `complete` och `incomplete`. Kolla på er gamla Todo-lista från JS1 t.ex. och försök implementera de delar som saknas. Kom ihåg att ta det i små steg, dela upp det i mindre delar, vad ska göras först?


#### Super super extra: `async/await`

* **Implementera `async/await` i din applikation**

Det nya coola sättet (och väldigt smidiga sättet) att hantera Promises och asynkrona handlingar är `async/await`. Det gör så att man fortfarande använder Promises, men vi får ett mer synkront flöde på vår applikation. Alla funktioner kan använda detta flöde, men vi behöver dock använda dessa två nya nyckelord på rätt ställe:

```js
//async säger att vi ska hantera asynkronitet i denna funktion. Hela denna
//funktion är nu thenable
async function getDataFromApi(){
    //wait säger att vi ska vänta på vårt promise
    const response = await fetch('https://fend-api.herokuapp.com/movies')
    //varje gång vi jobbar asynk måste vi använda await
    const json = await response.json()
    //Till slut kan vi returnera vår json
    return json;
}

getDataFromApi().then(data => console.log(data));
```

__Bra video att kolla gällande detta__:

* [**Fun Fun Function - async/await**](https://www.youtube.com/watch?v=568g8hxJJp4)
