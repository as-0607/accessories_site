let firstName = document.querySelector("#reg_first")
let lastName = document.querySelector("#reg_last")
let email = document.querySelector("#reg_email")
let password = document.querySelector("#reg_password")

let registerBtn = document.querySelector("#register")


registerBtn.addEventListener("click" , function (e){
    e.preventDefault()
    if (firstName.value === "" || lastName.value === "" || email.value === "" || password.value === "") {
        alert("Please, fill the data")
    } else {
        localStorage.setItem("firstName" , firstName.value)
        localStorage.setItem("lastName" , lastName.value)
        localStorage.setItem("email" , email.value)
        localStorage.setItem("password" , password.value)
        alert("Account created successfully")

        setTimeout(function() {
            window.location = "login.html"
        }, 1000)
    }
})