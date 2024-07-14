let myLocalStorage = JSON.parse(localStorage.getItem("shoppingCart"));
let cartItemsContainer = document.getElementById("cart-items");

function updateSubtotal() {
  const totalCells = document.querySelectorAll(".total");
  let subtotal = 0;
  totalCells.forEach((cell) => {
    subtotal += parseFloat(cell.textContent.replace("$", ""));
  });
  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("total").textContent = `$${subtotal.toFixed(2)}`;
}

function proceedToCheckout() {
  const cartItems = [];
  const rows = document.querySelectorAll("#cart-items tr");
  rows.forEach((row) => {
    const item = {
      title: row.querySelector("td span").textContent,
      price: parseFloat(
        row.querySelector("td:nth-child(2)").textContent.replace("$", "")
      ),
      quantity: parseInt(row.querySelector('input[type="text"]').value),
      total: parseFloat(
        row.querySelector(".total").textContent.replace("$", "")
      ),
    };
    cartItems.push(item);
  });

  localStorage.setItem("cart", JSON.stringify(cartItems));
  localStorage.setItem(
    "subtotal",
    document.getElementById("subtotal").textContent
  );
  localStorage.setItem("total", document.getElementById("total").textContent);
}

function displayOneProducts() {
  let subtotal = 0;
  console.log(myLocalStorage, "ahmed");

  myLocalStorage.forEach((item) => {
    let row = document.createElement("tr");
    item.quantity = 1;
    const total = item.price * item.quantity;
    subtotal += total;
    row.innerHTML = `
                  <td>
                      <img src="${item.thumbnail}" alt="${item.title
      }" style="width: 50px; height: 50px;">
                      <span>${item.title}</span>
                      <span>${item.id}</span>
                  </td>
                  <td>$${item.price.toFixed(2)}</td>
                  <td>
                      <button class="qty-btn" data-action="decrement">-</button>
                      <input type="text" value="${item.quantity
      }" class='inp' readonly>
                      <button class="qty-btn" data-action="increment">+</button>
                  </td>
                  <td class="total">$${total.toFixed(2)}</td>
                  <td>
        <button class="delete-btn" data-id="${item.id}">Delete</button>
      </td>
              `;

    cartItemsContainer.appendChild(row);
  });

  updateSubtotal();
}

function clearCart() {
  localStorage.removeItem("shoppingCart");
  cartItemsContainer.innerHTML = "";
  document.getElementById("subtotal").textContent = "$0.00";
  document.getElementById("total").textContent = "$0.00";
}

displayOneProducts();

let btnClear = document.querySelector(".btn-clear");
btnClear.addEventListener("click", clearCart);

cartItemsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const button = e.target;
    const row = button.closest("tr");
    const itemId = button.dataset.id;

    myLocalStorage = myLocalStorage.filter(item => item.id !== itemId);
    localStorage.setItem("shoppingCart", JSON.stringify(myLocalStorage));

    row.remove();

    updateSubtotal();
  }

  if (e.target.classList.contains("qty-btn")) {
    const button = e.target;
    const row = button.closest("tr");
    const input = row.querySelector('input[type="text"]');
    let quantity = parseInt(input.value);
    const price = parseFloat(row.querySelector("td:nth-child(2)").textContent.replace("$", ""));
    const totalCell = row.querySelector(".total");
    console.log(button.dataset);
    if (button.dataset.action === "increment") {
      quantity++;
    } else if (button.dataset.action === "decrement" && quantity > 1) {
      quantity--;
    }
    input.value = quantity;
    const total = price * quantity;
    totalCell.textContent = `$${total.toFixed(2)}`;

    updateSubtotal();
  }
});