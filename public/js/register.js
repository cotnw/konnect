let skills = [];
let links = [];
const proceed = document.querySelector("#proceed");
const back = document.querySelector("#back");
let page = 1; // 5 is the limit
let title;

// PAGE 1
for (let skill of document.querySelectorAll(".skill")) {
  skill.addEventListener("click", () => {
    // Class
    if (!skill.classList.contains("skill-active")) {
      if (skills.length < 5) {
        skill.classList.add("skill-active");
        skills.push(skill.textContent);
      }
    } else {
      skill.classList.remove("skill-active");
      let index = skills.indexOf(skill.textContent);
      skills.splice(index, 1);
    }

    // Cursor
    if (skills.length >= 5) {
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
    if (skills.length > 0) {
      proceed.classList.remove("disabled");
    } else {
      proceed.classList.add("disabled");
    }
  });
}

// PAGE 2
document.querySelector("input[name='title']").addEventListener("keyup", () => {
  if (document.querySelector("input[name='title']").value !== "") {
    proceed.classList.remove("disabled");
  } else {
    proceed.classList.add("disabled");
  }
});

// PAGE 3
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

// PAGE 4
document
  .querySelector("textarea[name='desc']")
  .addEventListener("keyup", () => {
    if (document.querySelector("textarea[name='desc']").value !== "") {
      proceed.classList.remove("disabled");
    } else {
      proceed.classList.add("disabled");
    }
  });

// PAGE 5
document.querySelector("input[name='mail']").addEventListener("keyup", () => {
  if (document.querySelector("input[name='mail']").value !== "") {
    proceed.classList.remove("disabled");
  } else {
    proceed.classList.add("disabled");
  }
});

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
  if (page === 3) {
    title = document.querySelector("input[name='title']").value;
  }

  if (page === 6) {
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

// SEND DATA
async function sendData() {
  const body = JSON.stringify({
    skills,
    portfolio: links,
    title,
    about: document.querySelector("textarea[name='desc']").value,
    contact_email: document.querySelector("input[name='mail']").value,
  });

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("accessToken");

  const resp = await fetch(
    `http://localhost:5000/register?accessToken=${token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    }
  );
  const jsonResp = await resp.json();

  if (jsonResp.success) {
    setTimeout(() => {
      $("#success")[0].click();
    }, 3000);
  } else {
    // $("#err")[0].click();
  }
}
