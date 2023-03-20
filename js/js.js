var pn = document.getElementById('proudactName')
var pc = document.getElementById('proudactCategory')
var pp = document.getElementById('proudactPrice')
var pd = document.getElementById('proudactDescription')
var SearchProud = document.getElementById('searchP')
var btn = document.getElementById('btn-add')
var alertD = document.getElementById('alertVa')
var pnAlert = document.getElementById('alertpn')
var alertpc = document.getElementById('alertpc')
var alertpp = document.getElementById('alertpp')
var alertpd = document.getElementById('alertpd')
var curentIndex;
// ============ pname validate =========

function pnameValidat() {
    // var regx = /^[A-Z][a-z]{3,9}$/;
    var pname = pn.value
    if (/^[A-Z]/.test(pname)) {
        if (/[a-z]{3,9}$/.test(pname)) {
            pnAlert.classList.add('d-none')
            pn.classList.remove('is-invalid')
            pn.classList.add('is-valid')
            btn.removeAttribute('disabled')
            alertD.classList.replace('d-block', 'd-none')

        }
        else {
            pnAlert.classList.remove('d-none')
            pnAlert.innerHTML = 'Should contain with from 3 to 9 small letter'
            pn.classList.remove('is-valid')
            pn.classList.add('is-invalid')
        }
        pn.classList.remove('is-invalid')
        pn.classList.add('is-valid')



    }

    else {
        pnAlert.classList.remove('d-none')
        pnAlert.innerHTML = 'Should start with capital letter'
        pn.classList.remove('is-valid')
        pn.classList.add('is-invalid')
    }
}

//==================== pc validaition =========

function pCategoryValidation() {
    var pCat = pc.value
    if (/[A-Za-z]|[0-9]$/.test(pCat) == true) {
        // alert('hi')
        btn.removeAttribute('disabled')
        alertD.classList.replace('d-block', 'd-none')
        pc.classList.remove('is-invalid')
        pc.classList.add('is-valid')
    } else {
        pc.classList.remove('is-valid')
        pc.classList.add('is-invalid')
    }

}



// ===================== btn ==============
btn.onclick = function () {
    if (inputValidat()) {
        if (btn.innerHTML == 'Add Proudact') {
            creat()
        } else {
            save()
        }


    }

    localStorage.setItem('allProudact', JSON.stringify(container))
    display()
    Reast()
}

if (localStorage.getItem('allProudact') == null) {
    var container = []

} else {
    container = JSON.parse(localStorage.getItem('allProudact'))
    display()
}


// ======================== input Validation ====================

function inputValidat() {
    if (pn.value != '' && pc.value != '' && pp.value != '' && pd.value != '') {
        return true
    } else {

        return false
    }

}

// ======================= Creat =======================


function creat() {
    var proudact = {
        proudactName: pn.value,
        proudactCategory: pc.value,
        proudactPrice: pp.value,
        proudactDescription: pd.value
    }
    container.push(proudact)
    localStorage.setItem('allProudact', JSON.stringify(container))
    display()
    Reast()
    // console.log(container);
}


// ========================= Display ================

function display() {
    var trs = ``
    for (var i = 0; i < container.length; i++) {
        trs += `
                <tr class="my-2">
                <td>${i + 1}</td>
                <td>${container[i].proudactName}</td>
                <td>${container[i].proudactCategory}</td>
                <td>${container[i].proudactPrice} </td>
                <td>${container[i].proudactDescription}</td>
                <td><button class="btn btn-outline-warning" onclick="update(${i})"><i class="fa-solid fa-edit "></i></button></td>
                <td><button onclick="delet(${i})" class="btn btn-outline-danger"><i class=" fa-solid fa-trash"></i></button></td>
            </tr>
        `
    }
    document.getElementById('tablebody').innerHTML = trs
    Reast()
}

// ====================== update =======================

function update(index) {
    curentIndex = index
    pn.value = container[index].proudactName
    pd.value = container[index].proudactDescription
    pp.value = container[index].proudactPrice
    pc.value = container[index].proudactCategory
    btn.innerHTML = 'update proudact'
}
// =========== save ==========

function save() {
    var proudact = {
        proudactName: pn.value,
        proudactCategory: pc.value,
        proudactPrice: pp.value,
        proudactDescription: pd.value
    }
    container[curentIndex] = proudact
    btn.innerHTML = 'Add Proudact'
}

// ====================== Reast ========================

function Reast() {

    pn.value = ''
    pc.value = ''
    pd.value = ''
    pp.value = ''

}


// ============== delet =============

function delet(index) {
    container.splice(index, 1)
    localStorage.setItem('allProudact', JSON.stringify(container))
    display()

}
//=============== search =================
function Search() {
    var trs = ``
    // console.log(SearchProud.value);
    for (var i = 0; i < container.length; i++) {
        if (container[i].proudactName.includes(SearchProud.value)) {
            // var text = new RegExp(SearchProud.value, 'gi')
            if (SearchProud.value != '') {
                trs = `
                <tr class="my-2">
                <td>${i + 1}</td>
                <td>${container[i].proudactName.replace(SearchProud.value, match => `<mark>${match}</mark>`)}</td>
                <td>${container[i].proudactCategory}</td>
                <td>${container[i].proudactPrice} </td>
                <td>${container[i].proudactDescription}</td>
                <td><button class="btn btn-outline-warning"><i class="fa-solid fa-edit "></i></button></td>
                <td><button onclick="delet(${i})" class="btn btn-outline-danger"><i class=" fa-solid fa-trash"></i></button></td>
            </tr>
        `
            } else {
                trs = `
                <tr class="my-2">
                <td>${i + 1}</td>
                <td>${container[i].proudactName}</td>
                <td>${container[i].proudactCategory}</td>
                <td>${container[i].proudactPrice} </td>
                <td>${container[i].proudactDescription}</td>
                <td><button class="btn btn-outline-warning"><i class="fa-solid fa-edit "></i></button></td>
                <td><button onclick="delet(${i})" class="btn btn-outline-danger"><i class=" fa-solid fa-trash"></i></button></td>
            </tr>
        `
            }

        }
    }
    document.getElementById('tablebody').innerHTML = trs

}




