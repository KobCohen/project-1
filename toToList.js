function checkStorage() {
    let noteArr = window.localStorage.getItem(`NoteArray`);
    if (noteArr) {
        noteArr = JSON.parse(noteArr);
        createNoteGrid(noteArr);
    }
}

function createNoteGrid(noteArr) {
    noteArr.forEach(note => {
        apendElements(note)
    });
}

function saveToLocalStorage(myNote) {
    let NoteArray = window.localStorage.getItem(`NoteArray`);
    if (!NoteArray) {
        NoteArray = [];
    } else {
        NoteArray = JSON.parse(NoteArray);
    }

    NoteArray.push(myNote);
    window.localStorage.setItem(`NoteArray`, JSON.stringify(NoteArray));
}

function Store(e) {
    e.preventDefault();
    let inputValue = document.getElementById('taskInput').value;
    let dateValue = document.getElementById('date').value;
    let timeValue = document.getElementById('time').value;
    var note_id = 'note_' + parseInt(document.getElementsByClassName('notes').length + 1);

    myNote = {
        'taskInput': inputValue,
        'date': timeValue,
        'time': dateValue,
        'id': note_id
    };

    saveToLocalStorage(myNote);
    apendElements(myNote);
}
function apendElements(saved) {

    var new_note = document.createElement("div");
    new_note.className = "notes";

    const spanNote = document.createElement('span');
    const spanTime = document.createElement('span');
    const spanDate = document.createElement('span');
    spanDate.classList.add('dateSpan');
    // const cards = document.querySelector('.cards')
    
    const delNote = () => {
        deleteItem(saved.id);
    };

    const deleteButton = document.createElement('button');
    deleteButton.addEventListener("click", delNote)
    deleteButton.innerHTML = "X";

    spanNote.innerText = saved.taskInput;
    spanDate.innerText = saved.date;
    spanTime.innerText = saved.time;

    spanNote.classList.add('textSpan');
    spanTime.classList.add('hourSpan');
    spanDate.classList.add('dateSpan');
    deleteButton.classList.add('deleteButton');
    new_note.setAttribute('id', saved.id);

    new_note.appendChild(deleteButton);
    new_note.appendChild(spanNote);
    new_note.appendChild(spanTime);
    new_note.appendChild(spanDate);
    // new_note.appendChild(cards);

    gridNonts = document.getElementById(`container`)
    gridNonts.appendChild(new_note);

}

function deleteItem(id) {
    const findId = document.getElementById(id);
    findId.remove();
    const myNote = JSON.parse(window.localStorage.getItem('NoteArray'));
    const myArr = myNote.filter((item) => item.id !== id);
    window.localStorage.setItem(`NoteArray`, JSON.stringify(myArr));
}