let addTask = document.getElementById('addTask')
let task_list = document.getElementById("task_list")
let form = document.getElementById('form')
let madal = document.getElementById('madal')
let close = document.getElementById("close")
let arr = []

let obj = {}

let taskArray = JSON.parse(localStorage.getItem("task")) || [
  { status: "Open", task: [] },
  { status: "Pending", task: [] },
  { status: "Inproge", task: [] },
  { status: "Complete", task: [] }
]

window.addEventListener("DOMContentLoaded", () => {
  displayTask()
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    formSubmit()
    displayTask()
    toggleMadal("none")
  })
  window.addEventListener("click", (e) => {
    if (e.target === madal) {
      toggleMadal("none")
    }
  })

})

function displayTask() {
  task_list.innerHTML = ""
  taskArray.forEach((item, i) => {
    let tasks = item.task.map((task, g) => {
      return `<div class="bg-gray-200 py-1 px-2 txt-xl flex items-center justify-between">
        <h1 class="text-xl">${g + 1}. ${task}</h1>
        <div>
          <button onclick="edited(${i}, ${g})" class="bg-orange-500 text-white py-1 px-3">Edite</button>
          <button onclick="deleted(${i},${g})" class="bg-red-500 py-1 text-white px-3">Delete</button>
        </div>
      </div>`
    })
    task_list.innerHTML += `
    <div class="w-1/4 border h-fit p-4">
      <div>
        <h1 class="text-3xl pb-2 text-center">${item.status}</h1>
      </div>
      <div class=" pt-3 flex flex-col gap-2">
        ${tasks.join("")}
      </div>
      <div class="pt-3 flex justify-center">
        <button onclick="add_btn(${i})" id="addTask" class="bg-green-600 text-xl px-6 text-white py-1">Add task</button>
      </div>
    </div>
    `
  })
}

function add_btn(i) {
  toggleMadal("flex")
  let option = document.querySelectorAll("option")
  form.status.value = option[i].value
}
close.addEventListener('click', () => {
  toggleMadal("none")
})
function toggleMadal(status) {
  madal.style.display = `${status}`
}
function hendleChange(event) {
  let { name, value } = event.target
  obj = { ...obj, [name]: value }
}

function formSubmit() {
  if (!arr.length && form.task_name.value.trim()) {
    taskArray.forEach(item => {
      if (item.status.toLowerCase() === form.status.value) {
        item.task.push(form.task_name.value)
      }
    })
  } else if (form.task_name.value.trim() && arr.length) {
    if (form.status.value === taskArray[arr[0]].status.toLowerCase()) {
      taskArray[arr[0]].task[arr[1]] = form.task_name.value
    } else {
      taskArray.forEach(item => {
        if (item.status.toLowerCase() === form.status.value) {
          item.task.push(form.task_name.value)
        }
      })
      taskArray[arr[0]].task.splice(arr[1], 1)
    }
    // if (item.status.toLowerCase() === form.status.value) {
    // }
  }
  setStorage()
  displayTask()
  form.reset()
}

function setStorage() {
  localStorage.setItem("task", JSON.stringify(taskArray))
}

function deleted(i, g) {
  taskArray[i].task.splice(g, 1)
  displayTask()
  setStorage()
}

function edited(i, g) {
  toggleMadal("flex")
  form.task_name.value = taskArray[i].task[g]
  form.status.value = taskArray[i].status.toLowerCase()
  setStorage()
  arr = [i, g]
}