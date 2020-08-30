let baseUrl = "http://localhost:5000"
window.onload = async (a) => {
    let cases = []
    let totalCases = 0
    let totalRecovered = 0
    let totalActive = 0
    let totalDeaths = 0
    let country = 'world'

    let getGlobalCases = () => {
        return fetch(baseUrl + '/cases').then((response) => {
            return response.json()
        }).then((res) => {
            cases = res
        })
            .catch((err) => {
                console.log(err)
            })
    }
    
    let activeCases = (country) => {
        return fetch(baseUrl + '/' + country + '/active').then((response) => {
            return response.json()
        }).then((res) => {
            totalActive = res
        })
            .catch((err) => {
                console.log(err)
            }) 
    }

    let recoveredCases = (country) => {
        return fetch(baseUrl + '/' + country + '/recovered').then((response) => {
            return response.json()
        }).then((res) => {
            totalRecovered = res
        })
            .catch((err) => {
                console.log(err)
            })
    }

    let deathCases = (country) => {
        return fetch(baseUrl + '/' + country + '/deaths').then((response) => {
            return response.json()
        }).then((res) => {
            totalDeaths = res
        })
            .catch((err) => {
                console.log(err)
            })
    }

    let countryTotalCases = (country) => {
        return fetch(baseUrl + '/' + country + '/cases').then((response) => {
            return response.json()
        }).then((res) => {
            totalCases = res
        })
            .catch((err) => {
                console.log(err)
            })
    }

    await getGlobalCases()
    await activeCases(country)
    await recoveredCases(country)
    await deathCases(country)
    await countryTotalCases(country)
    
    document.getElementById('loading').style.display= "none"

    document.querySelector('#total-cases').innerHTML = totalCases
    document.querySelector('#total-recovered').innerHTML = totalRecovered
    document.querySelector('#total-active').innerHTML = totalActive
    document.querySelector('#total-deaths').innerHTML = totalDeaths

    let tbody = document.querySelector('#tbd');
    for (let data of cases) {
        let tr = tbody.appendChild(document.createElement('tr'));
        tr.setAttribute('onclick', `getCountry('${data.country}')`)
        tr.appendChild(document.createElement('td')).innerHTML = data.country
        tr.appendChild(document.createElement('td')).innerHTML = data.active
        tr.appendChild(document.createElement('td')).innerHTML = data.recovered
        tr.appendChild(document.createElement('td')).innerHTML = data.deaths
        tr.appendChild(document.createElement('td')).innerHTML = data.cases
    }
}