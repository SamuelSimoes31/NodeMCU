// const botaoTeste = document.getElementById('teste')
// botaoTeste.onclick = e => {
//     const inputTexto = document.getElementsByName('testeTexto')
//     $.ajax({
//         url: 'teste',
//         data: {string: inputTexto[0].value},
//         success(data){
//             console.log(data)
//         }
//     })

// }

// const sliderRed = document.getElementById('red')
// sliderRed.oninput = () => {
//     $.ajax({
//         url: 'teste',
//         data: {string: sliderRed.value}
//     })
// }

const sliders = document.querySelectorAll('#sliders div')
sliders.forEach(e => {
    const slider = e.children[0]
    const p = e.children[1]
    // console.log(slider,p)
    slider.oninput = () => {
        p.innerHTML = slider.value
        $.ajax({
            url: 'rgb',
            data : {
                color: slider.id,
                value: slider.value
            }
        })
    }
})