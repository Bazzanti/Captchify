# Captchify

Project to create captcha images and validate them.

- Typescript based rest-API architecture with Fastify framework.
- Sqlite is used as a database.
- Tests are written using Jest.
- Canvas is used to generate the image for the captcha.

## How to use

### 1. Clone this repo, then

#### First method

- Install Node dependencies:

`npm install`

- Start the server at localhost:3000

`npm run dev`

#### Second method

- Using docker-compose, run docker-compose up in the project root. The server can be reached at localhost:3000.

### 3. Create a captcha image

`curl -X POST <ROUTE>`
ex.
`curl -X POST http://localhost:3000/v1/captcha/create`

For checking images from base64,use https://base64.guru/converter/decode/image

### 4. Validate the captcha

`curl -X POST <ROUTE> -H "Content-Type: application/json" -d '{"id":<ID>,"captcha":"<SOLUTION>"}'`

ex.
`curl -X POST http://localhost:3000/v1/captcha/check -H "Content-Type: application/json" -d '{"id":3,"captcha":"fk5TS"}'`

## Test and updates

### To run the tests

To run all the tests, use the following command:
`npm run test`

### Changes and updates

To change the image, use the test to check the result quickly and update the ImageGenerationService

`npm run test -- ImageGenerationService.spec.ts`

For checking images from base64, use https://base64.guru/converter/decode/image
