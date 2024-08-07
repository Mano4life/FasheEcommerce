document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (productId) {
        fetch(`https://dummyjson.com/products/${productId}`)
            .then(response => response.json())
            .then(product => {
                document.getElementById('main-image').src = product.thumbnail;

                if(product.images.length > 2){
                    product.images.forEach(img => {
                        let html = `
                        <div class="image-container">
                            <img id="product-image" class='sub-image' src="${img}" alt="">
                        </div>`;
                        
                        document.querySelector('.sub-images').insertAdjacentHTML('beforeend', html);
                        
                    });
                }else{
                    document.getElementById('main-image').style.width = '40%';
                }
                
                document.querySelectorAll('.sub-image').forEach(e => {
                    e.addEventListener('click', function(e) {
                        // Remove the sub-image class
                        e.target.classList.remove('sub-image');
                        
                        // Remove the existing main image
                        const mainImageContainer = document.querySelector('.thumbnail-img');
                        mainImageContainer.innerHTML = '';
                        
                        // Create a new image element
                        const newMainImage = document.createElement('img');
                        newMainImage.src = e.target.src;
                        newMainImage.id = 'main-image';
                        
                        // Append the new main image
                        mainImageContainer.appendChild(newMainImage);
                    });
                });


                document.getElementById('product-title').textContent = product.title ;
                // document.getElementById('product-category').textContent = `Category: ${product.category}`;
                document.getElementById('product-price').innerHTML = `Price: $${product.price} <span class="discount">(${product.discountPercentage}% off)</span>`;
                document.getElementById('product-rating').textContent = `Rating: ${product.rating}/5`;
                document.getElementById('product-description').textContent = product.description;
                document.getElementById('product-availability').textContent = `Availability Status: ${product.stock > 0 ? 'In Stock' : 'Out of Stock'}`;
                document.getElementById('product-shipping').textContent = `Shipping Information: ${product.shippingInformation}`;
                document.getElementById('product-warranty').textContent = `Warranty: ${product.warrantyInformation}`;
                document.getElementById('product-return-policy').textContent = `Return Policy: ${product.returnPolicy}`;
                document.getElementById('product-sku').textContent = `SKU: ${product.sku}`;
                document.getElementById('product-weight').textContent = `Weight: ${product.weight}g`;
                document.getElementById('product-dimensions').textContent = `Dimensions: ${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth}`;

                // Display reviews
                const reviewsContainer = document.getElementById('reviews');
                reviewsContainer.innerHTML = '';
                product.reviews.forEach(review => {
                    const reviewElement = document.createElement('div');
                    reviewElement.classList.add('review');
                    reviewElement.innerHTML = `<h3>${review.reviewerName}: <span>(Rating: ${review.rating})</span></h3><p>${review.comment}</p>`;
                    reviewsContainer.appendChild(reviewElement);
                });

             

            })
            .catch(error => console.error('Error fetching product details:', error));
    }
});

document.querySelector(".add").addEventListener("click", function (e) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    fetch(`https://dummyjson.com/products/${productId}`)
        .then(response => {
            return response.json();
        })
        .then(product => {
            let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
            shoppingCart.push(product);
            localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
        })
});
