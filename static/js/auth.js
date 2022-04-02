function submitAuth(){
    let usernameField = document.getElementById("usernameField")
    let passwordField = document.getElementById("passwordField")
    let authOverlay = document.getElementById("authOverlay")

    axios.post('auth/', {username: usernameField.value, password: passwordField.value}).then(function(response){
        if (response.status == 200){
            authOverlay.style.display = "none"
        }
    })
}