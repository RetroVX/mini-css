import { convertObjectToCss } from "./utils.js";

/**
 * @author Conor Irwin <https://github.com/RetroVX> 
 * @license {@link http://opensource.org/licenses/MIT|MIT License}
 * @class miniCSS
 * @classdesc
 * A small library to create css within javascript using template literals or objects
 * @version 1.0.0
 * @example
 * // either create your own stylesheet and pass in the sheet or use createStyleSheet()
 * const css = new miniCSS().createStyleSheet();
 * // add new css rule on id
 * css.add('.container', `background-color: red;`).add('#header', { backgroundColor: 'yellow' });
 */
export default class miniCSS {

    constructor(sheet) {

        /**
         * @name miniCSS.sheet
         * The stylesheet.sheet that is either passed in on class creation or when using
         * miniCSS.createStyleSheet();
         */
        this.sheet = sheet;

        return this;

    }


    /**
     * Creates a style element and sets miniCSS.sheet to the stylesheet.sheet
     * @name miniCSS.createStyleSheet
     * @type {function}
     * @example
     * css.createStyleSheet(); ||
     * new miniCSS().createStyleSheet();
     */
    createStyleSheet() {
        const style = document.createElement("style");
        document.head.appendChild(style);
        this.sheet = style.sheet;

        return this;
    }


    /**
     * Finds all rules in the stylesheet with the selector and returns an array
     * @name miniCSS.get
     * @type {function}
     * @param {*} selector - Selector to find rules by
     * @returns {Array} - Returns an array with the rules with the provided selector
     * @example
     * css.get('yourSelector');
     * css.get('#id');
     * css.get('.class');
     */
    get(selector) {
        const getSelectors = [];
        const rules = this.getRules();

        for(let i = 0; i < rules.length; i++) {

            if(rules[i].includes(selector)) {
                getSelectors.push(rules[i]);
            }
        }

        return getSelectors;
    }


    /**
     * Adds new rules to the stylesheet with the provided selector.
     * You can pass in either a string or an object to create the styles
     * @name miniCSS.add
     * @type {function}
     * @param {string} selector - Selector to set rules for
     * @param {string||object} style - css styles to add
     * @example
     * css.add('#id', `background-color: red;`);
     * css.add('.class', { backgroundColor: 'green' });
     */
    add(selector, style) {

        const sheet = this.sheet;
        let rule;

        if(typeof style === 'string') {
            rule = `${selector} { ${style} }`;
        }
        else if(typeof style === 'object') {
            const convert = convertObjectToCss(style);
            rule = `${selector} { ${convert} }`;
        }
        
        // insert at the end
        const index = sheet.cssRules.length;
        sheet.insertRule(rule, index);

        return this;
    }

    
    /**
     * Removes a rule from the stylesheet from the sheet.cssRules array.
     * @name miniCSS.remove
     * @type {function}
     * @param {number} index - the index of the rule inside the sheet.cssRules array
     * @example
     * // removes first index of cssRules array
     * css.remove(0);
     */
    remove(index) {
        const sheet = this.sheet;

        sheet.removeRule(index);

        return this;
    }


    /**
     * Sets a new stylesheet.sheet to use
     * @name miniCSS.setSheet
     * @type {function}
     * @param {*} sheet - the stylesheet.sheet
     * @example
     * const newStyleSheet = document.createElement("style");
     * document.head.appendChild(newStyleSheet);
     * const sheet = newStyleSheet.sheet;
     * css.setSheet(sheet);
     */
    setSheet(sheet) {
        this.sheet = sheet;

        return this;
    }


    /**
     * An array holding all the css rules that have been added using set()
     * @name miniCSS.getRules
     * @type {function}
     * @returns {Array} - Returns an array with each rule from sheet.cssRules.cssText
     * @example
     * css.getRules();
     */
    getRules() {
        const cssRules = this.sheet.cssRules;
        const rules = [];

        for(let i = 0; i < cssRules.length; i++) {
            rules.push(cssRules[i].cssText);
        }

        return rules;
    }
}