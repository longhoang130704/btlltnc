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
      // console.log(dataArray[0][1].Classes);
      for (let i = 0; i < dataLength; i++) {
        let courseCode = dataArray[i][0];
        Object.entries(dataArray[i][1].Classes).forEach((courseClass) => {
          let classCode = courseClass[0];
          let teacherId = courseClass[1].teacherId;

          const div = document.createElement("div");
          div.className = "content-item show";
          div.id = `course${i}`;

          const thumbnailDiv = document.createElement("div");
          // Thêm class "content-thumbnail" cho div thumbnail
          thumbnailDiv.className = "content-thumbnail";

          const title = document.createElement("h3");
          const courseName = `${dataArray[i][1].name} (${courseCode})`; //Course Name
          title.className = "content-title";
          // Tạo một thẻ a bên trong tiêu đề

          const link = document.createElement("a");
          link.href = "./ad_grade.html";
          link.setAttribute('onclick','hideGradeItem(), foo()')
          link.id = `${courseCode}-${classCode}`;
          link.textContent = courseName;
          link.classList.add('courseClass')
          title.appendChild(link);

          const teacher = document.createElement("p");
          //Them courseName vao HTML Element

          get(ref(db, `Roles/Teachers/${teacherId}`)).then((snapshot) => {
            if (snapshot.exists()) {
              let teacherName =
                snapshot.val().firstname + " " + snapshot.val().lastname;
              teacher.textContent = classCode + ' - ' + teacherName;
              title.appendChild(teacher);
            }
          });

          div.appendChild(thumbnailDiv);
          div.appendChild(title);

          // Thêm div cha vào thẻ cha
          container.appendChild(div);
        });
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


function Grade_4(gradeItems){
  let sum = 0;
  Object.entries(gradeItems).forEach((gradeItem) => {
    sum += gradeItem[1].Grade / (gradeItem[1].RangeEnd - gradeItem[1].RangeBegin) * gradeItem[1].GradeWeight * 10;
  })
  if (sum >= 0 && sum < 4) {
    return 0;
  } else if (sum >= 4 && sum < 5) {
    return 1;
  } else if (sum >= 5 && sum < 5.5) {
    return 1.5;
  } else if (sum >= 5.5 && sum < 6.5) {
    return 2;
  } else if (sum >= 6.5 && sum < 7) {
    return 2.5;
  } else if (sum >= 7 && sum < 8) {
    return 3;
  } else if (sum >= 8 && sum < 8.5) {
    return 3.5;
  } else if (sum >= 8.5 && sum < 10) {
    return 4;
  } 
}

function Grade_10(gradeItems){
  let sum = 0;
  Object.entries(gradeItems).forEach((gradeItem) => {
    sum += gradeItem[1].Grade / (gradeItem[1].RangeEnd - gradeItem[1].RangeBegin) * gradeItem[1].GradeWeight * 10;
  })
  return Math.round(sum * 100) / 100;
}

// // let courseClasses = document.getElementsByClassName('courseClass');
get(dataCourseRef).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    let grades = {};
    const data = snapshot.val();
    const dataLength = Object.keys(data).length;
    const dataArray = Object.entries(data);
    for (let i = 0; i < dataLength; i++) {
      let courseCode = dataArray[i][0];
      grades[courseCode] = {};
      Object.entries(dataArray[i][1].Classes).forEach((courseClass) => {
        let classCode = courseClass[0];
        // console.log(classCode);
        grades[courseCode][classCode] = {};
        console.log(grades);
        if (courseClass[1]['studentIds'] == null) {
          console.log("empty")
        }
        else {
          Object.entries(courseClass[1]['studentIds']).forEach((student) => {
            let student_id = student[0].substring(student[0].length - 6);
            let grade_4 = Grade_4(student[1].Grades);
            let grade_10 = Grade_10(student[1].Grades);
            
            get(ref(db, `Roles/Students/${student[0]}`)).then((snapshot) => {
              if (snapshot.exists()) {
                let student_name = snapshot.val().firstname + " " + snapshot.val().lastname;
                grades[courseCode][classCode][student[0]] = {
                  student_id: student_id,
                  student_name: student_name,
                  grade_4: grade_4,
                  grade_10: grade_10
                };
                // console.log(courseCode);
                // // console.logo(classCode);
                // console.log(student_id);
                // console.log(student_name);
                // console.log(grade_4);
                // console.log(grade_10);
              }
            })

          }) 
        }
        
        // console.log(courseClass[1]['studentIds']);
      })
      // grades[courseCode] = "1";
    }
    console.log(grades);
    // console.log(JSON.parse(JSON.stringify(grades)));
    // localStorage.setItem('gradeItems', grades);
    // sessionStorage.setItem('gradeItems', JSON.stringify(grades));
  }

})