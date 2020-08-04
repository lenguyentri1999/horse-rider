# Who We Are
We are High Horse Drifters - soon to be the Yelp for horse enthusiasts.
# Live Demo
Give our website a whirl at https://horse-riding-app.firebaseapp.com/landing
# Screenshots
**1. Landing Page**
![Landing Page](https://i.imgur.com/45URHRW.png)

**2. Interactive Maps**
![Map Page](https://i.imgur.com/E4y4t70.png)

**3. Explore through Geolocation**
![Explore Page](https://i.imgur.com/dfu2qRA.png)

**4. Write Reviews**
![Review Page](https://i.imgur.com/r5occ8I.png)

**5. Keep up with our Blogs**
![Blog Page](https://i.imgur.com/Ub99igl.png)
<-

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
