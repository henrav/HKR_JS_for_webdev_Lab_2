const state = {
    moving: false,
    deltax: 0,
    deltay: 0,
};



function moveAside(el, e) {
    el.style.position = "fixed";
    el.style.top = `${e.clientY - state.deltay}px`;
    el.style.left = `${(e.clientX - state.deltax)}px`;
    el.style.margin = "0";
    console.log("x: " ,e.clientX - state.deltax, " y: ",e.clientY - state.deltay);
}


const calcDelta = (el, e) => {
    const r = el.getBoundingClientRect();
    state.deltax = e.clientX - r.left;
    state.deltay = e.clientY - r.top;
}


const resetAside = (el) => {
    el.style.position = "";
    el.style.top = "";
    el.style.left = "";
    el.style.margin = "";
    el.style.gridArea = "aside";
}
function hideAside(el) {
    el.style.display = "none";
    genShowAsideButton();
}
function genShowAsideButton() {
    const btn = document.createElement("button");
    btn.id = "showAside";
    btn.innerText = "Show Aside";
    btn.style.position = "fixed";
    btn.style.bottom = "10px";
    btn.style.right = "10px";
    btn.style.zIndex = "1000";
    btn.classList.add("show-aside-button");
    btn.addEventListener("click", () => {
        const aside = document.getElementById("aside");
        aside.style.display = "block";
        document.body.removeChild(btn);
    });
    document.body.appendChild(btn);
}

window.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementById("aside");
    const reset = document.getElementById("resetAside");
    const hide = document.getElementById("hideAside");
    console.log("DOM loaded, aside =", el);

    el.addEventListener("mousedown", () => console.log("DOWN on aside"));
    window.addEventListener("mousemove", () => console.log("MOVE window"));
    el.addEventListener("touchstart", () => console.log("DOWN on aside"));
    window.addEventListener("touchmove", () => console.log("MOVE window"));
    window.addEventListener("resize", () => {
        if (window.innerWidth > 1200) {
            resetAside(el);
        }
    });
    el.addEventListener("mousedown", (e) => {
        if (window.innerWidth > 1200) return;
        if (e.target.closest("button, a, input, textarea, select, label")) return;
        state.moving = true;
        calcDelta(el, e);
    });
    el.addEventListener("touchstart", (e) => {
        if (window.innerWidth > 1200) return;
        if (e.target.closest("button, a, input, textarea, select, label")) return;
        state.moving = true;
        calcDelta(el, e.touches[0]);
    }, { passive: true });

    window.addEventListener("mouseup", () => {
        state.moving = false;
    });
    window.addEventListener("touchend", () => {
        state.moving = false;
    });

    window.addEventListener("mousemove", (e) => {
        if (window.innerWidth > 1200) return;
        if (!state.moving) return;
        moveAside(el, e);
    }, { passive: true });
    window.addEventListener("touchmove", (e) => {
        if (window.innerWidth > 1200) return;
        if (!state.moving) return;
        moveAside(el, e.touches[0]);
    });
    if (reset) reset.addEventListener("click", () => {
        resetAside(el);
    });

    if (hide) hide.addEventListener("click", () => {
        hideAside(el);
    });

});

