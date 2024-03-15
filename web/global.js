let baseURL = window.location.origin
let themeMode = localStorage.getItem('themeMode') ?? 'light'

const startThemeMode = () => {
    const body = document.querySelector('body')
    body.setAttribute('class', themeMode)
    const themeSwitcher = document.querySelector('.theme-switcher')
    themeSwitcher.textContent = themeMode === 'light' ? '🌞' : '🌙'
}

const changeThemeMode = () => {
    const body = document.querySelector('body')
    const themeMode = body.getAttribute('class')
    body.setAttribute('class', themeMode === 'light' ? 'dark' : 'light')
    localStorage.setItem('themeMode', themeMode === 'light' ? 'dark' : 'light')

    const themeSwitcher = document.querySelector('.theme-switcher')
    themeSwitcher.textContent = themeMode === 'light' ? '🌙' : '🌞'
}

const deleteAccount = () => {
    const emailoruser = document.getElementById('emailoruser').value
    const password = document.getElementById('password').value
    const otp = document.getElementById('otp').value
    if (!emailoruser || !password || !otp) {
        alert('Please fill all the fields')
    } else {
        const result = confirm('Are you sure you want to delete your account?')
        if (result) {
            fetch(`${baseURL}/user/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({emailoruser, otp, password})
            })
            .then((res) => {
                if (res.ok) {
                    alert(`Account deleted successfully.`)
                    window.location.href = `${baseURL}/`
                } else {
                    alert('Invalid credentials')
                }
            })
            .catch((err) => {
                alert('Error deleting account')
            })
        }
    }
    return false
}

document.addEventListener('DOMContentLoaded', async () => {
    startThemeMode()
    const themeSwitcher = document.querySelector('.theme-switcher')
    themeSwitcher.addEventListener('click', changeThemeMode)

    if (window.location.pathname === '/delete_user') {
        const deleteAccountBtn = document.getElementById('deleteButton')
        deleteAccountBtn.addEventListener('click', deleteAccount)
    }
    
})
