# Captchify

Project to create captcha images and validate them.

- Typescript based rest-API architecture with Fastify framework.
- Sqlite is used as a database.
- Tests are written using Jest.
- Canvas is used to generate the image for the captcha.

## How to use

### 1. Clone this repo, then

#### First method

- node >= 20 is recommended
- cd into the project root
- Install Node dependencies:

`npm install`

- Start the server at localhost:5555

`npm run dev`

#### Second method

- Using docker-compose, run docker-compose up in the project root. The server can be reached at localhost:5555.

### 3. Create a captcha image

`curl -X POST <ROUTE>`
ex.
`curl -X POST http://localhost:5555/v1/captcha/create`

The response will be a json object: {"captcha":"<BASE_64_IMG>","id":<ID>"}
For checking images from base64,use https://base64.guru/converter/decode/image

### 4. Validate the captcha

`curl -X POST <ROUTE> -H "Content-Type: application/json" -d '{"id":<ID>,"captcha":"<SOLUTION>"}'`

ex.
`curl -X POST http://localhost:5555/v1/captcha/check -H "Content-Type: application/json" -d '{"id":3,"captcha":"fk5TS"}'`

The response will be an ok or error.
The captcha will be validated only the first time, after that it will be set as already checked.

## Test and updates

### To run the tests

To run all the tests, use the following command:
`npm run test`

### Changes and updates

To change the image, use the test to check the result quickly and update the ImageGenerationService.
The image generation service can be improved in multiple ways.

`npm run test -- ImageGenerationService.spec.ts`

For checking images from base64, use https://base64.guru/converter/decode/image
