let watchCollection = [
  {
  watchId: 1,
  watchImg: './images/watch.jpg',
  watchName: 'Lorem Watch',
  watchPrice: '$100.99'
},
  {
  watchId: 2,
  watchImg: './images/watch2.jpg',
  watchName: 'Ipsum Watch',
  watchPrice: '$109.99'
},
  {
  watchId: 3,
  watchImg: './images/watch3.jpg',
  watchName: 'Dolor Watch',
  watchPrice: '$119.99'
},
  {
  watchId: 4,
  watchImg: './images/watch4.jpg',
  watchName: 'Elit Watch',
  watchPrice: '$129.99'
},
  {
  watchId: 5,
  watchImg: './images/watch5.jpg',
  watchName: 'Iure Watch',
  watchPrice: '$129.99'
},
  {
  watchId: 6,
  watchImg: './images/watch6.jpg',
  watchName: 'Vitae Watch',
  watchPrice: '$109.99'
},
  {
  watchId: 7,
  watchImg: './images/watch7.jpg',
  watchName: 'Ipsa Watch',
  watchPrice: '$159.99'
},
  {
  watchId: 8,
  watchImg: './images/watch8.jpg',
  watchName: 'Nemo Watch',
  watchPrice: '$109.99'
},
  {
  watchId: 9,
  watchImg: './images/watch9.jpg',
  watchName: 'Corporis Watch',
  watchPrice: '$199.99'
},
  {
  watchId: 10,
  watchImg: './images/watch10.jpg',
  watchName: 'Beatae Watch',
  watchPrice: '$199.99'
},
  {
  watchId: 11,
  watchImg: './images/watch11.jpg',
  watchName: 'Voluptas Watch',
  watchPrice: '$149.99'
},
  {
  watchId: 12,
  watchImg: './images/watch12.jpg',
  watchName: 'Ducimus Watch',
  watchPrice: '$159.99'
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




/*********************** Nav Bar Scroll Effect ************************/
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


function openNavMenu() {
  dropdownMenu.classList.toggle('open-menu')
}

/*************** Shopping Cart open/close logic ******************/
const cartBtn = document.querySelector('.navbar-fixed .fa-shopping-cart')
const shoppingCartContainer = document.querySelector('.shopping-cart-container')
const shoppingCart = document.querySelector('.shopping-cart')
const closeCartBtn = document.querySelector('.cart-header button')

cartBtn.addEventListener('click', toggleCartMenu)
closeCartBtn.addEventListener('click', toggleCartMenu)


function toggleCartMenu() {
  shoppingCartContainer.classList.toggle('open-cart-background')
  setTimeout(() => {    //Needed to make sure display: none; is off, then slide in
    shoppingCart.classList.toggle('open-cart')
  }, 100);
}

/******************Product Mouseover "Add to cart" ****************/
function queryInsertedElements(){ //Add listerners to dynamically inserted products
  const productContainer = document.getElementsByClassName('product')
  let addToCartBtn = document.querySelectorAll('.image-container .fa-shopping-cart')

  for (let i = 0; i < productContainer.length; i++) {
    productContainer[i].addEventListener('mouseover', showAddToCart)
    productContainer[i].addEventListener('mouseout', hideAddToCart)
    addToCartBtn[i].addEventListener('click', getItemInfo)
  }
}

function showAddToCart(e) { //On mouseover, show "add to cart"
  let productImage = e.currentTarget.children[0].children[0]
  let addToCartBtn = e.currentTarget.children[0].children[1]

  productImage.style.filter = 'grayscale(79%) sepia(22%) saturate(210%) opacity(85%) contrast(59%)'
  addToCartBtn.style.display = 'inline-block'
  addToCartBtn.style.width = '120px'

}
function hideAddToCart(e) { //On mouseout, hide "add to cart"
  let productImage = e.currentTarget.children[0].children[0]
  let addToCartBtn = e.currentTarget.children[0].children[1]

  productImage.style.filter = ''
  addToCartBtn.style.display = 'none'
  addToCartBtn.style.width = '0'
}
/***********************************************************/


/***********************************************************
 * Website Functionality
/***********************************************************/
let itemsInCart = []

// Cart Icon in navba
const cartAmountIndicator = document.getElementById('num-items')

// All In-cart items container
const AllCartItems = document.querySelector('.cart-items-container')


function getItemInfo(e) {
  let productId = e.target.parentElement.parentElement.id
  let productInfo = watchCollection[productId - 1] //Returns object
  itemsInCart.push(productInfo)
  updateCart()
}

function updateCart() {
  AllCartItems.innerHTML = ''
  for (let i = 0; i < itemsInCart.length; i++) {
    let item = itemsInCart[i]
    
    AllCartItems.innerHTML += `
    <div id="${item.watchId}"class="item">
    <img src="${item.watchImg}"/>
    <div class="item-info">
    <p>${item.watchName}</p>
    <p>${item.watchPrice}</p>
    <button>remove</button>
    </div>
    <div class="item-quantity">
    <i class="fas fa-chevron-up" id="increase-quantity"></i>
    <p id="item-quantity">1</p>
    <i class="fas fa-chevron-down" id="decrease-quantity"></i>
    </div>
    </div>
    `
  }
  queryInCartProducts()
}


function queryInCartProducts() {
  const eachItem = document.getElementsByClassName('item')

  const itemRemoveBtn = document.querySelectorAll('.item-info button')

  const itemQuantityIncreaseBtn = document.getElementsByClassName('fa-chevron-up')
  const itemQuanityText = document.querySelectorAll('.item-quantity p')
  const itemQuantityDecreaseBtn = document.getElementsByClassName('fa-chevron-down')

  for (let i = 0; i < AllCartItems.childElementCount; i++){
    itemRemoveBtn[i].addEventListener('click', removeItemFromCart)
    

  }
}

function removeItemFromCart(e) {
 let itemToRemove = e.target.parentElement.parentElement.id   //Get item ID

  for (let item of itemsInCart){               //Iterate itemsInCart array
    if (itemToRemove == item.watchId) {         //If items Id == watch Id
    let itemIndex = itemsInCart.indexOf(item)  //Get index of watchID in Array
    itemsInCart.splice(itemIndex, 1)           //Remove item
    }
  }
  updateCart()
}