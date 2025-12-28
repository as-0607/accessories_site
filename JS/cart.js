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

let counter = parseInt(localStorage.getItem("counter")) || 0;

if (localStorage.getItem("firstName")){
    header_content.remove()
    cartContainer.style.display ="block"
    user.innerHTML = "Hello, " + localStorage.getItem("firstName")
    carCounter.innerHTML = counter
}

let Price = document.querySelector(".price")
let totalPrice = parseInt(localStorage.getItem("totalPrice")) || 0
Price.innerHTML = totalPrice

let products = JSON.parse(localStorage.getItem("ProductsInCart")) || []
let allproducts = document.querySelector(".addedproducts")

function calcTotalPrice() {
    totalPrice = products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    localStorage.setItem("totalPrice", totalPrice);
    Price.innerHTML = totalPrice;
}

function drawProducts (){
    let y = products.map((item) => {
        return `
        <div class="sm-col-6 col-12 addedcard">
            <div class="addedimage">
                <img src="images/${item.url}" style="width: 100%; height: 100%;">
            </div>
            <div class="addedcard_content">
                <h5>${item.name}</h5>
                <p>Category: ${item.category}</p>
                <p>Price: $${item.price * item.quantity}</p>
                <button class="decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="increase" data-id="${item.id}">+</button>
            </div>
            <button class="removeBtn" onclick="remove(${item.id})">Remove from Cart</button>
        </div>
        `
    }).join("");
    allproducts.innerHTML = y;

    // attach events
    document.querySelectorAll(".increase").forEach(btn => {
        btn.addEventListener("click", () => {
            let id = btn.getAttribute("data-id");
            let item = products.find(p => p.id == id);
            if(item){
                item.quantity++;
                localStorage.setItem("ProductsInCart", JSON.stringify(products));
                calcTotalPrice();
                drawProducts();
            }
        });
    });

    document.querySelectorAll(".decrease").forEach(btn => {
        btn.addEventListener("click", () => {
            let id = btn.getAttribute("data-id");
            let item = products.find(p => p.id == id);
            if(item){
                if(item.quantity > 1){
                    item.quantity--;
                } else {
                    // لو وصلت صفر يتم الحذف
                    remove(id);
                    return;
                }
                localStorage.setItem("ProductsInCart", JSON.stringify(products));
                calcTotalPrice();
                drawProducts();
            }
        });
    });
}
drawProducts();

function remove(index) {
    let itemToRemove = products.find(item => item.id == index);
    if(itemToRemove){
        // طرح السعر الكامل حسب الكمية
        totalPrice -= itemToRemove.price * itemToRemove.quantity;
        localStorage.setItem("totalPrice", totalPrice);
        Price.innerHTML = totalPrice;

        products = products.filter(item => item.id != index);
        localStorage.setItem("ProductsInCart", JSON.stringify(products));

        counter--;
        localStorage.setItem("counter", counter);
        carCounter.innerHTML = counter;

        drawProducts();

        if(products.length == 0) {
            window.location = "index.html";
        }
    }
}



let y = localStorage.getItem("favorites")
let fav = JSON.parse(y)
let favproducts = document.querySelector(".addedfavproducts")

function drawfavProducts (){
    let y = fav.map((item) => {
        return `
        <div class="favcontainer">
                <div class="favImg">
                    <img src="images/${item.url}">
                </div>
                <h5>${item.name}</h5>
                <p>Category: ${item.category}</p>
                <i class="fa fa-heart" onclick="removefav(${item.id})"></i>
            </div>
        `
    })
    favproducts.innerHTML = y
}
drawfavProducts()

function removefav(index) {
    fav = fav.filter(item => item.id != index)
    localStorage.setItem("favorites", JSON.stringify(fav))
    window.location.reload
    drawfavProducts()
    if(products.length == 0) {
        window.location = "index.html"
    }
}