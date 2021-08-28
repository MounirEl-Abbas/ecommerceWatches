let watchCollection = [
  {
  watchId: 1,
  watchImg: './images/watch.jpg',
  watchName: 'Lorem Watch',
  watchPrice: '$100.99',
  itemQuantity: 1
},
  {
  watchId: 2,
  watchImg: './images/watch2.jpg',
  watchName: 'Ipsum Watch',
  watchPrice: '$109.99',
  itemQuantity: 1
},
  {
  watchId: 3,
  watchImg: './images/watch3.jpg',
  watchName: 'Dolor Watch',
  watchPrice: '$119.99',
  itemQuantity: 1
},
  {
  watchId: 4,
  watchImg: './images/watch4.jpg',
  watchName: 'Elit Watch',
  watchPrice: '$129.99',
  itemQuantity: 1
},
  {
  watchId: 5,
  watchImg: './images/watch5.jpg',
  watchName: 'Iure Watch',
  watchPrice: '$129.99',
  itemQuantity: 1
},
  {
  watchId: 6,
  watchImg: './images/watch6.jpg',
  watchName: 'Vitae Watch',
  watchPrice: '$109.99',
  itemQuantity: 1
},
  {
  watchId: 7,
  watchImg: './images/watch7.jpg',
  watchName: 'Ipsa Watch',
  watchPrice: '$159.99',
  itemQuantity: 1
},
  {
  watchId: 8,
  watchImg: './images/watch8.jpg',
  watchName: 'Nemo Watch',
  watchPrice: '$109.99',
  itemQuantity: 1
},
  {
  watchId: 9,
  watchImg: './images/watch9.jpg',
  watchName: 'Corporis Watch',
  watchPrice: '$199.99',
  itemQuantity: 1
},
  {
  watchId: 10,
  watchImg: './images/watch10.jpg',
  watchName: 'Beatae Watch',
  watchPrice: '$199.99',
  itemQuantity: 1
},
  {
  watchId: 11,
  watchImg: './images/watch11.jpg',
  watchName: 'Voluptas Watch',
  watchPrice: '$149.99',
  itemQuantity: 1
},
  {
  watchId: 12,
  watchImg: './images/watch12.jpg',
  watchName: 'Ducimus Watch',
  watchPrice: '$159.99',
  itemQuantity: 1
}
]

// On Window open, iterate watchCollection Array and populate website
window.addEventListener('DOMContentLoaded', populateItems)

const allProducts = document.querySelector('.products-container')

function populateItems() {
  for (let watch of watchCollection) {
    allProducts.innerHTML += `
    <div id="${watch.watchId}"class="product">
    <div class="image-container">
    <img src="${watch.watchImg}" alt="" />
    <span class="fas fa-shopping-cart">Add to cart</span>
    </div>
    <p>${watch.watchName}</p>
    <p>${watch.watchPrice}</p>
    </div>`
  } 
  queryInsertedElements()
}




/*********************** Nav Bar Effect after scroll ************************/
const fixedNavBar = document.querySelector('.navbar-fixed')
const titleSpanText = document.querySelector('.navbar-fixed h1 > span')

document.body.addEventListener('scroll', function(){
  if (document.body.scrollTop > 600){
    fixedNavBar.style.backgroundColor = 'var(--clr-four)'
    titleSpanText.style.color = 'var(--clr-five)'
  }
  if (document.body.scrollTop < 600) {
    fixedNavBar.style.backgroundColor = 'var(--clr-five-2)'
    titleSpanText.style.color = 'var(--clr-three)'
  }
})

/*************** Dropdown Menu Panel Logic ********************/
const burgerMenuBtn = document.querySelector('.fa-bars')
const dropdownMenu = document.querySelector('.navbar-dropdown')

burgerMenuBtn.addEventListener('click', openNavMenu)

function openNavMenu() { dropdownMenu.classList.toggle('open-menu') }

