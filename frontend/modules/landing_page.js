import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

  // const response=await fetch(url).then(res => res.json()).catch(e => null);
  // return response;

  // method 2
  try{
    let url=config.backendEndpoint + '/cities';
    const response=await fetch(url);
    const citiesArray=await response.json();
    return citiesArray;
  }catch(e){
    return null;
  }
}
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let cardsParent=document.getElementById("data");

  let cityCard=document.createElement("div");
  cityCard.setAttribute("class","col-md-3 col-sm-1 mb-3")

  ///pages/adventures/?city=${id}
  const card=
  `<div class="card tile">
  <a id="${id}" href="pages/adventures/?city=${id}">
    
      <img src=${image} alt=${city} class="card-img-top">
      <div class="card-body tile-text">
        <h5 class="card-title">${city} <br> ${description}</h5>
      </div>
  </a>
  </div>
  `;
  cityCard.innerHTML=card;
  cardsParent.appendChild(cityCard);
      
}

export { init, fetchCities, addCityToDOM };
