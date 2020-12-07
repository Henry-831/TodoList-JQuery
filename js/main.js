var $taskInput = $("#new-task");
var $addButton = $("#add-button");
var $incompleteTasksHolder = $("#incomplete-tasks");
var $completedTasksHolder = $("#completed-tasks");

// Skapar list item
var createNewTaskElement = function (taskToAdd) {

  var $listItem = $("<li></li>");
  var $checkbox = $("<input type='checkbox' class='checkbox'>");
  var $label = $("<label></label>");
  var $editInput = $("<input type='text' class='edit-text'>");
  var $editButton = $("<button class='edit-button'>Edit</button>");
  var $deleteButton = $("<button class='delete-button'>Delete</button>");

  $listItem.append($checkbox)
    .append($label.html(taskToAdd))
    .append($editInput)
    .append($editButton)
    .append($deleteButton);

  return $listItem;
}

// Skapar ny task list med text från new-task
$addButton.on("click", function () {
  var listItemToAdd = createNewTaskElement($taskInput.val());

  // Appendar listItem till incompleteTaskHolder
  $incompleteTasksHolder.append(listItemToAdd);
  $taskInput.val("");
})


// editTask function
var editTask = function (list, input, label) {
  // if loop om list har class editMode 
  if (list.hasClass("editMode")) {
    // Byter från edit
    list.removeClass("editMode");
    // Label text blir input valuen 
    label.text(input.val());
  } else {
    // else byter till Editmode
    list.addClass("editMode");
    // input blir labelns text
    input.val(label.text());
  }
}

// När man trycker på delete, tar bort tasks från incomplete list
$incompleteTasksHolder.on("click", ".delete-button", function () {
  $(this).parent().remove();
})

// När man trycker på delete, tar bort tasks från completed list
$completedTasksHolder.on("click", ".delete-button", function () {
  $(this).parent().remove();
})

// När man trycker på edit-button i incompleteTasksHolder
$incompleteTasksHolder.on("click", ".edit-button", function () {
  // listan av clicked task the list of the clicked on task
  var $list = $(this).parent();
  // input av clicked task the input of the clicked on task
  var $input = $(this).prev();
  // labeln av clicked task the label of the clicked on task
  var $label = $input.prev();
  // list input labeln passed till editTask function
  editTask($list, $input, $label);
})

// När man trycker på edit-button i completeTasksHolder
$completedTasksHolder.on("click", ".edit-button", function () {
  var $list = $(this).parent();
  var $input = $(this).prev();
  var $label = $input.prev();
  editTask($list, $input, $label);
})

// När man trycker på checkbox i incompleteTasksHolder
$incompleteTasksHolder.on("click", "input.checkbox", function () {
  // listItem av checkboxen
  var listItem = $(this).parent();
  // Appendar listItem till completedTasksHolder
  $completedTasksHolder.append(listItem);
})

// När man trycker på checkbox i completedTasksHolder 
$completedTasksHolder.on("click", "input.checkbox", function () {
  // listItem av checkboxen
  var listItem = $(this).parent();
  // Appendar till listItem till incompleteTasksHolder
  $incompleteTasksHolder.append(listItem);
})
