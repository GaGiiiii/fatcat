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

### Pokretanje frontend-a

Frontend pokrecemo iz fat-cat-front foldera komandom:

```bash
npm start
```

Backend radi na [localhost:8000](http://localhost:8000/)   
Frontend radi na [localhost:3000](http://localhost:3000/)
