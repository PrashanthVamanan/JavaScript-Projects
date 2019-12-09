//Hard code the people object
const people = [
    {
        id: 1,
        name: "Prashanth",
        street: "Alagusundaram Nagar",
        city: "Madurai",
        state: "Tamil-Nadu",
        country : "India",
        telephone: "1234567890"
    },
    {
        id: 2,
        name: "Sanjeev",
        street: "Sri Ram Colony",
        city: "Hyderabad",
        state: "Telangana",
        country : "India",
        telephone: "8976543210"
    },
    {
        id: 3,
        name: "Praneeth",
        street: "Kannappan Nagar Check Post",
        city: "Coimbatore",
        state: "Tamil-Nadu",
        country : "India",
        telephone: "7890765432"
    },
    {
        id: 4,
        name: "Pradeep",
        street: "Second Street",
        city: "College Station",
        state: "Texas",
        country : "United States of America",
        telephone: "9876543210"
    },
    {   id: 5,
        name: "Ranjith",
        street: "First Street",
        city: "Salem",
        state: "Tamil-Nadu",
        country : "India",
        telephone: "7654908765"
    },

]

const ul = document.querySelector('.items');
const content = document.querySelector('.main-container');
const li = document.querySelectorAll('.items');

//Display names alone in sidebar
function generateNamesTemplate() {
    let listItems = '';
    people.forEach(person => {
        listItems += `<li class="nav-item">
                         <a class="nav-link">${person.name}</a>
                         <p style="display:none;">${person.id}</p>
                      </li>`
    });
    return listItems;
}

//Return the person object that was clicked
function retrievePerson(id) {
    const person = people.filter(person => person.id == id);
    return person[0];
}

//Generate template to display the person details
function generatePersonTemplate(personObj){
    const personTemplate = `<br><h3><span>Name: </span>${personObj.name}</h3><br>
                            <p><span>Street: </span>${personObj.street}</p><br>
                            <p><span>City: </span>${personObj.city}</p><br>
                            <p><span>State: </span>${personObj.state}</p><br>
                            <p><span>Country: </span>${personObj.country}</p><br>
                            <p><span>Telephone: </span>${personObj.telephone}</p>
                            `
    return personTemplate;
}


//Initially remove the active class from all child nodes
function removeClass(childNodes){
    childNodes.forEach(child => {
        child.classList.remove('active');
    });
}

const names = generateNamesTemplate();
ul.innerHTML += names;

ul.addEventListener('click', (e) => {
    const children =  li[0].childNodes;
    removeClass(children);

    e.target.parentElement.classList.add('active');

    const personId = e.target.nextElementSibling.textContent;
    const personObj = retrievePerson(personId);
    const personTemplate = generatePersonTemplate(personObj);
    content.innerHTML = personTemplate;
});