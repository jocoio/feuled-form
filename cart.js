


// ---- INIT VALUES ----- //

// Sales tax in percentage (0-100)
const TAX = 0;

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


// ----- TABLE POPULATION ----- //

// Creates and populates inventory <table> with cart data from an arrray
// tID (Number): id of the table that will be populated
// carrArr (Array): array containing a user's cart items
function populateInventory() {

  let tHTML = "";

  // Emtpy cart notif
  if (cart.length === 0) {
    tHTML += "<div>Your cart is empty</div>";
  }
  // Normal inventory population
  else {
    tHTML += "<table>";

    // Headers
    tHTML += "<tr>";
    tHTML += "<th/>"; 
    tHTML += "<th>Product Name</th>"; 
    tHTML += "<th>Price</th>";
    tHTML += "<th>Quantity</th>";
    tHTML += "<th>Remove</th>";
    tHTML += "</tr>";

    // Rows
    for (i = 0; i < cart.length; i++) {
      let itm = cart[i];
      tHTML += "<tr>";
      // Image
      tHTML += "<td><img src='" + window.location.href + "/assets/" + itm.id + ".png'/></td>";
      // Name
      tHTML += "<td><h2>" + itm.name + "</h2><div class='opac_md'>" + itm.id + "</div></td>";
      // Price
      tHTML += "<td><h2>" + dollarizer.format(itm.price) + "</h2></td>";
      // Quantity
      tHTML += "<td>";
      tHTML += "<input id='quan_"+ i + "' type='number' min='1' value=" + itm.quantity + "></input>";
      tHTML += "<p class='update' onclick='updateQuan(" + i + ")'>Update</p>";
      tHTML += "</td>";
      // Remove
      tHTML += "<td><button onclick='removeItem(" + i + ")'>x</button></td>";
      tHTML += "</tr>";
    }

    tHTML += "</table>";
  }

  // Update HTML
  document.getElementById("inventory").innerHTML = tHTML;
}

// Populates prices table with subtotal, tax, total
// carrArr (Array): array containing a user's cart items
function populatePrices() {
  let sub = calculateTotal();
  document.getElementById("sub").innerHTML = dollarizer.format(sub);
  document.getElementById("tax").innerHTML = dollarizer.format(TAX);
  document.getElementById("total").innerHTML = dollarizer.format(sub * (1 + TAX / 100));
}


// ----- CART EDITS ----- //

// Updates an item's quantity
// idx (Number): index of the item in the cart
// TODO: Sanity checking for anything less than 1
function updateQuan(idx) {
  cart[idx].quantity = document.getElementById('quan_' + idx).value;
  populatePrices();
}

// Removes an item from user's cart
// idx (Number): index of the item in the cart
// TODO: An 'are you sure' popup?
function removeItem(idx) {
  cart.splice(idx, 1);
  populateInventory();
  populatePrices();
}


// ----- HELPERS ----- //

// Adds up and returns cart total
// carrArr (Array): array containing a user's cart items
// returns -> Number
function calculateTotal() {
  let total = 0;
  for (i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }
  return total;
}

// Number formatter to show prices in US format
var dollarizer = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// Initial call on page load
populateInventory();
populatePrices();
