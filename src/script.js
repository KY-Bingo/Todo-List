
// Tasks

// 1. Make each task connect with the actual time. I forgot how but i know I have done it.
// 2. Make the html afterwards
// 3. Add a this week and overdue property which allows it to look at the date and see whether it is due this week or overdue
// 4. Make a category property for the task cards which allows them to be enabled or disabled depnding on the page set at the current time.

import "./style.css";

let data = [];
const contentContainer = document.querySelector('.contentContainer');



function Task(name, desc, priority, date, isDue){
    this.name = name;
    this.desc = desc;
    this.priority = priority;
    this.date = date;
    this.isDue = isDue;
    this.id = crypto.randomUUID();
}

const eat = new Task("gary", "Hi I am gary", "high", "something", true);
console.log(eat);

function addTaskToDatabase(){
    const name = document.getElementById('nameBox').value;
    const description = document.getElementById('descBox').value;
    const priority = document.getElementById('priorityBox').value;
    // The idea for prioity is that we want the form to have three options being low medium and high. Similar to the radio with true and false
    // Make the javascipt tend to teh 3 options.
    const date = document.getElementsByID('dateBox').value 
    const isDue = document.querySelector('#true').checked; 
    // setup the function to set up teh database/

}
function addTask(){
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('taskContainer');
    taskContainer.style.backgroundColor = 'red';

    contentContainer.appendChild(taskContainer);
}
const createTaskBtn = document.querySelector('#submitBtn');

createTaskBtn.addEventListener('click',(e) =>{
    e.preventDefault();
    console.log('hit');
    addTask();
})