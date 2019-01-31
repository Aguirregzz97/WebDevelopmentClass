let inputItem = document.getElementById('newItem')
inputItem.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        if (document.getElementById('newItem').value === '') {
            alert('need to have a value bro')
            return
        }
        let ul = document.getElementById('unL')
        let li = document.createElement('li')
        let span = document.createElement('SPAN')
        span.classList.add('spanC')
        span.appendChild(document.createTextNode(document.getElementById('newItem').value))
        let newCB = document.createElement('input')
        newCB.classList.add('checkbox')
        newCB.setAttribute('type', 'checkbox')
        li.appendChild(newCB)
        li.appendChild(span)
        ul.appendChild(li)
        updateCheckboxes()
        document.getElementById('newItem').value = ''
    }
})

updateCheckboxes = () => {
    checkboxes = document.getElementsByClassName('checkbox')
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('click', () => {
            let checked = checkboxes[i].checked
            if(checked) {
                sp[i].classList.add('done')
            }
            if (!checked) {
                sp[i].classList.remove('done')
            }
        })
    }
}

var checkboxes = document.getElementsByClassName('checkbox')
let sp = document.getElementsByClassName('spanC')
for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('click', () => {
        let checked = checkboxes[i].checked
        if(checked) {
            sp[i].classList.add('done')
        }
        if (!checked) {
            sp[i].classList.remove('done')
        }
    })
}
let h = document.getElementById('heading')
setInterval(() => {
    let r = Math.round(255 * Math.random())
    let g = Math.round(255 * Math.random())
    let b = Math.round(255 * Math.random())
    h.style.color = 'rgb(' + r + ',' + g + ',' + b + ')'
}, 1000)

// yes