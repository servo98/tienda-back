# Instrucciones

## Requerimientos

`node version 14+`

## Instralación

- Instalar nodemon para desarrollo local
  `$ npm install nodemon -g`
- Instala todas las dependencias
  `$ npm i`

## Variables de entorno

Este proyecto necesita unas cuantas variables de entorno para poder ejercutarse correctamente

- Crear archivo de variables de entorno
  `$ cp .env.template .env`

- Debes de editar las variables de entorno del archivo `.env` creado en el paso anterior

| Variable    | Descripción                                                          |
| ----------- | -------------------------------------------------------------------- |
| PORT        | Puerto en el cuál, el servidor http que aloja el api se ejecuta      |
| DB_HOST     | Dirección/ip de la base da datos                                     |
| DB_USER     | Nombre de usuario para la base de datos                              |
| DB_PASS     | Contrasela del usuario especificado arriba                           |
| DB_PORT     | Puerto de la base de datos                                           |
| DB_NAME     | Nombre del Schema o nombre de la base de datos                       |
| AUTH_SECRET | Clave secreta con la que se calculan los token para la autenticación |

## Ejecución local (se reinicia al cambiar archivos)

`$ npm run dev`

## Ejecución completa (no se reninicia)

`$ npm start`

# Deploy URL

`https://tienda-proyecto-back.herokuapp.com/`
