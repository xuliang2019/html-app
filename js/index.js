'use strict';


// This variable represents the current state of the program---the data model
// that should be displayed.
// It starts with two sample tasks.
let state = {
    taskList: [
        {
            id: 1,
            description: 'Complete problemA',
            complete: true
        },
        {
            id: 2,
            description: 'Fill in the `js/index.js` file and complete the exercise',
            complete: false
        }
    ],
    inputtedText: ''
}

/* Your code goes here! */

// Define a function `renderTaskList()` that will fill in the provided <ol> with
// list items (<li>) representing each task in the `state.taskList`.
// Each list item should have content that is the `description` of the task, and
// be given the `font-strike` class to cross it out if the task is completed.
// Make sure your function first removes (empties) any previous <li>s so that
// only the current task list is shown after this render call!
function renderTaskList() {
  let lis = document.querySelector('ol');
  lis.innerHTML = "";
  let ol = document.querySelector('ol');
  for (let j = 0; j < state['taskList'].length; j++) {
    let temp = document.createElement('li');
    temp.textContent = state['taskList'][j]['description'];
    if (state['taskList'][j]['complete'] == true) {
      temp.classList.add('font-strike');
      // temp.classList.add('list-group-item');
      temp.classList.add('list-group-item-success');
    }
    else {
      // temp.classList.add('list-group-item');
      temp.classList.add('list-group-item-danger');
    }
    temp.addEventListener('click', function() {
                                                if (state['taskList'][j]['complete'] == true) {
                                                    state['taskList'][j]['complete'] = false;
                                                }
                                                else {state['taskList'][j]['complete'] = true;}
                                                renderTaskList();
                                              })
    ol.append(temp);
  }
  renderInput();
}

// Call your `renderTaskList()` function to render the initial list of tasks.
renderTaskList();


// Define a function `addNewTask()` that will add a new task to the `taskList`
// stored in the state. This new task should
// - have an `id` that is 1 greater than the id of the previous task
// - have a `description` that is the value of the state's `inputtedText`
// - not be `complete`
// Note: we'll later modify the `state` (using the input box) in a function below
// After adding the task to the `state.taskList`, the method (re)set `state.inputtedText` to
// an empty string.
// Finally, the function should call the `renderTaskList()` function to show the updated list.
// IMPORTANT: this method should _only_ modify the state and call the render
// function; it should not interact directly with the DOM!
function addNewTask() {
  let index = state['taskList'].length;
  state['taskList'][index] = {};
  state['taskList'][index].id = state['taskList'][index-1]['id'] + 1;
  state['taskList'][index].description = state['inputtedText'];
  state['taskList'][index].complete = false;
  renderTaskList();
  let clear = document.getElementById('task-input');
  clear.value = '';
}

// Add an event listener to the "add task" button so that when the button is
// clicked, a new task is added to the list (using your `addNewTask()` function).
//
// Note that initially, this will cause "empty" (text-less) tasks to be added!
document.getElementById('add-task').addEventListener("click", addNewTask);

// To handle user input, add another event listener to the `<input>` element that
// listens for `'input'`events (from when the user types something into the box).
// This listener should use an ANONYMOUS callback to update the state's
// `inputtedText` property to have the `value` of the `<input>` element.
// (i.e., set `state.inputtedText` to the value typed into the `input` element)
// You should now be able to add new items to your task list!
document.getElementById('task-input').addEventListener("input",
function() {let temp = document.querySelector('input');
                state['inputtedText'] = temp.value;
                renderInput();
            })



// Let's fix some of the user experience. Define a new function `renderInput()`
// that does two things:
//  1. It should set the <input>'s value to be the `state.inputtedText` (so the
//     web page matches the state on render).
//  2. It should "disable" the <button> if the `state.inputtedText` is empty. You
//     can disable a button but setting it's `disabled` property to true.
// Add calls to your `renderInput()` function to BOTH the end of `renderTaskList()`
// and to the end of your `'input'` event callback (so the input renders on each
// user interaction).
function renderInput() {
  let btn = document.getElementById('add-task');
  let text = document.getElementById('task-input');
  state['inputtedText'] = text.value;
  if (state['inputtedText'] == '') {
    btn.disabled = true;
  }
  else {
    btn.disabled = false;
  }
}



// Finally, modify the `renderTaskList()` function above so that each list item that
// is registered with a `'click'` event listener. This listener should have an
// anonymous callback function that "toggles" the task's `completed` property in the *state*
// (swaps it from true to false and vice-versa), and then calls `renderTaskList()`
// again. This should allow you to cross items off your task list!
//
// Fun fact: this anonymous callback will utilize a **closure**, as the function
// will be able to access the task variable even after it is called on a click!





// OPTIONAL EXTRA PRACTICE:
// Add a `'click'` event listener to the `#check-done` button so that when the
// button is clicked, the page shows the `.alert` if there is still work to do:
//  - if the task list has an incomplete tasks, the `.alert` element should also
//    be given the `alert-danger` class and content of "You're not done yet!"
//  - if the task list has all compleyted tasks, the `.alert` element should also
//    be given the `alert-success` class and content of "You're all done!"
// EVEN MORE BONUS: can you hide the alert again after a few sections?
let check = document.getElementById('check-done');
check.addEventListener('click', function() {  let alert = document.getElementById('alert-done');
                                              alert.classList.remove('alert');
                                              alert.classList.remove('d-none');
                                              for (let i = 0; i < state['taskList'].length; i ++) {
                                                if (state['taskList'][i]['complete'] == false) {
                                                    alert.classList.add('alert-danger');
                                                    alert.textContent = "You're not done yet!";
                                                    return alert;
                                                }
                                              }
                                              alert.classList.remove('alert-danger');
                                              alert.classList.add('alert-success');
                                              alert.textContent = "You're all done!";
                                              return alert;
                                            });
// set time out
// $("alert-done").fadeTo(2000, 500).slideUp(500, function(){
//     $("alert-done").slideUp(500);
// });
