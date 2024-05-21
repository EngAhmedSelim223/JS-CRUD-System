var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var rowInput = document.getElementById("rowInput");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var searchProductInput = document.getElementById("productSearch");
var productImgInput = document.getElementById("productImg");
var productIndexToUpdate = -1;

var pList;
if (localStorage.getItem("products") == null) {
    pList = [];
} else {
    pList = JSON.parse(localStorage.getItem("products"));
    displayPlist();
}


function addProduct() {
    var imgUrl = URL.createObjectURL(productImgInput.files[0]);
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value,
        img: imgUrl
    }
    pList.push(product);
    localStorage.setItem("products", JSON.stringify(pList));
    showMsg("Product Added Successfully");
    // displayProduct(product);
    displayPlist();
    console.log(pList);
};


function displayProduct(p, index) {
    rowInput.innerHTML += `  <div class="col-lg-4 col-md-6 col-sm-12">
    <div class="card w-100">
        <img src="${p.img}" class="card-img-top w-100 d-block" alt="...">
        <div class="card-body">
            <span class="badge bg-primary"> ${p.category} </span>
            <h5 class="card-title mt-2">${p.name}</h5>
            <p class="card-text">${p.desc}</p>
            <span class="text-primary fs-5">${p.price} $</span>
        </div>
        <button class="btn btn-success m-1" onclick="setUpFormToUpdate(${index})">Update</button>
        <button class="btn btn-danger m-1" onclick="deleteProduct(${index})">Delete</button>
    </div>
</div>`;
}

function displayPlist() {
    rowInput.innerHTML = '';
    for (var i = 0; i < pList.length; i++) {
        displayProduct(pList[i], i);
    }
}

function clearForm() {
    productNameInput.value = '';
    productPriceInput.value = '';
    productCategoryInput.value = '';
    productDescInput.value = '';
}

function showMsg(msg){
    var toaster = document.getElementById("toaster");
    var toasterBs = new bootstrap.Toast(toaster);
    var toasterBody = document.getElementById("msg");
    toasterBody.innerHTML = msg;
    toasterBs.show();
}

function deleteProduct(index) {
    pList.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(pList));
    showMsg("Product Deleted Successfully");
    displayPlist();
}

function setUpFormToUpdate(index){
    productIndexToUpdate = index;
    productNameInput.value = pList[index].name;
    productPriceInput.value = pList[index].price;
    productCategoryInput.value = pList[index].category;
    productDescInput.value = pList[index].desc;
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
    window.scrollTo(0, 0);

}

function updateProduct(){

    var index = productIndexToUpdate;
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value
    }
    pList[index] = product;
    localStorage.setItem("products", JSON.stringify(pList));
    showMsg("Product Updated Successfully");
    displayPlist();
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
}

function validateInput(inputID, regexKey, alertEID){
    var input = document.getElementById(inputID);
    var regex = {
        name: /^[A-Z][a-zA-Z0-9 ]{2,14}$/,
        price: /^[1-9][0-9]{1,4}$/,
        category: /^[A-Z][a-zA-Z0-9 ]{2,50}$/,
        desc: /^[A-Z][a-zA-Z0-9 ]{10,50}$/
    };
    var isValid = regex[regexKey].test(input.value);
    document.getElementById(inputID).classList.remove("is-valid", "is-invalid");
    if(isValid){
        document.getElementById(alertEID).classList.add("d-none");
        document.getElementById(inputID).classList.add("is-valid");

    }
    else{
        document.getElementById(inputID).classList.add("is-invalid");
        document.getElementById(alertEID).classList.remove("d-none");
    }
};

function searchByName(){
    document.getElementById("rowInput").innerHTML = '';
    var term = searchProductInput.value.toLowerCase();
    for (var i = 0; i < pList.length; i++) {
        if (pList[i].name.toLowerCase().startsWith(term)) {
            document.getElementById("rowInput").innerHTML += `
            <div class="col-lg-4 col-md-6 col-sm-12">
    <div class="card w-100">
        <img src="${pList[i].img}" class="card-img-top w-100 d-block" alt="...">
        <div class="card-body">
            <span class="badge bg-primary"> ${pList[i].category} </span>
            <h5 class="card-title mt-2">${pList[i].name}</h5>
            <p class="card-text">${pList[i].desc}</p>
            <span class="text-primary fs-5">${pList[i].price} $</span>
        </div>
        <button class="btn btn-success m-1" onclick="setUpFormToUpdate(${i})">Update</button>
        <button class="btn btn-danger m-1" onclick="deleteProduct(${i})">Delete</button>
    </div>
</div>
            `
        }
    }
    
}
