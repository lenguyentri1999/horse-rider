# Install
`npm install -g ionic@latest`

Go inside node_modules/ionic-4-autocomplete/autocomplete-scss
Under the ul section, fix width from 90vw to 100%

To fix node-pre-gyp fall-back error, remove package-lock.json and then npm install.

## Deploy to production on PWA
`ionic build --prod`
`firebase deploy`

## Build on Android

`npm install -g cordova@latest`

`ionic integrations add capacitor`

`npx cap add android`
