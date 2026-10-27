const BASE_URL = "http://localhost:1111/students";
const table = document.querySelector("#students-table");
const btn = document.querySelector("#get-students-btn");
const form = document.querySelector("#add-student-form");
const submit = document.querySelector("#submit");
let userId = null;
// Функція для отримання всіх студентів
function getStudents() {
    fetch(BASE_URL).then((d)=>d.json()).then((d)=>renderStudents(d));
}
// Функція для відображення студентів у таблиці
function renderStudents(students) {
    table.querySelector("tbody").innerHTML = students.map((st)=>`<tr>
      <th>${st.id}</th>
      <th>${st.name}</th>
      <th>${st.age}</th>
      <th>${st.course}</th>
      <th>${st.skills}</th>
      <th>${st.email}</th>
      <th>${st.isEnrolled ? "\u2714" : "\u274C"}</th>
      <th><button data-action="delete" data-id="${st.id}">Delete</button><button data-action="update" data-id="${st.id}">Update</button></th>
    </tr>`).join("");
}
// Функція для додавання нового студента
function addStudent() {
    fetch(BASE_URL).then((d)=>d.json()).then((d)=>{
        const Nextid = Number(d[d.length - 1].id) + 1;
        return fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: document.getElementById("name").value,
                age: document.getElementById("age").value,
                course: document.getElementById("course").value,
                email: document.getElementById("email").value,
                skills: document.getElementById("skills").value,
                isEnrolled: document.getElementById("isEnrolled").checked,
                id: String(Nextid)
            })
        }).then(()=>{
            getStudents();
            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("course").value = "";
            document.getElementById("email").value = "";
            document.getElementById("skills").value = "";
            document.getElementById("isEnrolled").checked = "";
        });
    });
}
// Функція для оновлення студента
function updateStudent(id) {
    fetch(BASE_URL).then((d)=>d.json()).then((d)=>{
        document.getElementById("name").value = d[Number(id) - 1].name;
        document.getElementById("age").value = d[Number(id) - 1].age;
        document.getElementById("course").value = d[Number(id) - 1].course;
        document.getElementById("email").value = d[Number(id) - 1].email;
        document.getElementById("skills").value = d[Number(id) - 1].skills;
        document.getElementById("isEnrolled").checked = d[Number(id) - 1].isEnrolled;
        submit.textContent = "\u041E\u043D\u043E\u0432\u0438\u0442\u0438 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430";
        form.addEventListener("submit", (e)=>{
            submit.textContent = "\u0414\u043E\u0434\u0430\u0442\u0438 \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430";
            e.preventDefault();
            return fetch(`${BASE_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: document.getElementById("name").value,
                    age: document.getElementById("age").value,
                    course: document.getElementById("course").value,
                    email: document.getElementById("email").value,
                    skills: document.getElementById("skills").value,
                    isEnrolled: document.getElementById("isEnrolled").checked
                })
            }).then(()=>{
                getStudents();
                document.getElementById("name").value = "";
                document.getElementById("age").value = "";
                document.getElementById("course").value = "";
                document.getElementById("email").value = "";
                document.getElementById("skills").value = "";
                document.getElementById("isEnrolled").checked = "";
            });
        });
    });
}
// Функція для видалення студента
function deleteStudent(id) {
    fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    getStudents();
}
btn.addEventListener("click", getStudents());
table.addEventListener("click", (e)=>{
    const btn = e.target.closest("button");
    switch(btn.dataset.action){
        case "delete":
            deleteStudent(btn.dataset.id);
            break;
        case "update":
            updateStudent(btn.dataset.id);
            userId = btn.dataset.id;
            break;
    }
});
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if (!userId) addStudent();
    else userId = null;
});

//# sourceMappingURL=m2hw18.579125c3.js.map
