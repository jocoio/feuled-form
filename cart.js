


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


// ----- DATA UPDATES ----- //

// Creates and updates inventory <table> with cart data from an arrray
// tID (Number): id of the table that will be updated
// carrArr (Array): array containing a user's cart items
function updateInventory() {

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
      tHTML += "<td><h2>$" + numFormatter.format(itm.price) + "</h2></td>";
      // Quantity
      tHTML += "<td>";
      tHTML += "<input id='quan_"+ i + "' type='number' min='1' value=" + itm.quantity + "></input>";
      tHTML += "<p class='update' onclick='updateQuan(" + i + ")'>Update</p>";
      tHTML += "</td>";
      // Remove
      tHTML += "<td><img src='" + window.location.href + "/assets/icons/x.svg' class='close' onclick='removeItem(" + i + ")'/></td>";
      tHTML += "</tr>";
    }

    tHTML += "</table>";
  }

  // Update HTML
  document.getElementById("inventory").innerHTML = tHTML;
}

// updates prices table with subtotal, tax, total
// carrArr (Array): array containing a user's cart items
function updatePrices() {
  let sub = calculateTotal();
  document.getElementById("sub").innerHTML = "$" + numFormatter.format(sub);
  document.getElementById("tax").innerHTML = "$" + numFormatter.format(TAX);
  document.getElementById("total").innerHTML = "$" + numFormatter.format(sub * (1 + TAX / 100));
}

// updates count in nav bar to reflect number of items
function updateCount() {
  document.getElementById("count").innerHTML = cart.length;
}

function updateButton() {
  if (cart.length === 0) {
    document.getElementById("checkout").disabled = true;
  }
}


// ----- CART EDITS ----- //

// Updates an item's quantity
// idx (Number): index of the item in the cart
function updateQuan(idx) {
  let newQuan = parseInt(document.getElementById('quan_' + idx).value);

  console.log(newQuan);

  if (newQuan < 1) {
    alert("New quantity must be 1 or more");
    document.getElementById('quan_' + idx).value = cart[idx].quantity;
  }
  else if (!Number.isInteger(newQuan)) {
    alert("New quantity must be an integer (no decimals)");
    document.getElementById('quan_' + idx).value = cart[idx].quantity;
  }
  else {
    cart[idx].quantity = newQuan;
    updatePrices();
    document.getElementById('quan_' + idx).value = newQuan;
  }
}

// Removes an item from user's cart
// idx (Number): index of the item in the cart
// TODO: An 'are you sure' popup?
function removeItem(idx) {
  cart.splice(idx, 1);
  updateInventory();
  updatePrices();
  updateCount();
  updateButton();
}

function submitCheckout() {
  let msg = "";

  msg += "Cart:";
  msg += "\n";

  for (let i = 0; i < cart.length; i++) {
    msg += cart[i].name + " x" + cart[i].quantity;
    msg += " ..... ";
    msg += "$" + numFormatter.format(cart[i].price * cart[i].quantity);
    msg += "\n"
  }

  msg += "\n";

  let addcomm  = document.getElementById("comment").value;
  if (addcomm !== "") {
    msg += "Additional comments:" ;
    msg += "\n";
    msg += addcomm;
    msg += "\n\n"
  }

  msg += "Total after tax: $" + numFormatter.format(calculateTotal() * (1 + (TAX / 100)));


  console.log(msg);
}

// ----- HELPERS ----- //

// Adds up and returns cart total
// carrArr (Array): array containing a user's cart items
// returns -> Number
function calculateTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }
  return total;
}

// Number formatter to show prices in no decimal format
var  numFormatter = new Intl.NumberFormat();

// Initial call on page load
updateInventory();
updatePrices();
updateCount();
updateButton();
