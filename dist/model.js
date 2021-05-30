//This is the class that will manage all your APIs

class Model {
    constructor() {
        this.cityData = []
    }

    async getDataFromDB() {
        const data = await $.get('/cities')

        data.forEach(element => {
            for (let i in this.cityData) {
                if (this.cityData[i].name == element.name) {
                    this.cityData[i]["saved"] = true
                    return
                }
            }
            this.cityData.push({...element, saved: true })
        })
        return this.cityData
    }

    async getCityData(cityName) {
        const data = await $.get(`/city/${cityName}`)

        this.cityData.push({
            name: data.name,
            temperature: (data.main.temp - 273.15).toFixed(2),
            condition: data.weather[0].main,
            conditionPic: data.weather[0].icon,
            saved: false
        })
        return this.cityData
    }

    async saveCity(cityObj) {
        const index = this.cityData.findIndex(element => cityObj == element.name)
        if (index == -1) {
            return
        }
        this.cityData[index].saved = true
        const obj = this.cityData[index]
        $.post('/city', { name: obj.name, temperature: obj.temperature, condition: obj.condition, conditionPic: obj.conditionPic }, function(response) {
            console.log(response)
        })
    }

    async removeCity(cityName) {
        const index = this.cityData.findIndex(element => cityName == element.name)
        if (index == -1) {
            return
        }
        this.cityData[index].saved = false
        $.ajax({
            url: `/city/${cityName}`,
            method: "DELETE",
            success: function() {}
        })

    }


}