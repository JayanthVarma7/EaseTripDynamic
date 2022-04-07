import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const reservations = await fetch(
        config.backendEndpoint + `/reservations/`
    );
    const reservationsJson = await reservations.json();
    return reservationsJson;
    } catch (err) {
      return null;
    }

  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  if (reservations.length === 0) {
    document.getElementById("reservation-table-parent").style.display =
        "none";
    document.getElementById("no-reservation-banner").style.display =
        "block";
} else {
    document.getElementById("reservation-table-parent").style.display =
        "block";
    document.getElementById("no-reservation-banner").style.display = "none";

    let tableData = "";
    reservations.forEach((reservation) => {
        tableData += `<tr>
                  <th scope="col">${reservation.id}</th>
                  <td scope="col">${reservation.name}</td>
                  <td scope="col">${reservation.adventureName}</td>
                  <td scope="col">${reservation.person}</td>
                  <td scope="col">${new Date(
                      reservation.date
                  ).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                  })}</td>
                  <td scope="col">${reservation.price}</td>
                  <td scope="col">${new Date(
                      reservation.time
                  ).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      second: "2-digit",
                  })}</td>
                  <td scope="col"><div id="${
                      reservation.id
                  }" class="reservation-visit-button"><a href="../detail/?adventure=${
            reservation.adventure
        }">Visit Adventure</a></div></td>
                </tr>`;
    });
    document.getElementById("reservation-table").innerHTML = tableData;
  }
  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
