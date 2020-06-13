let spellHolderContainer = null;
let spellsData = null;
let imageToPick = [1, 2, 3, 4, 5]

function getSpellDetails() {
  getSpells()
    .then(data => {
      spellsData = data;
      spellHolderContainer = document.querySelector('.spells-holder');
      populateSpellsData();
    })
    .catch(err => {
      console.log("Error in fetching spells ", err);
    })
}

function populateSpellsData() {
  spellsData.forEach(spell => {

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