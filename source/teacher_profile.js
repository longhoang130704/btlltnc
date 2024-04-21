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

let teacher_info = JSON.parse(sessionStorage.getItem("user-info"));

let firstname = document.getElementById("fname");
let lastname = document.getElementById("lname");
let teacher_id = document.getElementById("teacher-id");
let mail = document.getElementById("teacher-mail");
let dob = document.getElementById("teacher-dob");
let degree = document.getElementById('degree-inp');
let field = document.getElementById('field-inp');


firstname.innerText = teacher_info.firstname;
lastname.innerText = teacher_info.lastname;
mail.innerText = teacher_info.email;
dob.innerText = teacher_info.birthday;
teacher_id.innerText = teacher_info.user_id.substring(
  teacher_info.user_id.length - 6
);
if (teacher_info.certificate) degree.placeholder = `Currently: ${teacher_info.certificate}`;
if (teacher_info.expertise) field.placeholder = `Currently: ${teacher_info.expertise}`;

let cur_pass = document.getElementById('cur-password-inp');
let new_pass = document.getElementById('password-inp');
let confirm_pass = document.getElementById('confirm-password');
let updateBtn = document.getElementById('updateBtn');



let updateInfo = (event) => {
  let update_alert_count = 0;
  if (degree.value != "") {
    update(ref(db, `Roles/Teachers/${teacher_info.user_id}`), {
      certificate: degree.value,
    })
    .then (() => {
      // 
      if (update_alert_count == 0) { 
        alert("Update Successfully");
        update_alert_count++;
      }
    })
    .catch((error) => {
      console.log(error.message);
    })
  }
  if (field.value != "") {
    update(ref(db, `Roles/Teachers/${teacher_info.user_id}`), {
      expertise: field.value,
    })
    .then (() => {
      // 
      if (update_alert_count == 0) {
        alert("Update Successfully");
        update_alert_count++;
      }
    })
    .catch((error) => {
      console.log(error.message);
    })
  }
  if (cur_pass.value != "") {
    signInWithEmailAndPassword(auth, teacher_info.email, cur_pass.value)
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
