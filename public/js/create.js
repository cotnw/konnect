let tags = [];
let links = [];
let media = [];
const proceed = document.querySelector("#proceed");
const back = document.querySelector("#back");
let page = 1; // 6 is the limit
let title;
let description;
let roles = [];

// PAGE 1
document.querySelector("input[name='title']").addEventListener("keyup", () => {
  if (document.querySelector("input[name='title']").value !== "") {
    title = document.querySelector("input[name='title']").value;
    proceed.classList.remove("disabled");
  } else {
    proceed.classList.add("disabled");
  }
});

// PAGE 2
document
  .querySelector("textarea[name='desc']")
  .addEventListener("keyup", () => {
    if (document.querySelector("textarea[name='desc']").value !== "") {
      description = document.querySelector("textarea[name='desc']").value;
      proceed.classList.remove("disabled");
    } else {
      proceed.classList.add("disabled");
    }
  });

// PAGE 3
for (let skill of document.querySelectorAll(".skill")) {
  skill.addEventListener("click", () => {
    // Class
    if (!skill.classList.contains("skill-active")) {
      if (tags.length < 5) {
        skill.classList.add("skill-active");
        tags.push(skill.textContent);
      }
    } else {
      skill.classList.remove("skill-active");
      let index = tags.indexOf(skill.textContent);
      tags.splice(index, 1);
    }

    // Cursor
    if (tags.length >= 5) {
      for (let sk of document.querySelectorAll(".skill")) {
        sk.style.cursor = "not-allowed";
      }
    } else {
      for (let sk of document.querySelectorAll(".skill")) {
        sk.style.cursor = "pointer";
      }
    }
    for (let sk of document.querySelectorAll(".skill-active")) {
      sk.style.cursor = "pointer";
    }

    // Buttons
    if (tags.length > 0) {
      proceed.classList.remove("disabled");
    } else {
      proceed.classList.add("disabled");
    }
  });
}

// PAGE 4
let allFill = false;
for (let inp of document.querySelectorAll(".roles input")) {
  inp.addEventListener("keyup", () => {
    if (
      inp.value !== "" &&
      inp.parentElement.nextElementSibling.nextElementSibling.children[0]
        .value !== ""
    ) {
      allFill = true;
    } else {
      allFill = false;
    }

    if (allFill) {
      proceed.classList.remove("disabled");
    } else {
      proceed.classList.add("disabled");
    }
  });
}
for (let inp of document.querySelectorAll(".roles textarea")) {
  inp.addEventListener("keyup", () => {
    if (
      inp.value !== "" &&
      inp.parentElement.previousElementSibling.previousElementSibling
        .children[0].value !== ""
    ) {
      allFill = true;
    } else {
      allFill = false;
    }

    if (allFill) {
      proceed.classList.remove("disabled");
    } else {
      proceed.classList.add("disabled");
    }
  });
}

document.querySelector(".add-role").addEventListener("click", () => {
  let clone = document.querySelector(".role").cloneNode(true);
  clone.children[1].children[0].value = "";
  clone.children[3].children[0].value = "";

  clone.children[1].children[0].addEventListener("keyup", () => {
    if (
      clone.children[1].children[0].value !== "" &&
      clone.children[1].children[0].parentElement.nextElementSibling
        .nextElementSibling.children[0].value !== ""
    ) {
      allFill = true;
    } else {
      allFill = false;
    }

    if (allFill) {
      proceed.classList.remove("disabled");
    } else {
      proceed.classList.add("disabled");
    }
  });

  clone.children[3].children[0].addEventListener("keyup", () => {
    if (
      clone.children[3].children[0].value !== "" &&
      clone.children[3].children[0].parentElement.previousElementSibling
        .previousElementSibling.children[0].value !== ""
    ) {
      allFill = true;
    } else {
      allFill = false;
    }

    if (allFill) {
      proceed.classList.remove("disabled");
    } else {
      proceed.classList.add("disabled");
    }
  });

  document
    .querySelector(".roles")
    .insertBefore(clone, document.querySelector(".roles").firstChild);

  proceed.classList.add("disabled");
  allFill = false;
});

