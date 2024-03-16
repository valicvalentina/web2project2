Projekt je razvijen u sklopu kolegija Napredni Razvoj Programske Potpore za Web na Fakultetu elektrotehnike i računarstva.

The project was developed as part of the Advanced Web Software Development course at the Faculty of Electrical Engineering and Computing


Potrebno je izraditi web-aplikaciju koja će omogućiti potencijalnom napadaču korištenje dvije različite tehnike sigurnosnih napada, odnosno dvije ranjivosti web-aplikacija, iz dolje navedenih kategorija.

Za svaku je potrebno implementirati:

funkcionalnost kojom se omogućuje ranjivost
funkcionalnost kojom se onemogućuje ranjivost
Npr. napraviti "prekidač" (npr. checkbox, tipka ili padajući izbornik) kojim se ranjivost po želji uključuje i isključuje.

Ugrađene ranjivosti (sigurnosne nedostatke), s njima povezane napadačke tehnike i implementirane funkcionalnosti moraju biti dostupne kroz korisničko sučelje web-aplikacije tako da:

napadi se mogu pokrenuti kroz sučelje web-aplikacije
učinak napada bude vidljiv u korisničkom sučelju (npr. prikladnim ispisom niza izvršenih akcija, ispisom izmijenjenog sadržaja baze podataka, prikazom javascript:alert standardnog dijaloga s podacima o korisničkoj sjednici document.cookie itd.).

==================================
Popis implementiranih ranjivosti:

1. Cross-site scripting (XSS) 
2. Loša kontrola pristupa (Broken Access Control)

Kratke upute kako lokalno pokrenuti i isprobati aplikaciju:

1. Dohvatiti ZIP datoteku web2projekt2-master.zip s githuba te raspakirati.
2. Pozicionirati se pomoću terminala u direktorij s aplikacijom.
3. U terminal upisati npm install.
4. Pokrenuti aplikaciju naredbom node express.js.
