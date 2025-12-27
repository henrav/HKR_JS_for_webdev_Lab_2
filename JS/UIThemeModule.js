


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
}

function loadTheme(){
    const data = localStorage.getItem("selectedTheme");
    if (data){
        applyTheme(data)
        return;
    }
    applyTheme("dark")
}