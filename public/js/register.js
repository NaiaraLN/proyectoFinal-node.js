async function register(e){
    e.preventDefault()

    const formRegister = document.getElementById("formRegister");
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');
    formData.append("avatar", fileField.files[0]);

    const data = {
        mail: formRegister[0].value,
        username: formRegister[1].value,
        password: formRegister[2].value,
        address: formRegister[3].value,
        age: formRegister[4].value,
        phone: formRegister[5].value,
        formData
    }

    const response = await fetch('/register', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const content = await response.json();

    const { accessToken } = content;

    if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        location.href = '/'
    }
    return false
}