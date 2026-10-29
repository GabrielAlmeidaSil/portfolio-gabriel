const rootHtml = document.documentElement;
const toggleTheme = document.getElementById("toggleTheme");
const themeIcon = document.getElementById("themeIcon");
const menuNav = document.getElementById("menuNav");
const menuLinks = document.querySelectorAll("#menuNav .nav-link");
const sections = document.querySelectorAll("main section[id]");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

/* Animações (AOS) */
AOS.init({
    once: true,
    disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
});


/* Tema */
// o tema inicial já é aplicado pelo script no <head>
function updateThemeButton(theme) {
    themeIcon.className = theme === "dark" ? "bi bi-sun" : "bi bi-moon-stars";
    toggleTheme.setAttribute("aria-label", theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro");
}

function changeTheme() {
    const newTheme = rootHtml.getAttribute("data-theme") === "dark" ? "light" : "dark";

    rootHtml.setAttribute("data-theme", newTheme);
    try { localStorage.setItem("theme", newTheme); } catch (e) { }

    themeIcon.classList.add("animate");
    setTimeout(() => updateThemeButton(newTheme), 400);
}

updateThemeButton(rootHtml.getAttribute("data-theme"));
toggleTheme.addEventListener("click", changeTheme);
// fim função mudar Tema do site


/* Menu */
// fecha o menu no celular depois de clicar em um link
menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (menuNav.classList.contains("show")) {
            bootstrap.Collapse.getOrCreateInstance(menuNav).hide();
        }
    });
});

// deixa ativo no menu o link da seção que está na tela
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        menuLinks.forEach(link => {
            const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("active", isCurrent);
            isCurrent ? link.setAttribute("aria-current", "true") : link.removeAttribute("aria-current");
        });
    });
}, { rootMargin: "-45% 0px -50% 0px" });

sections.forEach(section => sectionObserver.observe(section));


/* Formulário de contato */
// envia pro Formspree sem sair da página
contactForm.addEventListener("submit", async event => {
    event.preventDefault();

    const submitButton = contactForm.querySelector("button[type='submit']");
    submitButton.disabled = true;
    formStatus.className = "form-status m-0 me-auto";
    formStatus.textContent = "Enviando...";

    try {
        const response = await fetch(contactForm.action, {
            method: "POST",
            body: new FormData(contactForm),
            headers: { Accept: "application/json" }
        });

        if (!response.ok) throw new Error(response.statusText);

        contactForm.reset();
        formStatus.textContent = "Mensagem enviada! Obrigado pelo contato.";
        formStatus.classList.add("success");
    } catch (error) {
        formStatus.textContent = "Não foi possível enviar. Tente de novo ou me mande um e-mail.";
        formStatus.classList.add("error");
    } finally {
        submitButton.disabled = false;
    }
});