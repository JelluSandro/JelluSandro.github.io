'use strict';

//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

function onClickLi(event) {
    let city = event.path[0].innerText;
    document.querySelector('.sajest').value = city;
    getSajest(city);
}
var listSize = 0;
var choosenCity = "";
function getSajest(cityOrAirport) {
    if (cityOrAirport.length > 1) {
        var ul = document.createElement('ul');
        ul.className = "list";
        posLi = 0;
        listSize = 0;
        fetch('https://autocomplete.travelpayouts.com/places2?term=' +
            cityOrAirport +
            '&locale=ru&types[]=airport&types[]=city').then(res => res.json()).then(arr => arr.slice(0, 10))
            .then(arr => {
                let i = 0;
                for (let x of arr) {
                    i++;
                    var li = document.createElement('li');
                    li.innerText = x.name;
                    li.className = "li" + i;
                    //li.onclick(onClickLi(x.name));
                    li.onclick = onClickLi;
                    ul.appendChild(li);
                    //arr.push(li);
                }
                listSize = i;
            });
        document.querySelector('.list').replaceWith(ul);
        //`<li>${x.name}</li>`
                //.join(""))
            //.then(list => document.querySelector('.list')
               // .replaceWith(`<ul class="list">${list}</ul>`))
            //.catch(e => console.info("Sajest error ") + e.message);
    }
    return "";
}

kinput.onkeydown = kinput.onkeyup = kinput.onkeypress = handle;

function handle(e) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.keyCode !== 13) {
        getSajest(document.querySelector('.sajest').value);
    }
    //area.value = predict.then(inf => inf);
}

document.querySelector('.sajest').onkeypress=check;
function check(e) {
    if (e.keyCode === 13) {
        return false;
    }
}

var posLi = 0;
function move(e) {
    let el;
    switch (e.key) {
        case "ArrowUp":
            if (posLi > 0 && posLi < listSize + 1) {
                document.querySelector('.li' + posLi).style.backgroundColor = '#d8d8d8';
            }
            if (posLi !== 0) {
                posLi--;
            } else {
                posLi = listSize;
            }
            if (posLi > 0 && posLi < listSize + 1) {
                let el = document.querySelector('.li' + posLi);
                el.style.backgroundColor = '#F9F0DA';
                choosenCity = el.innerHTML;
            }
            break;
        case "ArrowDown":
            if (posLi > 0 && posLi < listSize + 1) {
                document.querySelector('.li' + posLi).style.backgroundColor = '#d8d8d8';
            }
            if (posLi !== listSize + 1) {
                posLi++;
            } else {
                posLi=1;
            }
            if (posLi > 0 && posLi < listSize + 1) {
                let el = document.querySelector('.li' + posLi);
                el.style.backgroundColor = '#F9F0DA';
                choosenCity = el.innerHTML;
            }
            break;
    }
    if (e.keyCode === 13) {
        document.querySelector('.sajest').value = choosenCity;
        getSajest(choosenCity);
    }
}
addEventListener("keydown", move);