// Your code here
// Fetch data from db.json
fetch('db.json')
  .then(response => response.json())
  .then(data => {
    const characters = data.characters;
    displayCharacters(characters);
  })
  .catch(error => console.error('Error:', error));

// Display characters in the character bar
function displayCharacters(characters) {
  const characterBar = document.getElementById('character-bar');

  characters.forEach(character => {
    const characterDiv = document.createElement('div');
    characterDiv.textContent = character.name;
    characterDiv.classList.add('character');
    characterDiv.addEventListener('click', () => showCharacterInfo(character));
    characterBar.appendChild(characterDiv);
  });

  // Display the first character's info initially
  showCharacterInfo(characters[0]);
}

// Display character's detailed information
function showCharacterInfo(character) {
  const detailedInfo = document.getElementById('detailed-info');
  detailedInfo.innerHTML = `
    <p id="name">${character.name}</p>
    <img id="image" src="${character.image}" alt="${character.name}" />
    <h4>Total Votes: <span id="vote-count">${character.votes}</span></h4>
    <form id="votes-form">
      <input type="text" placeholder="Enter Votes" id="votes" name="votes" />
      <input type="submit" value="Add Votes" />
    </form>
    <button id="reset-btn">Reset Votes</button>
  `;

  // Add event listeners for form submission and reset button
  const votesForm = document.getElementById('votes-form');
  const resetBtn = document.getElementById('reset-btn');

  votesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const votesInput = document.getElementById('votes');
    const newVotes = parseInt(votesInput.value, 10);

    if (!isNaN(newVotes)) {
      character.votes += newVotes;
      document.getElementById('vote-count').textContent = character.votes;
      votesInput.value = '';
    }
  });

  resetBtn.addEventListener('click', () => {
    character.votes = 0;
    document.getElementById('vote-count').textContent = character.votes;
  });
}



