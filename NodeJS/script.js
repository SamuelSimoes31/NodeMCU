const botaoTeste = document.getElementById('teste')
botaoTeste.onclick = e => {
    $.ajax({
        url: 'teste',
        data: {string: 'AAAAA'},
        success(data){
            console.log(data)
        }
    })

}