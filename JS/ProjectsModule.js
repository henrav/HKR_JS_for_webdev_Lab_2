    import { projectsData} from "./projectData.js";
    const projects = projectsData;
    const filters = {
        webdev : "Web dev",
        java : "Java",
        C:"C",
        Cpp: "C++"
    }
    const elements =[

    ]

    window.addEventListener("DOMContentLoaded", () =>{
        const el = document.getElementById("article_ID");
        loadCards(el);
    })

    function loadCards(el){
        for (let i = 0; i < projects.length; i++){
            el.innerHTML += getCard(projects[i]);
            elements.push(el);
        }
    }


    function getCard(project) {
        return `<div class="card" id="card-${project.id}" datatype="${project.category}">
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