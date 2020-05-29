let socket = io('http://localhost:8080/')

let colorSelected = {
    red: 0,
    green: 0,
    ble: 0
}

$('#serial').submit( function(event) {
    event.preventDefault()
    const port = document.serial.port.value
    const baud = document.serial.baud.value
    if(port.length && baud.length){
        socket.emit('serial',{port, baud})
    }
})

const sliders = document.querySelectorAll('.sliderDiv')
sliders.forEach(e => {
    const slider = e.children[0]
    const p = e.children[1]
    // console.log(slider,p)
    const colorDiv = document.querySelector('.color')
    slider.oninput = () => {
        p.innerHTML = slider.value
        socket.emit('color',{
            color: slider.id,
            value: slider.value
        })
        colorSelected[`${slider.id}`] = slider.value
        colorDiv.style.background = `rgb(${colorSelected.red},${colorSelected.green},${colorSelected.blue})`
    }
})