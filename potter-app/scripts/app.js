const currentPageTracker = document.querySelector('.current');
const totalPageTracker = document.querySelector('.total');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const navContainer = document.querySelector('.nav-container');

let spellHolderContainer = null;
let wandHolderContainer = null;
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
      populateSpellsData(firstPageData);
    })
    .catch(err => {
      console.log("Error in fetching spells ", err);
    })
}

function populateSpellsData(pageData) {

  spellHolderContainer.innerHTML = '';

  pageData.forEach(spell => {
    let imageId = imageToPick[Math.floor(Math.random() * imageToPick.length)];

    let html = `
    <div class="spell-container">
      <div class="spell-info">
        <img src="../assets/images/spell-${imageId}.jpg" width="200px">
        <div class="spell-details">
          <p>Spell: ${spell.spell}</p>
          <p>Type: ${spell.type}</p>
          <p>Effect: ${spell.effect}</p>
        </div>
      </div>
    </div>
    `
    spellHolderContainer.innerHTML += html;
  })
}

function getCharacterWandDetails() {
  getCharacterOrWandDetails()
    .then(data => {
      charactersData = data;
      if (location.pathname.includes("wands")) {
        wandHolderContainer = document.querySelector('.wands-holder');
        wandsData = extractWandsData(charactersData);

        totalPages = Math.ceil(wandsData.length / 12);
        totalPageTracker.textContent = totalPages;

        let firstPageData = wandsData.slice(0, 12);
        populateWandsData(firstPageData);
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

function populateWandsData(wandsData) {

  wandHolderContainer.innerHTML = '';

  wandsData.forEach(wand => {

    let imageId = imageToPick[Math.floor(Math.random() * imageToPick.length)];

    let html = `
    <div class="spell-container">
      <div class="spell-info">
        <img src="../assets/images/wand-${imageId}.jpg" width="200px" height="150px">
        <div class="spell-details">
          <p>Wand: ${wand.wand}</p>
          <p>Owner: ${wand.name}</p>
          <p>Species: ${wand.species.charAt(0).toUpperCase() + wand.species.slice(1)}</p>
        </div>
      </div>
    </div>
    `;

    wandHolderContainer.innerHTML += html;
  })
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
      populateSpellsData(nextPageRecords);
    }
    else {
      nextPageRecords = wandsData.slice(nextPageRecordsStart, nextPageRecordsEnd);
      populateWandsData(nextPageRecords);
    }
  } else {
    let previousPageRecordsStart = (currentPage - 1) * 12;
    let previousPageRecordsEnd = currentPage * 12;
    let prevPageRecords = null;

    if (location.pathname.includes("spells")) {
      prevPageRecords = spellsData.slice(previousPageRecordsStart, previousPageRecordsEnd);
      populateSpellsData(prevPageRecords);
    }
    else {
      prevPageRecords = wandsData.slice(previousPageRecordsStart, previousPageRecordsEnd);
      populateWandsData(prevPageRecords);
    }
  }
}