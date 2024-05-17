var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var rowInput = document.getElementById("rowInput");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");


var pList;
if (localStorage.getItem("products") == null) {
    pList = [];
} else {
    pList = JSON.parse(localStorage.getItem("products"));
    displayPlist();
}


function addProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value
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
        <img src="./imgs/product.png" class="card-img-top w-100 d-block" alt="...">
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
    productNameInput.value = pList[index].name;
    productPriceInput.value = pList[index].price;
    productCategoryInput.value = pList[index].category;
    productDescInput.value = pList[index].desc;
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
    updateBtn.setAttribute("onclick", `updateProduct(${index})`);
    window.scrollTo(0, 0);

}

function updateProduct(index){
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