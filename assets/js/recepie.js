class Recepie {

    constructor(title, href, ingredients, thumbnail) {
        this.title = title;
        this.href = href;
        this.ingredients = ingredients.split(", ");
        this.thumbnail = thumbnail;
        this.timesCooked = 0;
    }

}