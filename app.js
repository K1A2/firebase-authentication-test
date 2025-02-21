
let userMail = "";

const firebaseConfig = {
    apiKey: "AIzaSyBpvkcy3Z50kgHmaOHiKDExTTxJ-HEVC7U",
    authDomain: "new-schoolcal.firebaseapp.com",
    projectId: "new-schoolcal",
    storageBucket: "new-schoolcal.firebasestorage.app",
    messagingSenderId: "51753199035",
    appId: "1:51753199035:web:03c3e1c2b7c5a9e1b1509e",
    measurementId: "G-1CF3X6R4WB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//invokes firebase authentication.
const auth = firebase.auth();

document.querySelector("#show-register").addEventListener("click", () => {
    showRegistration();
});

const showRegistration = () => {
    document.querySelector("#registration-page").classList.remove("hide");
    document.querySelector("#login-page").classList.add("hide");
    document.querySelector("#homepage").classList.add("hide");
};

document.querySelector("#show-login").addEventListener("click", () => {
    showLogin();
});

const showLogin = () => {
    document.querySelector("#registration-page").classList.add("hide");
    document.querySelector("#login-page").classList.remove("hide");
    document.querySelector("#homepage").classList.add("hide");
};

document.querySelector("#signout").addEventListener("click", () => {
    signOut();
});

const register = async () => {
    const email = document.querySelector("#registration-email").value;
    const password = document.querySelector("#registration-password").value;
    const repassword = document.querySelector("#registration-repassword").value;
    const nickname = document.querySelector("#registration-nickname").value;

    if (email.trim() == "") {
        alert("Please enter Email");
    } else if (password.trim() == "") {
        alert("Please enter Password");
    } else if (nickname.trim() == "") {
        alert("Please enter Nickname");
    } else if (password.trim().length < 7) {
        alert("Password must be at least 7 characters");
    } else if (password !== repassword) {
        alert("password do not match");
    } else {
        console.log(JSON.stringify({
            email: email,
            password: password,
            nickname: nickname,
            term: []
        }))

        const response = await fetch('https://api-school.test-k1a2.xyz/api/v1/user', {
            method: 'POST',
            mode: 'cors',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
                nickname: nickname,
                term: []
            })
        });

        if (response.status === 201) {
            alert('ss')
            showLogin()
        } else {
            const json = new TextDecoder('utf-8').decode(await response.arrayBuffer());
            console.log(json)
            alert('ff ' + json)
        }
        // auth
        //     .createUserWithEmailAndPassword(email, password)
        //     .catch(function (error) {
        //         // Handle Errors here.
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //         alert(errorMessage);
        //         // ...
        //     });
    }
};

document.querySelector("#register").addEventListener("click", () => {
    register();
});

//register when you hit the enter key
document
    .querySelector("#registration-password")
    .addEventListener("keyup", (e) => {
        if (event.keyCode === 13) {
            e.preventDefault();

            register();
        }
    });


//function for verifying login entries
const login = () => {
    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-password").value;

    if (email.trim() == "") {
        alert("PLease enter Email");
    } else if (password.trim() == "") {
        alert("Please enter Password");
    } else {
        authenticate(email, password);
        //   alert("logged in successfully!");
    }
};

//event on login button
document.querySelector("#login").addEventListener("click", () => {
    login();
});

//sign in when you hit enter
document
    .querySelector("#login-password")
    .addEventListener("keyup", (e) => {
        if (event.keyCode === 13) {
            e.preventDefault();

            login();
        }
    });

//function for authenticating the entered values for login with firebase data
const authenticate = (email, password) => {
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, password);
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
};

const showHomepage = () => {
    document.querySelector("#registration-page").classList.add("hide");
    document.querySelector("#login-page").classList.add("hide");
    document.querySelector("#homepage").classList.remove("hide");
};

const signOut = () => {
    firebase
        .auth()
        .signOut()
        .then(function () {
            userMail = "";
            location.reload();
        })
        .catch(function (error) {
            alert("error signing out, check network connection");
        });
};

auth.onAuthStateChanged(async (firebaseUser) => {
    if (firebaseUser) {
        userMail = firebaseUser.email;
        document.querySelector("#userMail").innerHTML = userMail;
        showHomepage();
        const idTokenDiv = document.getElementById('id-token')
        const idToken = await firebaseUser.getIdToken();
        idTokenDiv.textContent = `idToken: ${idToken}`;
    }
});

    //   document
    //     .querySelector("#forgot-password")
    //     .addEventListener("click", () => {
    //       const email = document.querySelector("#login-email").value;
    //       if (email.trim() == "") {
    //         alert("Enter Email");
    //       } else {
    //         forgotPassword(email);
    //       }
    //     });

    //   const forgotPassword = (email) => {
    //     auth
    //       .sendPasswordResetEmail(email)
    //       .then(function () {
    //         alert("email sent");
    //       })
    //       .catch(function (error) {
    //         alert("invalid email or bad network connection");
    //       });
    //   };