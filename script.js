// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Add to Cart functionality
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
  addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
          const productCard = this.closest('[class*="-card"]');
          const productName = productCard.querySelector('h3').textContent;
          const productImage = productCard.querySelector('img').src;
          const productPriceText = productCard.querySelector('.price').textContent;
          
          // Extract price from the text (assuming format "Price Range: ₹80 – ₹150 per kg")
          const priceMatch = productPriceText.match(/₹(\d+)/);
          const productPrice = priceMatch ? parseInt(priceMatch[1]) : 0;
          
          // Create product object
          const product = {
              name: productName,
              image: productImage,
              price: productPrice,
              quantity: 1
          };
          
          // Add to cart in localStorage
          addToCart(product);
          
          // Update cart count
          updateCartCount();
          
          // Show a confirmation message
          alert(`${productName} added to cart!`);
      });
  });
  
  // Initialize cart count on page load
  updateCartCount();
});

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if item already exists in cart
  const existingItem = cart.find(item => item.name === product.name);
  
  if (existingItem) {
      existingItem.quantity += 1;
  } else {
      cart.push(product);
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Find or create cart count element
  let cartCountElement = document.getElementById('cart-count');
  
  if (!cartCountElement) {
      const cartIcon = document.querySelector('.nav-icon[alt="Cart"]');
      if (cartIcon) {
          cartCountElement = document.createElement('div');
          cartCountElement.id = 'cart-count';
          cartCountElement.classList.add('cart-count');
          cartIcon.parentNode.insertBefore(cartCountElement, cartIcon.nextSibling);
      }
  }
  
  if (cartCountElement) {
      cartCountElement.textContent = totalItems;
      cartCountElement.style.display = totalItems > 0 ? 'block' : 'none';
  }
}