/*************** Shopping Cart open/close logic ******************/
const cartBtn = document.querySelector('.navbar-fixed .fa-shopping-cart')         //Cart Icon in Nav bar
const shoppingCartContainer = document.querySelector('.shopping-cart-container')  //100% width, (To add modal effect)
const shoppingCart = document.querySelector('.shopping-cart')                     //Actual shopping cart
const closeCartBtn = document.querySelector('.cart-header button')                //X shopping cart

cartBtn.addEventListener('click', toggleCartMenu)
closeCartBtn.addEventListener('click', toggleCartMenu)


function toggleCartMenu() {
  shoppingCartContainer.classList.toggle('open-cart-background')
  setTimeout(() => {    //Needed to make sure display: none; is off, then slide in cart
    shoppingCart.classList.toggle('open-cart')
  }, 100);
}

/******************Product Mouseover "Add to cart" ****************/
function queryInsertedElements(){   //Add listerners to dynamically inserted products
  const productContainer = document.getElementsByClassName('product')
  const addToCartBtn = document.querySelectorAll('.image-container .fa-shopping-cart')

  for (let i = 0; i < productContainer.length; i++) {
    productContainer[i].addEventListener('mouseover', showAddToCart)
    productContainer[i].addEventListener('mouseout', hideAddToCart)
    addToCartBtn[i].addEventListener('click', getItemInfo)  //Adding an item to cart
  }
}

function showAddToCart(e) { //On mouseover, show "add to cart"
  const productImage = e.currentTarget.children[0].children[0]
  const addToCartBtn = e.currentTarget.children[0].children[1]

  productImage.style.filter = 'grayscale(79%) sepia(22%) saturate(210%) opacity(85%) contrast(59%)'
  addToCartBtn.style.display = 'inline-block'
  addToCartBtn.style.width = '120px'

}
function hideAddToCart(e) { //On mouseout, hide "add to cart"
  const productImage = e.currentTarget.children[0].children[0]
  const addToCartBtn = e.currentTarget.children[0].children[1]

  productImage.style.filter = ''
  addToCartBtn.style.display = 'none'
  addToCartBtn.style.width = '0'
}

/*******************SHOP NOW Button, scroll to products**************/
const myBtn = document.querySelector('.welcome-text-container button')

myBtn.addEventListener('click', scrollTo)

function scrollTo() {
  let element = document.querySelector('.products-page div')
  element.scrollIntoView()
}
/***********************************************************/



/***********************************************************
 *** Website Functionality
/***********************************************************/
let itemsInCart = []


// All In-cart items container
const allCartItems = document.querySelector('.cart-items-container')


function getItemInfo(e) {   //When Item is added to cart
  const productId = e.target.parentElement.parentElement.id
  const productInfo = watchCollection[productId - 1]  //Returns object

  if (itemsInCart.indexOf(productInfo) !== -1) {      //When an item is added to cart, check if item exists
    let duplicateItem = itemsInCart[itemsInCart.indexOf(productInfo)]
    duplicateItem.itemQuantity++                      //If item exists, increment quantity
  }else {
    itemsInCart.push(productInfo)                     //Else, add item to itemsInCart array
  }
  updateCartIndicator()
  updateCart()
}


// This will run anytime a change is made in cart
function updateCart() {
  allCartItems.innerHTML = ''
  for (let i = 0; i < itemsInCart.length; i++) {
    let item = itemsInCart[i]

    allCartItems.innerHTML += `
    <div id="${item.watchId}"class="item">
    <img src="${item.watchImg}"/>
    <div class="item-info">
    <p>${item.watchName}</p>
    <p>${item.watchPrice}</p>
    <button>remove</button>
    </div>
    <div class="item-quantity">
    <i class="fas fa-chevron-up" id="increase-quantity"></i>
    <p id="item-quantity">${item.itemQuantity}</p>
    <i class="fas fa-chevron-down" id="decrease-quantity"></i>
    </div>
    </div>
    `
  }
  queryInCartProducts()
  calculateTotal()
}


