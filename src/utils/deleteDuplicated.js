const deleteDuplicated = (arr) => {
    const newArray = arr.map(x => x.category)
    const unicos = [];

    for (let i = 0; i < newArray.length; i++) {

        const elemento = newArray[i];

        if (!unicos.includes(newArray[i])) {
            unicos.push(elemento);
        }
    }

    return unicos;
}
export default deleteDuplicated