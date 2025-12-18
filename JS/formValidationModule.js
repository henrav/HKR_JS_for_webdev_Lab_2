
const validateName = (v) => /^[A-Za-zÅÄÖåäö\s-]{2,}$/.test(v);
const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const validateSubject = (v) => v.length >= 3;
const validateMessage = (v) => {
    increaseCount(v.length)
    return v.length >= 20;
}



const elements = {
    name: null,
    email: null,
    subject: null,
    message: null,
    form: null,
    resetBtn: null,
    charCount: null,
    successHost: null,
    successTimeoutId: null
}

const rules =[
    { el: "name",    validate: validateName,     errorMessage: "Namn behövs, åtminstone 2 tecken" },
    { el: "email",   validate: validateEmail,    errorMessage: "Email behövs åtminstone, t.ex: din@mail.se"  },
    { el: "subject", validate: validateSubject,  errorMessage: "Ämne behövs, åtminstone 3 tecken"  },
    { el: "message", validate: validateMessage,  errorMessage: "Meddelande behövs, åtminstone"  }
]

function initElements(){
    elements.name = document.getElementById("name");
    elements.email = document.getElementById("email");
    elements.subject = document.getElementById("subject");
    elements.message = document.getElementById("message");
    elements.form = document.getElementById("form");
    elements.resetBtn = document.getElementById("reset-form");
    elements.charCount = document.getElementById("char-count");
    elements.successHost = document.getElementById("success-message");
}

function init(){
    initElements();
    attachValidation();
    attachSubmit();
    attachReset();
    elements.successHost?.addEventListener("click", (e) => {
        if (e.target.classList.contains("bg-blur")) elements.successHost.innerHTML = "";
    });
}

function attachValidation(){
    for (const rule of rules){
        const element = elements[rule.el]
        if (!element) continue;
        element.addEventListener("input", () =>{
            const value = element.value.trim();
            let valid = rule.validate(value);
            //nooone likes errors they cant remove
            if (value === "" || valid) removeError(element) // if empty or valid remove error
            setColor(element, value ? valid : null)// if empty or valid remove error
        })
    }
}

function attachSubmit() {
    if (!elements.form) return;

    elements.form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!validateAll()) return;
        const firstName = (elements.name?.value.trim().split(/\s+/)[0] || "");
        showSuccess(firstName);
        resetForm();
    });
}


function attachReset() {
    if (!elements.resetBtn) return;
    elements.resetBtn.addEventListener("click", (e) => {
        e.preventDefault();
        resetForm();
    });
}


function validateAll(){
    let allOk = true;
    for (const rule of rules){
        const element = elements[rule.el];
        if (!element) continue;
        const value = element.value.trim();
        const valid = value === "" ? (rule.required ? false : null) : rule.validate(value);
        setColor(element, valid);
        if (valid === false) {
            allOk = false;
            setError(element, rule.errorMessage);
        } else {
            removeError(element);
        }
    }
    return allOk;
}

function resetForm() {
    for (const rule of rules) {
        const element = elements[rule.el];
        if (!element) continue;
        element.value = "";
        setColor(element, null);
        removeError(element);
    }

    if (elements.charCount) {
        elements.charCount.innerText = "0/20";
        elements.charCount.className = "char-count";
    }
}




function increaseCount(v) {
    const charCount = document.getElementById('char-count');
    if (v >= 20){
        charCount.innerText = "20/20";
        charCount.classList.add("char-count-reached");
    }else{
        charCount.innerText = `${v === 0 ? 0 : v}/20`;
        charCount.classList = "char-count";
    }
}




function setColor (element, valid) {
    if (valid == null) {
        element.classList.remove("invalid-outline", "valid-outline");
        return;
    }
    element.classList.toggle("valid-outline", valid === true);
    element.classList.toggle("invalid-outline", valid === false);
}


function setError(el, message) {
    removeError(el);
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");
    errorMessage.innerText = message;
    el.parentNode.insertBefore(errorMessage, el.nextSibling);
}

function removeError(el) {
    const next = el.nextElementSibling;
    if (next && next.classList.contains("error-message")) next.remove();
}

function showSuccess(firstName) {
    console.log(firstName);
    const el = document.getElementById("success-message");
    if (!el) return;
    el.innerHTML = getTyMessage(firstName);
    setTimeout(() =>{
        el.innerHTML = "";

    }, 4000)
}

function getTyMessage(firstName){
    return `
            <div class="bg-blur"></div>
            <div class="success-message">
                <p>Tack så mycket ${firstName}
            </div>
    `;
}



document.addEventListener("DOMContentLoaded", init);
