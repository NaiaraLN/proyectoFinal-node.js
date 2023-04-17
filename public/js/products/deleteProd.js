(function(){
    const deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.addEventListener('click', async function deleteProd(e) {
        e.preventDefault();
        try {
            const id = document.getElementById('prodId').value;
            const respuesta = await fetch(`/productos/${id}`, { method: 'DELETE' });
            if (respuesta) {
                location.href = '/productos';
            }
        } catch (error) {
            console.log(error)
        }
    })
})();