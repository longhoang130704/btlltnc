import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {
    getDatabase,
    ref as dbRef,
    set,
    get,
    update
  } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } 
from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";

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
const db = getDatabase(app);
const storage = getStorage(app);

const sectionNameRef = dbRef(db, 'sectionNames');

get(sectionNameRef).then((snapshot) => {
    if(snapshot.exists()){
        snapshot.forEach((sectionSnapshot) => {
            var sectionName = sectionSnapshot.val().sectionName;
            let newSectionElement = document.createElement('div');
            newSectionElement.className = `${sectionName.toLowerCase()}-info`;
            newSectionElement.innerHTML = 
            `<h2 class="section-title">${sectionName}</h2>
            <div class="divider"></div>
  
            <div class="content-item">
              <div class="content-thumbnail"></div>
              <h3 class="content-title">Content name</h3>
            </div>
  
            <div class="content-create">
              <div class="content-thumbnail">
                <img src="./img/add_button.png" alt="">
              </div>
              <button type="button" id="create-content-btn">Create Content</button>
            </div>`
            let bodyTable = document.querySelector(".body-table");
            let newSection = document.querySelector(".new-section");
            bodyTable.insertBefore(newSectionElement, newSection);
            //bodyTable.appendChild(newSectionElement);
        })
}   let createContent = document.querySelectorAll('.content-create');
    console.log(createContent);
    createContent.forEach(content => {
        let button = content.querySelector('#create-content-btn');
        let go_back_btn = document.getElementById('go-back');
        let body_table = document.getElementById('body-table');
        let create_content_panel = document.getElementById('create-content-panel')
        button.addEventListener('click', function() {
            let sectionElement = this.parentNode.parentNode;
            let sectionTitleElement = sectionElement.querySelector('.section-title');
            let sectionName = sectionTitleElement.textContent; 
    
            body_table.style.display = "none";
            create_content_panel.style.display = "block";
    
            go_back_btn.onclick = function() {
                body_table.style.display = "block";
                create_content_panel.style.display = "none";
            }
    
            let file_checkbox = document.getElementById('file-checkbox');
            let text_checkbox = document.getElementById('text-checkbox');
            let file_upload_panel = document.getElementById('file-upload-panel');
            let text_input_panel = document.getElementById('text-input-panel')
            
            file_checkbox.onclick = function() {
              if (file_checkbox.checked) {
                file_upload_panel.style.display = "block";
              }
              else {
                file_upload_panel.style.display = "none"; 
              }
            }
        
            text_checkbox.onclick = function() {
              if (text_checkbox.checked) {
                text_input_panel.style.display = "block";
              }
              else {
                text_input_panel.style.display = "none"; 
              }
            }
    
            function uploadFile(){
                let fileInput=document.getElementById("file-upload");
                let file=fileInput.files[0];
                let contentNameInput=document.getElementById("name-input");
                let contentName=contentNameInput.value;
                if (!contentName || !file) {
                    console.log("Content name or file is empty.");
                    return;
                }
                let storageRef=ref(storage, 'fileList/'+ file.name);
                let uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on('state_changed',function(snapshot){
                    let progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    console.log('Upload is '+progress+'% done');
                },function(error){
                    console.log(error);
                },function(){
                    getDownloadURL(uploadTask.snapshot.ref).then(function(downloadURL){
                        console.log('File available at',downloadURL);
                        let contentRecordRef = dbRef(db, 'contentRecords/'+ sectionName + '/' + contentName);
                        update(contentRecordRef, {
                            downloadURL: downloadURL
                        }).catch((error) => {
                            console.log(error);
                        });
                    });
                });
            }
            function uploadText(){
                let textInput=document.getElementById("text-input");
                let contentNameInput=document.getElementById("name-input");
                let contentName=contentNameInput.value;
                let text=textInput.value;
                if (!contentName || !text) {
                    console.log("Content name or text is empty.");
                    return;
                }
                let contentRecordRef = dbRef(db, 'contentRecords/'+ sectionName + '/' + contentName);
                update(contentRecordRef, {
                    text: text
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            let submitButton=document.querySelector("button[type='submit']");
            submitButton.addEventListener("click",function(event){
                event.preventDefault();
                let fileCheckbox=document.getElementById("file-checkbox");
                let textCheckbox=document.getElementById("text-checkbox");
                if(fileCheckbox.checked){
                    uploadFile();
                }
                if(textCheckbox.checked){
                    uploadText();
                }
                alert("Content created successfully!");
            });
    
        });
    });
})
let CreateSectionButton=document.querySelector(".create-section-btn");
CreateSectionButton.addEventListener("click", async function(event){
    event.preventDefault();
    let sectionNameInput=document.getElementById("section-name-input");
    sectionNameInput.style.display = 'block';
    sectionNameInput.addEventListener('keydown', async function(event) {
    if (event.key === 'Enter') {
    event.preventDefault();
    sectionNameInput.style.display = 'none';
    let sectionName=sectionNameInput.value;
    let snapshot = await get(sectionNameRef);
    let match = false;
    if(snapshot.exists()){
        snapshot.forEach((sectionSnapshot) => {
            var sectionNamedb = sectionSnapshot.val().sectionName;
            if(sectionNamedb === sectionName){
                console.log("Input section name matches with a section name in the database");
                match = true;
            }
        })
    }
    if(match){
        return;
    }
    let courseRef=dbRef(db,'sectionNames/' + sectionName);
    set(courseRef, {
        sectionName: sectionName
    }).catch((error) => {
        console.log(error);
    });
    let newSectionElement = document.createElement('div');
    newSectionElement.className = `${sectionName.toLowerCase()}-info`;
    newSectionElement.innerHTML = `<h2 class="section-title">${sectionName}</h2>
    <div class="divider"></div>

    <div class="content-item">
      <div class="content-thumbnail"></div>
      <h3 class="content-title">Content name</h3>
    </div>

    <div class="content-create">
      <div class="content-thumbnail">
        <img src="./img/add_button.png" alt="">
      </div>
      <button type="button" id="create-content-btn">Create Content</button>
    </div>`
    let bodyTable = document.getElementById("body-table");
    let newSection = document.querySelector(".new-section");
    bodyTable.insertBefore(newSectionElement, newSection);
    }})
});




