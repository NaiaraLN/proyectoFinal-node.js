const renderCards = (products) => {
    return products.map((prod) => {
        return `
        <div>
            <h2>${prod.name}</h2>
            <img src=${prod.thumbnail} alt=${prod.name}>
            <p>${prod.description}</p>
            <p>${prod.price}</p>
            <p>${prod.stock}</p>
            <button onclick="${prod.id}">Actualizar</button>
            <button onclick="deleteProd(${prod.id})">Eliminar</button>
        </div>
        `
    })
}
const renderForm = () => {
    return `
    <h1>Ingrese producto</h1>
    <form>
        <input type="number" id="id" name="id" value="id" placeholder="id">
        <input type="name" id="name" name="name" value="name" placeholder="name">
        <input type="text" id="description" name="description" value="desciption" placeholder="descripción">
        <input type="number" id="code" name="code" value="code" placeholder="código">
        <input type="url" id="thumbnail" name="thumbnail" value="thumbnail" placeholder="url">
        <input type="number" id="price" name="price" value="price" placeholder="price">
        <input type="number" id="stock" name="stock" value="stock" placeholder="stock">
        <button onclick="postProd()">Enviar</button>
    </form>
    `
}

const main = () => {
    fetch('http://localhost:8080/api/productos')
    .then((response) => response.json())
    .then((data) => {
        const cards = document.getElementById('cards')
        cards.innerHTML= renderCards(data)
        const form = document.getElementById('formPost')
        form.innerHTML = renderForm()
    })
    .catch((error)=>{
        console.log(error)
    })
}
const addProduct = () => {
    const product = {
        id: document.getElementById('id').value,
        tiemstamp: Date.now(),
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        code: document.getElementById('code').value,
        thumbnail: document.getElementById('thumbnail').value,
        price: document.getElementById('price').value,
        stock: document.getElementById('stock').value,
    }
    return product
}

const postProd = () => {
    let input = document.getElementsByTagName('input')
    for (i=0; i<input.length; i++) {
        input[i].addEventListener("change",  function(){
        product = addProduct();
        return(product)
    })};
    fetch(`http://localhost:8080/api/productos/${product.id}`, {
        method: 'POST', 
        body: JSON.stringify(product)})
    .then((response) => response.json())
    .then((respuesta) =>  window.location.href = `http://localhost:8080/index.html`)
    .catch((error) => {
        console.log(error)
    })
}

const deleteProd = (id) =>{
    fetch(`http://localhost:8080/api/productos/${id}`, {
        method: 'DELETE'
    })
    .then(result =>  result.json())
    .then(respuesta => window.location.href = `http://localhost:8080/index.html`)    
}

main()