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

  var tHTML = "";

  // Headers
  tHTML += "<tr>";
  tHTML += "<th/>"; 
  tHTML += "<th>Product Name</th>"; 
  tHTML += "<th>Price</th>";
  tHTML += "<th>Quantity</th>";
  tHTML += "<th>Remove</th>";
  tHTML += "</tr>";

  // Rows
  for (var item in cartArr) {
    tHTML += "<tr>";
    var dataObj = cartArr[item];
    tHTML += "<td><img src='../assets/"+ dataObj.id + ".png'/></td>";
    tHTML += "<td><div>" + dataObj.name + "</div><div>" + dataObj.id + "</div></td>";
    tHTML += "<td>" + dataObj.price + "</td>";
    tHTML += "<td>" + dataObj.quantity + "</td>";
    tHTML += "<td><button>x</button></td>";
    // for (var eachValue in dataObj){
    //   tHTML += "<td>" + dataObj[eachValue] + "</td>";
    // }
    tHTML += "</tr>";
  }

  // Update HTML
  document.getElementById(tID).innerHTML = tHTML;
}

// Initial call on page load
populateTable("table", cart);
