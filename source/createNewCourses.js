import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
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
  appId: "1:912822160722:web:01a3228b49c25871f17e8b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
//Lay HTML Element
const course_id_input = document.querySelector("#courseid");
const course_name_input = document.querySelector("#course-name");
const course_credit_input = document.getElementById("course-credit");
const class_input = document.querySelector("#class");
const teacher_name_input = document.querySelector("#teacher");
const capacity_input = document.querySelector("#capacity");
const course_length_input = document.querySelector("#course_length");
const dateInWeek_input = document.querySelector("#dayOfWeek");
const time_start_input = document.querySelector("#time_start");
const time_end_input = document.querySelector("#time_end");
const room_input = document.querySelector("#room");

const create_button = document.getElementById('createCourseBtn');

function insertData(e) {
  e.preventDefault();
  console.log("web update");
  update(ref(db, `Courses/${course_id_input.value}`), {
    
    credit: course_credit_input.value,
    name: course_name_input.value,
  })
    .then(() => {
      alert("Thêm khoá học thành công");
    })
    .catch((error) => {
      alert(error.message);
    });
  update(ref(db, `Courses/${course_id_input.value}/Classes`), {
    [class_input.value]: {
      capacity: capacity_input.value,
      teacherId: teacher_name_input.value,
      // TODO: Add content 
      ['sections'] : {
        ['1-General'] : {
          ['1-Content'] : {
            type: "text",
            name: "General Information",
            description: "",
          }
        }
      },
      schedule: {
        courseLength: course_length_input.value,
        course_date: dateInWeek_input.value,
        room: room_input.value,
        time_start: time_start_input.value,
        time_end: time_end_input.value,
      },
    },
  })
  .catch((error) => {
    alert(error.message);
  });
  update(ref(db, `Roles/Teachers/${teacher_name_input.value}/Courses/${course_id_input.value}`), {
    class: class_input.value
  })
}

//Lang nghe su kien click o createButton va goi ham de them Data
create_button.addEventListener("click", function (e) {
  insertData(e);
});
// document.querySelector("body").addEventListener("keydown", function (e) {
//   if (e.keyCode === 13) {
//     insertData(e);
//   }
// });
