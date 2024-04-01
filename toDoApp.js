const submitForm = document.getElementById('newTaskForm');
const allTasks = document.getElementById('currentTasks');
const input = document.getElementById('newTask');
const addTaskBtn = document.getElementById('addBtn');
const tasksInLocalStorage = getData();


//This event submits new tasks into currentTasks list
submitForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    newTaskFunc(input.value);
    input.value = '';

    
});

//This event checks a todo as done or delete it in case an user clicks on check mark button

allTasks.addEventListener('click', (e)=>{

    e.preventDefault();
    taskInteraction(e);
    
    

});


// This function creates new li, buttons and display itens on page.



function newTaskFunc(userInput){
    
    const taskObj = {taskText: userInput , isDone: false};
    tasksInLocalStorage.push(taskObj);
    storeData(tasksInLocalStorage);
    newTaskElement(taskObj, tasksInLocalStorage.length - 1);
    
    return false;

};

function newTaskElement(task, index){
    
    const newTaskEl = document.createElement('LI');
    newTaskEl.dataset.indexNumber = index;
    newTaskEl.innerHTML = task.taskText;

    if(task.isDone === true){
        newTaskEl.classList.add('completedTask');
    };
    

    const doneBtn = document.createElement('BUTTON');
    doneBtn.dataset.indexNumber = index;
    doneBtn.innerHTML = '&#10003';
    doneBtn.classList.add('doneBtn');
    newTaskEl.appendChild(doneBtn);
    allTasks.appendChild(newTaskEl);

}

(function(){
    refreshTaskList();
    // tasksInLocalStorage.forEach(newTaskElement);
    // for (task of getData()) {
    //     newTaskElement(task);
    // }
})();

// function to interact data with localStorage

//store taskList

function storeData(array){
    const storedTasks = JSON.stringify(array);
    localStorage.setItem('UserTasks', storedTasks);
    
};
// getData() is the array of tasks in localStorage
function getData(){
    const getStoredTasks = localStorage.getItem('UserTasks')
    return getStoredTasks ? JSON.parse(getStoredTasks) : [];
};

function removeTask(array,index){

    array.splice(index, 1);
    storeData(array);    

};


function refreshTaskList(){
    allTasks.innerHTML = '';
    tasksInLocalStorage.forEach(newTaskElement);
};


//taskInteraction this function should mark a task as complete and delete a task 


function taskInteraction(event){
    if(event.target.tagName === 'LI'){
        const taskId = Number(event.target.dataset.indexNumber);

        if (tasksInLocalStorage[taskId].isDone === false) {
            tasksInLocalStorage[taskId].isDone = true;
            
        } else {
            tasksInLocalStorage[taskId].isDone = false;
        }
        storeData(tasksInLocalStorage);
        refreshTaskList();
        
        
    };

    if(event.target.tagName === 'BUTTON'){
        event.target.parentElement.remove();
        removeTask(tasksInLocalStorage, Number(event.target.dataset.indexNumber));
        refreshTaskList();        

    };


    
    return false;
    
};