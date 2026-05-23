if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}
function ready() {
    var removecartitem = document.getElementsByClassName("REMOVE")
    var addtocart = document.getElementsByClassName("add-to-cart")
    for (var i = 0; i < removecartitem.length; i++) {
        var button = removecartitem[i]
        button.addEventListener('click', removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName("quantity")
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    for(var i = 0; i < addtocart.length; i++) {
        var button = addtocart[i]
        button.addEventListener('click', addtocartClicked)
    }
    document.getElementsByClassName("buy")[0].addEventListener('click', purchaseclick)
}
function purchaseclick(event) {
    alert("Thank you for your purchase!")
    var cartitems = document.getElementsByClassName("cart-items-all")[0]
    while (cartitems.hasChildNodes()) {
        cartitems.removeChild(cartitems.firstChild)
    }
    UpdateCartTotal()
}
function addtocartClicked(event) {
    var button = event.target
    var shopitem = button.parentElement
    var title = shopitem.getElementsByClassName("item-head")[0].innerText
    var price = shopitem.getElementsByClassName("price")[0].innerText
    var imgsrc = shopitem.getElementsByClassName("item-image")[0].src
    console.log(title, price, imgsrc)
    addItemToCart(title, price, imgsrc)
    UpdateCartTotal()
}
function addItemToCart(title, price, imgsrc) {
    var cartItem = document.getElementsByClassName("cart-items-all")[0]
    var cartItemNames = cartItem.getElementsByClassName("cart-item")
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('this item is already added!')
            return;
        }
    }
    var cartBox = document.createElement('div')
    cartBox.classList.add('cart-items', 'cart-column')
    var cartBoxContents = `
        <img class="item-img" src="${imgsrc}" alt="${title}">
        <span class="cart-column cart-item">${title}</span>
        <span class="price-column">${price}</span>
        <input type="number" class="quantity" value="1">
        <button class="REMOVE">REMOVE</button>
    `
    cartBox.innerHTML = cartBoxContents
    
    cartItem.append(cartBox)
    console.log("not so legend now")
    cartBox.getElementsByClassName("REMOVE")[0].addEventListener('click', removeCartItem)
    var quantityInputs = document.getElementsByClassName("quantity")
    for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
    }

}
function removeCartItem (event) {
    console.log("I am Legend")
    var bclicked = event.target
    bclicked.parentElement.remove()
    UpdateCartTotal()
}
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    UpdateCartTotal()
}

function UpdateCartTotal() {
    var cartItemContainer = document.getElementsByClassName("cart")[0]
    var cartrows = cartItemContainer.getElementsByClassName("cart-items")
    var total = 0
    for(var i = 0; i < cartrows.length; i++) {
        var cartrow = cartrows[i]
        var priceElement = cartrow.getElementsByClassName("price-column")[0]
        var quantityElement = cartrow.getElementsByClassName("quantity")[0]
        var price = parseFloat(priceElement.textContent.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)   
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName("total-value")[0].innerText = '$' + total
}