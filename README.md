<img src="https://s3.eu-central-1.amazonaws.com/bergie-iki-fi/tumblr_lsus01g1ik1qies3uo1_400.png" align="right" height="300" width="auto" />


# JavaScript 3

## Innehållsförteckning

* [Resurser](#resurser)
* [Dokumentation](#dokumentation)
* [Examination](#examination)
* [Schema](#schema)

## Resurser

* [React Express](http://www.react.express/)
* [React Aha Moments](https://dev.to/tylermcginnis/react-aha-moments)
* [Awesome React :sunglasses:](https://github.com/enaqx/awesome-react)
* [Useful React Links](https://github.com/markerikson/react-redux-links/blob/master/react-architecture.md)
* [Learn React with create-react-app (4 parts)](https://medium.com/@diamondgfx/learning-react-with-create-react-app-part-1-a12e1833fdc)
* [React composition cheat sheet](https://github.com/xat/react-component-composition-cheatsheet)
* [Gist: Patterns in React @ _jesperorb_](https://gist.github.com/jesperorb/33a84ea07295cb5a3bb30b180aa025d1)
* [Handle CORS Client-side](https://gist.github.com/jesperorb/6ca596217c8dfba237744966c2b5ab1e)
* [CSS-Tricks - Firebase + React](https://css-tricks.com/intro-firebase-react/)

## Dokumentation

* [React Documentation](https://facebook.github.io/react/)
* [Firebase Documentation](https://firebase.google.com/docs/database/web/start)

## Examination

Examineras med ett enskilt projekt där du ska bygga en webbapplikation med React samt firebase som databas. Man ska även kunna logga in och lagra information om användaren i databasen.

Läggs upp inom kort.

## Schema

#### Pass 1 - 21/8

* `class`
* npm
* `import` & `export`
* moduler
* `webpack`


###### Lektionsmaterial

* [`webpack` - __övning__](exercises/webpack.md)

###### Länkar

* [npmjs.com](https://www.npmjs.com/)
* [Webpack 3](https://webpack.js.org/)
* [Intro To Webpack @ _CSS-Tricks_](https://css-tricks.com/introduction-webpack-entry-output-loaders-plugins/)



#### Pass 2 -22/8

* **React intro**
    - `create-react-app`
    - _Components_
    - _Nested Components_
    - _JSX_
* **Props**


###### Lektionsmaterial

* [React Komponenter - __övning__](exercises/02_props.md)
* [React Intro PDF](slides/01_react.pdf)
* [Props PDF](slides/02_props.pdf)
* [Fejk-react i Vanilla](https://jsbin.com/lucugupoje/edit?html,js,output)
* [Dagens kodexempel](code/01_intro.js)

###### Länkar

* [Component and props @ _React Docs_](https://facebook.github.io/react/docs/components-and-props.html)
* [JSX @ _React Docs_](https://facebook.github.io/react/docs/introducing-jsx.html)
* [https://github.com/facebookincubator/create-react-app](https://github.com/facebookincubator/create-react-app)


#### Pass 3 - 23/8

* **STATE**
* _Events_
* _Event handling_
* _JavaScript binding_

###### Länkar

* [State @ _React Docs_](https://facebook.github.io/react/docs/state-and-lifecycle.html)
* [Handling Events @ _React Docs_](https://facebook.github.io/react/docs/handling-events.html)

#### Pass 4 - 30/8

* _Fil & mappstruktur i React_
* _Styling i React_
* _Functional components_ vs. _Stateful Components_

###### Länkar

* [Components & Props @ _React Docs_](https://facebook.github.io/react/docs/components-and-props.html)
* [Functional Components @ _React Docs_](https://facebook.github.io/react/docs/components-and-props.html)
* [DOM Elements @ _React Docs_](https://facebook.github.io/react/docs/dom-elements.html)

#### Pass 5 - 31/8

* _Component Lifecycle_
* _Async i React_
* async _setState_

###### Länkar

* [Component Lifecycle @ _React Docs_](https://facebook.github.io/react/docs/react-component.html)
* [Understanding Component Lifecycle](http://busypeoples.github.io/post/react-component-lifecycle/)
* [React fetch exempel @ _codesandbox.io_](https://codesandbox.io/s/j2P1qGZl4)

#### Pass 6 - 1/9

* _Controlled Inputs_ vs. _Uncontrolled inputs_
* _Formulär i React_
* _Inputhantering i React_
* _Refs_

###### Länkar

* [Forms @ _React Docs_](https://facebook.github.io/react/docs/forms.html)
* [Uncontrolled Components @ _React Docs_](https://facebook.github.io/react/docs/uncontrolled-components.html)
* [Refs @ _React Docs_](https://facebook.github.io/react/docs/refs-and-the-dom.html)

#### Pass 7 - 6/9

* _Component Composition_
* _Higher Order Components_

###### Länkar

* [Higher Order Components @ _React Docs_](https://facebook.github.io/react/docs/higher-order-components.html)
* [React composition cheat sheet](https://github.com/xat/react-component-composition-cheatsheet)


#### Pass 8 - 7/9

* _PropTypes_
* _Context_
    * Exempel på när context kan användas 

###### Länkar

* [PropTypes @ _React Docs_](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)
* [Context @ _React Docs_](https://facebook.github.io/react/docs/context.html)

#### Pass 9 - 8/9

* Firebase
    *  Intro   
    *  Strukturera databasen
    *  Läsa och skriva från databasen

###### Länkar

* [Get Started @ _Firebase_](https://firebase.google.com/docs/database/web/start)
* [Data structure @ _Firebase_](https://firebase.google.com/docs/database/web/structure-data)
* [Read and Write Data @ _Firebase_](https://firebase.google.com/docs/database/web/read-and-write)

#### Pass 10 - 13/9

* Firebase
    * Event listeners
    * child_changed, child_added, child_removed 

###### Länkar

* [Read & Write @ _Firebase_](https://firebase.google.com/docs/database/web/read-and-write)

#### Pass 11 - 14/9

* Firebase
    * Firebase i kombination med react
    * Hantera dynamisk uppdatering i realtid

#### Pass 12 - 15/9

* Firebase Autentisering
    * Autentisering med email/password
    * `onAuthStateChanged()`
    * Hantering av användare

###### Länkar

* [Auth @ _Firebase_](https://firebase.google.com/docs/auth/)

#### Pass 13 - 18/9

* Firebase Autentisering forts.
    * Sociala konton, github etc.
    * Autentiseringsregler i databasen

###### Länkar

* [Auth @ _Firebase_](https://firebase.google.com/docs/auth/)
* [Security Rules @ _Firebase_](https://firebase.google.com/docs/database/security/)

#### Pass 14 - 19/9

* `webpack` the return 
    * Production vs development 
* Deployment
* `process.env` etc.

###### Länkar

* [Webpack v3](https://webpack.js.org/)
* [Deployment @ _create-react-app_](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment)

#### Pass 15 -  21/9

* En titt på `redux` för de intresserade
* Eget arbete med slutuppgiften

#### Pass 16 - 22/9

* Eget arbete med slutuppgiften

#### Pass 17 - 27/9

* Eget arbete med slutuppgiften

#### Pass 18 - 28/9

* Eget arbete med slutuppgiften


