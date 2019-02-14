$.ajax({
    url: 'data/grammys.json',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
        console.log(data)
        let select = document.getElementById('category_types')
        for (const field of data.fields) {
            var option = document.createElement('option')
            option.value = field.field_id
            option.text = field.field
            select.appendChild(option)        
        }
        loadFieldCategories(data)
    },
    error: (error_msg) => {
        console.log(error_msg)
    },
})


loadFieldCategories = (data) => {
    document.getElementById('category_types').onchange = function() {
        let id = this.value
        for (const field of data.fields) {
            if (field.field_id == id) {
                // Here we have the field selected
                let section = document.getElementById('nominees_section')
                while(section.firstChild) {
                    section.removeChild(section.firstChild)
                }
                for (const category of field.categories) {
                    var divElement = document.createElement('div')
                    var catElement = document.createElement('h2')
                    var ulNomineesElement = document.createElement('ul')
                    let nominees = category.nominees
                    var nomineeIndex = 0
                    for (const nominee of nominees) {
                        var liNomineeElement = document.createElement('li')
                        liNomineeElement.textContent = nominee.nominee
                        if (nomineeIndex == category.winner_id) {
                            var spanElement = document.createElement('span')
                            spanElement.textContent = 'WINNER'
                            spanElement.classList.add('winner')
                            liNomineeElement.appendChild(spanElement)
                        }
                        ulNomineesElement.appendChild(liNomineeElement)
                        ulNomineesElement.append(document.createElement('br'))
                        var artistElement = document.createElement('p')
                        artistElement.textContent = nominee.artist
                        ulNomineesElement.appendChild(artistElement)
                        nomineeIndex ++
                    }
                    catElement.textContent = category.category_name
                    divElement.appendChild(catElement)
                    divElement.appendChild(ulNomineesElement)
                    section.appendChild(divElement)
                }
            }
        }
    }
}
