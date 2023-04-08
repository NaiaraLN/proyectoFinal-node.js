/* (async () => {
    try {
        console.log('esta funcion se ejecuta')
        const response = await fetch('/', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });
    
        if (response.status != 200) {
            return window.location.href = '/faillogin'
        }
    } catch (error) {
        console.log(error)
    }
})()
 */
const header = async () => {
    try {
        console.log('esta funcion se ejecuta')
        const response = await fetch('/', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });
    
        if (response.status != 200) {
            return window.location.href = '/faillogin'
        }
    } catch (error) {
        console.log(error)
    }
}