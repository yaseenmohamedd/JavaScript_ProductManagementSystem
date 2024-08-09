// Inputs
let title = document.getElementById('title');
let price = document.getElementById('price');
let tax = document.getElementById('tax');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let ctgry = document.getElementById('ctgry');
let btn = document.getElementById('btn');

// Temporary index for updates
let tmpI;

// Mode for handling create or update actions
let mood = 'create';

// Function to calculate and display total price
function getTotal() {
    if (price.value !== "") {
        total.innerText = (+price.value + +tax.value + +ads.value) - +discount.value;
        total.style.background = "#040";
    } else {
        total.innerText = "";
        total.style.background = "rgb(131, 38, 38)";
    }
}

// Initialize product data from local storage
let prodata;
if (localStorage.products && localStorage.products !== "undefined" && localStorage.products !== "0") {
    prodata = JSON.parse(localStorage.products);
} else {
    prodata = [];
}

// Button click handler to create or update product
btn.onclick = function() {
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        tax: tax.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerText,
        count: count.value,
        ctgry: ctgry.value.toLowerCase(),
    };

    if (title.value !== '' && price.value !== '' && ctgry.value !== '' && count.value < 100) {
        if (mood === 'create') {
            // Handle multiple product creation
            if (newpro.count > 1) {
                for (let x = 0; x < newpro.count; x++) {
                    prodata.push(newpro);
                }
            } else {
                prodata.push(newpro);
            }
        } else {
            // Update existing product
            prodata[tmpI] = newpro;
            mood = "create";
            btn.innerText = 'Create';
            count.style.display = 'block';
        }
        clearData();
    } else {
        window.alert("Enter valid data, max count = 99");
    }

    // Save to local storage
    localStorage.products = JSON.stringify(prodata);

    // Refresh displayed data
    showData();
};

// Function to clear input fields
function clearData() {
    title.value = "";
    price.value = "";
    tax.value = "";
    ads.value = "";
    discount.value = "";
    total.innerText = "";
    count.value = "";
    ctgry.value = "";
}

// Function to display product data in a table
function showData() {
    let table = "";
    for (let i = 0; i < prodata.length; i++) {
        table += `<tr>
            <td>${i + 1}</td>
            <td>${prodata[i].title}</td>
            <td>${prodata[i].price}</td>
            <td>${prodata[i].tax}</td>
            <td>${prodata[i].ads}</td>
            <td>${prodata[i].discount}</td>
            <td>${prodata[i].total}</td>
            <td>${prodata[i].ctgry}</td>
            <td><button onclick="update(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>`;
        getTotal();
    }
    document.getElementById('tbody').innerHTML = table;

    // Show "Delete All" button if there are products
    let deleteAllbtn = document.getElementById('deleteAll');
    if (prodata.length > 0) {
        deleteAllbtn.innerHTML = `<button onclick="deleteAll()" id="deleteAllbtn">Delete All (${prodata.length})</button>`;
    } else {
        deleteAllbtn.innerHTML = '';
    }
}

// Function to delete a single product
function deleteData(i) {
    prodata.splice(i, 1);
    localStorage.products = JSON.stringify(prodata);
    showData();
}

// Function to delete all products
function deleteAll() {
    prodata.splice(0);
    localStorage.products = '';
    showData();
}

// Function to update a product
function update(i) {
    title.value = prodata[i].title;
    price.value = prodata[i].price;
    tax.value = prodata[i].tax;
    discount.value = prodata[i].discount;
    ads.value = prodata[i].ads;
    getTotal();
    ctgry.value = prodata[i].ctgry;
    count.style.display = 'none';
    btn.innerText = "Update";
    mood = 'update';
    tmpI = i;
    scroll({
        top: 0,
        behavior: "smooth"
    });
}

// Search functionality
let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id === '1') {
        searchMood = "category";
        search.placeholder = 'Search by category';
    } else if (id === '2') {
        searchMood = "title";
        search.placeholder = 'Search by title';
    }
    search.value = '';
    search.focus();
    showData();
}

function searchPros(value) {
    let table = "";

    if (searchMood == 'title') {
        for (let i = 0; i < prodata.length; i++) {
            if (prodata[i].title.includes(value.toLowerCase())) {
                table += `<tr>
                    <td>${i + 1}</td>
                    <td>${prodata[i].title}</td>
                    <td>${prodata[i].price}</td>
                    <td>${prodata[i].tax}</td>
                    <td>${prodata[i].ads}</td>
                    <td>${prodata[i].discount}</td>
                    <td>${prodata[i].total}</td>
                    <td>${prodata[i].ctgry}</td>
                    <td><button onclick="update(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>`;
                getTotal();
            }
        }
    } else {
        for (let i = 0; i < prodata.length; i++) {
            if (prodata[i].ctgry.includes(value.toLowerCase())) {
                table += `<tr>
                    <td>${i + 1}</td>
                    <td>${prodata[i].title}</td>
                    <td>${prodata[i].price}</td>
                    <td>${prodata[i].tax}</td>
                    <td>${prodata[i].ads}</td>
                    <td>${prodata[i].discount}</td>
                    <td>${prodata[i].total}</td>
                    <td>${prodata[i].ctgry}</td>
                    <td><button onclick="update(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>`;
                getTotal();
            }
        }
    }

    document.getElementById('tbody').innerHTML = table;
}

// Initial call to display data
showData();


