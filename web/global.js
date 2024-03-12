
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

document.addEventListener('DOMContentLoaded', () => {
    startThemeMode()
    const themeSwitcher = document.querySelector('.theme-switcher')
    themeSwitcher.addEventListener('click', changeThemeMode)
});