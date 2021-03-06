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
                    <p class="text ${LINE}" id="${docId}">${todo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${docId}"></i>
                    <i class="fa fa-edit de" style="float: right; margin-right: 2rem;" job ="edit" id="${docId}"></i>
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
                iziToast.success({
                    title: 'OK',
                    message: 'Successfully inserted record!',
                    position: 'center',
                    timeout: 5000,
                });
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
        element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
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

const editTodo = (element) => {
    const id = element.attributes.id.value;
    console.log(id);
    const name = element.parentNode.querySelector(".text").innerText;

    iziToast.info({
        timeout: 200000,
        overlay: true,
        displayMode: 'once',
        id: 'inputs',
        zindex: 999,
        title: 'Edit Todo',
        // message: 'Check',
        position: 'center',
        close: true,
        drag: false,
        inputs: [
            [`<input type="text" value=${name}>`, 'change', function text(instance, toast, input, e) {
                let newName = input.value;

                http.patch(`/todo/update/${id}`, {
                    name: newName,
                    done: false
                }).then((doc) => {
                    console.log(doc);
                    element.parentNode.querySelector(".text").innerText = newName;
                });
                instance.hide({ transitionOut: 'fadeOut' }, toast, 'input');
            }, true]
        ],
        onClosed: function (instance, toast, closedBy) {
            console.info('Closing | closedBy: ' + closedBy);
        }
    });
};

// target the items created dynamically

list.addEventListener("click", function (event) {
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        iziToast.question({
            timeout: 20000,
            close: false,
            overlay: true,
            displayMode: 'once',
            id: 'question',
            zindex: 999,
            title: 'Hey',
            message: 'Are you sure about that?',
            position: 'center',
            buttons: [
                ['<button><b>YES</b></button>', function (instance, toast) {

                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

                    removeToDo(element);

                }, true],
                ['<button>NO</button>', function (instance, toast) {

                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

                }],
            ],
            onClosing: function (instance, toast, closedBy) {
                console.info('Closing | closedBy: ' + closedBy);
            },
            onClosed: function (instance, toast, closedBy) {
                console.info('Closed | closedBy: ' + closedBy);
            }
        });
    }

    else if (elementJob == "edit") {
        editTodo(element);
    }
});


















