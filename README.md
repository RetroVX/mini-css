# Mini-CSS

A small library to create css within javascript using template literals or objects

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


### Demo

[https://retrovx.github.io/mini-css](https://retrovx.github.io/mini-css)

## Getting Started

### Install

```
git clone https://github.com/RetroVX/mini-css.git
```
Or download from Zip

Then serve on your favourite local web server :)  

Basic Usage
```javascript
import miniCSS from "./mini-css.min.js";

const css = new miniCSS()
    .createStyleSheet()
    .set('#id', `background-color: red;`)
    .set('.class', { backgroundColor: 'green' });
```

### Examples

#### Create a new stylesheet
Create a new stylesheet and append to the head element
```javascript
css.createStyleSheet();

// You can create your own stylesheet and pass it in to mini-css
const style = document.createElement("style");
document.head.appendChild(style);
const sheet = style.sheet;
const css = new miniCSS(sheet);
// Or
const css = new miniCSS().setSheet(sheet);
```

#### Add a new rule to the stylesheet
Set creates a new rule and adds it to the bottom of the stylesheet.
You can pass in either a template literal or an object.
```javascript
// basic usage
css.set('.container', `background-color: red;`).set('#header', { backgroundColor: 'yellow' });

const stringExample = {
    selector: '#header',
    style:`
        background-color: red;
        color: green;
        text-align: center;
    `,
};

const objectExample = {
    selector: '.container',
    style: {
        marginLeft: '20px',
        marginRight: '20px',
        color: 'white',
        backgroundColor: 'blue'
    }
}

css.set(stringExample.selector, stringExample.style).set(objectExample.selector, objectExample.style);
```

#### Get all rules of a selector
```javascript
const container = css.get('.container');

```

#### Get all rules from the stylesheet
```javascript
const rules = css.getRules();
```

#### Remove a rule from the stylesheet
```javascript
const rules = css.getRules();

// requires the index of the rule to remove
css.remove(rules[1]);
```

### Built With [MicroBundle](https://github.com/developit/microbundle)

### Todo
* Docs
* Examples