
function MyAuth() {
	this.firebase = {};
};

MyAuth.prototype.init = function (firebase) {
	this.firebase = firebase;
	this.currentUser = {};

	this.firebase.auth().onAuthStateChanged(firebaseUser => {
		if (firebaseUser) {
			console.log(firebaseUser);
			this.currentUser = firebaseUser;

			var navbar = document.getElementById('navbar');
			navbar.innerHTML = require('myAuth-user-template.jsx')(firebaseUser);;
			document.getElementById('btn-logout').addEventListener('click', this.logout.bind(this), false);
		} else {
			console.log('not logged in');
			this.currentUser = {};

			var navbar = document.getElementById('navbar');
			navbar.innerHTML = require('myAuth-login-template.jsx');
			document.getElementById('btn-login').addEventListener('click', this.login.bind(this), false);
		}
	});

}

MyAuth.prototype.login = function () {
	console.log('Log in started');

	var provider = new this.firebase.auth.GoogleAuthProvider();
	this.firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  this.currentUser = result.user;
	  // ...
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});
}

MyAuth.prototype.logout = function () {
	console.log('Log off started');
	this.firebase.auth().signOut();
}

module.exports = new MyAuth();