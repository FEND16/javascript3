## Individuell examination - JavaScript 3


<img src="http://i.imgur.com/VtqLtua.png" align="right" width="400" height="auto">


```js
import React from 'react'
import firebase from 'firebase'
```


Du ska skapa en applikation i **React** som hämtar och lagrar data från er egen databas i [_Firebase_](https://firebase.google.com/). Man ska kunna logga in på applikationen via `firebase` autentiseringssystem för att sedan lagra någon information om användare i databasen. 

Exempel på applikation kan t.ex. vara en sådan blogg som ni gjorde i PHP-kursen, en receptsida där man kan kommentera och gilla recept eller en twitterklon.

Du får även kalla på ett öppet API i samma applikation men du ska använda _Firebase_ för att lagra någon typ av data i din applikation, t.ex. information om användaren som är inloggad (sparade recept, likes etc.).


#### Krav för G

* Du använder **React** (antingen [`create-react-app`](https://github.com/facebookincubator/create-react-app) eller sätter upp din egen miljö) för att skapa applikationen. Du får om du vill använda ett `state`-hanteringsbibliotek så som [`mobx`](https://mobx.js.org/getting-started.html) eller [`redux`](http://redux.js.org/docs/introduction/).
* Du använder dig utav [Firebase](https://firebase.google.com/) för att hämta och lagra data som din applikation ska använda sig utav.
* Det går att logga in på applikationen via Firebase autentiseringssystem. För G krävs endast inlogg med email.
* Du använder dig utav flera av `Firebase` event listeners (`child_added`, `value` etc.) för att uppdatera ditt gränsnitt.
* Man kan söka och filtera i informationen som visas på sidan med hjälp av minst **3st** `input`-fält eller knappar (radio buttons etc.). Hämtar du recept så kan det t.ex. vara en `checkbox` som filtrerar efter vegetariska alternativ. Här kan du antingen välja att filtrera efter det redan existerande innehåller eller göra ett nytt kall mot din databas eller externt API.
* Du använder dig utav flera olika `Components` i din applikation, allt ska inte ligga i `App.js` samt att dina komponenter ska ligga i mappen `components`. Mappen `components` kan i sin tur ha undermappar. Du får ha en annan struktur, det viktiga är att allting inte ligger som en klump i `src`-mappen.
* Majoriteten av logiken i din applikation ska ligga i huvudkomponenten eller några komponenter högt upp och skickas sedan ner till underkomponenter. Lyft upp ditt `state` ([Lifting State Up](https://facebook.github.io/react/docs/lifting-state-up.html)) och skicka ner props till underkomponenter. Dina underkomponenter får också ha ett eget state dock.
* Innehåller dina komponenter ingen logik (`state` t.ex.) så ska de vara **Stateless components/functional components**. Alla komponenter __får__ ha `state` men ju mer `state` man har desto svårare blir det att hantera det.
* För styling får du använde ett ramverk som t.ex. _Bootstrap_ eller _Semantic UI_. __MEN__ du ska även skriva egen css för att din applikation inte ska enbart bestå av ramverket, den ska ha en personlig touch. Den CSS du skriver själv måste använda sig utav antingen __SASS__ eller någon `CSS-in-JS`-lösning (`styled-components`, `glamourous` etc.)

#### Krav för VG

* Uppnår alla G-krav.
* Du visar god förståelse för `namespaces`, `context` och `scope` i din applikation (T.ex. hur binding fungerar, god förståelse för modulsystemet etc.)
* Du har ett socialt inloggningsystem med Firebase autentiseringssystem, går att logga in med google/facebook/github etc. 
* Du använder och visar att du förstår **Composition** i JavaScript & React samt använder minst två **Higher Order Component** i din applikation.
* Din applikation ska vara färdig för produktion och inte innehålla några större fel eller läcka information från utvecklingsfasen.
* Utökad errorhantering, och errorhantering ska visas upp tydligt i gränssnittet och inte enbart i `console`. Man ska i princip aldrig i applikationen som användare stå och fundera: "Vad händer eller vad var det som hände?". Tydlig feedback till användaren.
* Upplägget i din kod samt i ditt gränssnitt ska vara väl genomtänkt och ha en tydlig struktur. Väldefinierade komponenter t.ex. och konsistent upplägg på komponenter och css.

### Inlämning

_Betygsgrad_: **IG/G/VG**

_Datum:_ **28/9 23.59**

_Format för inlämning_:

`fornamn_efternamn_react.zip`

**INGA `NODE_MODULES` I ZIP-FILEN!!!!**

**ENBART .ZIP (INTE .RAR, .GZIP eller .7z)**
