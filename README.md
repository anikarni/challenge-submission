# Accounts CRUD

[![CircleCI](https://circleci.com/gh/anikarni/challenge-submission/tree/master.svg?style=svg)](https://circleci.com/gh/anikarni/challenge-submission/tree/master)

This is a simple implementation of a CRUD application.
To access the app, go to: https://naturalcycles.now.sh/

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

To ensure new code is formatted as expected, run `npm run lint`. This will
modify the code, fixing any formatting issues found. Make sure to commit your
changes.

## Deploying the app

Pushing to the `master` branch on this repo will automatically ensure the
latest version of the app is running. However, if you wish to deploy locally,
you will need to have your [`now`](https://zeit.co/now) credentials setup
before running `npm run deploy`.

After deploy, the new version will be available in a unique url (listed in the
deploy script logs), but will not be exposed to the `naturalcycles.now.sh`
alias. (This is also not done in the pipeline). To create the alias, run:

```sh
now alias <UNIQUE_URL> naturalcycles.now.sh
```

## Improvements

For this project to be ready for production, I could forsee a few imporvements
being necessary, particularly as it pertains to the robustness of error
handling and logging. What happens when the database connection fails? Should
we be showing unparsed error messages to the user? Probably not.

I would also ensure inputs are validated with a bit more meticulousness. Right
now, the user can delete any documents in the db's `accounts` collection, with
no insurance it is a safe account to delete or not, for example. (Though, for
the moment, there are no restrictions as to what the user can delete). We could
perhaps complement the solution with the use of a object modeling framework
such as `mongoose`.

Lastly, the UI could be greatly improved, obviously.
