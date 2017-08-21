# Övningar - Webpack

## Förarbete

Läs igenom [**Concepts @ webpack.js.org**](https://webpack.js.org/concepts/) och gå igenom frågorna med en kurskamrat. Antingen skriftligt eller muntligt. Kolla av svaren med lärare när ni känner er klara. Gå sedan vidare till att praktiskt implementera er egen `webpack`-konfiguration. Svar på frågorna och övningar finns längre ner i dokumentet.

# Frågor att besvara innan du konfigurerar

1. Vad löser webpack för problem? Varför behöver vi det?
2. Hur skiljer sig webpack från t.ex. _gulp_? Tänk följande scenario: Du har ES6-kod som ska konverteras med babel samt `.scss` som ska konverteras till `.css`. Varför använda webpack framför gulp t.ex.?
3. Hur defineras en **modul** av webpack? Och hur definierar `nodejs` en **modul**. Beskriv med egna ord. 
4. Det mesta kan man göra med webpacks **Four Core Concepts**: **Input, Output, Loaders & Plugins**. Input & Output hör man vad det är, men vad är __Loaders__ & __Plugins__ och vad skiljer de åt?
5. Friare fråga: Vad är det som gör att så många väljer `webpack` framför andra alternativ? Och varför går vi igenom det? [Task Runner/Module Bundler Poll @ Kodapor](https://www.facebook.com/groups/utvecklare.stockholm/permalink/1449031498479251/)


## Praktiska övningar

1. Skapa en minimal `webpack`-konfiguration från scratch. För att bara få det att fungera behöver du enbart `entry` samt `output`. Du ska konvertera en `src`-fil till en färdig `bundle.js`-fil som innehåller all din kod.
2. Implementera så att du kan använda dig utav `.css` och importera `.css` i din applikation. Du behöver [style-loader](https://github.com/webpack-contrib/style-loader) samt [css-loader](https://github.com/webpack-contrib/css-loader). Extra: lägg även till så att du köra köra `sass`, ta reda på själv hur det ska implementeras.
3. Implementera så att du kan använda dig utav `babel` i din applikation och använda dig utav ES6-kod. Instruktioner finns på [__babel-loader__ @ GitHub](https://github.com/babel/babel-loader)
4. Använd `import` samt `export` för att hantera dina `.js`-filer. Skapa en till valfritt namngiven fil. Skapa sedan ett valfritt objekt och en valfri funktion i den nya filen. Exportera objektet och funktionen från filen och importera dem i din `app.js`. Få det att fungera som att de låg i samma fil.
5. Vad är det för skillnad på de här två sätten att importera:
```js
import obj from './secondFile.js';
import { obj } from './secondFile.js';
```
6. Relaterat till ovan, Vad är det för skillnad på de här 3 sätten att exportera:
```js
export function logOutput(output){
  console.log(output);
}
```
```js
function logOutput(output){
  console.log(output);
}

export { logOutput }
```
```js
function logOutput(output){
  console.log(output);
}

export default logOutput
```

## Extra

När du är klar med övningarna ovan så kan du och en kurskamrat (eller om ni är 3-4) gå igenom denna boilerplate nedan. Vad gör de olika pluginsen och varför behövs dem? Läs dokumentationen för de olika pluginsen och dependecies som jag har använt i denna boilerplate och diskutera om det är något som är överflödigt. Varje plugin har en egen GitHub-sida. Finns det några bra plugins eller regler som saknas?
 * [`webpack-boilerplate`](https://github.com/jesperorb/webpack-boilerplate)


På rad [`54-56`](https://github.com/jesperorb/webpack-boilerplate/blob/master/webpack.config.js#L54-L56) gör configen något speciellt. Vad menas med dessa rader? Varför finns de?

# Facit

## Svar på frågorna

1. `webpack` vill förenkla sättet som tillgångar (css, scss, javascript, typescript, es6 etc.) paketeras och optimeras för att kunna levereras över webben. Den utför olika konverteringar om det behövs så som `.scss` -> `.css` och sköter oftast automatiskt miniferingen av dessa tillgångar.
2. Skillnaden ligger delvis i hur _webpack_ hanterar sina tillgångar, _webpack_ behandlar allt som en __modul__ och förstår enbart `.js`. Så om man t.ex. inte definierar att ens `.scss` ska läggas i en separat `.css`-fil så kommer den att bakas in i vår `.js`-fil, på gott och ont.
3. Liknande som när vi jobbade med `Revealing Module Pattern` så vill vi dela upp vår kod så att koden hamnar i separata __namespaces__. Detta för att undvika globala variabler och funktioner. I `node` är varje enskild fil en egen module _by default_ vilket gör att man måste explicit exportera och importera det man behöver i varje fil. Webpack hanterar moduler på liknande sätt. Varje modul är en _dependency_, något vi behöver för att koden ska fungera. Men vi vill inte ha all kod tillgänglig överallt därför importerar vi koden explicit när vi behöver den. Eftersom `webpack` ska hantera en rad olika resurser så behandlar den allting som en modul. En `.css`-fil kan vara en modul som måste importeras, dock är detta inget som JavaScript kan, därför paketerar `webpack` denna modul åt oss så att den går att använda i JavaScript.
4. __Loaders__ tar han om att leta efter filer av en viss typ och filändelse och sedan konvertera denna fil med hjälp av vald loader. Vill vi använda `.css` i `webpack` så använder vi `css-loader` som letar efter filer med filändelsen och applicerar rätt konvertering så att vi kan använda koden i vår applikation. `babel-loader` är t.ex. den loadern som har hand om att konvertera JavaScript-kod från t.ex. ES6 till ES5 eller äldre. Samma som med `gulp`. __Plugins__ är allting annat som inte hör till ovannämnda. Oftast vill man göra en del andra automatiserade uppgifter som inte hör till just konverterandet nämnt ovan. Varje gång man bygger sin produktionkod vill man ta bort den gamla _builden_ så att inget oväntat händer med de gamla filerna. Då använder man pluginen [`clean-webpack-plugin`](https://github.com/johnagan/clean-webpack-plugin). Pluginen har egentligen bara uppgiften att ta bort mappen som vi bygger till innan varje ombyggning. 
5. Rent krasst så går vi genom det för att verktyget `create-react-app` som vi ska använda under kursens gång samt `React` i stort använder `webpack`. Sen är det ett bra verkyg såklart.


## Lösningsförslag på praktiska övningar

1.
```js
const config = {
  entry: {
    app: './app.js',
  },
  output: {
    filename: 'bundle.js',
  }
}

module.exports = config;
```



```js
const config = {
  entry: {
    app: './app.js',
  },
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/, //regex for `.css`-file
        use: ["style-loader", "css-loader"] //style injects a <style>-tag, css-loader injects css, both needed
      }
    ]
  }
}

```

3.
```js
const config = {
  entry: {
    app: './app.js',
  },
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [ //rules is an array of tests
    {
      test: /\.js$/, //regex for all *.jx* files
      use: {
        loader: 'babel-loader',
        options: { //extra options on how to transpile
          presets: ['env'] //env is like autoprefixer but for babel
        }
      }
    },
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    }
    ]
  }
}
```


5. Första `import` importerar det som är exporterat som `default` från den andra filen. Den andra `import` importerar `obj` som inte är exporterat som default, därför måste det heta samma sak i båda filerna. När du importerar `default` kan du döpa om importen som du vill.
6. Första exporten exporterar utan default vilket betyder att man måste importera med `import { logOutput } from './file.js';`. Den andra exporten gör samma sak förutom att vi har lagt det på en separat rad. Det händer ändå samma grej. Man får välja vilken syntax man föredrar. Den tredje exporten exporterar som `default` vilket betyder att om vi skriver `import logOutput from './file.js'` så kommer den funktionen automatiskt importeras. Om vi inte har brackets så väljer import default-exporten. Vi kan ha både `default` och vanliga `export` i samma fil, men bara EN `defult`. 