// PAGE 5
for (let add of document.querySelectorAll(".add-link")) {
  add.addEventListener("click", () => {
    const inpHold = add.parentElement.cloneNode(true);
    inpHold.children[0].children[0].value =
      add.previousElementSibling.children[0].value;

    links.push(add.previousElementSibling.children[0].value);

    add.previousElementSibling.children[0].value = "";

    let rem = inpHold.children[1];
    inpHold.children[0].classList.add("link-field");

    rem.children[0].setAttribute("src", "/assets/dust.svg");
    rem.classList.remove("add-link");
    rem.classList.add("remove-link");

    add.parentElement.parentElement.appendChild(inpHold);

    // remove
    rem.addEventListener("click", () => {
      let val = rem.previousElementSibling.children[0].value;
      let ix = links.indexOf(val);
      links.splice(ix, 1);

      rem.parentElement.remove();

      // Proceed check
      if (links.length === 0) {
        proceed.classList.add("disabled");
      }
    });

    // Proceed check
    if (links.length !== 0) {
      proceed.classList.remove("disabled");
    }
  });
}

// PAGE 6
imgInps = document.querySelectorAll("input[type='file']");
for (let imgInp of imgInps) {
  imgInp.onchange = (evt) => {
    const [file] = imgInp.files;
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const b64 = reader.result.split("base64,")[1];
        fetch("https://techcircuit.herokuapp.com/image/upload", {
          // Adding method type
          method: "POST",

          // Adding body or contents to send
          body: JSON.stringify({
            b64,
          }),

          // Adding headers to the request
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        })
          .then(async (response) => {
            const resp = await response.json();
            console.log(resp.link);
            document.querySelector(`#img-show-${imgInp.id}`).src = resp.link;
            media.push(resp.link);
            imgInp.parentElement.classList.add("hidden");
            if (
              imgInp.parentElement.nextElementSibling.classList.contains(
                "hidden"
              )
            ) {
              imgInp.parentElement.nextElementSibling.classList.remove(
                "hidden"
              );
            }

            document
              .querySelector(`#img-show-${imgInp.id}`)
              .classList.add("w-48");
            document
              .querySelector(`#img-show-${imgInp.id}`)
              .classList.add("h-48");
            document
              .querySelector(`#img-show-${imgInp.id}`)
              .classList.add("shadow-lg");
          })
          .catch((error) => console.log(error));
      };
    }
  };
}

// PROCEED
proceed.addEventListener("click", () => {
  document.querySelector(`.page-${page}`).classList.add("remove");
  page++;
  document.querySelector(`.page-${page}`)
    ? document.querySelector(`.page-${page}`).classList.remove("hide")
    : console.log("Submitting form...");

  proceed.classList.add("disabled");

  if (page !== 1) {
    back.classList.remove("tr");
  }

  if (page === 5) {
    for (
      let i = 0;
      i < document.querySelectorAll("input[name='role-name']").length;
      i++
    ) {
      let obj = {};

      obj["name"] = document.querySelectorAll("input[name='role-name']")[
        i
      ].value;
      obj["desc"] = document.querySelectorAll("textarea[name='role-desc']")[
        i
      ].value;

      roles.push(obj);
    }
  }

  if (page === 6) {
    proceed.classList.remove("disabled");
  }

  if (page === 7) {
    back.classList.add("disabled");
    document.querySelector(`.page-5`).classList.add("remove");
    document.querySelector("aside").classList.add("bye-rt");
    document.querySelector("nav").classList.add("bye-bt");
    sendData();
  }
});

// BACK
back.addEventListener("click", () => {
  document.querySelector(`.page-${page}`).classList.add("hide");
  page--;
  setTimeout(() => {
    document.querySelector(`.page-${page}`).classList.remove("remove");
  }, 1000);

  if (page === 1) {
    back.classList.add("tr");
  }

  proceed.classList.remove("disabled");
});

for (let btn of document.querySelectorAll("form button")) {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
  });
}

// SEND DATA
async function sendData() {
  const body = JSON.stringify({
    title,
    description,
    tags,
    links,
    media,
    roles,
  });

  const resp = await fetch(`http://localhost:5000/create?accessToken=hello`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body,
  });
  const jsonResp = await resp.json();

  if (jsonResp.success) {
    alert("Created project successfully!");
    window.location.href = `/`;
  } else {
    // $("#err")[0].click();
  }
}
