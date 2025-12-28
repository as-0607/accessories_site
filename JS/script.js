let headerLoginBtn = document.querySelector(".headerbtn1")
let headerRegBtn = document.querySelector(".headerbtn2")
let headerbtnLogout = document.querySelector(".headerbtnLogout")

let user = document.querySelector("#username")
let cartContainer = document.querySelector(".cartContainer")
let header_content = document.querySelector(".header_content")
let carCounter = document.querySelector("#counter")

headerLoginBtn.addEventListener("click", function(){
    window.location = "login.html"
})

headerRegBtn.addEventListener("click", function(){
    window.location = "register.html"
})

headerbtnLogout.addEventListener("click", function(){
    localStorage.clear()
    setTimeout ( () => {
        window.location.reload()
    } , 1000)
})



if (localStorage.getItem("firstName")){
    header_content.remove()
    cartContainer.style.display ="block"
    user.innerHTML = "Hello, " + localStorage.getItem("firstName")
}

let allproducts = document.querySelector(".products")
let products = [
    {
        id : "1",
        name : "Golden Watch",
        price : "400",
        category : "watches",
        url : "prod1.png"
    },
    {
        id : "2",
        name : "Silver Necklace",
        price : "150",
        category : "Necklace",
        url : "prod2.png"
    },
    {
        id : "3",
        name : "Golden Earrings",
        price : "200",
        category : "Earrings",
        url : "prod3.png"
    },
    {
        id : "4",
        name : "Black watch",
        price : "350",
        category : "watches",
        url : "prod4.png"
    },
    {
        id : "5",
        name : "Silver Set Rings",
        price : "580",
        category : "Rings",
        url : "prod5.png"
    },
    {
        id : "6",
        name : "Silver Necklace",
        price : "150",
        category : "Necklace",
        url : "prod6.png"
    },
    {
        id : "7",
        name : "Black Bracelet",
        price : "100",
        category : "Bracelet",
        url : "prod7.png"
    },
    {
        id : "8",
        name : "Set Necklace",
        price : "500",
        category : "Necklace",
        url : "prod8.png"
    },
    {
        id : "9",
        name : "Golden Set Bracelet",
        price : "300",
        category : "Bracelet",
        url : "prod9.png"
    }
]

function drawProducts (){
    let y = products.map((item) => {
        return `
        <div class="lg-col-4 sm-col-6 col-12 cards">
                            <div class="image"><img src="images/${item.url}"></div>
                            <div class="card_content">
                                <h5>${item.name}</h5>
                                <p>Price: $${item.price}</p>
                                <p>Category: ${item.category}</p>
                                <i class="fa fa-heart heart" data-id="${item.id}" onClick="addtofav(${item.id}, this)"></i>
                                <button class="addBtn" data-btn-id="${item.id}" onClick="addtocart(${item.id}, this)">Add to Cart</button>
                            </div>
                        </div>
        `
    })
    allproducts.innerHTML = y
}
drawProducts()

let cartcontain = document.querySelector(".cartsProducts")
let productsincart = document.querySelector(".cartAddedProducts")
let cartcounter = parseInt(localStorage.getItem("counter")) || 0;
let totalPrice = parseInt(localStorage.getItem("totalPrice")) || 0
let addeditem = JSON.parse(localStorage.getItem("ProductsInCart")) || [];


carCounter.innerHTML = cartcounter;

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function updateFavIcons() {
    document.querySelectorAll(".heart").forEach(btn => {
        let id = btn.getAttribute("data-id");
        let inFav = favorites.some(item => item.id == id);
        btn.style.color = inFav ? "red" : "black";
    });
}

window.addEventListener("DOMContentLoaded", updateFavIcons);

