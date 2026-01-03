


window.addEventListener("DOMContentLoaded", () => {
    loadTheme();
    addThemeListeners();
});

function addThemeListeners() {
    const lightTheme = document.getElementById("light-theme");
    const darkTheme = document.getElementById("dark-theme");
    const pinkTheme = document.getElementById("pink-theme");
    lightTheme?.addEventListener("click", () => {
        applyTheme("light")
    });

    darkTheme?.addEventListener("click", () => {
        applyTheme("dark")
    });

    pinkTheme?.addEventListener("click", () => {
        applyTheme("pink")
    });
}


function applyTheme(s) {
    localStorage.setItem("selectedTheme", s);
    document.documentElement.setAttribute("data-theme", s);
    toggleActiveClass();
}

function toggleActiveClass(){
    const lightTheme = document.getElementById("light-theme");
    const darkTheme = document.getElementById("dark-theme");
    const pinkTheme = document.getElementById("pink-theme");
    const currentTheme = localStorage.getItem("selectedTheme");
    if (currentTheme === "light"){
        lightTheme?.classList.add("active")
        darkTheme?.classList.remove("active")
        pinkTheme?.classList.remove("active")
    }
    if (currentTheme === "dark"){
        darkTheme?.classList.add("active")
        lightTheme?.classList.remove("active")
        pinkTheme?.classList.remove("active")
    }
    if (currentTheme === "pink"){
        pinkTheme?.classList.add("active")
        lightTheme?.classList.remove("active")
        darkTheme?.classList.remove("active")
    }
}

function loadTheme(){
    const data = localStorage.getItem("selectedTheme");
    if (data){
        applyTheme(data)
        return;
    }
    applyTheme("dark")
}