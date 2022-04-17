const API_URL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const button = document.getElementById("searchButton");

const search = document.getElementById("search");



async function getUser(username) {
    const resp = await fetch(API_URL + username);
    const respData = await resp.json();
    createUserCard(respData);
    getRepos(username);
}

async function getRepos(username){
  const resp = await fetch(API_URL + username + "/repos");
  const respData = await resp.json();
  addReposToCard(respData);
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");
  repos.forEach((repo) => {
          const repoEl = document.createElement("a");
          repoEl.classList.add("repo");
          repoEl.href = repo.html_url;
          repoEl.target = "_blank";
          repoEl.innerText = repo.name;
          reposEl.appendChild(repoEl);
      });
}

function createUserCard(user) {
  const cardHTML = `
      <div class="card">
          <div>
              <img class="avatar" src="${user.avatar_url?user.avatar_url:""}" alt="${user.name}" />
          </div>
          <div class="user-info">
              <h2>${user.name?user.name:"NA \n"}</h2>
              <p>${user.bio?user.bio:"NA \n"}</p>
              <ul class="info">
                  <li><strong>Followers :</strong>${user.followers?user.followers:"NA \n"}</li>
                  <li><strong>Following :</strong>${user.following?user.following:"NA \n"}</li>
                  <li><strong>Repos :</strong>${user.public_repos?user.public_repos:"NA \n"}</li>
                  <li><strong>Twitter :</strong> ${user.twitter_username?user.twitter_username:"NA \n"}</li>
                  <li><strong>Location :</strong>${user.location?user.location:"NA \n"}</li>
              </ul>
              <div id="repos"></div>
          </div>
      </div>
  `;

  main.innerHTML = cardHTML;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
      getUser(user);
      search.value = "";
  }
});


button.addEventListener("click", (e) => {
    
    const user = search.value;
    
    if (user) {
        getUser(user);
        search.value = "";
    }
  });
