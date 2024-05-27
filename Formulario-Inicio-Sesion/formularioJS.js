$(document).ready(function(){


    console.log('Entrox2');
    let rut = $('#rut').val();
    let usuario = $('#NOMBRE').val();

    $('botonEnviar').click(function(event){

        if (usuario === '' || correo === '') {
            console.log('entro');
            alert('Tiene que completar todos los campos');
            event.preventDefault();
            return;
        }
        if (usuario.length < 5 || usuario.length > 30){
            alert('El nombre debe tener entre 5 y 30 caracteres');
            event.preventDefault();
            return;
        }

    })

});
