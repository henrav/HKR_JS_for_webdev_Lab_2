
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
            { el: this.name,    validate: validateName,    required: true },
            { el: this.email,   validate: validateEmail,   required: true },
            { el: this.subject, validate: validateSubject, required: true },
            { el: this.message, validate: validateMessage, required: true },
        ].filter(r => r.el);
    }

    attachListeners(){
        if (this.name) this.attach(this.name, validateName );
        if (this.email) this.attach(this.email, validateEmail)
        if (this.subject) this.attach(this.subject, validateSubject)
        if (this.message) this.attach(this.message, validateMessage)
        if (this.form) this.onSubmit();
    }

    attach(element, validatorFunc, required = false){
        element.addEventListener("input", () => {
            const value = element.value.trim();
            setColor(element, value ? validatorFunc(value) : null)
        })
    }

    validateAll(){
        let allValid = true;
        for (const {el, validate, required} of this.fieldRules()){
            const value = el.value.trim();
            const valid = value === "" ? required ? false : null : validate(value);
            setColor(el, valid);
            if (valid === false) allValid = false;
            setError(el, "tjena")
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
const validateMessage = (v) => v.length >= 10;

class FormValidator{
    constructor() {}


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


function setError(element, message){
    const errorMessage = document.createElement("span");
    errorMessage.classList.add("error-message")
    errorMessage.innerText = message;
    errorMessage.id = element.
    element.appendChild(errorMessage);
}

function removeSpan(element){
    element.removeChild(d)
}


