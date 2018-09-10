function signUp(e) {
    e.preventDefault();
    
    let email = document.getElementById('email').value;
    let password = document.getElementById('pwd').value;
    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;

    fetch('http://localhost:3001/api/users/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json; test/plain */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password, firstname: firstname, lastname: lastname})
    })
    .then((res) => res.json())
    .then((data) => {
            show(`.CheckPrompt2`);
            wrightMessage(data.message, `.CheckPrompt2`);
            setTimeout(function(){hide(`.CheckPrompt2`);}, 5000)
    })
    .catch((err) => console.log(err))
}

function signIn(e) {
    e.preventDefault();
    
    let email = document.getElementById('emailLogin').value;
    let password = document.getElementById('pwdLogin').value;

    fetch('http://localhost:3001/api/users/signin', {
        method: 'POST',
        headers: {
            'Accept': 'application/json; test/plain */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.token) {
            document.getElementById('tokenStorage').innerHTML = data.token;
            document.getElementById('updateSection').style.display = 'block';
            document.getElementById('signUpSection').style.display = 'none';
            document.getElementById('signInSection').style.display = 'none';
        }else {
            show(`.CheckPrompt3`);
            wrightMessage(data.message, `.CheckPrompt3`);
            setTimeout(function(){hide(`.CheckPrompt3`);}, 5000)
        }
    })
    .catch((err) => console.log(err))
}

function updatePwd (e){

    e.preventDefault();

let email = document.getElementById('emailChange').value;
let password = document.getElementById('pwdChange').value;

fetch(`http://localhost:3001/api/users/${email}`, {
    method: 'PUT',
    headers: {
        'Accept': 'application/json; test/plain */*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: email, password: password})
})
.then((res) => res.json())
.then((data) => {
    show(`.CheckPrompt4`);
    wrightMessage(`Lösenord ändrat för: ${data.email}`, `.CheckPrompt4`);
    setTimeout(function(){hide(`.CheckPrompt4`);}, 5000);
})
.catch((err) => console.log(err))
}

document.getElementById('signUp').addEventListener('submit', signUp);
document.getElementById('signIn').addEventListener('submit', signIn);
document.getElementById('updatePwd').addEventListener('submit', updatePwd);

/*Show*/
function show(classname){
    $( classname ).css("display","block");
}
/*hide*/
function hide(classname){
    $( classname ).css("display","none");
}

/*wrightMessage*/
function wrightMessage(message, messageLocation, color, borderLocation , borderLocation2){
    $(messageLocation).html(message);
    $(messageLocation).css("color",color);
    $(borderLocation).css("border-color",color);
    $(borderLocation2).css("border-color",color);
}