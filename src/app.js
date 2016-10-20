require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/css/bootstrap-theme.css');
require('site.css');

var firebase = require("firebase");
var $ = require("jquery");
global.jQuery = require('jquery');
require('bootstrap');


var page = require("page");
var myAuth = require("myAuth");

var config = {
	apiKey: "AIzaSyBzUuoXnsLFo3blO2i6-9IMMeIPABEiRKg",
	authDomain: "beersmith2-viewer.firebaseapp.com",
	databaseURL: "https://beersmith2-viewer.firebaseio.com",
	storageBucket: "beersmith2-viewer.appspot.com",
	messagingSenderId: "218643340575"
};
firebase.initializeApp(config);
myAuth.init(firebase);
page.init(xml_urls, firebase);


 firebase.auth().onAuthStateChanged(firebaseUser => {
	if (firebaseUser) {
		page.settings();
	} else { 
		page.recipes();
	}
});