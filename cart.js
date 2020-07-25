// Array containing user's cart items
// TODO: Explore an img field for v1.1? (depends on how/where imgs are stored in server)
var cart = [
  {
    id: 434556256,
    name: "Jet Ski",
    price: 1500.00,
    quantity: 1
  },
  {
    id: 345245865,
    name: "Bubble Wrap",
    price : 440.00,
    quantity: 1
  },
  {
    id: 987123654,
    name: "Crock Pot",
    price: 55.00,
    quantity: 1
  }
]

// Creates and populates <table> with cart data from an arrray
// tID (Number): id of the table that will be populated
// carrArr (Array): array containing a user's cart items
function populateTable(tID, cartArr){

  let tHTML = "";

  // Headers
  tHTML += "<tr>";
  tHTML += "<th/>"; 
  tHTML += "<th>Product Name</th>"; 
  tHTML += "<th>Price</th>";
  tHTML += "<th>Quantity</th>";
  tHTML += "<th>Remove</th>";
  tHTML += "</tr>";

  // Rows
  for (i = 0; i < cartArr.length; i++) {
    let itm = cartArr[i];
    tHTML += "<tr>";
    tHTML += "<td><img src='" + window.location.origin + "/assets/" + itm.id + ".png'/></td>";
    tHTML += "<td><div>" + itm.name + "</div><div>" + itm.id + "</div></td>";
    tHTML += "<td>" + itm.price + "</td>";
    tHTML += "<td>" + itm.quantity + "</td>";
    tHTML += "<td><button>x</button></td>";
    tHTML += "</tr>";
  }

  // Update HTML
  document.getElementById(tID).innerHTML = tHTML;
}

// Initial call on page load
populateTable("table", cart);
