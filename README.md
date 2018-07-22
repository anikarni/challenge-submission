# Accounts CRUD

This is a simple implementation of a CRUD application.

## Running the app

To run the application, make sure to install the dependencies and run the
app with the follow commands:

```sh
npm install

# run app in production mode (connecting to external db)
MONGO_URL=<EXTERNAL_URL> npm run build && npm start

# serve app in dev mode
npm run serve

# or, for development, use watch mode
npm run watch
```

Once the app is running, you can see it in action at `http://localhost:8080/`.

## Development

To execute the tests, run:

```sh
npm test

# or, in watch mode
npm run test:watch
```

## Deploying the app

Pushing to the `master` branch on this repo will automatically ensure the
latest version of the app is running. However, if you wish to deploy locally,
you will need to have your [`now`](https://zeit.co/now) credentials setup
before running `npm run deploy`.

To access the app, go to: https://naturalcycles.now.sh/

## TODO

- email validation
- production ready
