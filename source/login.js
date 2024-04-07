import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAn4qlccbAWPFI9xwl7oe2nYJYk3MG1mWo",
    authDomain: "btl-ltnc-hk232.firebaseapp.com",
    databaseURL: "https://btl-ltnc-hk232-default-rtdb.firebaseio.com",
    projectId: "btl-ltnc-hk232",
    storageBucket: "btl-ltnc-hk232.appspot.com",
    messagingSenderId: "912822160722",
    appId: "1:912822160722:web:01a3228b49c25871f17e8b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Lay dc auth
// const db = getDatabase(app); // lay db

// lay input cua email va password, cac element tu html
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const loginButton = document.querySelector('#login-button');

// ham login
//da lang nghe duoc su kien click o login button
let login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid);
    })  
    .then(() => {
       alert('Dăng nhập thành công')
    })
    .catch((error) => {
      alert('Sai email hoặc mật khẩu')  
    })
  }

//lang nghe su kien click o submit button, nhấn phím enter
loginButton.addEventListener('click', login);
document.querySelector('body').addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        loginButton.click();
    }
})



