# Firebase datastruktur

Firebase är uppbyggt av nästlade objekt. Nästlade objekt kan vara helvetiskt att jobba med. Därför gäller det att hålla strukturen så enkel som möjligt. Firebase har vissa tips på hur man kan hantera sin data: 

* [**Firebase - Structure Data**](https://firebase.google.com/docs/database/web/structure-data)

Dock så får man i _noSQL_-databaser denormalisera databasen, d.v.s. att vi får ha duplicerad data. I _SQL_ ville vi ofta normalisera databasen så att ingen information gick förlorad eller tog upp onödigt mycket plats:

| id | content      | createdBy |
| ---| ---          | ---       |
| 42 | "Hello"      | 567       |
| 43 | "Not hello"  | 567       |


| id        | username          | email                     |
| ---       | ---               | ---                       |
| 567       | demon_hunter_81   | cute_unicorn@yahoo.com    |
| 568       | AppDestroyer      | janne_schyst@telia.se     |

Vi är lite mer fria i en *noSQL*-databas att lagra informationen som vi vill. Dock kan vi fortfarande använda oss utav samma tänk som vi hade med *SQL*. Men vi vill sträva efter att försöka hålla strukturen **så platt som möjligt**. Vi vill inte ha massor av nästlade objekt även om vi får göra det.

```json
{
    "users": {
        "-Ku6MtfJPYHjJ1DJ-FTt" : {
            "username"  :"demon_hunter_81",
            "email"     :"cute_unicorn@yahoo.com"
        },
        "-Ku8zMuTSBtx-bpfRQ2F" :{
            "username"  :"AppDestroyer",
            "email"     :"janne_schyst@telia.se"
        }
    },
    "posts":{
        "-Ku90kXiAjFRqrO2I8V8" : {
            "createdBy" : "-Ku6MtfJPYHjJ1DJ-FTt",
            "content"   : "Hello"
        },
        "-Ku90kXbC1BtV1S5_vDc" : {
            "createdBy" : "-Ku6MtfJPYHjJ1DJ-FTt",
            "content"   : "Not Hello"
        }
    }
}
```

Vi kan också välja att lägga in referenser till alla posts skapade utav användaren i själv användarobjektet. Samt även lägga till information om själva användaren i vår post.

```json
{
    "users": {
        "-Ku6MtfJPYHjJ1DJ-FTt" : {
            "username"  :"demon_hunter_81",
            "email"     :"cute_unicorn@yahoo.com",
            "posts": {
                "-Ku90kXiAjFRqrO2I8V8" : true,
                "-Ku90kXbC1BtV1S5_vDc" : true
            }
        },
        "-Ku8zMuTSBtx-bpfRQ2F" :{
            "username"  :"AppDestroyer",
            "email"     :"janne_schyst@telia.se"
        }
    },
    "posts":{
        "-Ku90kXiAjFRqrO2I8V8" : {
            "createdBy" : "-Ku6MtfJPYHjJ1DJ-FTt",
            "username"  : "demon_hunter_81",
            "content"   : "Hello"
        },
        "-Ku90kXbC1BtV1S5_vDc" : {
            "createdBy" : "-Ku6MtfJPYHjJ1DJ-FTt",
            "username"  : "demon_hunter_81",
            "content"   : "Not Hello"
        }
    }
}
```



## Övning

**I grupper om 3 personer**

Modellera nedanstående struktur under **Krav** så att den är så platt som möjligt. Informationen ska vara relativt lätt att hämta med `firebase`. Tänk hur ni skulle hämta informationen med `.on('value')` t.ex. eller med andra eventlisteners medan ni strukturerar denna fiktionella databas. Ni kan skapa strukturen i pseudokod på er dator eller skriva med papper och penna, eller papyrus och fjäderpenna, alternativt rista in er databasstruktur i Nackademins väggar.

_Pseudokod-ish_
```json
"users": {
    "1" :{
        "username"  : "truth_bomb_87",
        "email"     : "i_voted@AOL.com"
    }
}
```

#### Krav

Du ska strukturera ett bokningssystem för olika gympass, man ska både kunna boka in sig på ett pass och lägga in sig som reserv på passet. Informationen mellan pass/användare ska vara länkad så att man alltid kan få tag i vilka personer som är inbokade på passet samt att användaren ska kunna veta vilka pass användaren är inbokad på/har reservplats på. 

I systemet finns det 3 olika roller:

* **Typer av användare**
    * **Vanlig användare**
        *  Pass inbokade
        *  Användarinformation: email etc.
        *  Pass reserverade
    * **Instruktör**
    * **Admin**

Vi har också 1 typ av händelse i databasen, själva gympassen. Om detta pass består av 1 eller flera olika samlingar (tabeller) är upp till er att bestämma hur det ska se ut.

* **Pass**
    * Passen ska ha ett begränsat antal platser och passet ska hålla redan på hur många och vilka användare som är inbokade samt står på reservlista. Passen ska också ha en längd, starttid och stopptid samt vem som håller i passet.

#### Frågor kopplat till detta

Gå igenom följande frågor muntligt eller skriv ned dem i pseudokod.

1. Hur skulle queryn se ut om vi skulle vilja hämta information om alla pass som en användare är inbokad på och vill lista upp dem på sin profil?
2. Hur får vi upp en lista på inbokade personer på ett pass så vi kan se vilka som kommer?
3. Hur skulle vi göra om vi vill att passen sorteras alla pass så att vi får de som börjar snart är högst upp och de som är senare i veckan kommer senare i listan.
4. Hur gör vi om vi till varje pass vill visa information om instruktören som håller i passet? 


**När ni känner er färdiga så tar ni rast och sen säger jag till när vi återsamlar oss och diskutera resultatet, i tvärgrupper och i helklass**

