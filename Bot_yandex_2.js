// ==UserScript==
// @name         trav0994
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @grant        none
// ==/UserScript==

let yandexInput = document.querySelector("input.input__control");//ввод строки запроса
let butSearch = document.querySelector(".button.button.mini-suggest__button");//поиск со стартовой страницы (работает)
let nextPage = document.querySelector('.pager__item_kind_next');//работает
let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Гобой","Саксофон","Валторна","Фагот","Скрипка","Флейта","Как звучит флейта"],
    "crushdrummers.ru":["Барабанное шоу","Шоу барабанщиков в Москве","Заказать барабанщиков в Москве"]
};
let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let keywords = sites[site];
let keyword = keywords[getRandom(0,keywords.length)];
let i = 0;

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

if (butSearch!=undefined){ // Если мы на главной странице Яндекса
    document.cookie = "site="+site;
}else{ // Если уже не на главной странице яндекса
    site = getCookie("site");
}

//работает
if (butSearch!=undefined){
    let timerId = setInterval(()=>{
        yandexInput.value += keyword[i++];
        if (i==keyword.length){
            clearInterval(timerId);
			document.querySelector(".button.button.mini-suggest__button").click();
        }
    },500);
}else if (location.hostname == "yandex.ru"){
    let links = document.links;
    let flag = true;
    let numPage = document.querySelector('.pager__item').innerText;//номер страницы
    for(let i=0; i<links.length; i++){
        //let link = links[i];
        if(links[i].href.indexOf(site) != -1){
            links[i].removeAttribute('target');//сбрасываем аттрибут
			setTimeout(()=>links[i].click(),3000);
            console.log("link");
            flag=false;
            break;
        }
    }
    if(numPage=="10") location.href = "yandex.ru";
    if(flag) setTimeout(()=>nextPage.click(),1000);
}else{
    if (getRandom(0,100)>=80){
        location.href = "yandex.ru";
    }else{
        let links = document.links;
        setInterval(()=>{
            let index = getRandom(0,links.length);
            console.log("Я не умер, я ещё живой! Проверяю ссылку: "+links[index]);
            if(links[index].href.indexOf(location.hostname) != -1){
                links[index].click();
            }
        },3000);
    }
}
