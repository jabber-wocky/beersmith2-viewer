
function MyAuth() {
	this.firebase = {};
	this.currentUser = {};
	this.token = {};
};

MyAuth.prototype.init = function (firebase) {
	this.firebase = firebase;

	this.firebase.auth().onAuthStateChanged(firebaseUser => {
		if (firebaseUser) {
			console.log(firebaseUser);
			this.currentUser = firebaseUser;
		} else {
			console.log('not logged in');
			this.currentUser = {};
		}
	});

}

MyAuth.prototype.login = function () {
	console.log('Log in started');

	var firebase = this.firebase;
	var provider = new this.firebase.auth.GoogleAuthProvider();
	
	this.firebase.auth().signInWithPopup(provider).then(this.UpdateProfile.bind(this)).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  
	  console.log("Error in login");
	  console.log(error);
	});
}

MyAuth.prototype.logout = function () {
	console.log('Log off started');
	this.firebase.auth().signOut();
}

MyAuth.prototype.UpdateProfile = function (result) {
	// This gives you a Google Access Token. You can use it to access the Google API.
	this.token = result.credential.accessToken;
	// The signed-in user info.
	this.currentUser = result.user;

	console.log('Updating user profile');
	const dbRefObject = this.firebase.database().ref('users/' + this.currentUser.uid + '/');
	dbRefObject.child('displayName').set(this.currentUser.displayName);
    dbRefObject.child('email').set(this.currentUser.email);
    dbRefObject.child('photoURL').set(this.currentUser.photoURL);
}

module.exports = new MyAuth();