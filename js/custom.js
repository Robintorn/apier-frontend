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
            
        data.forEach((product) => {
            output2 += 
            `
            <div class="card-deck col-12 col-sm-6 col-lg-4 mb-4">
            <div class="card">
            <div class="card-body">
              <p class="card-text">${product.name}</p>
              <p class="card-text">${product.description}</p>
              <p class="card-text" style="color: grey;">${product._id}</p>
              <button type="button" class="btn btn-danger">Delete</button>
            </div>
          </div>
          </div>
            `;
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