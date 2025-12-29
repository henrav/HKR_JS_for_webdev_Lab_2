


window.addEventListener("DOMContentLoaded", () => {
    loadTheme();
    addThemeListeners();
});

function addThemeListeners() {
    const lightTheme = document.getElementById("light-theme");
    const darkTheme = document.getElementById("dark-theme");

    lightTheme?.addEventListener("click", () => {
        applyTheme("light")
    });

    darkTheme?.addEventListener("click", () => {
        applyTheme("dark")
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
    const currentTheme = localStorage.getItem("selectedTheme");
    if (currentTheme === "light"){
        lightTheme?.classList.add("active")
        darkTheme?.classList.remove("active")
    } else {
        darkTheme?.classList.add("active")
        lightTheme?.classList.remove("active")
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