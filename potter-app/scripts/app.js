const currentPageTracker = document.querySelector('.current');
const totalPageTracker = document.querySelector('.total');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const navContainer = document.querySelector('.nav-container');

let spellHolderContainer = null;
let wandHolderContainer = null;
let characterHolderContainer = null;

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

      spellHolderContainer = document.querySelector('.spells-holder');
      let firstPageData = spellsData.slice(0, 12);
      populateData(firstPageData,spellHolderContainer);
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
        wandHolderContainer = document.querySelector('.wands-holder');
        wandsData = extractWandsData(charactersData);

        totalPages = Math.ceil(wandsData.length / 12);
        totalPageTracker.textContent = totalPages;

        let firstPageData = wandsData.slice(0, 12);
        populateData(firstPageData, wandHolderContainer);

      } else if (isRequestedPage('characters')) {
        characterHolderContainer = document.querySelector('.main-characters-container');
        populateData(charactersData, characterHolderContainer);
      }
    }).catch(err => {
      console.log('Error in fetching characters data ', err);
    })
}

function extractWandsData(charactersData) {
  let filteredData = [];
  filteredData = charactersData.filter(character => character.wand != null);
  return filteredData;
}

/** 
 * Need to render image based on house property
 * Do Pagination on characters page
 * Filter characters data based on tab selected
 */

 function populateData(data, container) {
  container.innerHTML = '';
  let view = getCurrentView(location.pathname);

  data.forEach(item => {
    let imageId = isRequestedPage('characters') ? 'gryffindor' : imageToPick[Math.floor(Math.random() * imageToPick.length)];
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

 function isRequestedPage(path){
   return location.pathname.includes(path) ? true : false;
 }

  function getCurrentView(pathname) {
    if(pathname.includes('wands'))
      return 'wand';
    else if(pathname.includes('spells'))
      return 'spell';
    else
      return 'house';
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

const incrementPage = () => {
  currentPage += 1;
  if (currentPage < totalPages) {
    currentPageTracker.textContent = currentPage;
    nextButton.style.display = 'block';
    prevButton.style.display = 'block';
  } else if (currentPage === totalPages) {
    currentPageTracker.textContent = currentPage;
    nextButton.style.display = 'none';
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
  }
}

function populateNextSet(value) {
  if (value) {
    let nextPageRecordsStart = (currentPage - 1) * 12;
    let nextPageRecordsEnd = (currentPage * 12);
    let nextPageRecords = null;

    if (location.pathname.includes("spells")) {
      nextPageRecords = spellsData.slice(nextPageRecordsStart, nextPageRecordsEnd);
      populateData(nextPageRecords, spellHolderContainer);
    }
    else {
      nextPageRecords = wandsData.slice(nextPageRecordsStart, nextPageRecordsEnd);
      populateData(nextPageRecords, wandHolderContainer);
    }
  } else {
    let previousPageRecordsStart = (currentPage - 1) * 12;
    let previousPageRecordsEnd = currentPage * 12;
    let prevPageRecords = null;

    if (isRequestedPage('spells')) {
      prevPageRecords = spellsData.slice(previousPageRecordsStart, previousPageRecordsEnd);
      populateData(prevPageRecords, spellHolderContainer);
    }
    else {
      prevPageRecords = wandsData.slice(previousPageRecordsStart, previousPageRecordsEnd);
      populateData(prevPageRecords, wandHolderContainer);
    }
  }
}