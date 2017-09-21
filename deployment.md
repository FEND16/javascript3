# Deployment :construction_worker:

I stort sett så är det detta som skapas när du har "byggt" färdigt ditt projekt:
```
index.html
bundle.js
style.css
```

Detta är en vanlig statisk `html`-sida som inte behöver något extra för att läggas upp live. Alla webbhotell eller hosting-sidor borde kunna lägga upp vår sida.

## `manifest.json`

`manifest.json` styr hur vår hemsida beter sig som en app, t.ex. vilka färger startskärmen har och hur ikonen ser ut om vi lägger till hemsidan på vår hemskärm i mobilen.

* [**Web App Manifest**](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/)
* [**Progressive Web Apps**](https://developers.google.com/web/progressive-web-apps/)


## Tjänster

All information för hur man lägger upp sin statiska `react`-sida på en gratis _hosting_-tjänst finns under `create-react-app` _README_. Det finns en rad olika tjänster så välj en som du gillar helt enkelt. GitHub Pages går fortfarande att använda. Installationsinstruktioner för GitHub Pages och `now` finns nedan men nästan samtliga tjänster har lika många steg/lika lätt/lika svårt att använda.

* [**`create-react-app#deployment`**](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment)
    * [`GitHub Pages` @ create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#github-pages)
    * [`now` @ create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#now)
    * [`surge` @ create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#surge)
    * [`heroku` @ create-react-app](https://blog.heroku.com/deploying-react-with-zero-configuration)
    * [`firebase` @ create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#firebase)



### GitHub Pages

Du måste göra två ändringar i din `package.json` samt lägga till ett nytt paket i din `create-react-app` för att skicka upp appen till GitHub Pages:

_Installera `gh-pages`-paketet:_
```bash
npm install --save gh-pages
```

_Lägg till två scripts under `"scripts"` i `package.json`_
```json
"scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
```

_samt lägg till detta i rooten på `package.json` och byt ut till vad ditt användarnamn är på github samt vad ditt repo heter_
```json
"homepage": "https://myusername.github.io/my-app",
```


_Hela `package.json` borde se ut liknande_
```json
{
  "name": "deployment",
  "version": "0.1.0",
  "dependencies": {
    "react": "^15.6.1",
    "react-dom": "^15.6.1",
    "react-scripts": "1.0.13"
  },
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "homepage" : "https://jesperorb.github.io/deployment"
}
```


**Kör sedan detta kommando sen är du klar**:
```bash
npm run deploy
```


### NOW

_installera `now` **globalt**_
```bash
npm i -g now
```

_kör byggkommandot i rooten på ditt projekt_
```bash
npm run build
```

_cd in i `build`-mappen som skapas_
```bash
cd build
```

_kör `now`-kommandot_
```bash
now
```




