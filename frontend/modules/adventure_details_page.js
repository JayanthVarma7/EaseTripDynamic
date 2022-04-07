import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  var adventureId=new URLSearchParams(search);
  // Place holder for functionality to work in the Stubs
  return adventureId.get('adventure');
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let url=config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`;
    const response=await fetch(url);
    const adventuresDetailArray=await response.json();
    return adventuresDetailArray;
  }catch(e){
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let title=adventure["name"];
  let subtitle=adventure["subtitle"];
  let content=adventure['content'];
  let imagesArr=adventure['images'];
  let titleEle=document.getElementById('adventure-name');
  titleEle.innerHTML=title;
  let subTitleEle=document.getElementById('adventure-subtitle');
  subTitleEle.innerHTML=subtitle;
  let gallery=document.getElementById('photo-gallery');
  let carouselDiv=document.createElement("div");
  for (let i=0;i<imagesArr.length;i++){
    let imgDiv=document.createElement("div");
    imgDiv.innerHTML=`<img src="${imagesArr[i]}" alt="images" class="activity-card-image">`;
    carouselDiv.appendChild(imgDiv);
  }
  gallery.append(carouselDiv);
  let advContent=document.getElementById('adventure-content');
  advContent.innerHTML=content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let gallery=document.getElementById('photo-gallery');
  gallery.innerHTML="";

  let carouselSlide=document.createElement("div");
  carouselSlide.setAttribute("id","carouselControls");
  carouselSlide.setAttribute("class","carousel slide");
  carouselSlide.setAttribute("data-bs-ride","carousel");
  carouselSlide.innerHTML=`
  <a class="carousel-control-prev" data-bs-target="#carouselControls" type="button" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </a>
  <a class="carousel-control-next" data-bs-target="#carouselControls" type="button" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </a
  `;

  let carouselInner=document.createElement("div");
  carouselInner.setAttribute("class","carousel-inner");

  for (let i=0;i<images.length;i++){
    let imgDiv=document.createElement("div");
    if (i==0){
      imgDiv.setAttribute("class","carousel-item active");
    }else{
      imgDiv.setAttribute("class","carousel-item");
    }
  
    imgDiv.innerHTML=`<img src="${images[i]}" alt="images" class="activity-card-image">`;
    carouselInner.prepend(imgDiv);
  }
  carouselSlide.prepend(carouselInner);
  gallery.append(carouselSlide);

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

  let availability=adventure["available"];
  if (availability){
    document.getElementById('reservation-panel-sold-out').style.display="none";
    document.getElementById('reservation-panel-available').style.display="block";

    let costPerHead=adventure["costPerHead"];
    let costEle=document.getElementById("reservation-person-cost");
    costEle.innerHTML=costPerHead;

  }
  else{
    document.getElementById('reservation-panel-available').style.display="none";
    document.getElementById('reservation-panel-sold-out').style.display="block";

  }
  
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let totalRes=document.getElementById("reservation-cost");
  if (persons==""){
    totalRes.innerHTML=0;
  } else{
    let personInt=parseInt(persons);
    let total=personInt*adventure["costPerHead"];
    totalRes.innerHTML=total;
  }
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const myForm = document.getElementById("myForm");
  myForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      try {
          const reservation = {
              method: "POST",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  name: myForm.elements.namedItem("name").value,
                  date: myForm.elements.namedItem("date").value,
                  person: myForm.elements.namedItem("person").value,
                  adventure: adventure.id,
              }),
          };
          const reservationReq = await fetch(
              config.backendEndpoint + `/reservations/new`,
              reservation
          );

          if (reservationReq.ok) {
              alert("Success");
              location.reload();
          } else {
              alert("Failed");
          }
      } catch (e) {
          return null;
      }
  });
};


//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  console.log(adventure);
  if (adventure["reserved"]){
    document.getElementById('reserved-banner').style.display="block";
  }else{
    document.getElementById('reserved-banner').style.display="none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
