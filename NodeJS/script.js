const botaoTeste = document.getElementById('teste')
botaoTeste.onclick = e => {
    const inputTexto = document.getElementsByName('testeTexto')
    $.ajax({
        url: 'teste',
        data: {string: inputTexto[0].value},
        success(data){
            console.log(data)
        }
    })

}

const sliderRed = document.getElementById('red')
sliderRed.oninput = () => {
    $.ajax({
        url: 'teste',
        data: {string: sliderRed.value}
    })
}