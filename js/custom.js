function getProducts() {

    document.getElementById("addProductForm").style.display = 'none';

    fetch('http://localhost:3001/api/products')
    .then((res) => res.json())
    .then((data) => {
        let output = '<h2 class="mb-4">Listar produkter från API-GET</h2>';
        let output2 = '';

        if(data.length === 0) {
            output += 
            `
                <p>No products was find in the database</p>
            `;
        }else {
            
        data.forEach((product, index) => {
            output2 += 
            `
            <div class="removeCard${index} card-deck col-12 col-sm-6 col-lg-4 mb-4">
            <div class="card">
            <div class="card-body">
              <p class="updateName${index} card-text">${product.name}</p>
              <p class="updateDescription${index} card-text">${product.description}</p>
              <p class="card-text" style="color: grey;">${product._id}</p>
              <button class="edit${index} btn btn-secondary">Edit</button>
              <button class="delete${index} btn btn-danger">Delete</button>
              <br />
              <br />
              <div class="editProduct${index}" style="margin-bottom: 1em; display: none;">
                <input type="text" class="editProductName${index}" />
                <br />
                <br />
                <input type="text" class="editProductDescription${index}" />
                <br />
                <br />
                <button class="sendProductEdit${index}" btn btn-primary">Submit</button>
                <br />
                <br />
                <p class="CheckPrompt${index}" style="display: none;"></p>
              </div>
            </div>
          </div>
          </div>
            `;
        })

        $( document ).ready(function() {
            for(let i in data) {
                $(document).on('click', `.edit${i}`, function(){
                    $(`.editProduct${i}`).css('display', 'block');
                });

            $(document).on('click', `.sendProductEdit${i}`, function() {
                let name = $(`.editProductName${i}`).val();
                let description = $(`.editProductDescription${i}`).val();
                if(name.length === 0 && description.length === 0) {
                    show(`.CheckPrompt${i}`);
                    wrightMessage("Fyll i fälten", `.CheckPrompt${i}`, "red");
                    setTimeout(function(){hide(`.CheckPrompt${i}`);}, 2000)
                }else {
                    $(`.editProduct${i}`).css('display', 'none');
                    fetch(`http://localhost:3001/api/products/${data[i]._id}`, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json; test/plain */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({_id: data[i]._id, name: name, description: description})
                    })
                    .then(res => res.json())
                    .then(data => {
                        $(`.updateName${i}`).html(name);
                        $(`.updateDescription${i}`).html(description);
                    })
                    .catch((err) => console.log(err))
                }
            })

            $(document).on('click', `.delete${i}`, function(){
                $(`.removeCard${i}`).remove();

                fetch(`http://localhost:3001/api/products/${data[i]._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json; test/plain */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({_id: data[i]._id})
                })
                .catch((err) => console.log(err))
            });
            }
        });
        }
      
        document.getElementById('output').innerHTML = output;
        document.getElementById('output2').innerHTML = output2;
    })
    .catch((err) => console.log(err));
}

function initProductForm() {
    document.getElementById('addProductForm').style.display = 'inline';
    document.getElementById('output').innerHTML  = '';
    document.getElementById('output2').innerHTML  = '';
    document.getElementById('productname').value = '';
    document.getElementById('productDescription').value = '';
}

function submitProduct(e) {
    e.preventDefault();
    
    let name = document.getElementById('productname').value;
    let description = document.getElementById('productDescription').value;

    fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: {
            'Accept': 'application/json; test/plain */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name, description: description})
    })
    .then((res) => res.json())
    .then((data) => {
        let output = `<p class="pt-1">RESULTAT AV POST:</p>` + "<p>" + JSON.stringify(data) + "</p>";
        document.getElementById('output').innerHTML = output;
    })
    .catch((err) => console.log(err))
}

document.getElementById('get').addEventListener('click', getProducts);
document.getElementById('addProduct').addEventListener('click', initProductForm);
document.getElementById('addProductForm').addEventListener('submit', submitProduct);

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