function addtofav(id , btn) {
    let inFav = favorites.some(item => item.id == id);

    if (inFav) {
        favorites = favorites.filter(item => item.id != id);
        btn.style.color = "black";
    } else {
        let choosenItem = products.find((item) => item.id == id);
        favorites = [...favorites, choosenItem];
        btn.style.color = "red";
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
}



function renderCart() {
    productsincart.innerHTML = "";
    if (addeditem.length > 0) {
        cartcontain.style.display = "block";
        addeditem.forEach(item => {
            let itemTotal = item.price * item.quantity;
            productsincart.innerHTML += `
                <div class="productsincart" data-id="${item.id}">
                    <div style="display: flex; margin-bottom: 5px; justify-content: space-between; width:100%;">
                        <div><h6>${item.name}</h6></div>
                        <div>price: $${itemTotal}</div>
                    </div>
                    <button class="decrease" data-id="${item.id}">-</button>
                    <span class="qty" data-id="${item.id}">${item.quantity || 1}</span>
                    <button class="increase" data-id="${item.id}">+</button>
                </div>
            `;
        });

        addeditem.forEach(item => {
            let btn = document.querySelector(`[data-btn-id="${item.id}"]`);
            if (btn) {
                btn.style.backgroundColor = "red";
                btn.innerHTML = "Remove from Cart";
            }
        });

        attachQtyEvents();
    } else {
        cartcontain.style.display = "none";
    }
    updateButtonsState();
}

function attachQtyEvents() {
    document.querySelectorAll(".increase").forEach(btn => {
        btn.addEventListener("click", () => {
            let id = btn.getAttribute("data-id");
            let item = addeditem.find(p => p.id == id);
            if (item) {
                item.quantity++;
                totalPrice += +item.price; // نزود السعر
                localStorage.setItem("totalPrice", totalPrice);

                localStorage.setItem("ProductsInCart", JSON.stringify(addeditem));
                renderCart();
            }
        });
    });

    document.querySelectorAll(".decrease").forEach(btn => {
        btn.addEventListener("click", () => {
            let id = btn.getAttribute("data-id");
            let item = addeditem.find(p => p.id == id);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity--;
                    totalPrice -= +item.price; // نقلل السعر
                } else {
                    // لو آخر واحدة → نشيل المنتج كله
                    addeditem = addeditem.filter(p => p.id != id);
                    cartcounter--;
                    carCounter.innerHTML = cartcounter;

                    totalPrice -= +item.price; // آخر واحدة تتشال
                }

                localStorage.setItem("counter", cartcounter);
                localStorage.setItem("totalPrice", totalPrice);
                localStorage.setItem("ProductsInCart", JSON.stringify(addeditem));
                renderCart();
            }
        });
    });
}



function updateButtonsState() {
    let allBtns = document.querySelectorAll(".addBtn"); 
    allBtns.forEach(btn => {
        let id = btn.getAttribute("data-btn-id"); 
        let inCart = addeditem.some(item => item.id == id);

        if (inCart) {
            btn.style.backgroundColor = "red";
            btn.innerHTML = "Remove from Cart";
        } else {
            btn.style.backgroundColor = "rgb(0, 106, 255)";
            btn.innerHTML = "Add to Cart";
        }
    });
}

renderCart();

function addtocart(id, btn) {
    if (!(localStorage.getItem("firstName"))) {
        window.location = "login.html"
    } else {
        let choosenItem = products.find((item) => item.id == id)
        if (btn.innerHTML == "Add to Cart") {
            let itemWithQty = { ...choosenItem, quantity: 1 };
            addeditem = [...addeditem, itemWithQty];
            localStorage.setItem("ProductsInCart", JSON.stringify(addeditem));

            btn.style.backgroundColor = "red"
            btn.innerHTML = "Remove from Cart"
            cartcounter++
            localStorage.setItem("counter", cartcounter)
            totalPrice += +choosenItem.price
            localStorage.setItem("totalPrice", totalPrice)
        } else if (btn.innerHTML == "Remove from Cart") {
            btn.style.backgroundColor = "rgb(0, 106, 255)"
            btn.innerHTML = "Add to Cart"

            let itemToRemove = addeditem.find(item => item.id == id);

            addeditem = addeditem.filter(item => item.id != id)
            localStorage.setItem("ProductsInCart", JSON.stringify(addeditem))
            cartcounter--
            localStorage.setItem("counter", cartcounter)
            totalPrice -= +choosenItem.price*itemToRemove.quantity
            localStorage.setItem("totalPrice", totalPrice)
            if (addeditem.length == 0) {
                cartcontain.style.display = "none"
            }
        }
        carCounter.innerHTML = cartcounter;
        renderCart();
    }
}


let shoppingcart = document.querySelector(".shoppingcart")

shoppingcart.addEventListener("click", openCart)



function openCart() {
    if (productsincart.innerHTML.trim() != "") {
        if (cartcontain.style.display == "block") {
            cartcontain.style.display = "none"
        } else{
            cartcontain.style.display = "block"
        }
    }
}

