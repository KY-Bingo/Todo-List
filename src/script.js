
// Tasks

// 1. Make each task connect with the actual time. I forgot how but i know I have done it.
// 2. Make the html afterwards
// 3. Add a this week and overdue property which allows it to look at the date and see whether it is due this week or overdue
// 4. Make a category property for the task cards which allows them to be enabled or disabled depnding on the page set at the current time.

import "./style.css";

let data = [];




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
    this.overDue = true;

    if(dayDiff < 0){
        this.upcoming = false;
        this.overDue = true;
    }
    else if(dayDiff = 0){
        this.dueToday = true
    }
    else if(dayDiff>=1){
        this.dueInWeek = true
    }

    // if (currentDate.getDate())
    // this.isDueNextWeek = 
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

    // due is true and not due is false
    // setup the function to set up teh database/

    const newTask = new Task(name, description, priority, isDue, daysForGoal)
    data.push(newTask);
    
    createTask();
    console.log(data);
}
function createTask(){
    const contentContainer = document.querySelector('.contentContainer');
    contentContainer.innerHTML = '';


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
        taskPriority.textContent = `Priority:${task.priority}`;
        
        const taskStartDate = document.createElement('div');
        taskStartDate.textContent = `Start Date: ${task.date[0]}, ${task.date[1]} ${task.date[2]}, ${task.date[3]}`;

        const taskEndDate = document.createElement('div');
        taskEndDate.textContent = `End Date: ${task.endDate[0]}, ${task.endDate[1]}, ${task.endDate[2]}, ${task.endDate[3]}`

        const taskIsDue = document.createElement('div');
        taskIsDue.textContent = `Status: ${task.isDue}`;

        // creating the task container
        contentContainer.appendChild(taskContainer);

        // Appending within task container
        taskContainer.appendChild(taskName);
        taskContainer.appendChild(taskDesc);
        taskContainer.appendChild(taskStartDate);
        taskContainer.appendChild(taskEndDate)
        taskContainer.appendChild(taskPriority);
        taskContainer.appendChild(taskIsDue);

    })
}
const createTaskBtn = document.querySelector('#submitBtn');

createTaskBtn.addEventListener('click',(e) =>{
    e.preventDefault();
    console.log('hit');
    
    addTaskToDatabase();
})



// .getDay() is for getting weekday
// .getDate() is for getting day of the month
// .getMonth() is for getting the month