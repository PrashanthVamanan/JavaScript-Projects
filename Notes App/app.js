//Declaration of variables and creation of references to the elements in the DOM
let notesNotAvailable = false;
let selectedNoteId = '';
const editNotesModal = document.querySelector('.editNotes');
const createNoteModal = document.querySelector('#createNoteModal');
const editNotesModalBody = editNotesModal.querySelector('.modal-body');
const createNote = document.querySelector('.create-note');
const editNote = document.querySelector('.edit-note');
const categorySpan = document.querySelector('.category-msg');
const noDataContainer = document.querySelector('.no-data-container');
const cardContainer = document.querySelector('.notes-container');

let notes = JSON.parse(localStorage.getItem('notes')) ? JSON.parse(localStorage.getItem('notes')) : null;
let createdNotes = notes;


/**
 * Checks if any notes exist
 * @param {Array} createdNotes 
 * returns true or false
 */
function checkForExistingNotes(createdNotes) {

    if (createdNotes.length == 0) {
        notesNotAvailable = true;
    } else {
        notesNotAvailable = false;
    }

    return notesNotAvailable;
}

//Generates HTML template for no notes to display message
function generateNoDataTemplate() {
    return `<p class="text-center no-data">No Notes to Display</p>`
}


/**
 * Adds the error message for any field passed in
 * @param {*} field 
 */
function generateErrorMessageTemplate(field) {
    return `<span class="error">* Please select a valid ${field}</span>`
}


/**
 * Generates HTML template to render the created notes
 * @param {Array} notes 
 */
function generateNotesTemplate(notes) {
    let template = '';
    
    notes.forEach(note => {
        template += `<div class="card" style="width: 18rem;">
                        <i class="card-img-top fa fa-sticky-note fa-5x sticky-note text-center" alt="Note"></i>
                        <div class="card-body">
                            <div style="display:none">${note.id}</div><br>
                            <h5 class="card-title"><strong>Title: </strong>${note.title}</h5><br>
                            <p class="card-text">
                                <strong>Category: </strong>${note.category}<br><br>
                                <strong>Description: </strong>${note.description}
                            <p><br>
                            <div style="display: flex; justify-content: space-between;">
                                <a class="fa fa-edit fa-2x" style="cursor:pointer" data-toggle="modal" data-target="#editNotesModal"></a>
                                <a class="fa fa-trash fa-2x" style="cursor:pointer"></a>
                            </div>
                        </div>
                    </div>`
    });

    return template;
}


/**
 * Returns the category name for the category id
 * @param {String} value 
 */
function getCategoryName(value) {
    let categoryName = '';

    switch (value) {
        case "1":
            categoryName = "Reminders";
            break;
        case "2":
            categoryName = "Technology";
            break;
        case "3":
            categoryName = "Miscellaneous";
            break;

        default:
            categoryName = null;
    }

    return categoryName;
}

/**
 * Returns the category id for the category name
 * @param {String} id
 */
function getCategoryId(id) {
    let categoryId = '';

    switch (id) {
        case "Reminders":
            categoryId = "1";
            break;
        case "Technology":
            categoryId = "2";
            break;
        case "Miscellaneous":
            categoryId = "3";
            break;

        default:
            categoryId = null;
    }

    return categoryId;

}

//Generates a unique id for each note created
function generateUUID() {
    let UUID = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
    return UUID;
}


/**
 * Creates a note obj with the necessary properties
 * @param {*} note 
 */
function addNote(note) {
    let noteObj = {};
    noteObj.id = generateUUID();
    noteObj.title = note.title.value;
    noteObj.category = getCategoryName(note.category.value);
    noteObj.description = note.description.value;
    return noteObj;
}

function editSelectedNote(editedNote, noteId) {
  createdNotes.forEach(note => {
    if(note.id == noteId) {
        note.title = editedNote.edittitle.value;
        note.category = getCategoryName(editedNote.editcategory.value);
        note.description = editedNote.editdescription.value;
    }
  });
  console.log(createdNotes);
  return createdNotes;
}

/**
 * Used to hide/show the no data to display message
 * @param {*} result 
 */

function hideShowNoDataMessage(result) {
    if (result) {
        let template = generateNoDataTemplate();
        noDataContainer.innerHTML = template;
        noDataContainer.style.display = 'block';
    } else {
        noDataContainer.style.display = 'none';
    }
}

function filterNotes(noteId) {
    const noteDetails = createdNotes.filter(note => note.id == noteId);
    const filteredNote = noteDetails[0];
    return filteredNote;
}

//Event listener for creating a note
createNote.addEventListener('submit', e => {
    e.preventDefault();

    const category = createNote.category.value;
    let noteObj = {};

    if (category == 'Select Category') {
        categorySpan.innerHTML = generateErrorMessageTemplate('category');
        categorySpan.style.display = 'block';
    } else {
        categorySpan.style.display = 'none';
        noteObj = addNote(createNote);
        createdNotes.push(noteObj);
    }

    createNote.reset();

    let template = generateNotesTemplate(createdNotes);
    let result = checkForExistingNotes(createdNotes);
    hideShowNoDataMessage(result);

    cardContainer.innerHTML = template;

    localStorage.setItem('notes', JSON.stringify(createdNotes));

    if(!result) {
        cardContainer.style.display = 'flex';
    }

});

cardContainer.addEventListener('click', e => {
    selectedNoteId = e.target.parentElement.parentElement.childNodes[1].textContent;
    console.log(selectedNoteId);

    let operationType = e.target.classList[1];

    //Edit operation
    if(operationType == 'fa-edit') {
        const editedNote = filterNotes(selectedNoteId);
        console.log(editedNote);
        editNote.edittitle.value = editedNote.title;
        editNote.editcategory.value = getCategoryId(editedNote.category);
        editNote.editdescription.value = editedNote.description;
    } else {
        //Delete operation
        createdNotes = createdNotes.filter(note => note.id != selectedNoteId);
        let template = generateNotesTemplate(createdNotes);
        let result = checkForExistingNotes(createdNotes);

        if(createdNotes.length == 0) {
            cardContainer.style.display = 'none';
        }

        hideShowNoDataMessage(result);
        cardContainer.innerHTML = template;
    }

    localStorage.setItem('notes', JSON.stringify(createdNotes));


});

//Event listener for editing a note
editNote.addEventListener('submit', e => {
    e.preventDefault();

    if (category == 'Select Category') {
        categorySpan.innerHTML = generateErrorMessageTemplate('category');
        categorySpan.style.display = 'block';
    } else {
        categorySpan.style.display = 'none';
        createdNotes = editSelectedNote(editNote,selectedNoteId);
    }

    editNote.reset();

    let template = generateNotesTemplate(createdNotes);
    let result = checkForExistingNotes(createdNotes);
    hideShowNoDataMessage(result);

    cardContainer.innerHTML = template;

    if(!result) {
        cardContainer.style.display = 'flex';
    }

});

notes = JSON.parse(localStorage.getItem('notes'));
let result = checkForExistingNotes(notes);
hideShowNoDataMessage(result);

if(!result) {
    let template = generateNotesTemplate(notes);
    cardContainer.innerHTML = template;
    cardContainer.style.display = 'flex'; 
}
