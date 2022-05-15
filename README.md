# API Manual

## Configuration

Before you can start the api, create a `.env` file in the root of the project. The content of the file should be:

```env
NODE_ENV = development

DATABASE_HOST = localhost
DATABASE_NAME = fluvius_DB

DATABASE_USERNAME = root
DATABASE_PASSWORD = root

JWT_SECRET = :RKy;vckc:cjr=d'b/MTmqNFBrrN.jnwG[#,KS@EwsQ)WP<dY^Cs*6N`?3:[p4bFN
```

- NOTE: a port variable can also be added if your database port is not the default `3306`.

## Starting the API

You can run the API by typing the command `yarn start` in your terminal, the api will run on port 9000 by default

## Available routes

### Category

```http://localhost:9000/api/category``` (GET)
```http://localhost:9000/api/category/:categoryId``` (GET)

### Datasource  

```http://localhost:9000/api/datasource``` (GET)
```http://localhost:9000/api/datasource/:dataSourceId``` (GET)

### External User

```http://localhost:9000/api/externalUser``` (GET)
```http://localhost:9000/api/externalUser/login``` (POST - externalUsername)
```http://localhost:9000/api/externalUser/:userId``` (GET)

### Health

```http://localhost:9000/api/health/ping``` (GET)
```http://localhost:9000/api/health/version``` (GET)
```http://localhost:9000/api/health/validateroute``` (POST - data)

### Indicator

```http://localhost:9000/api/indicator``` (GET)
```http://localhost:9000/api/indicator/:indicatorId``` (GET)
```http://localhost:9000/api/indicator/sdg/:SDGId``` (GET)

### SDG

```http://localhost:9000/api/sdg``` (GET)
```http://localhost:9000/api/sdg/:sdgId``` (GET)
```http://localhost:9000/api/sdg/category/:categoryId``` (GET)
```http://localhost:9000/api/sdg/parent/:parent``` (GET)
```http://localhost:9000/api/sdg/child/:SDGId``` (GET)

### SDG Goal

```http://localhost:9000/api/sdggoal``` (GET)
```http://localhost:9000/api/sdggoal/:SDGGoalId``` (GET)
```http://localhost:9000/api/sdggoal/sdg/:SDGId``` (GET)
```http://localhost:9000/api/sdggoal/parent/:parentId``` (GET)

### SDG Value History

```http://localhost:9000/api/sdgvaluehistory``` (GET)
```http://localhost:9000/api/sdgvaluehistory/:SDGGoalId``` (GET)

### Template

```http://localhost:9000/api/template``` (GET)
```http://localhost:9000/api/template/:templateId``` (GET)

### User

```http://localhost:9000/api/user``` (GET)
```http://localhost:9000/api/user/login``` (POST - username, password)
```http://localhost:9000/api/user/:UserId``` (GET)