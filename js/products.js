if (localStorage.getItem('category')) {
    displayProductsByCategory(localStorage.getItem('category'));
  } else {
    displayAllProducts();
  }
  
  const search = document.getElementById("search");
  const categories = document.getElementById("categorySelect");
  export let ShoppingCart = [];
  function displayAllProducts() {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        displayData(data.products);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }
  
  function displayProductsByCategory(category) {
    let url = category ? `https://dummyjson.com/products/category/${category}` : "https://dummyjson.com/products";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        displayData(data.products);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }
  
  function displayData(data) {
    let index = "";
    data.forEach((product) => {
      index += `
          <div class="item">
          
              <div class="inner">
                  <div class="img-hover">
                      <img src="${product.thumbnail}" alt="${product.title}">
                      <div class="overlay">
                          <button class='add-to-cart'>Add to cart</button>
                      </div>
                  </div>
                  <a href="#" data-id="${product.id}" class="product-title">${product.title}</a>
                  <span>${product.price} EG</span>
                  
              </div>
          </div>`;
    });
  
    document.getElementById("items").innerHTML = index;
  
    const productTitles = document.querySelectorAll('.product-title');
    productTitles.forEach(title => {
        title.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = e.target.getAttribute('data-id');
            console.log('Product ID:', productId);
            window.location.href = `product_details.html?id=${productId}`;
        });
    });
  
    // ahmed fathi
    document.getElementById("items").addEventListener("click", function (e) {
      if (e.target.classList.contains("add-to-cart")) {
        const productId = e.target
          .closest(".item")
          .querySelector(".product-title")
          .getAttribute("data-id");
        console.log(productId);
        const product = data.find((prod) => prod.id == productId);
        ShoppingCart.push(product);
        //   displayOneProducts(product); // Call your function with the selected product
  
        console.log(ShoppingCart);
        localStorage.setItem("shoppingCart", JSON.stringify(ShoppingCart));
      }
    });
  }
  
  search.addEventListener("keyup", function productSearch(e) {
    const query = e.target.value.trim();
    if (query.length > 0) {
      fetch(`https://dummyjson.com/products/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          displayData(data.products);
        })
        .catch((error) => console.error("Error fetching data:", error));
    } else {
      displayAllProducts();
    }
  });
  
  categories.addEventListener("change", function handleCategoryChange(e) {
    const selectedCategory = e.target.value;
    if (selectedCategory) {
      displayProductsByCategory(selectedCategory);
    } else {
      displayAllProducts();
    }
  });
  
  function fetchCategories() {
    fetch("https://dummyjson.com/products/category-list")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        populateCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }
  
  function populateCategories(categories) {
    const categorySelect = document.getElementById("categorySelect");
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });
  }
  
  fetchCategories();
  