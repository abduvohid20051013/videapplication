const usernameInput = document.querySelector('.usernameInput')
const passwordInput = document.querySelector('.passwordInput')
const mainText = document.querySelector('.mainText')


form.onsubmit = async(event) => {
    event.preventDefault()
    const response = await request('/login', 'POST', {
        username: usernameInput.value,
        password: passwordInput.value
    })
    if (response.body) {
        mainText.textContent = "You are sucsessfully logged😁😁😁"
        mainText.style.color = "#119764"
        setTimeout(() => {
            window.localStorage.setItem('user', JSON.stringify(response.body))
            window.location = '/admin'
        }, 1500)
    } else {
        mainText.textContent = "Username or password  wrong😡😡!!!"
        mainText.style.color = "rgb(170, 64, 64)"
    }
}