(function () {

    let allRecepiesEl = document.getElementById("allRecepies");
    let favRecepies = document.getElementById("favRecepies");
    let createRecepie = document.getElementById("createRecepie");
    let myProfile = document.getElementById("myProfile");
    let errorPage = document.getElementById("errorPage");

    let selectEl = document.getElementById("selectEl");
    selectEl.addEventListener('change', filterByIngredient);
    let selectElOptions = []; //! това реално може да се ползва set

    let searchNameInput = document.getElementById('searchNameInput');
    searchNameInput.addEventListener("keyup", filterByName);

    let searchDiv = document.getElementById("searchDiv");

    let profileSubmitButton = document.getElementById('profileSubmitBtn');

    let createNewRecepieButton = document.getElementById("addRecepieBtn");

    //!Create and add new recepie to recepiesManager all recepies
    createNewRecepieButton.addEventListener('click', function (e) {
        e.preventDefault();
        let inputs = Array.from(document.querySelectorAll(".newRecInput")).map(el => el.value); //взимаме наведнъж всички инпут+text area елементи от формата
        // console.log(inputs);

        let newRecepie = new Recepie(...inputs);
        recepiesManager.add(newRecepie);

        //зачистване на полетата след създаване на нова рецепта
        console.log(inputs);
        Array.from(document.querySelectorAll(".newRecInput")).forEach(input => {
            input.value = '';
        })
    })

    //!Change profile info
    profileSubmitButton.addEventListener('click', function (e) {
        e.preventDefault();

        let usernameNew = document.getElementById("username").value;
        let userAgeNew = document.getElementById("userAge").value;
        let userAddressNew = document.getElementById("userAddress").value;
        let userProfilePicNewSrc = document.getElementById("profileImage").value;

        if (!usernameNew || !userAgeNew || !userAddressNew || !userProfilePicNewSrc) {
            let errorDiv = document.getElementById("alertDiv");
            console.log(errorDiv);
            errorDiv.style.display = "block";
            setTimeout(() => {
                errorDiv.style.display = "none";
            }, 3000);
            return;
        }

        user.name = document.getElementById("username").value;
        userAgeEl = document.getElementById("userAge").value;
        userAddressEl = document.getElementById("userAddress").value;

        document.getElementById("profilePic").src = document.getElementById("profileImage").value;
    })

    window.addEventListener("load", showPage);
    window.addEventListener("hashchange", showPage);

    //!create new user
    let user = new User();

    //!create recepiesManager
    let recepiesManager = new RecepiesManager();

    //!fill recepie manager with recepies form data source
    recepies.forEach(rece => {

        let recepie = new Recepie(...Object.values(rece));

        recepiesManager.add(recepie); //!add recepie to recepiesManager

        //!fill the select options array with unique ingredients
        for (let i = 0; i < recepie.ingredients.length; i++) {
            if (!selectElOptions.includes(recepie.ingredients[i])) { //за да не се дублират съставки
                selectElOptions.push(recepie.ingredients[i]);
            }
        }

    });

    //!traverse the all ingredients array to create option element and append it to select element
    selectElOptions.forEach(ingredient => {
        let option = document.createElement('option');
        option.innerText = ingredient;
        selectEl.appendChild(option);
    })

    //!Show Page
    function showPage(e) {
        //при първоначално зареждане, когато hash реално ни е празен стринг ''
        if (location.hash == '') {
            location.hash = "#allRecepies";
        }

        let hash = location.hash.slice(1);

        switch (hash) {
            case "allRecepies":
                allRecepiesEl.style.display = "flex";
                favRecepies.style.display = "none";
                createRecepie.style.display = "none";
                myProfile.style.display = "none";
                errorPage.style.display = "none";
                searchDiv.style.display = "flex";
                printElements(recepiesManager.allRecepies, allRecepiesEl);
                break;
            case "favRecepies":
                allRecepiesEl.style.display = "none";
                favRecepies.style.display = "flex";
                createRecepie.style.display = "none";
                myProfile.style.display = "none";
                errorPage.style.display = "none";
                searchDiv.style.display = "flex";
                printElements(user.favoriteRecepies, favRecepies);
                break;
            case "createRecepie":
                allRecepiesEl.style.display = "none";
                favRecepies.style.display = "none";
                createRecepie.style.display = "flex";
                myProfile.style.display = "none";
                errorPage.style.display = "none";
                searchDiv.style.display = "none";
                break;
            case "myProfile":
                allRecepiesEl.style.display = "none";
                favRecepies.style.display = "none";
                createRecepie.style.display = "none";
                myProfile.style.display = "flex";
                errorPage.style.display = "none";
                searchDiv.style.display = "none";
                showCoockedRecepies(user.coockedRecepies);
                break;
            default:
                allRecepiesEl.style.display = "none";
                favRecepies.style.display = "none";
                createRecepie.style.display = "none";
                myProfile.style.display = "none";
                errorPage.style.display = "flex";
                searchDiv.style.display = "none";
                errorMessage();
                break;
        }

    }

    //!Print elements (recepies)
    function printElements(elements, container) {
        //!Преви всяко викане трябва да се зачисти
        container.innerHTML = '';

        elements.forEach(el => {
            let div = document.createElement("div");
            div.classList.add('recepie');

            let a = document.createElement('a');
            a.classList.add("recLink");
            a.href = el.href;

            let img = document.createElement('img');
            img.classList.add("recImg");
            img.src = el.thumbnail;
            a.appendChild(img);

            let h2 = document.createElement('h2');
            h2.classList.add("recTitle");
            h2.textContent = el.title;

            let div1 = document.createElement('div');
            div1.classList.add("recIngredients");
            div1.textContent = el.ingredients.join(", ");

            let div2 = document.createElement('div');
            div2.classList.add('recButtonsDiv');

            let btn1 = document.createElement('button');
            let btn2 = document.createElement('button');
            btn1.classList.add("recBtn");
            btn2.classList.add("recBtn");

            if (user.recepieIsLiked(el)) {
                btn1.textContent = "Премахни от любими";
            } else {
                btn1.textContent = "Добави в любими";
            }

            btn2.textContent = "Сготви";

            div2.append(btn1, btn2);

            div.append(a, h2, div1, div2);
            container.appendChild(div);

            btn1.addEventListener('click', function (e) {
                if (!user.recepieIsLiked(el)) {
                    user.addToFavorites(el);
                    btn1.textContent = 'Премахни от любими';
                } else {
                    user.removeFromFavorites(el); //remove from user favorite recepies arr
                    btn1.textContent = "Добави в любими";
                    if (location.hash == "#favRecepies") {
                        e.target.parentElement.parentElement.remove(); //remove the DOM element from favRecepies page
                    }

                }
            })

            btn2.addEventListener('click', function (e) {
                user.addToCookedRecepies(el);
            })


        });

    }



    //!Filter by ingredient function
    function filterByIngredient(e) {
        // console.log(e.target.value);
        let filteredRecepies = recepiesManager.filterIngredient(e.target.value);
        if (location.hash === "#allRecepies") {
            printElements(filteredRecepies, allRecepiesEl);
        } else if (location.hash === "#favRecepies") {
            printElements(filteredRecepies, favRecepies);
        }

    }

    //!Filter by name function
    function filterByName(e) {
        // console.log(e.target.value);
        let filteredRecepies = recepiesManager.filterName(e.target.value);
        if (location.hash === "#allRecepies") {
            printElements(filteredRecepies, allRecepiesEl);
        } else if (location.hash === "#favRecepies") {
            printElements(filteredRecepies, favRecepies);
        }
    }

    //!Error page redirect after 5 seconds
    function errorMessage() {

        let timeEl = document.getElementById("timeEl");
        timeEl.textContent = '';
        timeEl.style.color = "white";
        let seconds = 5;

        let time = setInterval(takeTime, 1000);

        function takeTime() {
            timeEl.textContent = `${seconds}`;
            seconds--;
            if (seconds == 0) {
                clearInterval(time);
                location.hash = "#allRecepies";
            }

        }
    }

    //!Зареди сготвените рецепти и също така, попълни полетата за промяна на данните на юзъра с текущите данни
    function showCoockedRecepies(coockedRecepies) {
        let usernameEl = document.getElementById("username");
        let userAgeEl = document.getElementById("userAge");
        let userAddressEl = document.getElementById("userAddress");
        let profileImageEl = document.getElementById("profileImage");

        usernameEl.value = user.name;
        userAgeEl.value = user.age;
        userAddressEl.value = user.address;



        let table = document.getElementById("coockedRecepiesTable");

        for (const recepieTitle in coockedRecepies) {
            let tr = document.createElement("tr");

            let td1 = document.createElement('td');
            let td2 = document.createElement('td');

            td1.textContent = recepieTitle;
            td2.textContent = coockedRecepies[recepieTitle];

            tr.append(td1, td2);
            table.appendChild(tr)

        }

    }






})();