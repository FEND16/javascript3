# Firebase auth :closed_lock_with_key:

Firebase autentisering använder sig utan något som heter [Oauth2](https://oauth.net/2/). _Oauth2_ är komplicerat och det är ingen som riktigt orkar bry sig förän man verkligen måste bry sig och måste hantera det. Om du är intresserad av att veta mer kan du läsa en introduktion till det här: [**An Introduction to OAuth 2**](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2) eller här [**Oauth2 Simplified**](https://aaronparecki.com/oauth-2-simplified/)

Lyckligtvis abstraherar `firebase` detta åt oss så att vi istället får några simplare funktioner än att behöver implementara det själva. All funktionalitet som går att använda hittar du i länken nedan:

* [**Manage users in Firebase**](https://firebase.google.com/docs/auth/web/manage-users)

## Enable signup

Du måste tillåta att `firebase` kan skapa användare via dessa metoder genom att gå till **Authentication > Sign-in method** och trycka på pennan och sedan **enable**. Det ska sedan stå `enable` med grön text. Under **Authentication > Users** hittar du senare alla användare som har registrerat sig.

![Enable user signup](https://i.imgur.com/ZEptf0O.png)

## Create User

För att skapa en användaren kallar du på `firebase.auth().createUserWithEmailAndPassword()` och skickar med rätt värden från state till funktionen. 

```js
firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(error => console.log(error))
    .then(user => console.log(user))
```

**Observera att funktionen skapar en användare med en unik `key` men användaren lagras inte i _Realtime Database_. Användare hittar du istället under `Authentication`. Men du kan nu logga in med email och användarnamn**


## Sign in

När du vill logga in med dina uppgifter så kallar du på `firebase.auth().signInWithEmailAndPassword()` och skickar med rätt uppgifter som argument.

```js
firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error =>  {
        console.log("You goofed", error);
    });
```



## `onAuthStateChanged()`

Vi behöver bara en funktion för att styra om vi är inloggade eller inte. `firebase.auth().onAuthStateChanged()`. Funktionen är en `listener` som lyssnar på förändringar i autentisering. Om användaren är inloggad så returneras ett `user`-objekt, är användaren inte inloggad så returneras `null`. Allting kan vi sedan sätta ifrån detta.


```js
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    // change state to 'loggedIn: true' or something like that
    const displayName = user.displayName;
    const email = user.email;
    const emailVerified = user.emailVerified;
    const photoURL = user.photoURL;
    const uid = user.uid; //KEY! UID!
  } else {
    // User is signed out, user === null
    // change state to 'loggedIn: false' or something like that
  }
});
```

Om man sedan någon gång behöver komma åt användarens information ska det bara vara att kalla på:

```js
//Saves the current users details in the variable 'user'
const user = firebase.auth().currentUser;
```


# Övningar

1. Använd loginformuläret från föregående övningar. Du behöver två formulär, eller ett med variation. Ett loginformulär och ett registreringsformulär. Istället för att bara lagra informationen i `state` så ska nu registreringsformuläret kalla på `createUserWithEmailAndPassword()` och loginformuläret kalla på `signInWithEmailAndPassword()` med de värden som skrivs in i input.
2. I din `App.js` ska `onAuthStateChanged()` ligga som lyssnar på när förändringar i login-tillståndet ändras. När användaren är inloggad ska användaren lagras i `state`, när användaren är utloggad ska det `statet` tömmas.
3. Skapa en `NavBar` (den måste inte heta `NavBar`). Om personen är inloggad, d.v.s. `user` finns i `state` så ska det visas en `Login`-knapp, är användaren utloggad ska det finnas en `Logout`-knapp.
4. Om användaren inte är inloggad ska `LoginForm` (eller vad ditt formulär heter) visas, om personen är inloggad ska dock sidan fungera "som vanligt", du ska visa upp dina `todos`.
5. Gör så att användarens `key` lagras i varje `todo` så att man ser vem som har skapat denna todo. 
6. Skapa ett ytterligare konto, eller be en klasskamrat att registrera sig på din sida. Låt den användaren också skapa ett gäng `todos`.
7. Implementera sedan så att endast den som har skapat `todon` kan ta bort den. `key` är viktigt i dessa steg. Tänk på hur ni gjorde i PHP.
8. 

## Extra

* Lägg till profilbild och användarnamn på din användare. Om du vill lägga till extra information som profilbild, ändra email etc. så finns alla metoder under: [**Manage Users In Firebase**](https://firebase.google.com/docs/auth/web/manage-users). Det finns för det mesta en funktion att kalla på för att uppdatera vissa egenskaper.

* Skapa en **"Profile page"** där man kan se sin information om användaren. Med "page" menas bara att en specifik komponent renderas om man klickar på en knapp. Så när man klickar på t.ex. _"Show Profile"_ ska en komponent med användaruppgifter visas, t.ex. email och profilbild om du har lagt in det. Alla "sidor" i en React-app är egentligen bara olika komponenter, vi går aldrig från `index.html`


## Extra extra

Under **Manage Users** i firebase dokumentation finns även instruktioner för hur man kopplar login med *Google*, *Facebook*, *Twitter* samt *GitHub*. Har du tid över så kan du försöka att skapa login med en av dessa tjänster. Detta är VG-territorium.

