const search = document.querySelector("#search");

let titles = [];
for (let card of document.querySelectorAll(".project")) {
  let h2 = card.children[1].textContent.toLowerCase();
  titles.push(h2);
}

search.addEventListener("keyup", (e) => {
  let usrInp = search.value.trim();
  let matches = getMatches(usrInp);
  if (usrInp == "") {
    for (let card of document.querySelectorAll(".project")) {
      card.classList.remove("hidden");
    }
  } else {
    for (let card of document.querySelectorAll(".project")) {
      card.classList.add("hidden");
    }
  }
  for (let match of matches) {
    for (let title of titles) {
      if (match == title) {
        for (let card of document.querySelectorAll(".project")) {
          if (card.children[1].textContent.toLowerCase() == title) {
            card.classList.remove("hidden");
          }
        }
      }
    }
  }
});

function getMatches(input) {
  let matchList = [];

  for (let i = 0; i < titles.length; i++) {
    if (titles[i].toLowerCase().indexOf(input.toLowerCase()) != -1) {
      matchList.push(titles[i]);
    }
  }

  return matchList;
}
