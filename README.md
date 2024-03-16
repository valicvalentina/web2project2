Projekt je razvijen u sklopu kolegija Napredni Razvoj Programske Potpore za Web na Fakultetu elektrotehnike i računarstva.

The project was developed as part of the Advanced Web Software Development course at the Faculty of Electrical Engineering and Computing.

----------------------------------------------------------------------------------------------------------------------------------------


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

----------------------------------------------------------------------------------------------------------------------------------------

It is necessary to develop a web application that will allow a potential attacker to exploit two different security attack techniques, or two vulnerabilities of web applications, from the categories listed below.

For each one, it is necessary to implement:

functionality that enables the vulnerability
functionality that disables the vulnerability
For example, create a "switch" (e.g., checkbox, button, or dropdown menu) to enable and disable the vulnerability as desired.

Embedded vulnerabilities (security flaws), associated attack techniques, and implemented functionalities must be accessible through the user interface of the web application so that:

attacks can be initiated through the web application interface
the impact of the attack is visible in the user interface (e.g., by displaying a suitable list of executed actions, displaying modified database content, showing a javascript:alert standard dialog with user session data document.cookie, etc.).

==================================
List of implemented vulnerabilities:

1. Cross-site scripting (XSS)
2. Poor access control (Broken Access Control)

Brief instructions on how to locally run and test the application:

1. Download the ZIP file web2projekt2-master.zip from GitHub and extract it.
2. Navigate to the application directory using the terminal.
3. In the terminal, type npm install.
4. Start the application by running the command node express.js.

