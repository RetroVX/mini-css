import miniCSS from "./../dist/mini-css.min.js";


const css = new miniCSS().createStyleSheet();

let text;
const textArea = document.getElementById('textArea');

const button = document.getElementById('btn');
button.addEventListener('click', function(){
    text = textArea.value;
    css.set('body', text);
    textArea.value = '';
})