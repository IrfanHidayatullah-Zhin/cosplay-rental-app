console.log("JS berjalan");

const form = document.getElementById("registerForm");
const nameInput = document.getElementById("name");
const ktpInput = document.getElementById("ktp");
const userList = document.getElementById("userList");

const users = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const ktp = ktpInput.value.trim();

  if (!name || !ktp) {
    alert("Nama dan KTP wajib diisi");
    return;
  }

  const user = {
    name: name,
    ktp: ktp,
    status: "normal"
  };

  users.push(user);
  renderUsers();

  nameInput.value = "";
  ktpInput.value = "";
});

function renderUsers() {
  userList.innerHTML = "";

  users.forEach((user, index) => {
    const li = document.createElement("li");
    li.className = user.status === "blacklist" ? "blacklist" : "";

    li.innerHTML = `
      <div><strong>${user.name}</strong></div>
      <div>KTP: ${user.ktp}</div>
      <div>Status:
        <span class="status ${user.status}">
          ${user.status}
        </span>
      </div>
    `;

    if (user.status === "normal") {
      const btn = document.createElement("button");
      btn.textContent = "Blacklist";
      btn.className = "btn-blacklist";
      btn.addEventListener("click", function () {
        blacklistUser(index);
      });
      li.appendChild(btn);
    }

    userList.appendChild(li);
  });
}

function blacklistUser(index) {
  users[index].status = "blacklist";
  renderUsers();
}
