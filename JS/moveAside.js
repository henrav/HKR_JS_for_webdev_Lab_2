const state = {
    moving: false,
    deltax: 0,
    deltay: 0,
};

const move_threshold = 10;


function moveAside(el, e) {
    el.style.position = "fixed";
    el.style.top = `${e.clientY - state.deltay}px`;
    el.style.left = `${(e.clientX - state.deltax)}px`;
    el.style.margin = "0";
    console.log("x: " ,e.clientX - state.deltax, " y: ",e.clientY - state.deltay);
}


function calcDelta(el, e) {
    const x = el.getBoundingClientRect().left;
    const y = el.getBoundingClientRect().top;
    state.deltax = e.clientX - x;
    state.deltay = e.clientY - y;
}

window.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementById("aside");
    console.log("DOM loaded, aside =", el);

    el.addEventListener("mousedown", () => console.log("DOWN on aside"));
    window.addEventListener("mousemove", () => console.log("MOVE window"));
    el.addEventListener("touchstart", () => console.log("DOWN on aside"));
    window.addEventListener("touchmove", () => console.log("MOVE window"));
    window.addEventListener("resize", () => {
        if (window.innerWidth > 1200) {
            el.style.position = "";
            el.style.top = "";
            el.style.left = "";
            el.style.margin = "";
            el.style.gridArea = "aside";
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
        calcDelta(el, e);
    })

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
    });
    window.addEventListener("touchmove", (e) => {
        if (window.innerWidth > 1200) return;
        if (!state.moving) return;
        moveAside(el, e);
    });
});

