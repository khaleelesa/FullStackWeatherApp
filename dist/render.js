class Render {

    constructor() {
        this.weatherTemplate = $(`#weather-template`).html()
        this.weatherSelector = Handlebars.compile(this.weatherTemplate);
    }

    renderdata(cities) {
        const newHTML = this.weatherSelector({ cities });
        $('.CityData').empty().append(newHTML);
    }

    changeIcon(object, saved) {
        if (!saved) {
            $(object).removeClass().addClass("fas fa-minus-circle subBtn")
        } else {
            $(object).removeClass().addClass("fas fa-plus-circle addBtn")
        }
    }
}