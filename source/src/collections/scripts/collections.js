/**
 * Get current month and number of days of the month
 */
const DATE = new Date();
function getMonthName(date) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return monthNames[date.getMonth()];
}

function getMonthDays(date) {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[date.getMonth()];
}

function getMonthDaysLeap(date) {
  const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[date.getMonth()];
}

const currYear = DATE.getFullYear();
let numDays;
if (currYear % 4 === 0) {
  numDays = getMonthDaysLeap(DATE);
} else {
  numDays = getMonthDays(DATE);
}

let numCollections = 0;

/**
 * Delete collection
 */
function deleteCollection(tracker) {
  // remove from DOM
  showDeleteBox();

  const yes = document.getElementById("yes");
  yes.addEventListener("click", () => {
    const trackerBody = document.getElementById('tracker-body');
    trackerBody.removeChild(tracker);
    document.getElementsByClassName("close-form")[2].click();
  });

  const no = document.getElementById("no");
  no.addEventListener("click", () => {
    document.getElementsByClassName("close-form")[2].click();
  });

  // remove from storage
  
}

/**
 * template testing
 */
document.addEventListener('DOMContentLoaded', () => {
  const trackerBody = document.getElementById('tracker-body');
  // TODO: pull from storage the collections of the particular month
  // TODO: create a new grid for every 6 collections using grid.js
  // TODO: create a tracker for each collection using tracker.js
  const tracker = document.createElement('collection-elem');
  tracker.collection = 'Groceries';
  // tracker.color = '#599fe0';
  const deleteCollectionBtn = tracker.shadowRoot.querySelector('.delete-tracker');
  deleteCollectionBtn.addEventListener('click', () => {
    deleteCollection(tracker);
  });
  trackerBody.appendChild(tracker);
  numCollections += 1;
});

/**
 * Menu
 */
const flyoutMenu = document.querySelector('#nav');

function showMenu() {
  flyoutMenu.classList.add('show');
}

function hideMenu(e) {
  flyoutMenu.classList.remove('show');
  e.stopPropagation();
  document.body.style.overflow = 'auto';
}

/**
 * Open and close a modal/form
 */
function openForm(form) {
  const f = form;
  f.style.display = 'block';
}

function closeForm(form) {
  const f = form;
  f.style.display = 'none';
  f.querySelector('#collection').value = '';
}

/**
 * Hamburger menu button
 */
const menuButton = document.querySelector('.menu');
menuButton.addEventListener('click', showMenu, false);

/**
* Close menu button
*/
const navSpan = document.querySelector('.close-nav');
navSpan.addEventListener('click', hideMenu, false);

/**
 * Add new collection button
 */
const addForm = document.querySelector('#addForm');

const addClose = addForm.querySelector('.close-form');
addClose.addEventListener('click', () => {
  closeForm(addForm);
});

const add = document.getElementById('add');
add.addEventListener('click', () => {
  openForm(addForm);
});

/**
 * Create collection tracker for particular collection and store color of collection
 */
function addCollection(collection) {
  const tracker = document.createElement('collection-elem');
  tracker.collection = collection;
  // TODO: show delete button when hovering over element
  const deleteCollectionBtn = tracker.shadowRoot.querySelector('.delete-tracker');
  const trackerBody = document.getElementById('tracker-body');

  const wbox = tracker.shadowRoot.querySelector("#collection-grid");
  wbox.addEventListener("click", () => {
    document.querySelector(".textBox-title").innerHTML = collection;
    textBox();
  });

  trackerBody.append(tracker);
  deleteCollectionBtn.addEventListener('click', () => {
    deleteCollection(tracker);
  });
}

/*
** Submit Add Collection
*/
const submitAdd = addForm.querySelector('.submit #submitForm');
submitAdd.onclick = () => {
  const collection = addForm.querySelector('#collection').value;
  const e = document.getElementById("error");

  if (collection == null || collection.trim() === "") {
    e.innerHTML = "Please enter a valid name.";
  } else {
      e.innerHTML = "";
      addCollection(collection);
      closeForm(addForm);
  }
};

/*
** Modal Text Box
*/
var modal = document.getElementById("modalText");
function textBox() {
  modal.style.display = "block";
}

var closeText = document.getElementsByClassName("close-form")[1];
closeText.onclick = function() {
  modal.style.display = "none";
}

/*
** Modal Delete Collection Box
*/
var modalD = document.getElementById("delete-collection");
function showDeleteBox() {
  modalD.style.display = "block";
}

var closeText = document.getElementsByClassName("close-form")[2];
closeText.onclick = function() {
  modalD.style.display = "none";
}