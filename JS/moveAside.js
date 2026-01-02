//module for moving aside on small screens when width < 1200px
//module for moving aside on small screens when width < 1200px
//module for moving aside on small screens when width < 1200px


const state = {
    moving: false,
    deltaX: 0,
    deltaY: 0,
};



function moveAside(el, e) {
    el.style.position = "fixed";
    el.style.top = `${e.clientY - state.deltaY}px`;
    el.style.left = `${(e.clientX - state.deltaX)}px`;
    el.style.margin = "0";
}


const calcDelta = (el, e) => {
    const r = el.getBoundingClientRect();
    state.deltaX = e.clientX - r.left;
    state.deltaY = e.clientY - r.top;
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
    //get elements
    const el = document.getElementById("aside");
    const reset = document.getElementById("resetAside");
    const hide = document.getElementById("hideAside");

    //add eventListeners

    // reset position on resize if width > 1200px
    window.addEventListener("resize", () => {
        if (window.innerWidth > 1200) {
            resetAside(el);
        }
    });

    //mousedown and touchstart to start moving
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


    //mouseup and touchend to stop moving
    window.addEventListener("mouseup", () => {
        state.moving = false;
    });
    window.addEventListener("touchend", () => {
        state.moving = false;
    });


    //mousemove and touchmove to move aside
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


    //reset button listener
    if (reset) reset.addEventListener("click", () => {
        resetAside(el);
    });
    //hide button listener
    if (hide) hide.addEventListener("click", () => {
        hideAside(el);
    });



});

