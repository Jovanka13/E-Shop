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


//Active nav
const activePage = window.location.pathname;
const navLinks = document.querySelectorAll('#nav-menu li a').forEach(link => {
  if(link.href.includes(`${activePage}`)) {
  link.classList.add('active');
  }
})


// Open and close menu
const bar = document.getElementById('bar');
const nav = document.getElementById('nav-menu');
const close = document.getElementById('close');

bar.addEventListener('click', () =>
    nav.classList.add('show'))

close.addEventListener('click', () =>
    nav.classList.remove('show'))


// Cart
let cartIcon = document.querySelector('#shop-bag'); 
let cart = document.querySelector('.cart-container');
let closeCart = document.querySelector('#close-cart');  
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
  let removeCartButtons = document.getElementsByClassName('cart-remove');
  console.log(removeCartButtons);
  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener('click', removeCartItem);
  }
  //Quantity Changes
  let quantityInputs = document.getElementsByClassName('cart-quantity');
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }
  //Add to Cart
  let addCart = document.getElementsByClassName('cart');
  for (let i = 0; i < addCart.length; i++) {
    let button = addCart[i];
    button.addEventListener('click', addCartClicked);
  }
}

//Remove items from cart
function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}
//Quantity Changes
function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}
//Add to Cart
function addCartClicked(event) {
  let button = event.target;
  let shopProducts = button.parentElement;
  let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
  console.log(title);
}

//Update Total 
function updateTotal() {
  let cartContent = document.getElementsByClassName('cart-content')[0];
  let cartBoxes = cartContent.getElementsByClassName('cart-box');
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName('cart-price')[0];
    let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    let price = parseFloat(priceElement.innerText.replace('€', ''));
    let quantity = quantityElement.value;
    total = total + (price * quantity);
    //If price contain some cents value
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('total-price')[0].innerText = '€' + total;
  }
}