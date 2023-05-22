let isLoggedIn = false;

function ShowLoginForm() {
  var modal = document.getElementById('login');
  modal.style.display = 'block';
  modal.innerHTML = `<form class="modal-content animate" id="login-form">
  <div class="imgcontainer">
    <span onclick="document.getElementById('login').style.display='none'" class="close"
      title="Close Modal">&times;</span>
  </div>

  <div class="container">
    <label for="username"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="username" required>

    <label for="password"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="password" required>

    <button type="submit">Login</button>
  </div>

</form>`

  const form = document.getElementById('login-form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = form.elements.username.value;
    const password = form.elements.password.value;
    console.log(username);
    console.log(password);
    await fetch('http://localhost:4001/login', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    }).then(async (response) => {
      const json = await response.json();
      window.sessionStorage.token = json.token;
      location.reload();
    }).catch((error) => {
      console.log(error);
    });
  });
}
window.ShowLoginForm = ShowLoginForm;


function ShowRegisterForm() {
  var modal = document.getElementById('register');
  modal.style.display = 'block';
  modal.innerHTML = `<form class="modal-content animate" id="register-form">
  <div class="imgcontainer">
    <span onclick="document.getElementById('register').style.display='none'" class="close"
      title="Close Modal">&times;</span>
  </div>

  <div class="container">
    <label for="username"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="username" required>

    <label for="password"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="password" required>

    <button type="submit">Register</button>
  </div>

</form>`

  const form = document.getElementById('register-form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = form.elements.username.value;
    const password = form.elements.password.value;

    await fetch('http://localhost:4001/register', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    }).then(async (response) => {
      const json = await response.json();
      window.sessionStorage.token = json.token;
      location.reload();
    }).catch((error) => {
      console.log(error);
    });
  });
}

window.ShowRegisterForm = ShowRegisterForm;

export async function SendScore(score) {
  const token = window.sessionStorage.token;
  if (!token)
    alert("Login to post your score!")

  await fetch('http://localhost:4001/scoreboard', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ score, token })
  }).then(async (response) => {
  }).catch((error) => {
    console.log(error);
  });

}

async function GetScores() {
  await fetch('http://localhost:4001/scoreboard', {
    method: 'Get',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' }
  }).then(async (response) => {
    ShowScores(await response.json())
  }).catch((error) => {
    console.log(error);
  });
}

window.onload = async () => {
  OnStartup();
}

function ShowScores(Json) {
  const scores = document.getElementById('scores');
  let list = '';
  for (var i = 0; i < Json.length; i++) {
    list += `          
    <tr>
    <td class="number">${i + 1}</td>
    <td class="name">${Json[i].username}</td>
    <td class="points">${Json[i].score}</td>
    </tr>`
  }
  scores.innerHTML = list;
}

async function OnStartup() {
  CheckUser();
  await GetScores();
}

function CheckUser() {
  const token = window.sessionStorage.token;
  if (!token) {
    console.log(1);
    document.getElementById('LoginButton').style.visibility = 'visible';
    document.getElementById('RegisterButton').style.visibility = 'visible';
    document.getElementById('SignOutButton').style.visibility = 'hidden';
  } else {
    console.log(2);
    document.getElementById('LoginButton').style.visibility = 'hidden';
    document.getElementById('RegisterButton').style.visibility = 'hidden';
    document.getElementById('SignOutButton').style.visibility = 'visible';
  }

}

function SignOut() {
  window.sessionStorage.clear();
  location.reload();
}
window.SignOut = SignOut;