# Curious Edinburgh

![Travis status](https://travis-ci.org/edina/CuriousEdinburgh2.svg?branch=master)

## Prerequisites
* See [React Native Dependencies](https://facebook.github.io/react-native/docs/getting-started.html)

## Install
```
npm install 
```

## Run

To run app on connected device or simulator:

### Run React Native Packager
```
npm start
```

### Android
```
npm run react-native run-android
```

### IOS
```
npm run react-native run-ios
```

## Release
### Android 

See https://facebook.github.io/react-native/docs/0.49/signed-apk-android.html for creating andoid release.

### Deploy to app Store

In order to deploy to app store is preferrable to create a bundled file that runs on the phone without external dependencies. In the root directory, type:

```
./node_modules/.bin/react-native bundle --platform ios --dev false --entry-file index.ios.js --bundle-output ios/main.jsbundle
```

After a successful output, you are good to modify the file placed at ios/CuriousEdinburgh/AppDelegate.m following:

1. Commenting out the line 

```
jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
```

2. Adding the following line:

```
jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
```

which tells Xcode that the app has to run from the main.jsbundle file generated
