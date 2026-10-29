const BASE_URL = "http://localhost:1111/students";
const table = document.querySelector("#students-table");
const btn = document.querySelector("#get-students-btn");
const form = document.querySelector("#add-student-form");
const submit = document.querySelector("#submit");
let userId = null;
// Функція для отримання всіх студентів
async function getStudents() {
    try {
        await fetch(BASE_URL).then((d)=>d.json()).then((d)=>renderStudents(d));
    } catch (e) {
        alert(e);
    }
}
// Функція для відображення студентів у таблиці
async function renderStudents(students) {
    try {
        table.querySelector("tbody").innerHTML = await students.map((st)=>`<tr>
      <th>${st.id}</th>
      <th>${st.name}</th>
      <th>${st.age}</th>
      <th>${st.course}</th>
      <th>${st.skills}</th>
      <th>${st.email}</th>
      <th>${st.isEnrolled ? "\u2714" : "\u274C"}</th>
      <th><button data-action="delete" data-id="${st.id}">Delete</button><button data-action="update" data-id="${st.id}">Update</button></th>
    </tr>`).join("");
    } catch (e) {
        alert(e);
    }
}
// Функція для додавання нового студента
async function addStudent() {
    try {
        await fetch(BASE_URL).then((d)=>d.json()).then((d)=>{
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
    } catch (e) {
        alert(e);
    }
}
// Функція для оновлення студента
async function updateStudent(id) {
    try {
        await fetch(BASE_URL).then((d)=>d.json()).then((d)=>{
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
    } catch (e) {
        alert(e);
    }
}
// Функція для видалення студента
async function deleteStudent(id) {
    try {
        await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        await getStudents();
    } catch (e) {
        alert(e);
    }
}
btn.addEventListener("click", getStudents());
table.addEventListener("click", async (e)=>{
    try {
        const btn = await e.target.closest("button");
        switch(btn.dataset.action){
            case "delete":
                await deleteStudent(btn.dataset.id);
                break;
            case "update":
                await updateStudent(btn.dataset.id);
                userId = await btn.dataset.id;
                break;
        }
    } catch (e) {
        alert(e);
    }
});
form.addEventListener("submit", async (e)=>{
    try {
        e.preventDefault();
        if (!userId) addStudent();
        else userId = null;
    } catch (e) {
        alert(e);
    }
});

//# sourceMappingURL=m2hw18.579125c3.js.map
