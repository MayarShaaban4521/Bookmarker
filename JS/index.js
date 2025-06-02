var bookmarkNameInput = document.getElementById('bookmarkName');
var bookmarkURLInput = document.getElementById('bookmarkURL');

var layerElm = document.getElementById('layer');
var layerContentElm = document.getElementById('layerContent');


var closeIconElm = document.getElementById('closeIcon');
closeIconElm.addEventListener('click', hideLayer);
//console.log(bookmarkNameInput , bookmarkURLInput);

bookmarkNameInput.addEventListener('focus', function () {
    if (bookmarkNameInput.value.trim().length < 3) {
        bookmarkNameInput.classList.add('input-error');
    } else {
        bookmarkNameInput.classList.remove('input-error');
    }
});

bookmarkNameInput.addEventListener('input', function () {
    if (bookmarkNameInput.value.trim().length < 3) {
        bookmarkNameInput.classList.add('input-error');
    } else {
        bookmarkNameInput.classList.remove('input-error');
    }
});


bookmarkURLInput.addEventListener('input', function () {
    var url = bookmarkURLInput.value.trim();

    if (isValidURL(url) && /\.(\w{2,})$/.test(url)) {
        bookmarkURLInput.classList.remove('input-error');
    } else {
        bookmarkURLInput.classList.add('input-error');
    }
});


var siteList = [];
if (localStorage.getItem('site')){
    siteList = JSON.parse(localStorage.getItem('site'));
    displaySite();

}else{
    siteList = [];
};

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;  
    }
};

function addSite(){
    var name = bookmarkNameInput.value.trim();
    var url = bookmarkURLInput.value.trim();

    if (name.length < 3){
        showLayer();
        clearForm();
        return;
    }
    if (!isValidURL(url)  || url === '') {
        showLayer();
        clearForm();
        return;
    };
    var site = {
        code : name,
        url : url 
    };
    siteList.push(site);
    localStorage.setItem('site' ,JSON.stringify(siteList));
    clearForm();
    displaySite();

};
function clearForm(){
    bookmarkNameInput.value = null;
    bookmarkURLInput.value = null;
};

function displaySite(){
    var inner = '';
    for (var i = 0; i < siteList.length; i++){
        inner += `
        <tr>
            <td>${i+1}</td> 
            <td>${siteList[i].code}</td> 
            <td><button onclick = "visitSite(${i})" class="btn btn-success px-3 py-2"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td> 
            <td> <button onclick = "deleteSite(${i})" class="btn btn-danger px-3 py-2"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
        </tr>
        `
    }
    document.getElementById('tBody').innerHTML = inner;
};
function visitSite(i){
    var url = siteList[i].url;
    if (url && typeof url === 'string'){
        if (!url.startsWith('http://') && !url.startsWith('https://') && url.endsWith('.')){
        url = 'https://' + url;

        var validEnding = /\.[a-zA-Z]{2}$/;

        if (validEnding.test(url)) {
            window.open(url, '_blank');
        } else {
            showLayer();
        }
    }
    window.open(url, '_blank');

}
};

function deleteSite(i){
    siteList.splice(i,1);
    localStorage.setItem('site' ,JSON.stringify(siteList));    
    displaySite();
    
};
function showLayer() {
    layerElm.classList.replace('d-none' , 'd-flex')
    
};
function hideLayer() {
    layerElm.classList.replace('d-flex' , 'd-none')
    
};
layerElm.addEventListener('click', function(event) {
    if (!layerContentElm.contains(event.target)) {
        hideLayer();
    }
});