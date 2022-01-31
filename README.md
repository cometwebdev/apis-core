## Setup

Clone the apis-core repository

```bash
git clone https://github.com/cometwebdev/apis-core.git
```

Create the .env file at project root and run the build scripts. See `.env-example` for the list of environment variables and defaults.

```bash
cd apis-core/
cp .env-example .env
```

## Run


TL;DR: Using task runner:


```bash
npm run build
npm run start
```


By service or chain:


```bash
# ex: run just the gateway
docker-compose up gateway

# ex: run all ethereum services
docker-compose up ethereum*

# ex: run all bitcoin services
docker-compose up bitcoin*

# ex: run everything
docker-compose up

```



# Production


## Run


```bash
npm run build-production
npm run start-production
```

