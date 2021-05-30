const model = new Model()
const view = new Render()

$(`#btn`).on('click', async function() {
    const cityName = $('#city-input').val()
    if (!cityName)
        alert("please enter a city")
    model.getCityData(cityName).then(val => view.renderdata(val))
})

window.onload = async(event) => {
    const data = await model.getDataFromDB()
    view.renderdata(data)
};

$(".CityData").on('click', '.addBtn', async function() {
    await model.saveCity($(this).siblings('span').text())
    view.renderdata(data)
    view.changeIcon(this, false)
})

$(".CityData").on('click', '.subBtn', async function() {
    await model.removeCity($(this).siblings('span').text())
    view.renderdata(data)
    view.changeIcon(this, true)
})