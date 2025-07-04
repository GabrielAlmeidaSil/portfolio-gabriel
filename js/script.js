const toggleTheme = document.getElementById("toggleTheme");
const rootHtml = document.documentElement;
const accordionHeaders = document.querySelectorAll(".accordion-header");
const menuLinks = document.querySelectorAll(".menu-link");

function changeTheme () {
    const currentTheme = rootHtml.getAttribute("data-theme");

    currentTheme === "dark" ? rootHtml.setAttribute("data-theme", "light") : rootHtml.setAttribute("data-theme", "dark");

    toggleTheme.classList.toggle("bi-sun");
    toggleTheme.classList.toggle("bi-moon-stars");
}

toggleTheme.addEventListener("click", changeTheme);
// fim função mudar Tema do site

accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
        const accordionItem = header.parentElement;
        const accordionActive = accordionItem.classList.contains("active");

        accordionActive ? accordionItem.classList.remove("active") : accordionItem.classList.add("active");
        
    })
})

menuLinks.forEach(item => {
    item.addEventListener("click", () => {
        menuLinks.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
    })
})

/* Animation icon menu */
const toggleButton = document.getElementById('toggleTheme');
    let darkMode = true; 

    toggleButton.addEventListener('click', () => {

        document.documentElement.setAttribute('data-theme', darkMode ? 'light' : 'dark');
        
        toggleButton.classList.add('animate');
        
        setTimeout(() => {
            toggleButton.classList.remove('animate');
            toggleButton.className = darkMode
                ? 'bi bi-moon'
                : 'bi bi-sun';
            darkMode = !darkMode;
        }, 400);
    });