class User {

    constructor() {
        this.name = "John Doe";
        this.age = 30;
        this.address = "USA, New York, Nowhere str. 10";
        this.img = "";
        this.favoriteRecepies = [];
        this.coockedRecepies = {};
    }

    addToFavorites(recepie) {
        if (this.favoriteRecepies.indexOf(recepie) === -1) { //ако не се съдържа
            this.favoriteRecepies.push(recepie);
        }
    }

    removeFromFavorites(recepie) {
        if (this.favoriteRecepies.indexOf(recepie) !== -1) { //ако не се съдържа
            let recepieIndex = this.favoriteRecepies.indexOf(recepie);
            this.favoriteRecepies.splice(recepieIndex, 1);
        }
    }

    recepieIsLiked(recepie) {
        return this.favoriteRecepies.indexOf(recepie) !== -1
    }

    addToCookedRecepies(recepie) {
        if (this.coockedRecepies[recepie.title]) {
            this.coockedRecepies[recepie.title]++;
        } else {
            this.coockedRecepies[recepie.title] = 1;
        }
    }




}