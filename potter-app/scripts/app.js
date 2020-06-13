const currentPageTracker = document.querySelector('.current');
const totalPageTracker = document.querySelector('.total');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let spellHolderContainer = null;
let spellsData = null;
let imageToPick = [1, 2, 3, 4, 5];

let prevPage = 0;
let currentPage = 1;
let totalPages = null;

currentPageTracker.textContent = currentPage;
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
    let nextPageRecords = spellsData.slice(nextPageRecordsStart, nextPageRecordsEnd);
    populateSpellsData(nextPageRecords);
  } else {
    let previousPageRecordsStart = (currentPage - 1) * 12;
    let previousPageRecordsEnd = currentPage * 12;
    let prevPageRecords = spellsData.slice(previousPageRecordsStart, previousPageRecordsEnd);
    populateSpellsData(prevPageRecords);
  }
}