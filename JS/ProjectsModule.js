        import { projectsData} from "./projectData.js";
        const projects = projectsData;


        const state = {
            els : [],
            filters : ["Web dev", "Java", "C", "C++", "All"],
            buttons : [],
            activeFilter : null,
            activeCount : projects.length
        }

        window.addEventListener("DOMContentLoaded", () =>{
            const el = document.getElementById("article_ID");
            loadCards(el);
            initBtns();
        })



        /**
         * load all project cards into the state and the given element
         * @param el - element to load cards into eg. "article_ID"
         */
        function loadCards(el){
            for (let i = 0; i < projects.length; i++){
                const element = getCard(projects[i]);
                el.appendChild(element);
                state.els.push(element);
            }
        }

        // show count of active projects
        function showCount(n) {
            document.getElementById("count").innerText = `Showing ${n}/${projects.length}`;
        }



        // initialize filter buttons
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
            state.buttons.push(document.getElementById("allBtn"));
            state.buttons[state.buttons.length -1].addEventListener("click", () =>{
                removeFilters();
                showCount(state.activeCount);
                showFilterPopup("added", "all")
            })
        }


        /**
         * toggle filter on/off
         * @param btn - button element clicked
         */
        function toggleFilter(btn){
            const category = btn.dataset.category;
            //if active filter == clicked filter, remove filters
            if (category === state.activeFilter) {
                removeFilters();
                state.activeFilter = null;
                showFilterPopup("removed", category)
                return;
            }
            //else apply filter
            filterProjects(category);
            showFilterPopup("added", category)
            removeActive();
            btn.classList.add("active");
            state.activeFilter = category;
        }

        /**
         * adds a popup showing which filter was applied/removed
         * @param text - text to show
         * @param filter - filter applied/removed
         */
        function showFilterPopup(text, filter){
            const el = document.getElementById("aside")
            //remove existing popup if any
            if (el.children.namedItem("popup")) el.removeChild(document.getElementById("popup"))
            const nyEl = getFilterPopup(text, filter);
            const cross = getCloseCross();
            nyEl.appendChild(cross);
            // add event listener to cross to remove popup
            cross.addEventListener("click", () =>{
                el.removeChild(nyEl);
            })
            el.append(nyEl);
            setTimeout(() =>{
                if (el.contains(nyEl))
                el.removeChild(nyEl);
            }, 5000);
        }


        // create filter popup element and return it
        function getFilterPopup(text, filter){
            const el = document.createElement("div");
            el.id = "popup";
            el.classList.add("filter-applied");
            el.innerText = text + " filter " + filter;
            return el;
        }

        // create close cross element and return it
        function getCloseCross(){
            const el = document.createElement("div");
            el.id = "cross";
            el.classList.add("x");
            return el;
        }


        // remove active class from all buttons
        function removeActive(){
            state.buttons.forEach(btn => {btn.classList.remove("active")})
        }


        // remove all filters and show all projects
        function removeFilters() {
            state.els.forEach(el =>{
                el.style.display = "flex"
            })
            removeActive();
            state.activeCount = projects.length;
        }

        /**
         * filter projects by category
         * @param category - category to filter by
         */
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


        /**
         * create a project card element
         * @param project - project data
         * @returns {HTMLDivElement} - project card element
         */
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
                    <a class="btn" href="${project.link}" target="_blank">Link</a>
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