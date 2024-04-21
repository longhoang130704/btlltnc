import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
    get,
    getDatabase,
    ref,
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
//----------------------------------------------------------------
console.log("connect adminGrade.js");
//----------------------------------------------------------------
//Lay Element tu HTML va console.log ra Element
const container = document.getElementById("content-container");
//Lay thong tin cua Course
const dataCourseRef = ref(db, "/Courses");
get(dataCourseRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      //doi Object qua Array
      const dataLength = Object.keys(data).length;
      const dataArray = Object.entries(data);
      //thong tin can them vao Frontend
      for (let i = 0; i < dataLength; i++) {
        const div = document.createElement("div");
        div.className = "content-item";
        div.id = `course${i}`;

        const thumbnailDiv = document.createElement("div");
        // Thêm class "content-thumbnail" cho div thumbnail
        thumbnailDiv.className = "content-thumbnail";

        const title = document.createElement("h3");
        const courseName = dataArray[i][1].name; //Course Name
        title.className = 'content-title';
        // Tạo một thẻ a bên trong tiêu đề

        const link = document.createElement("a");
        link.href = "ad_grade.html";
        link.textContent = courseName;
        title.appendChild(link);

        const teacher = document.createElement("p");

        const teacherID = dataArray[i][1].teacherId; //teacher Name
        //Them courseName vao HTML Element

        get(ref(db, `Roles/Teachers/${teacherID}`)).then((snapshot) => {
          if (snapshot.exists()) {
            let teacherName =
              snapshot.val().firstname + " " + snapshot.val().lastname;
            teacher.textContent = teacherName;
            title.appendChild(teacher);
          }
        });

        div.appendChild(thumbnailDiv);
        div.appendChild(title);

        // Thêm div cha vào thẻ cha
        container.appendChild(div);
      }
      //Kiem tra thong tin lay duoc
      // console.log(typeof(data));
      // console.log(typeof(dataLength));
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
