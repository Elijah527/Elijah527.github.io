function $gg(selector) {
    //nodelist至少包含一個node - element object
    //如果沒有符合的,則會是一個empty nodelist
    let nodelist = document.querySelectorAll(selector);
    if (nodelist.length == 0) {
        return null;
    }
    return nodelist.length == 1 ? nodelist[0] : nodelist;
}
function $g(selector) {
    //判斷是否為id selector
    if (selector.includes('#') && !selector.includes(' ')) {
        //回傳Element
        return document.querySelector(selector);
    }

    //回傳NodeList集合
    let nodelist = document.querySelectorAll(selector);

    return nodelist.length == 1 ? nodelist[0] : nodelist;
}
//create element & innerText function
function $ce(element, text) {
    let el = document.createElement(element);
    //增加判斷傳入的參數是否合規?
    if (typeof (text) != 'undefined' && typeof (text) != '' && typeof (text) !== null) {
        el.innerText = text;
    }
    return el;
}
export { $gg, $g, $ce}; //如果要匯出兩個以上，用逗號隔開{A,B}