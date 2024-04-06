import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
    getDatabase,
    set,
    ref,
  } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
  
  // Thay firebaseConfig bằng cái của nhóm
  const firebaseConfig = {
    apiKey: "AIzaSyB9JtFcQE6GjT75vidQbbnfRhhUHAbXLQ8",
    authDomain: "webapp-15dcd.firebaseapp.com",
    databaseURL: "https://webapp-15dcd-default-rtdb.firebaseio.com",
    projectId: "webapp-15dcd",
    storageBucket: "webapp-15dcd.appspot.com",
    messagingSenderId: "202280076352",
    appId: "1:202280076352:web:f582a1afec4cb7cf608ba5"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getDatabase(app);

  let firstname = document.getElementById('fname-input');
  let lastname = document.getElementById('lname-input');
  let email = document.getElementById('email-input');
  let password = document.getElementById('password-input');
  let birthday = document.getElementById('birthday-input')
  let mainform = document.getElementById('mainform');

  let signUp = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      let promises=[
      set(ref(db, 'Users/' + userCredential.user.uid), {
        role: "Students"
      }),
      // đổi thành set(ref(db, 'Roles/Students/' + uid))
      set(ref(db, 'Students/' + userCredential.user.uid), {
        email: email.value,
        firstname: firstname.value,
        lastname: lastname.value,
        birthday: birthday.value,
      })
    ];
      return Promise.all(promises);
    })
    .then(() => {
      // Chuyển hướng sang trang chính luôn
      // đổi thành ...href = "./index.html" 
      window.location.href = "./login.html"; 
    })
    .catch((error) => {
      alert(error.message);
      console.log(error.code);
      console.log(error.message);
    })
  }
  mainform.addEventListener('submit', signUp);

