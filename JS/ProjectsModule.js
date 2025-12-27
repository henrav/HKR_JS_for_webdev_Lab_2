        import { projectsData} from "./projectData.js";
        const projects = projectsData;


        const state = {
            els : [],
            filters : ["Web dev", "Java", "C", "C++"],
            buttons : [],
            activeFilter : null,
            activeCount : projects.length
        }

        window.addEventListener("DOMContentLoaded", () =>{
            const el = document.getElementById("article_ID");
            loadCards(el);
            initBtns();
        })

        function loadCards(el){
            for (let i = 0; i < projects.length; i++){
                const element = getCard(projects[i]);
                el.appendChild(element);
                state.els.push(element);
            }
        }
        function showCount(n) {
            document.getElementById("count").innerText = `Showing ${n}/${projects.length}`;
        }



        function initBtns(){
            state.buttons.push(document.getElementById("webDev"));
            state.buttons.push(document.getElementById("cBtn"));
            state.buttons.push(document.getElementById("cppBtn"));
            state.buttons.push(document.getElementById("javaBtn"));
            state.buttons.forEach(b => {
                b.addEventListener("click", () =>{
                    toggleFilter(b)
                    showCount(state.activeCount);
                })
            })
        }



        function toggleFilter(btn){
            const category = btn.dataset.category;
            if (category === state.activeFilter) {
                removeFilters();
                state.activeFilter = null;
                showFilterPopup("removed", category)
                return;
            }
            filterProjects(category);
            showFilterPopup("added", category)
            removeActive();
            btn.classList.add("active");
            state.activeFilter = category;
        }

        function showFilterPopup(text, filter){
            const el = document.getElementById("interactive-container")
            if (el.children.namedItem("popup")) el.removeChild(document.getElementById("popup"))
            const nyEl = getFilterPopup(text, filter);
            const cross = getCloseCross();
            nyEl.appendChild(cross);
            cross.addEventListener("click", () =>{
                el.removeChild(nyEl);
            })
            el.append(nyEl);
            setTimeout(() =>{
                el.removeChild(nyEl);
            }, 5000);
        }

        function getFilterPopup(text, filter){
            const el = document.createElement("div");
            el.id = "popup";
            el.classList.add("filter-applied");
            el.innerText = text + " filter " + filter;
            return el;
        }

        function getCloseCross(){
            const el = document.createElement("div");
            el.id = "cross";
            el.classList.add("x");
            return el;
        }



        function removeActive(){
            state.buttons.forEach(btn => {btn.classList.remove("active")})
        }

        function removeFilters() {
            state.els.forEach(el =>{
                el.style.display = "flex"
            })
            removeActive();
            state.activeCount = projects.length;
        }

        function filterProjects(category) {
            state.activeCount = 0;
            state.els.forEach(el =>{
                if (el.dataset.category === category){
                    el.style.display = "flex"
                    state.activeCount++;
                }else{
                    el.style.display = "none"
                }
            })
        }


        function getCard(project) {
            const div = document.createElement("div")
            div.dataset.category = project.category;
            div.id = project.id;
            div.classList.add("card");
            div.innerHTML = `
                <header class="card_header">
                    <h2 class="card_title">${project.title}</h2>
                    <p class="card_subtitle">${project.description}</p>
                </header>
        
                <div class="picture-container">
                    <picture>
                        <source srcset="../${project.image}"/>
                        <img src="../${project.image}" alt="" loading="lazy"/>
                    </picture>
                </div>
                <div class="ul-container">
                    ${getPills(project.technologies)}
                </div>
                <footer class="card_footer">
                    <a class="btn" href="">Förstora</a>
                    <a class="btn btn--ghost" href="${project.link}">Link</a>
                </footer>`;
            return div;
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