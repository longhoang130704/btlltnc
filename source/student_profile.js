import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  updatePassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  update,
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
const auth = getAuth();
const db = getDatabase();

let student_info = JSON.parse(sessionStorage.getItem("user-info"));

let firstname = document.getElementById("fname");
let lastname = document.getElementById("lname");
let student_id = document.getElementById("student-id");
let mail = document.getElementById("student-mail");
let dob = document.getElementById("student-dob");


firstname.innerText = student_info.firstname;
lastname.innerText = student_info.lastname;
mail.innerText = student_info.email;
dob.innerText = student_info.birthday;
student_id.innerText = student_info.user_id.substring(
  student_info.user_id.length - 6
);

let cur_pass = document.getElementById('cur-password-inp');
let new_pass = document.getElementById('password-inp');
let confirm_pass = document.getElementById('confirm-password');
let updateBtn = document.getElementById('updateBtn');

let updateInfo = (event) => {
  if (cur_pass.value != "") {
    signInWithEmailAndPassword(auth, student_info.email, cur_pass.value)
    .then(() => {
      if (new_pass.value != "" && confirm_pass.value != "") {
        if (new_pass.value == confirm_pass.value) {
          updatePassword(auth.currentUser, new_pass.value);
          alert("Update password successfully, please log in again");
          sessionStorage.clear();
          window.location.href = "../login.html";
        }
      }
    })
    .catch((error) => {
      alert(error.message);
    })
    
  }
}

updateBtn.addEventListener('click', updateInfo);
