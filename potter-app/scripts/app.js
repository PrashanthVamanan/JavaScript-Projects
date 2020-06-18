//Dom References
const currentPageTracker = document.querySelector('.current');
const totalPageTracker = document.querySelector('.total');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const navContainer = document.querySelector('.nav-container');

//Variables
let spellsHolderContainer = null;
let wandsHolderContainer = null;
let charactersHolderContainer = null;
let filterMenu = null;
let filteredItems = null;

let spellsData = null;
let wandsData = null;
let charactersData = null;

let imageToPick = [1, 2, 3, 4, 5];

let prevPage = 0;
let currentPage = 1;
let totalPages = null;

if (currentPageTracker != null)
  currentPageTracker.textContent = currentPage;

if (prevButton != null)
  prevButton.style.display = 'none';

function getSpellDetails() {
  getSpells()
    .then(data => {
      spellsData = data;
      totalPages = Math.ceil(spellsData.length / 12);
      totalPageTracker.textContent = totalPages;
      spellsHolderContainer = document.querySelector('.spells-holder');
      let firstPageData = spellsData.slice(0, 12);
      populateData(firstPageData, spellsHolderContainer);
    })
    .catch(err => {
      console.log("Error in fetching spells ", err);
    })
}

function getCharacterWandDetails() {
  getCharacterOrWandDetails()
    .then(data => {
      charactersData = data;
      if (isRequestedPage('wands')) {
        wandsHolderContainer = document.querySelector('.wands-holder');
        wandsData = extractDataByKey(charactersData, 'wand');

        totalPages = Math.ceil(wandsData.length / 12);
        totalPageTracker.textContent = totalPages;
        let firstPageData = wandsData.slice(0, 12);

        populateData(firstPageData, wandsHolderContainer);

      } else if (isRequestedPage('characters')) {
        charactersHolderContainer = document.querySelector('.main-characters-container');
        totalPages = Math.ceil(charactersData.length / 12);

        totalPageTracker.textContent = totalPages;
        let firstPageData = charactersData.slice(0, 12);
        populateData(firstPageData, charactersHolderContainer);

      }
    }).catch(err => {
      console.log('Error in fetching characters data ', err);
    })
}

function extractDataByKey(data, key) {
  let filteredData = [];
  filteredData = data.filter(item => item[key] != null);
  return filteredData;
}

/** 
 * Filter characters data based on tab selected
 */

function populateData(data, container) {
  container.innerHTML = '';
  let pageName = location.pathname.split("/").pop().split(".")[0];
  let view = pageName === 'characters' ? 'house' : pageName.slice(0, pageName.length - 1);

  data.forEach(item => {
    let imageId = isRequestedPage('characters') ? getHouseImage(item.house) : imageToPick[Math.floor(Math.random() * imageToPick.length)];
    let properties = getPropertiesForCurrentView(item);
    let keys = Object.keys(properties);


    let html = `
      <div class="spell-container">
        <div class="spell-info">
          <img src="../assets/images/${view}-${imageId}.jpg" width="200px">
          <div class="spell-details">
            <p>${keys[0]}: ${properties[keys[0]]}</p>
            <p>${keys[1]}: ${properties[keys[1]]}</p>
            <p>${keys[2]}: ${properties[keys[2]]}</p>
          </div>
        </div>
      </div>
      `;

    container.innerHTML += html;
  })
}

function isRequestedPage(path) {
  return location.pathname.includes(path) ? true : false;
}

function getPropertiesForCurrentView(data) {
  if (isRequestedPage('spells')) {
    let { spell: prop1, type: prop2, effect: prop3 } = data;

    return {
      spell: prop1,
      type: prop2,
      effect: prop3
    };

  } else if (isRequestedPage('wands')) {
    let { wand: prop1, name: prop2, species: prop3 } = data;

    return {
      wand: prop1,
      name: prop2,
      species: prop3
    };

  } else {
    let { name: prop1, bloodStatus: prop2, species: prop3 } = data;

    return {
      name: prop1,
      bloodStatus: prop2,
      species: prop3
    };
  }
}

function extractDataByValue(value) {
  filteredItems = null;

  toggleActiveClasses(value);

  if(value.toLowerCase() === 'student') {
    filteredItems = charactersData.filter(item => item.role != undefined && item.role === value.toLowerCase());
  } else if(value.toLowerCase() === 'all') {
    filteredItems = charactersData;
  } else {
    filteredItems = charactersData.filter(item => item.role != undefined && (item.role.toLowerCase().startsWith(value.toLowerCase()) || item.role.toLowerCase().includes(value.toLowerCase())));
  }

  totalPages = Math.ceil(filteredItems.length / 12);
  totalPageTracker.textContent = totalPages;

  if(parseInt(currentPageTracker.textContent) > 1) {
    currentPage = 1;
    currentPageTracker.textContent = 1;
  }

  let firstPageData = filteredItems.slice(0, 12);  
  populateData(firstPageData, charactersHolderContainer);
}

function toggleActiveClasses(value) {
  filterMenu = document.querySelectorAll('.filter-menu li');

  filterMenu.forEach(item => {
    if(item.textContent.toLowerCase() !== value.toLowerCase())
      item.classList.remove(...item.classList);
    else {
      item.classList.add('underline');
      item.classList.add('active');
    }
  })

}

function getHouseImage(houseName) {
  return houseName === undefined ? 'Hogwarts' : houseName;
}

/** Pagination Related Functions **/

const incrementPage = () => {
  currentPage += 1;
  if (currentPage < totalPages) {
    currentPageTracker.textContent = currentPage;
    nextButton.style.display = 'block';
    prevButton.style.display = 'block';
  } else if (currentPage === totalPages) {
    currentPageTracker.textContent = currentPage;
    nextButton.style.display = 'none';  
    prevButton.style.display = 'block';
  }
}

const decrementPage = () => {
  currentPage -= 1;
  if (currentPage > 1) {
    currentPageTracker.textContent = currentPage;
    nextButton.style.display = 'block';
    prevButton.style.display = 'block';
  } else if (currentPage == 1) {
    currentPageTracker.textContent = currentPage;
    prevButton.style.display = 'none';
    nextButton.style.display = 'block';
  }
}

function populateNextSet() {

  let pageRecordsStart = (currentPage - 1) * 12;
  let pageRecordsEnd = (currentPage * 12);
  let pageRecords = null;

  if (isRequestedPage("spells")) {
    pageRecords = spellsData.slice(pageRecordsStart, pageRecordsEnd);
    populateData(pageRecords, spellsHolderContainer);
  }
  else if (isRequestedPage("wands")) {
    pageRecords = wandsData.slice(pageRecordsStart, pageRecordsEnd);
    populateData(pageRecords, wandsHolderContainer);
  }
  else {
    if(filteredItems != null)
      pageRecords = filteredItems.slice(pageRecordsStart, pageRecordsEnd);
    else 
      pageRecords = charactersData.slice(pageRecordsStart, pageRecordsEnd);

    populateData(pageRecords, charactersHolderContainer);
  }
}