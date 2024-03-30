const submitForm = document.getElementById('newTaskForm');
const allTasks = document.getElementById('currentTasks');
const input = document.getElementById('newTask');
const addTaskBtn = document.getElementById('addBtn');



//This event submits new tasks into currentTasks list
submitForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    newTaskFunc(input.value);
    input.value = '';

    
});

//This event checks a todo as done or delete it in case an user clicks on check mark button

allTasks.addEventListener('click', (e)=>{

    e.preventDefault()
    taskInteraction(e)
    

});


// This function creates new li, buttons and display itens on page.

function newTaskFunc(userInput){
    
    const taskList = [];
    const newTask = document.createElement('LI');
    newTask.innerHTML = userInput;
    
    const doneBtn = document.createElement('BUTTON');
    doneBtn.innerHTML = '&#10003';
    doneBtn.classList.add('doneBtn');

    newTask.appendChild(doneBtn);
    taskList.push(newTask);

    for(task of taskList){
        allTasks.appendChild(task)
    }
  
    //i can add localStorage inside this function...

};

//taskInteraction this function should mark a task as complete and delete a task 

function taskInteraction(event){
    if(event.target.tagName === 'LI'){

        event.target.classList.toggle('completedTask');
    };
    if(event.target.tagName === 'BUTTON'){
        event.target.parentElement.remove();
    };

    
};