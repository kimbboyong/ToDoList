// 유저가 값을 입력한다
// + 버튼을 클릭해면 할일이 추가된다
// 유저가 델리트 버튼을 누르면 할일이 삭제된다
// 유저가 체크버튼을 누르면 할일이 끝나면서 밑줄이 그어진다 (백그라운드도 변환)
// 1. 체크 버튼을 클릭하는 순간 true false
// true 이면 끝난걸로 간주하고 밑줄
// 3. false이면 안끝난걸로 간주하고 그대로

// 진행중 끝남 탭을 누르면 언더바가 이동한다
// 끝남탭은 끝난 아이템만, 진행중탭은 진행중인 아이템만 나오게 한다
// 전체탭을 누르면 다시 전체아이템으로 돌아온다


const addInput = document.getElementById('add_input');
const addBtn = document.getElementById('add_btn');
const tabs = document.querySelectorAll('.tap li span');
let underLine = document.getElementById('under_line');
let mode = 'all';
let taskList = [];
let filterList = [];

addBtn.addEventListener('click', addTask);
tabs.forEach(menu => menu.addEventListener('click', (e) => foucsUnderline(e)))

addInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        addTask(event);
    }
});

for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function (event) { filter(event) })
}

function addTask() {
    let task = {
        id: randomIdGenerate(),
        taskContent: addInput.value,
        isComplete: false
    }

    if (addInput.value == '') {
        alert('할 일을 넣어주세요');
        return;
    }

    taskList.push(task);
    render();

}

function render() {
    let list = [];
    if (mode == 'all') {
        list = taskList;
    } else if (mode == 'ongoing' || mode == 'done') {
        list = filterList;
    }
    let reultHtml = '';

    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            reultHtml += `
           <li class="task item_done ">
                <div class="item ">
                    <p>${list[i].taskContent}</p>
                </div>
                <div class="button">
                    <button onclick="toggleComplate('${list[i].id}')"><img src="./images/re.png" alt=""></button>
                    <button onclick="deleteTask('${list[i].id}')"><img src="./images/del.png" alt=""></button>
                </div>
            </li>`
        } else {
            reultHtml += `
           <li class="task">
                <div class="item">
                    <p>${list[i].taskContent}</p>
                </div>
                <div class="button">
                    <button onclick="toggleComplate('${list[i].id}')"><img src="./images/chk.png" alt=""></button>
                    <button onclick="deleteTask('${list[i].id}')"><img src="./images/del.png" alt=""></button>
                </div>
            </li>`
        }


    }

    document.getElementById('task_wrap').innerHTML = reultHtml;
}


function toggleComplate(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1)
            break;
        }
    }
    render();
}

function filter(event) {
    mode = event.target.id;
    filterList = [];

    if (mode == 'all') {
        render();
    }
    else if (mode == 'ongoing') {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == false) {
                filterList.push(taskList[i])
            }
        }

        render();
    } else if (mode == 'done') {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == true) {
                filterList.push(taskList[i])
            }
        }
        render();
    }
}

function foucsUnderline(e) {
    underLine.style.left = e.currentTarget.offsetLeft + 'px';
    underLine.style.width = e.currentTarget.offsetWidth + 'px';
    underLine.style.top =
        e.currentTarget.offsetTop + e.currentTarget.offsetHeight + 'px';
}


function randomIdGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}


