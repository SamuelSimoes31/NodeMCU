let socket = io('http://localhost:8080/')

const sliders = document.querySelectorAll('.sliderDiv')

var colorSelected = {
    red: 0,
    green: 0,
    blue: 0
}

$('#serial').submit( function(event) {
    event.preventDefault()
    const port = document.serial.port.value
    const baud = document.serial.baud.value
    if(port.length && baud.length){
        socket.emit('serial',{port, baud})
    }
})

socket.on('serialState', function(state) {
    console.log('state:',state)
    const btn = document.serial.submit
    const port = document.serial.port
    const baud = document.serial.baud
    document.serial.submit.value = state?'CLOSE':'OPEN'
    if(state) {
        btn.value = 'CLOSE'
        port.setAttribute("disabled", "disabled")
        baud
        sliders.forEach(e => {
            e.children[0].removeAttribute("disabled")
        })
    }
    else{
        btn.value = 'OPEN'
        port.removeAttribute("disabled")
        baud.removeAttribute("disabled")
        sliders.forEach(e => {
            e.children[0].setAttribute("disabled", "disabled")
        })
    }
})

socket.on('disconect',() => {
    console.log('morreu')
})

sliders.forEach(e => {
    const slider = e.children[0]
    const p = e.children[1]
    console.log(slider,p)
    const colorDiv = document.querySelector('.color')
    slider.oninput = () => {
        p.innerHTML = slider.value
        colorSelected[`${slider.id}`] = slider.value
        socket.emit('color',colorSelected)
        colorDiv.style.background = `rgb(${colorSelected.red},${colorSelected.green},${colorSelected.blue})`
    }
})