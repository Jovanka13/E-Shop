var swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    "@0.00": {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    "@0.75": {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    "@1.00": {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    "@1.50": {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  },
});


// Active nav
const activePage = window.location.pathname;
const navLinks = document.querySelectorAll('#nav-menu li a').forEach(link => {
  if(link.href.includes(`${activePage}`)) {
  link.classList.add('active');
  }
});


// Open and close menu
const bar = document.getElementById('bar');
const nav = document.querySelector('.menu-links');

bar.addEventListener('click', () => toggleMobileNav())

toggleMobileNav = () => {
  nav.classList.toggle('menu-links-mobile')
}

// Cart
const cartIcon = document.querySelector('#shop-bag'); 
const cart = document.querySelector('.cart-container');
const closeCart = document.querySelector('#close-cart');  

// Open Cart
cartIcon.onclick = () => {
  cart.classList.add('active-cart');
}
// Close Cart
closeCart.onclick = () => {
  cart.classList.remove('active-cart');
}
// Cart Working JS
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready) 
} else {
  ready();
}


// Making function
function ready() {
  //Remove items from cart
  const removeCartButtons = document.getElementsByClassName('cart-remove');
  console.log(removeCartButtons);
  for (let i = 0; i < removeCartButtons.length; i++) {
    const button = removeCartButtons[i];
    button.addEventListener('click', removeCartItem);
  }
  //Quantity Changes
  const quantityInputs = document.getElementsByClassName('cart-quantity');
  for (let i = 0; i < quantityInputs.length; i++) {
    const input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }
  
  // Buy Button Work
  document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}

// Buy Button
function buyButtonClicked() {
  let cartItems = document.getElementsByClassName('cart-content')[0];
  let cartCounter = document.querySelector('.cart-counter');
  let productBtn = document.querySelector('.product-btn');
  if(cartItems.textContent === "") {
    alert("You need to place products for order");
    return;
    }


  alert('Your Order is placed');
  cartCounter.innerHTML = 0;
  productBtn.removeAttribute("disabled");
  let cartContent = document.getElementsByClassName('cart-content')[0];
  while(cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

// Remove items from cart
function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
  productCount();
}


// Cart Counter
function productCount() {
  let cartContent = document.getElementsByClassName('cart-content')[0];
  let cartCounter = document.querySelector('.cart-counter');

  cartCounter.innerText = cartContent.children.length;
} 




// Quantity Changes
function quantityChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}
// Add to Cart
function addCartClicked(event) {
  const button = event.target;
  let cartElement = button.closest('.product-box');
  cartElement.querySelector('button').disabled = true;
  let title = cartElement.querySelector('.product-title').innerText;
  let productPrice = cartElement.getElementsByClassName('product-price')[0].innerText;
  let productImg = cartElement.getElementsByClassName('product-img')[0].src;
  addProductToCart(title, productPrice, productImg);
  updateTotal();
}

function addProductToCart(title, productPrice, productImg) {
  let cartShopBox = document.createElement('div');
  cartShopBox.classList.add('cart-box');
  let cartItems = document.getElementsByClassName('cart-content')[0];
  let cartItemsNames = document.getElementsByClassName('cart-product-title');
  for (let i = 0; i < cartItemsNames.length; i++) {
    if(cartItemsNames[i].innerText == title) {
    alert("You have already added this product to cart");
    return;
  }
}


let cartBoxContent = `
                            <img src="${productImg}" alt="" class="cart-img">
                            <div class="detail-box">
                                <div class="cart-product-title">${title}</div>
                                <div class="cart-price">${productPrice}</div>
                                <input type="number" value="1" class="cart-quantity">
                            </div>
                            <i class="bi bi-trash3 cart-remove"></i>`;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);   
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged); 

productCount();
}


// Update Total 
function updateTotal() {
  const cartContent = document.getElementsByClassName('cart-content')[0];
  const cartBoxes = cartContent.getElementsByClassName('cart-box');
  
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName('cart-price')[0];
    let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    let price = parseFloat(priceElement.innerText.replace('€', ''));
    let quantity = quantityElement.value;
    total = total + (price * quantity);
  }

    //If price contain some cents value
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('total-price')[0].innerText = '€' + total;

} 






// Animation 
function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);


/* ----------------- MODAL ----------------- */
const modal = document.querySelector(".modal");
const trigger = document.querySelector("#trigger");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
