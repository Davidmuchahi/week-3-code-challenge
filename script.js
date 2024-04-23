// Your code here
const characterNames = document.getElementById("character-bar");
const votesInput = document.getElementById("votes");
const apiUrl = "http://localhost:3000/characters";
const resetData = null;
const getApiData = () => {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.table(data);
    // if (resetData === null || undefined) {
    // resetData = data;
    // }
      processApiData(data);
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
};

const processApiData = (characters) => {
  characterNames.innerHTML = "";
  characters.forEach((character) => {
    const characterContainer = document.createElement("div");
    characterContainer.classList.add("character");
    characterContainer.dataset.id = character.id;
    const characterName = document.createElement("div");
    characterName.textContent = character.name;
    characterContainer.appendChild(characterName);
    characterNames.appendChild(characterContainer);
    characterName.addEventListener("click", () => {
      document.getElementById("name").textContent = character.name;
      document.getElementById("image").src = character.image;
      document.getElementById("image").alt = character.name;
      document.getElementById("vote-count").textContent = character.votes;
      // addVote(character.id, 10);
      localStorage.characterActive = character.id;
    });
  });
};

getApiData();
const addVote = (characterId, newVote) => {
  fetch(`${apiUrl}/${characterId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((character) => {
      const totalVotes = character.votes + newVote;

      fetch(`${apiUrl}/${characterId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ votes: totalVotes }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Vote added successfully:", data);
          getApiData();
        })
        .catch((error) => {
          console.error("There was a problem adding the vote:", error);
        });
    })
    .catch((error) => {
      console.error("There was a problem fetching the character:", error);
    });
    alert("alert")
};
const submitCharacterVote = () => {
  let activeCharacterId = localStorage.characterActive;
  let characterVote = parseInt(votesInput.value);
  console.log(activeCharacterId);
  addVote(activeCharacterId, parseInt(Math.round(characterVote)));
};
document
  .getElementById("votes-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
  });
function resetDB() {
  fetch(`${apiUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      characters: [
        {
          id: 1,
          name: "Mr. Cute",
          image: "https://thumbs.gfycat.com/EquatorialIckyCat-max-1mb.gif",
          votes: 0,
        },
        {
          id: 2,
          name: "Mx. Monkey",
          image:
            "https://thumbs.gfycat.com/FatalInnocentAmericanshorthair-max-1mb.gif",
          votes: 0,
        },
        {
          id: 3,
          name: "Ms. Zebra",
          image: "https://media2.giphy.com/media/20G9uNqE3K4dRjCppA/source.gif",
          votes: 0,
        },
        {
          id: 4,
          name: "Dr. Lion",
          image:
            "http://bestanimations.com/Animals/Mammals/Cats/Lions/animated-lion-gif-11.gif",
          votes: 0,
        },
        {
          id: 5,
          name: "Mme. Panda",
          image: "https://media.giphy.com/media/ALalVMOVR8Qw/giphy.gif",
          votes: 0,
        },
      ],
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Database reset successfully:", data);
    })
    .catch((error) => {
      console.error("There was a problem resetting the database:", error);
    });
}
//add new items to the db
const form = document.getElementById("character-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const name = formData.get("name");
  const imageUrl = formData.get("image-url");
  const characterId=null;

  const response = await fetch(`${apiUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl }),
  });

  if (response.ok) {
    alert("Character added successfully!");
    form.reset();
  } else {
    alert("Failed to add character.");
  }
});

