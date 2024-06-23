# Captchify

Project to create captcha images and validate them.
Typescript based rest-API architecture with fastify framework.

## How to use

### 1. Clone this repo & install dependencies

Install Node dependencies:

`npm install`

- For checking images,use https://base64.guru/converter/decode/image

### 2. Start the server

`npm run dev`

### 3. Create a captcha image

curl -X POST <ROUTE>
ex.
curl -X POST http://localhost:3000/v1/captcha/create

### 4. Validate the captcha

curl -X POST <ROUTE> -H "Content-Type: application/json" -d '{"id":<ID>,"captcha":"<SOLUTION>"}'

ex.
curl -X POST http://localhost:3000/v1/captcha/check -H "Content-Type: application/json" -d '{"id":3,"captcha":"fk5TS"}'
