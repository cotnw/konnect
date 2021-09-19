const search = document.querySelector("#search");

let titles = [];
for (let card of document.querySelectorAll(".project")) {
    let h2 = card.children[1].textContent.toLowerCase();
    titles.push(h2);
}
for (let card of document.querySelectorAll(".user")) {
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
        for (let card of document.querySelectorAll(".user")) {
            card.classList.remove("hidden");
        }

        document.querySelector(".main h1").textContent =
            "Project matches for you";

        document.querySelector(".create-anchor").classList.remove("hidden");
        document.querySelector(".create-button").classList.remove("hidden");
        document.querySelector(".switch-btns").classList.add("hidden");

        document.querySelector("users").classList.add("hidden");
    } else {
        for (let card of document.querySelectorAll(".project")) {
            card.classList.add("hidden");
        }
        for (let card of document.querySelectorAll(".user")) {
            card.classList.add("hidden");
        }

        document.querySelector(".switch-btns").classList.remove("hidden");
        document.querySelector(".create-anchor").classList.add("hidden");
        document.querySelector(".create-button").classList.add("hidden");

        document.querySelector(
            ".main h1"
        ).textContent = `Search results for "${usrInp}"`;
    }
    for (let match of matches) {
        for (let title of titles) {
            if (match == title) {
                for (let card of document.querySelectorAll(".project")) {
                    if (card.children[1].textContent.toLowerCase() == title) {
                        card.classList.remove("hidden");
                    }
                }

                for (let card of document.querySelectorAll(".user")) {
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

for (let btn of document.querySelectorAll(".switch-btns .btn")) {
    btn.addEventListener("click", () => {
        if (btn.textContent.trim() === "People") {
            document.querySelector(".users").classList.remove("hidden");
            document.querySelector(".projects").classList.add("hidden");
        } else {
            document.querySelector(".users").classList.add("hidden");
            document.querySelector(".projects").classList.remove("hidden");
        }

        document
            .querySelector(".switch-btn-active")
            .classList.remove("switch-btn-active");

        btn.classList.add("switch-btn-active");
    });
}
