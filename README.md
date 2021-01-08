# UE Hackathon - Frontend

*This project needs Node.js to run. If you need to install it, we advise you to use [nvm](https://github.com/nvm-sh/nvm).*

## Starting the app on your device for debugging 

### 1. Pull the archive from the git repository : [https://github.com/ladislas14/ue-hackathon-front](https://github.com/ladislas14/ue-hackathon-front).

### 2. Install Expo:

```bash
npm install -g expo-cli
```

### 3. Install other dependencies:

```bash
npm i
```

### 4. Configure:

You can set the URL of the staging and production servers by modifying the `STAGING_SERVER_HOST` and `PRODUCTION_SERVER_HOST` constants in the [app config](app.config.js).  
If you are deploying the server on Scalingo, you can find its URL on the Container page of your app.

Note that by default, the project will start in debug mode on the staging environment.
When building however, the environment is switched to production.

### 5. Launch the project:

```bash
npm start
```

This will start the bundler in your default browser.

### 6. Start the app on your phone:
  
- First you need to install the Expo app on your phone.
- Then, you can scan the QR code shown by expo on your computer to open the app on your device.
    - If you are using Android, you also have the option to plug-in your device to your computer and press "Run on Android device/emulator".

## Deployment

We use the build services provided by Expo.

Run `npm run build-android` or `npm run build-ios` depending on the platform you are targeting. You will be asked to provide expo credentials in order to start building the app. You can then export the .apk (for Android) or .ipa (for iOS). 

## Contributors

Caroline de Pourtales (caroline.de-pourtales@imt-atlantique.net)
Alfred Pichard (alfred.pichard@imt-atlantique.net)
Ladislas Dellinger (ladislas.dellinger@imt-atlantique.net)
Kelian Baert (kelian.baert@imt-atlantique.net)