// Carousel JavaScript
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-item");

document.getElementById("next").addEventListener("click", () => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
});

document.getElementById("prev").addEventListener("click", () => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
});
// Cart functionality
let cart = [];
let cartCount = 0;

// Update cart count
function updateCartCount() {
  const cartCountElement = document.getElementById('cart-link');
  cartCountElement.textContent = `Cart (${cartCount})`;
}

// Add product to the cart
function addToCart(productName, productPrice) {
  cart.push({ name: productName, price: productPrice });
  cartCount++;
  updateCartCount();
}

// Display cart items in the modal
function showCart() {
  const cartItemsElement = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  cartItemsElement.innerHTML = '';
  let totalPrice = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;
    cartItemsElement.appendChild(li);
    totalPrice += item.price;
  });

  totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
  document.getElementById('cart-modal').style.display = 'flex';
}

// Close cart modal
document.getElementById('close-cart-btn').addEventListener('click', function () {
  document.getElementById('cart-modal').style.display = 'none';
});

// Add event listener to cart link
document.getElementById('cart-link').addEventListener('click', function (event) {
  event.preventDefault();
  showCart();
});

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function () {
    const productName = this.getAttribute('data-name');
    const productPrice = parseFloat(this.getAttribute('data-price'));
    addToCart(productName, productPrice);
  });
});

// Form validation
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
  
    // Name validation
    if (!name) {
      alert('Please enter your name');
      return;
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
  
    // Message validation
    if (!message) {
      alert('Please enter your message');
      return;
    }
  
    alert('Form submitted successfully!');
  });
  
// Fetch Weather Data from API
async function fetchWeather() {
    try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true');
        const data = await response.json();
        const weather = data.current_weather;
        document.getElementById("weather-data").innerHTML = `Temperature: ${weather.temperature}°C, Wind Speed: ${weather.windspeed} km/h`;
    } catch (error) {
        document.getElementById("weather-data").innerHTML = "Unable to fetch weather data";
        console.error("Error fetching weather data:", error);
    }
}

fetchWeather();
