var database = firebase.database();
var auth = firebase.auth();
var display = document.getElementById("console");

function signup() {
    var email = $('#loginEmail').val;
    var password = $('#loginPassword').val();
    auth.createUserWithEmailAndPassword(email, password).then(function () {
    console.log("Registration successful");
    }).catch(function (error) {
    console.log(error.message);
    });
}

function login() {
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;
    auth.signInWithEmailAndPassword(email,password).then(function(){
    console.log("Successful login");
    }).catch(function (error) {
    console.log(error.message);
    });
    $('#loginModal').modal('toggle');
}

function logout(){
    auth.signOut().then(function(){
    console.log("Logged out");
    }).catch(function (error) {
    console.log(error.message);
    });
}

var loginout = $('#loginout');

auth.onAuthStateChanged(function(user){
  if(user) {
    // window.location.href = "https://bolbole-3a52b.firebaseapp.com/#";
    console.log("User signed in");
    display.innerHTML = auth.currentUser.uid;
    display.innerHTML += " | User signed in";
    loginout.removeClass("btn-primary");
    loginout[0].innerHTML = "Logout";
  } else {
    // window.location.href = "https://bolbole-3a52b.firebaseapp.com/#/user_auth";
  	console.log("No user is signed");
    display.innerHTML = "No user signed in";
    loginout[0].innerHTML = "Sign in";
    loginout.addClass("btn-primary");
  }
});

console.log(loginout);