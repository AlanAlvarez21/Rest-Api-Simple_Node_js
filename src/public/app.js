$(function (){

    $('#getProducts').on('click', function() { // se hace peticion al servidor para que nos devuelva un arreglo
        $.ajax({
            url: '/products/', // se hace la peticion a la ruta 
            success: function (products){ // se obtiene arreglo
                    let tbody = $('tbody'); // empieza a selecionnar el cuerpo de la tabla html
                    tbody.html(''); // método de jquery para limpiar las tablas
                    products.forEach(product => { // recorre todos los productos y los coloca en una sola fila 
                        tbody.append(`
                            <tr>
                                    <td class="id">${product.id}</td>
                                <td>
                                    <input type="text" class="name" value="${product.name}"/>
                                </td>
                                <td>
                                    <button class="update-button">Update</button>
                                    <button class="delete-button">Delete</button>
                                </td>
                            </tr>
                                    `)
                    })
            }
        })
    });

    $('#productForm').on('submit', function(e) {
    e.preventDefault();
    let newProduct = $('#newProduct'); 
    $('#productForm').val("");
    $.ajax({
        url: '/products/',
        method: 'POST',
        data: {
            name: newProduct.val()
        },
        success: function (response) {
            //console.log(response);
            $('#getProducts').click();
        }
    })

    
    });

    $('table').on('click', '.update-button', function () {
        let row = $(this).closest('tr');
        let id = row.find('.id').text();
        let name = row.find('.name').val();

        $.ajax({
            url: "/products/" + id,
            method: 'PUT',
            data: {
                name: name 
            },
            success: function (response){
                //console.log(response);
                $('#getProducts').click();

            }
        })
    });

    $('table').on('click', '.delete-button', function () {
        let row = $(this).closest('tr');
        let id = row.find('.id').text();

        $.ajax({
            url: "/products/" + id,
            method: 'DELETE',
            success: function (response){
                console.log(response);
                $('#getProducts').click();

            }
        })
    });
})
 