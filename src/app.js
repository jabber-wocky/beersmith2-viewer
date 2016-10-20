require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/css/bootstrap-theme.css');
require('css/site.css');
var $ = require("jquery");
global.jQuery = require('jquery');
require('bootstrap');

var config = {
	apiKey: "AIzaSyBzUuoXnsLFo3blO2i6-9IMMeIPABEiRKg",
	authDomain: "beersmith2-viewer.firebaseapp.com",
	databaseURL: "https://beersmith2-viewer.firebaseio.com",
	storageBucket: "beersmith2-viewer.appspot.com",
	messagingSenderId: "218643340575"
};

var firebase = require("firebase");
var page = require("page");
var myAuth = require("myAuth");

firebase.initializeApp(config);
myAuth.init(firebase);
page.init(firebase, myAuth);


 firebase.auth().onAuthStateChanged(firebaseUser => {
	if (firebaseUser) {
		page.login();
	} else { 
		page.logout();
	}
});