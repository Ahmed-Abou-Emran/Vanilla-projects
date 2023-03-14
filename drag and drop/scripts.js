// selecting all the draggable elements (tasks) and the columns (to do, in progress, done)
const draggables = document.querySelectorAll(".draggable");
const columns = document.querySelectorAll(".column");

console.log(columns);

draggables.forEach((draggable) => {
  // listining to the dragstart event on the draggable elements
  draggable.addEventListener("dragstart", handleDragStart);

  // listining to the dragend event on the draggable elements
  draggable.addEventListener("dragend", handleDragEnd);
});

columns.forEach((column) => {
  // listining to the dragover (moving a dragable element over the column) event on the columns
  column.addEventListener("dragover", (e) => {
    console.log({ dragover: e.clientX });

    // to remove the default behaviour of the browser (removing 🚫 while moving dragable element over the columns)
    e.preventDefault();
    console.log(e.clientX);

    // getting the dragable element that is being dragged and checking its position and if the position is above or below the current element
    // then we insert the dragable element before (if afterElement is null) or after the current element (if afterElement is not null)
    const afterElement = getDragAfterElement(column, e.clientY);
    const draggable = document.querySelector(".dragging");

    if (afterElement == null) {
      column.appendChild(draggable);
    } else {
      column.insertBefore(draggable, afterElement);
    }
    return false;
  });

  column.addEventListener("dragenter", handleDragEnter);
  //   column.addEventListener("dragleave", handleDragLeave);
});

function getDragAfterElement(column, y) {
  const draggableElements = [
    ...column.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

function handleDragStart(e) {
  this.classList.add("dragging");
}

function handleDragEnd(e) {
  this.classList.remove("dragging");

  columns.forEach(function (column) {
    column.classList.remove("over");
  });
}

let counter = 0;
function handleDragEnter(e) {
  counter = 1;

  this.classList.add("over");
  console.log({ dragenter: this });
  columns.forEach(function (column) {
    if (column !== this) {
      //   column.classList.remove("over");
    }
  });
}

// fires multiple times while moving children elements
function handleDragLeave(e) {
  counter--;
  console.log({ dragleave: e.clientX });
  if (counter === 0) {
    this.classList.remove("over");
  }
}
