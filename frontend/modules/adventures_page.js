import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  
  // console.log(search);
  var params = new URLSearchParams(search);
  let city=params.get('city');
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let url=config.backendEndpoint + `/adventures/?city=${city}`;
    const response=await fetch(url);
    const adventuresArray=await response.json();
    return adventuresArray;
  }catch(e){
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  
  // cities.forEach((key) => {
  //   addCityToDOM(key.id, key.city, key.description, key.image);
  // });


  let cardsParent=document.getElementById("data");

  for (let i=0;i<adventures.length;i++){
    let {category,costPerHead,currency,duration,id,image,name}=adventures[i];
    let adventureCard=document.createElement("div");
    adventureCard.setAttribute("class","col-md-3 col-sm-1 mb-3")

    const card=
  `
    <div class="activity-card card">
        <span class="category-banner">${category}</span>
        <a id=${id} href="detail/?adventure=${id}">
          <img class="card-img-top" src=${image} alt=${name}>
        </a>
        
        <div>
          <table class="table">
            <tbody>
              <tr>
                <td>${name}</td>
                <td>Rs. ${costPerHead}</td>
              </tr>
              <tr>
                <td>Duration</td>
                <td>${duration} Hours</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>       
  `;
    
    adventureCard.innerHTML=card;
    cardsParent.appendChild(adventureCard);

  };
  
  
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let newlist=[];
  for (let i=0;i<list.length;i++){
    if (list[i]['duration'] >= low && list[i]['duration'] <= high){
      newlist.push(list[i]);
    }
  }
  return newlist;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let newlist=[];
  for (let i=0;i<list.length;i++){
    if (categoryList.includes(list[i].category)){
      newlist.push(list[i]);
    }
  }
  
  return newlist;
  
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let newList=[];

  if (filters["duration"] == "" && filters["category"].length==0){
    return list;
  }
  
  else if (filters["duration"] != "" && filters["category"].length==0){
    //duration only
    let low=0;
    let high=99;
    if(filters["duration"]==='0-2'){
      low=0;
      high=2;
    }
    else if(filters["duration"]==='2-6'){
      low=2;
      high=6;
    }
    else if(filters["duration"]==='6-12'){
      low=6;
      high=12;
    }
    else{
      low=12;
      high=99;
    }
    return filterByDuration(list,low,high);
  }

  else if(filters["duration"]=="" && filters["category"].length>0){
    return filterByCategory(list,filters["category"])
  }
  
  let low=0;
  let high=99;
  if(filters["duration"]==='0-2'){
      low=0;
      high=2;
  }
  else if(filters["duration"]==='2-6'){
      low=2;
      high=6;
  }
  else if(filters["duration"]==='6-12'){
      low=6;
      high=12;
  }
  else{
      low=12;
      high=99;
  }
  
  let list1=[];
  for (let i=0;i<list.length;i++){
    if (list[i]['duration'] >= low && list[i]['duration'] <= high){
        list1.push(list[i]);
    }
  }
  
  let categoryList=filters["category"];
  let list2=[];
  for (let i=0;i<list1.length;i++){
    if (categoryList.includes(list1[i].category)){
      list2.push(list1[i]);
    }
  }
  newList=list2;
  // Place holder for functionality to work in the Stubs
  return newList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  
  const filterjson=JSON.stringify(filters);
  window.localStorage.setItem("filters",filterjson);
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  let myjson=window.localStorage.getItem("filters");
  if (myjson == '{"duration":"","category":[]}'){
    return null;
  }
    
  let myObj=JSON.parse(myjson);
  return myObj;
  // Place holder for functionality to work in the Stubs

}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let filterPillParent=document.getElementById("category-list")
  for(let i=0;i<filters["category"].length;i++){
    let filterPill=document.createElement("div");
    filterPill.setAttribute("class","category-filter");
    filterPill.innerHTML=`${filters["category"][i]}`
    filterPillParent.append(filterPill);
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
