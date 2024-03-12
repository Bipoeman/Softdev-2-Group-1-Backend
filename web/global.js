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

document.addEventListener('DOMContentLoaded', async () => {
    startThemeMode()
    const themeSwitcher = document.querySelector('.theme-switcher')
    themeSwitcher.addEventListener('click', changeThemeMode)
    if (window.location.pathname === '/delete_user/') {
        const deleteButton = document.getElementById('deleteButton')
        deleteButton.addEventListener('click', async () => {
            const emailoruser = document.getElementById('emailoruser').value
            const password = document.getElementById('password').value
            const result = confirm('Are you sure you want to delete your account?')
            if (!result) {
                window.location.replace('/')
                return
            }
            const response = await fetch('/user/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({emailoruser, password})
            })
            if (response.ok) {
                alert('User deleted')
                window.location.replace('/')
            } else {
                alert('Invalid credentials')
            }
        })
    }
});



