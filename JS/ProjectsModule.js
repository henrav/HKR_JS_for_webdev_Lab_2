    import { projectsData} from "./projectData.js";
    const projects = projectsData;
    const filters = {
        webdev : "Web dev",
        java : "Java",
        C:"C",
        Cpp: "C++"
    }
    const buttons = {
        webBtn: null,
        cBtn: null,
        cppBtn: null,
        javaBtn: null
    }

    const elements =[]

    window.addEventListener("DOMContentLoaded", () =>{
        const el = document.getElementById("article_ID");
        loadCards(el);
        initBtns();
    })

    function loadCards(el){
        for (let i = 0; i < projects.length; i++){
            const element = getCard(projects[i]);
            el.insertAdjacentHTML("beforeend", element);

            elements.push(el.lastElementChild);
        }
    }

    function initBtns(){
        buttons.webBtn = document.getElementById("webDev");
        buttons.cBtn = document.getElementById("cBtn");
        buttons.cppBtn = document.getElementById("cppBtn");
        buttons.javaBtn = document.getElementById("javaBtn");
        for (const key in buttons){
            const b = buttons[key];
            if (b) b.addEventListener("click", () =>{
                filterProjects(b.dataset.category);
            })
        }
    }

    function filterProjects(category) {
        console.log(category);

        for (let i = 0; i < elements.length; i++){
            const el = elements[i];

            console.log(el.dataset.category);

            if (el.dataset.category === category) {
                el.style.display = "flex";
            } else {
                el.style.display = "none";
            }
        }
    }


    function getCard(project) {
        return `<div class="card" id="card-${project.id}" data-category="${project.category}">
            <header class="card_header">
                <h2 class="card_title">${project.title}</h2>
                <p class="card_subtitle">${project.description}</p>
            </header>
    
            <div class="picture-container">
                <picture>
                    <source srcset="../${project.image}"/>
                    <img src="../${project.image}" alt=""/>
                </picture>
            </div>
            <div class="ul-container">
                ${getPills(project.technologies)}
            </div>
            <footer class="card_footer">
                <a class="btn" href="">Förstora</a>
                <a class="btn btn--ghost" href="${project.link}">Link</a>
            </footer>
        </div>`;
    }
    function getPills(list) {
        return `
            <ul class="pill-list">
                 ${list.map(getPill).join("")}
            </ul>`;
    }

    function getPill(tech) {
        return `<li class="pill">${tech}</li>`;
    }