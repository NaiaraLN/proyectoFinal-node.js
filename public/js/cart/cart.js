(function(){
    const deleteBtn = document.getElementById('delCartProd');
    deleteBtn.addEventListener('click', async function deleteProd(e) {
        e.preventDefault();
        try {
            const id = document.getElementById('cartProd').value;
            const respuesta = await fetch(`/carrito/${id}`, { method: 'DELETE' });
            if (respuesta) {
                location.href = '/carrito';
            }
        } catch (error) {
            console.log(error)
        }
    })

    const emptyCart = document.getElementById('emptyCart');
    emptyCart.addEventListener('click', async function deleteProd(e) {
        e.preventDefault();
        try {
            const respuesta = await fetch('/carrito', { method: 'DELETE' });
            if (respuesta) {
                location.href = '/carrito';
            }
        } catch (error) {
            console.log(error)
        }
    })

    const updateQty = document.getElementById('updateQty');
    updateQty.addEventListener('click', async function updateProd(e) {
        e.preventDefault()
        try {
            const id = document.getElementById('_id').value;
            const name = document.getElementById('name');
            const description = document.getElementById('description');
            const category = document.getElementById('category');
            const code = document.getElementById('code');
            const thumbnail = document.getElementById('thumbnail');
            const price = document.getElementById('price');
            const quantity = document.getElementById('qty')
            const product = {
                name: name.value,
                description: description.value,
                category: category.value,
                code: code.value,
                thumbnail: thumbnail.value,
                price: price.value,
                quantity: quantity.value
            }
            const respuesta = await fetch(`/carrito/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            if(respuesta){
                location.href = '/carrito'
            }

        } catch (error) {
            console.log(error)
        }

    })

})();