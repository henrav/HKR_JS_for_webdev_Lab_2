

class FormFields {
    constructor() {
        this.name = document.getElementById("name");
        this.email = document.getElementById("email");
        this.subject = document.getElementById("subject");
        this.message = document.getElementById("message");
        this.form = document.getElementById("form");
    }
    fieldRules() {
        return [
            { el: this.name,    validate: validateName,    required: true, errorMessage: "Name is required, at least 2 chars" },
            { el: this.email,   validate: validateEmail,   required: true, errorMessage: "Email is required, eg: din@mail.se"  },
            { el: this.subject, validate: validateSubject, required: true, errorMessage: "Subject is required, at least 3 chars"  },
            { el: this.message, validate: validateMessage, required: true, errorMessage: "Message is required, at least 20 chars"  },
        ].filter(r => r.el);
    }

    attachListeners(){
        if (this.name) this.attach(this.name, validateName );
        if (this.email) this.attach(this.email, validateEmail)
        if (this.subject) this.attach(this.subject, validateSubject)
        if (this.message) this.attach(this.message, validateMessage, increaseCount)
        if (this.form) this.onSubmit();
    }

    attach(element, validatorFunc, optionalFunc = null){
        element.addEventListener("input", () => {
            const value = element.value.trim();
            let valid = validatorFunc(value);
            if (valid) removeError(element);
            setColor(element, value ? valid : null)
            if (optionalFunc != null){
                optionalFunc();
            }
        })
    }

    validateAll(){
        let allValid = true;
        for (const {el, validate, required, errorMessage} of this.fieldRules()){
            const value = el.value.trim();
            const valid = value === "" ? required ? false : null : validate(value);
            setColor(el, valid);
            if (valid === false){
                allValid = false;
                setError(el, errorMessage )
            }
        }
        return allValid;
    }

    onSubmit() {
        this.form.addEventListener("submit", (e) => {
            if (!this.validateAll()) e.preventDefault();
        });
    }
}
const validateName = (v) => v.length >= 2;
const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const validateSubject = (v) => v.length >= 3;
const validateMessage = (v) => v.length >= 20;

function increaseCount() {
    const message = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    const length = message.value.trim().length;
    charCount.innerText = `${length === 0 ? 0 : length}/20`;
}






document.addEventListener('DOMContentLoaded', function () {
    const fields = new FormFields();
    fields.attachListeners();


});



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
    const next = el.nextSibling;
    if (next && next.classList && next.classList.contains("error-message")) {
        next.remove();
    }
}


