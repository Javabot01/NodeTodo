// jshint esversion:10

// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// dateElement.nextElementSibling

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
// let LIST, id;

// // get item from localstorage
// let data = localStorage.getItem("TODO");

// // check if data is not empty
// if (data) {
//     LIST = JSON.parse(data);
//     id = LIST.length; // set the id to the last one in the list
//     loadList(LIST); // load the list to the user interface
// } else {
//     // if data isn't empty
//     LIST = [];
//     id = 0;
// }

const http = axios.create({
    baseURL: BASE_URL
});

async function fetchTodos() {
    try {
        const response = await http.get('/todo/all');

        return response.data.map((todo, index) => {
            return {
                id: index,
                docId: todo._id,
                name: todo.name,
                trash: todo.trash,
                done: todo.done
            };
        });
    } catch (error) {
        console.log(error);
    }
}

fetchTodos().then((items) => {
    if (items.length) {
        loadList(items);
    }
});

// load items to the user's interface
function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.docId, item.done, item.trash);
    });
}

// clear the local storage
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// Show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function

function addToDo(todo, docId, done, trash) {

    if (trash) { return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item" id='${docId}'>
                    <i class="fa co ${DONE}" id=${docId}  job="complete" id="${docId}"></i>
                    <p class="text ${LINE}" id="todo${docId}">${todo}</p>
                <i class="fa fa-trash-o de" job="delete" id="${docId}"></i>
                </li >
    `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

// add an item to the list user the enter key
document.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        const toDo = input.value;

        // if the input isn't empty
        if (toDo) {
            http.post('/todo/create', {
                name: toDo,
            }).then((response) => {
                if (response.status === 200) {
                    addToDo(toDo, response.data._id, false, false);
                }
                else {
                    console.log(response);
                }
            }).catch(error => {
                console.log(error);
            });
        }
        input.value = "";
    }
});


// complete to do
function completeToDo(element) {

    const id = element.attributes.id.value;
    console.log(id);
    const name = element.parentNode.querySelector(".text").innerText;
    const done = element.classList.value == "fa co fa-check-circle" ? false : true;
    console.log(done);
    console.log(name);


    http.patch(`/todo/update/${id}`, {
        name,
        done
    }).then((res) => {
        element.classList.toggle(CHECK);
        element.classList.toggle(UNCHECK);
        element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH)
    });
}

// remove to do
function removeToDo(element) {

    const id = element.attributes.id.value;
    console.log(id);

    http.delete(`/todo/delete/${id}`).then((response) => {
        element.parentNode.parentNode.removeChild(element.parentNode);
    });
}

// target the items created dynamically

list.addEventListener("click", function (event) {
    const element = event.target; // return the clicked element inside list
    // const element1 = event.target(nextElementSibling); // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }

    // add item to localstorage ( this code must be added where the LIST array is updated)
    // localStorage.setItem("TODO", JSON.stringify(LIST));
});


















