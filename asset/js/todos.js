let form = document.getElementById("form");
let nama = document.getElementById("nama");
let date = document.getElementById("date");
let deskripsi = document.getElementById("deskripsi");
let pesan = document.getElementById("pesan");
let daftarTodos = document.getElementById("daftarTodos");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

function formValidation() {
  if (nama.value === "") {
    console.log("failure");
    pesan.innerHTML = "Tidak Boleh Kosong";
  } else {
    console.log("success");
    pesan.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
}

let data = [{}];

function acceptData() {
  data.push({
    title: nama.value,
    date: date.value,
    description: deskripsi.value,
  });
  for (let i = 0; i <= data.length; i++) {
    localStorage.setItem("data", JSON.stringify(data));
  }

  console.log(data);
  tambahTodos();
}

function tambahTodos() {
  daftarTodos.innerHTML = "";
  data.map((x, y) => {
    return (daftarTodos.innerHTML += `
        <div id=${y} class="mb-4 border rounded p-3">
            <div class="list-group-item list-group-item-action d-flex w-100 justify-content-between">
              <h5 class="mb-1">${x.title}</h5>
              <small class="text-muted">${x.date}</small>
            </div>
            <small class="text-muted">${x.description}</small> </br>
            
            <div class="mt-3">
              <span class="options">
              <i onClick= "editTodos(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i onClick ="hapusTodos(this);tambahTodos()" class="fas fa-trash-alt"></i>
              </span>
            </div>

        </div>
        `);
  });
  resetForm();
}

function hapusTodos(e) {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
}

function editTodos(e) {
  let selectedTask = e.parentElement.parentElement;

  nama.value = selectedTask.children[0].innerHTML;
  date.value = selectedTask.children[1].innerHTML;
  deskripsi.value = selectedTask.children[2].innerHTML;

  hapusTodos(e);
}

function resetForm() {
  nama.value = "";
  date.value = "";
  deskripsi.value = "";
}

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  tambahTodos();
})();
