(function () {
    const updateBtn = document.getElementById('updateBtn');
    updateBtn.addEventListener('click', async function updateProd(e) {
        e.preventDefault()
        try {
            const id = document.getElementById('prodId').value;
            const name = document.getElementById('prodName');
            const description = document.getElementById('prodDesc');
            const category = document.getElementById('prodCat');
            const code = document.getElementById('prodCode');
            const thumbnail = document.getElementById('prodImg');
            const price = document.getElementById('prodPrice');
            const product = {
                name: name.value,
                description: description.value,
                category: category.value,
                code: code.value,
                thumbnail: thumbnail.value,
                price: price.value
            }
            const respuesta = await fetch(`/productos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            if(respuesta){
                location.href = '/productos'
            }

        } catch (error) {
            console.log(error)
        }

    })
})();