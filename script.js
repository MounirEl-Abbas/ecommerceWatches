let watchCollection = [
  {
  watchImg: './images/watch.jpg',
  watchName: 'Lorem Watch',
  watchPrice: '$100.99'
},
  {
  watchImg: './images/watch2.jpg',
  watchName: 'Lorem Watch',
  watchPrice: '$109.99'
},
  {
  watchImg: './images/watch3.jpg',
  watchName: 'Lorem Watch',
  watchPrice: '$119.99'
},
  {
  watchImg: './images/watch4.jpg',
  watchName: 'Lorem Watch',
  watchPrice: '$129.99'
},
  {
  watchImg: './images/watch5.jpg',
  watchName: 'Lorem Watch',
  watchPrice: '$129.99'
},
  {
  watchImg: './images/watch6.jpg',
  watchName: 'Lorem Watch',
  watchPrice: '$109.99'
},
  {
  watchImg: './images/watch7.jpg',
  watchName: 'Lorem Watch',
  watchPrice: '$159.99'
},
  {
  watchImg: './images/watch8.jpg',
  watchName: 'Lorem Watch',
  watchPrice: '$109.99'
},
  {
  watchImg: './images/watch9.jpg',
  watchName: 'Lorem Watch',
  watchPrice: '$199.99'
},
  {
  watchImg: './images/watch10.jpg',
  watchName: 'Lorem Watch',
  watchPrice: '$199.99'
},
  {
  watchImg: './images/watch11.jpg',
  watchName: 'Lorem Watch',
  watchPrice: '$149.99'
},
  {
  watchImg: './images/watch12.jpg',
  watchName: 'Lorem Watch',
  watchPrice: '$159.99'
}
]

window.addEventListener('DOMContentLoaded', populateItems)

const allProducts = document.querySelector('.products-container')

function populateItems() {
  for (let watch of watchCollection) {
    allProducts.innerHTML += `
    <div class="product">
    <div class="image-container">
    <img src="${watch.watchImg}" alt="" />
    <button class="fas fa-shopping-cart">Add to cart</button>
    </div>
    <p>${watch.watchName}</p>
    <p>${watch.watchPrice}</p>
    </div>`
  
} 
queryInsertedElements()
}













/*********************** Nav Bar Logic ************************/
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
const cartBtn = document.querySelector('.fa-shopping-cart')
const shoppingCartContainer = document.querySelector('.shopping-cart-container')
const shoppingCart = document.querySelector('.shopping-cart')

cartBtn.addEventListener('click', openCartMenu)

function openCartMenu() {
  shoppingCartContainer.classList.toggle('open-cart-background')
  setTimeout(() => {
    shoppingCart.classList.toggle('open-cart')
    
  }, 100);
}

/******************Product Mouseover "Add to cart" ****************/


function queryInsertedElements(){
  const productContainer = document.getElementsByClassName('product')

  for (let i = 0; i < productContainer.length; i++) {
    console.log(productContainer[i])
    productContainer[i].addEventListener('mouseover', showAddToCart)
    productContainer[i].addEventListener('mouseout', hideAddToCart)
  }

}


function showAddToCart(e) {
  let productImage = e.currentTarget.children[0].children[0]
  let addToCartBtn = e.currentTarget.children[0].children[1]
  addToCartBtn.style.display = 'inline-block'
setTimeout(() => {
  addToCartBtn.style.width = '120px'
}, 100);

}
function hideAddToCart(e) {
  let productImage = e.currentTarget.children[0].children[0]
  let addToCartBtn = e.currentTarget.children[0].children[1]

  addToCartBtn.style.display = 'none'
  addToCartBtn.style.width = '0'

}