const authToken = localStorage.getItem('access_token')

if (authToken) {
    document.querySelector('nav > #nav-login-anchor').classList.add('hidden')
    document.querySelector('nav > .prof').classList.remove('hidden')
} else {
    document.querySelector('nav > #nav-login-anchor').classList.remove('hidden')
    document.querySelector('nav > .prof').classList.add('hidden')
}

document.querySelector('nav > .prof > a > img').src = `/pfp?access_token=${authToken}`

document.querySelector('nav > .prof > img').addEventListener('click', () => {
    localStorage.removeItem('access_token')
    window.location.reload()
});