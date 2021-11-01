# Fatcat  

Uputstvo za instalaciju i pokretanje aplikacije

## Instalacija projekta

### Preduslovi:

- Instaliran [GIT CLI](https://git-scm.com/)
- Instaliran [NodeJS](https://nodejs.org/en/) (i npm koji ide uz njega)
- Instaliran [Docker](https://www.docker.com/products/docker-desktop)

---

Kloniramo repo komandom

```bash
git clone https://github.com/GaGiiiii/fatcat/
```

Otvaramo 2 terminala, gde u prvom kucamo:

```bash
cd fat-cat-back
npm i
```
a u drugom kucamo:

```bash
cd fat-cat-front
npm i
```

komandama iznad smo instalirali sve dependecy-e koji se nalaze u package.json fajlu

---

## Pokretanje projekta

### Pokretanje backend-a

Backend pokrecemo iz fat-cat-back foldera komandom:

```bash
docker compose up
```

Ova komanda će pokrenuti docker container namenjen za development.    
  
U njemu je node server pokrenut preko package-a nodemon i 
osluškuju se promene u kodu. 
Nakon svake promene, aplikacija će se automatski 
porkenuti ponovo.

### Pokretanje frontend-a

Frontend pokrecemo iz fat-cat-front foldera komandom:

```bash
npm start
```

Backend radi na [localhost:8000](http://localhost:8000/)   
Frontend radi na [localhost:3000](http://localhost:3000/)

## Pravljenje docker image-a za deploy
U folderu fat-cat-back komandom

```bash
npm run deploy
```

Build-ujemo docker image backend-a i 
push-ujemo ga na [Docker Hub](https://hub.docker.com/)  
Ovim smo obezbedili image koji moze da se pokrene na bilo kojoj
masini koja ima instaliran Docker.

U folderu docker-compose-prod se nalazi
docker-compose.yml namenjen za pokretanje aplikacije preko
image-a koji se nalazi na Docker Hubu.

Da bi se backend ove aplikacije pokrenuo na ovaj nacin potrebno je
biti u folderu gde se nalazi pomenuti docker-compoe.yml

Izvrsiti komandu

```bash
docker compose up
```

I aplikacija ce biti pokrenuta