function queryInCartProducts() {  //Add listeners to items in cart
  const itemRemoveBtn = document.querySelectorAll('.item-info button')
  const itemQuantityIncreaseBtn = document.getElementsByClassName('fa-chevron-up')
  const itemQuantityDecreaseBtn = document.getElementsByClassName('fa-chevron-down')
  const clearCartBtn = document.querySelector('.cart-footer button')
  
  for (let i = 0; i < allCartItems.childElementCount; i++){
    itemRemoveBtn[i].addEventListener('click', removeItemFromCart)
    itemQuantityIncreaseBtn[i].addEventListener('click', increaseQuantity)
    itemQuantityDecreaseBtn[i].addEventListener('click', decreaseQuantity)
  }
  clearCartBtn.addEventListener('click', clearCart)
}


function removeItemFromCart(e) {
 const itemToRemove = e.target.parentElement.parentElement  
 
  for (let i = itemsInCart.length - 1; i >= 0; i--){    //Count down from length of array
    if (itemToRemove.id == itemsInCart[i].watchId) {    //Had to, to avoid quantity problem
      resetItemQuantity(itemsInCart[i])                 //Once item is removed, reset quantity - so if added again, +1 only
      itemsInCart.splice(i, 1)
    }
  }
  updateCart()
  updateCartIndicator()
}

// Cart Icon in navbar
const cartAmountIndicator = document.getElementById('num-items')

function updateCartIndicator() {
  cartAmountIndicator.style.display = 'block'
  if (itemsInCart.length !== 0) {
    let result = itemsInCart.reduce((a, b) => {return a + b.itemQuantity }, 0)  //Sum all item quantities, and display it
    cartAmountIndicator.innerText = result
  }else {                                         //If cart is empty, hide indicator
    cartAmountIndicator.style.display = 'none'
  }
}


function increaseQuantity(e) {
  const itemEl = e.target.parentElement.parentElement

  for (let item of itemsInCart) {
    if (itemEl.id == item.watchId) {    //Find item in itemsInCart Array
      item.itemQuantity++               //Increment quantity
    }
  }
  updateCart()
  updateCartIndicator()
}

function decreaseQuantity(e) {
  const itemEl = e.target.parentElement.parentElement

  for (let item of itemsInCart){  
    if (itemEl.id == item.watchId) {        //Find item in array
      item.itemQuantity--                   //Decrement quantity
      if (item.itemQuantity == 0) {  //Remove from cart if quantity is 0
    
        for (let i = itemsInCart.length - 1; i >= 0; i--){  
          if (itemEl.id == itemsInCart[i].watchId) {  
            resetItemQuantity(itemsInCart[i])         //But first, reset item quantity from 0 to 1
            itemsInCart.splice(i, 1)                  //Then remove it
          }
        }
      }
    }
  }
  updateCart()
  updateCartIndicator()
  
}

function clearCart() {
  for (let item of itemsInCart) {   //Iterate cart and reset quantities
    resetItemQuantity(item)
  }
  itemsInCart = []
  updateCart()
  updateCartIndicator()
}


function resetItemQuantity(itemObj) {
  for (let item of itemsInCart) {
    if (item.watchId == itemObj.watchId) {
      itemObj.itemQuantity = 1
    }
  }
}

const cartTotal = document.querySelector('.cart-footer p > span')

function calculateTotal() {
  let totalPrice = 0
  for (let i = 0; i < itemsInCart.length; i++) { 
    let eachPrice = Number((itemsInCart[i].watchPrice).split('$')[1])  // Get price of each item, remove '$', and make it Number
    if (itemsInCart[i].itemQuantity !== 1) {                           //If item quantity > 1, itemPrice * quantity
      eachPrice = eachPrice * itemsInCart[i].itemQuantity
    }
    totalPrice += eachPrice
  }
  cartTotal.textContent = totalPrice.toFixed(2)
  
}


