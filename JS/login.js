let logEmail = document.querySelector("#login_email")
let logPassword = document.querySelector("#login_password")


let loginBtn = document.querySelector("#login")

let firstName = localStorage.getItem("firstName")
let lastName = localStorage.getItem("lastName")
let email = localStorage.getItem("email")
let password = localStorage.getItem("password")

loginBtn.addEventListener("click" , function (e){
    e.preventDefault()
    if (logEmail.value === "" || logPassword.value === "") {
        alert("Please, fill the data")
    } else {
        if (email && email.trim() === logEmail.value.trim() && password && password.trim() === logPassword.value.trim()) {
            setTimeout ( () => {
                window.location = "index.html"
            } , 1000)
        } else {
            alert("username or password is wrong ")
        }
    }
})

