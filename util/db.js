import * as firebase from "firebase";
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDf-MfxkPNYBKbjZAx6DUZVZdm8Ctj83n4",
    authDomain: "dukes-cricket.firebaseapp.com",
    databaseURL: "https://dukes-cricket.firebaseio.com",
    projectId: "dukes-cricket",
    storageBucket: "",
    messagingSenderId: "319656721002"
  };

  const FBApp = firebase.initializeApp(config);

export default FBApp;
