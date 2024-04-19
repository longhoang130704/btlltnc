import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { createUserWithEmailAndPassword, getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
    getDatabase,
    ref,
    set,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

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
const auth = getAuth(app);
const db = getDatabase(app);


// Lay cac Element trong HTML
const firstNameTeacherInput = document.querySelector('#fnameteacher')
const lastNameTeacherInput = document.querySelector('#lnameteacher')
const emailTeacherInput = document.querySelector('#emailteacher')
const birthdayTeacherInput = document.querySelector('#datebirth')
console.log("Connect ")

let signUpTeacherAccount = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, emailTeacherInput.value, emailTeacherInput.value)
        .then((userCredential) => {
            let promises = [
                set(ref(db, 'Users/' + userCredential.user.uid), {
                    role: "Tearchers",
                }),
                set(ref(db, 'Roles/Teachers/' + userCredential.user.uid), {
                    email: emailTeacherInput.value,
                    firstname: firstNameTeacherInput.value,
                    lastname: lastNameTeacherInput.value,
                    birthday: birthdayTeacherInput.value,
                })
            ];
            sessionStorage.setItem(
                //luu role vao session storage
                "user-role",
                JSON.stringify({ role: "Teachers" })
            );
            sessionStorage.setItem(
                //luu thong tin user vao session storage
                "user-info",
                JSON.stringify({
                    firstname: firstNameTeacherInput.value,
                    lastname: lastNameTeacherInput.value,
                    email: emailTeacherInput.value,
                    birthday: birthdayTeacherInput.value,
                })
            );
            return Promise.all(promises);
        })
        .then(() => {
            // window.location.href = "";
            alert('Tao tai khoan thanh cong')
        })
        .catch((error) => {
            alert(error.message);
            console.log(error.code);
            console.log(error.message);
        })
}
// submitElement.addEventListener('submit', signUpTeacherAccount);
  document.querySelector('body').addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        signUpTeacherAccount();
    }
  })