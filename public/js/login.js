async function login(e) {
    try {
        const formLogin = document.getElementById("formLogin")
        const data = {
            username: formLogin[0].value,
            password: formLogin[1].value,
        }

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const content = await response.json();

        const {accessToken} = content;
        if (accessToken) {
            localStorage.setItem("access_token", accessToken);
            await fetch('/', {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
        }
        return false
    } catch (error) {
        window.location.href = '/faillogin'
    } 
    return false
}