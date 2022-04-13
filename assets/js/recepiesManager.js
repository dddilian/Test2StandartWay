class RecepiesManager {
    constructor() {
        this.allRecepies = [];
    }

    add(recepie) {
        if (recepie instanceof Recepie) {
            this.allRecepies.push(recepie);
        }
    }

    filterIngredient(ingredient) {
        return this.allRecepies.filter(rec => rec.ingredients.includes(ingredient));
    }

    filterName(text) {
        return this.allRecepies.filter(rec => rec.title.toLowerCase().includes(text.toLowerCase()));
    }


}