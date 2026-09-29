
// Tasks

// 1. Make each task connect with the actual time. I forgot how but i know I have done it.
// 2. Make the html afterwards
// 3. Add a this week and overdue property which allows it to look at the date and see whether it is due this week or overdue
// 4. Make a category property for the task cards which allows them to be enabled or disabled depnding on the page set at the current time.

import "./style.css";

let data = [];
let editingTaskId = null;




function addDays(date, additionalDays){
    const result = new Date(date);
    result.setDate(result.getDate() + additionalDays);

    return result;
}


function Task(name, desc, priority, isDue, daysLeft){
    // Date and Time code

    let currentDate = new Date();

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const getWeekday = weekdays[currentDate.getDay()];
    const getDay = currentDate.getDate();
    const getMonth = months[currentDate.getMonth()];
    const getYear = currentDate.getFullYear();

    console.log(getWeekday, getMonth, getDay, getYear);

    let dueDate = addDays(currentDate, Number(daysLeft));
    console.log(dueDate)

    const dueWeekday = weekdays[dueDate.getDay()];
    const dueDay = dueDate.getDate();
    const dueMonth = months[dueDate.getMonth()];
    const dueYear = dueDate.getFullYear();

    // For 1000 divides by milliseconds
    // 60 for seconds to minutes
    // 60 for minutes to hours
    // 24 for hours to days
    let dayDiff = (dueDate - currentDate) / (1000*60*60*24)
    
    console.log();

    this.name = name;
    this.desc = desc;
    this.priority = priority;
    this.isDue = isDue;
    this.daysLeft = daysLeft;
    this.date = [getWeekday, getMonth, getDay, getYear];
    this.endDate = [dueWeekday, dueMonth, dueDay, dueYear];
    this.dueToday = false
    this.upcoming = true;
    this.overDue = false;
    this.dueInWeek = false;
    this.id = crypto.randomUUID();

    if(dayDiff < 0){
        this.upcoming = false;
        this.overDue = true;
    }
    else if(dayDiff === 0){
        this.dueToday = true
    }
    else if(dayDiff>=1){
        this.dueInWeek = true
    }
}

const eat = new Task("gary", "Hi I am gary", "high", "something", true);
console.log(eat);

function getPriorityValue(){
    const selectedRadio = document.querySelector('input[name = "priority"]:checked')

    return selectedRadio ? selectedRadio.value : "low";
}

function addTaskToDatabase(){
    const name = document.getElementById('nameBox').value;
    const description = document.getElementById('descBox').value;
    const priority = getPriorityValue();
    // The idea for prioity is that we want the form to have three options being low medium and high. Similar to the radio with true and false
    // Make the javascipt tend to teh 3 options.
    const daysForGoal = document.getElementById('daysBox').value;

    const isDue = document.querySelector('#due').checked; 

    const taskValues = [name, description, priority, isDue, daysForGoal];
    // acts as a placeholder so that it can use the parameters of the constructor task values

    if(editingTaskId){
        const taskIndex = data.findIndex(task => task.id === editingTaskId)
        // we set editing task id to the one we click edit for afterwards.
        const originalTask = data[taskIndex];
        const updatedTask = new Task(...taskValues);
        updatedTask.id = originalTask.id;
        updatedTask.date = originalTask.date;
        data[taskIndex] = updatedTask;
    }else{
        data.push(new Task(...taskValues));
    }
    resetTaskForm();
    hideTaskForm();
    createTask();
    console.log(data);
}

function resetTaskForm(){
    editingTaskId = null;
    document.querySelector('.taskForm').reset();
    document.querySelector('#formTitle').textContent = 'Add a new Task!';
    document.querySelector('#submitBtn').textContent = 'Submit';
}

function showTaskForm(){
    const taskForm = document.querySelector('.taskForm');
    taskForm.classList.remove('disabled');
    taskForm.classList.add('enabled');
}

function hideTaskForm(){
    const taskForm = document.querySelector('.taskForm');
    taskForm.classList.remove('enabled');
    taskForm.classList.add('disabled');
}

function editTask(task){
    editingTaskId = task.id;
    document.querySelector('#nameBox').value = task.name;
    document.querySelector('#descBox').value = task.desc;
    document.querySelector('#daysBox').value = task.daysLeft;
    document.querySelector(`input[name="priority"][value="${task.priority}"]`).checked = true;
    document.querySelector('#due').checked = task.isDue;
    document.querySelector('#notDue').checked = !task.isDue;
    document.querySelector('#formTitle').textContent = 'Edit Task';
    document.querySelector('#submitBtn').textContent = 'Save Changes';
    showTaskForm();
}

function removeTask(id){
    data = data.filter(task => task.id !== id);
}

function createTask(){
    const contentContainer = document.querySelector('.contentContainer');
    contentContainer.innerHTML = '';
    console.log(data);

    data.forEach((task, index) => {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('taskContainer');
        
        const taskName = document.createElement('h2');

        // Checks if it has any title, if not, write blank goal.
        if(task.name == ""){
            taskName.textContent = "Blank Goal";
        }else{
            taskName.textContent = task.name;
        }

        const taskDesc = document.createElement('div');
        taskDesc.textContent = task.desc;

        const taskPriority = document.createElement('div');
        taskPriority.textContent = `Priority: ${task.priority}`;
        
        const taskStartDate = document.createElement('div');
        taskStartDate.textContent = `Start Date: ${task.date[0]}, ${task.date[1]} ${task.date[2]}, ${task.date[3]}`;

        const taskEndDate = document.createElement('div');
        taskEndDate.textContent = `End Date: ${task.endDate[0]}, ${task.endDate[1]}, ${task.endDate[2]}, ${task.endDate[3]}`

        const taskIsDue = document.createElement('div');
        taskIsDue.textContent = `Status: ${task.isDue}`;

        const buttonDiv = document.createElement('div');
        const deleteBtn = document.createElement('button');
        deleteBtn.style.width = '100px';
        deleteBtn.style.height = '20px';
        deleteBtn.textContent = 'Delete'
        const editBtn = document.createElement('button');
        editBtn.style.width = '100px';
        editBtn.style.height = '20px';
        editBtn.textContent = 'Edit';

        if(task.priority == "low"){
            taskPriority.style.color = 'green';
        }else if(task.priority == "medium"){
            taskPriority.style.color = 'yellow';
        }else if(task.priority == "high"){
            taskPriority.style.color = 'red';
        }

        
        // creating the task container
        contentContainer.appendChild(taskContainer);
        taskContainer.append(taskName, taskDesc, taskStartDate, taskEndDate, taskPriority, taskIsDue)

        taskContainer.appendChild(buttonDiv);
        buttonDiv.append(deleteBtn, editBtn);

        deleteBtn.addEventListener('click', () =>{
            removeTask(task.id);
            createTask();
        })
        editBtn.addEventListener('click', () =>{
            editTask(task);
        })

    })
}
const createTaskBtn = document.querySelector('#submitBtn');

createTaskBtn.addEventListener('click',(e) =>{
    e.preventDefault();
    console.log('hit');
    
    addTaskToDatabase();
})

document.querySelector('#openForm').addEventListener('click', () =>{
    resetTaskForm();
    showTaskForm();
});

document.querySelector('#closeForm').addEventListener('click', () =>{
    resetTaskForm();
    hideTaskForm();
});



// .getDay() is for getting weekday
// .getDate() is for getting day of the month
// .getMonth() is for getting the month