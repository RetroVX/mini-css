/**
 * Helper functions when converting an object to a css string
 */
// https://gist.github.com/nblackburn/875e6ff75bc8ce171c758bf75f304707
var camelCaseToKebabCase = function (string) {
  return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}; // Slightly modified version of https://github.com/natew/object-to-css

var convertObjectToCss = function (obj) {
  var keys = Object.keys(obj);

  if (!keys.length) {
    return '';
  }

  var i,
      len = keys.length;
  var result = '';

  for (i = 0; i < len; i++) {
    var key = keys[i];
    var val = obj[key];
    result += camelCaseToKebabCase(key) + ':' + val + ';';
  }

  return result;
};

/**
 * @author Conor Irwin <https://github.com/RetroVX> 
 * @license {@link http://opensource.org/licenses/MIT|MIT License}
 * @class miniCSS
 * @classdesc
 * A small library to create css within javascript using template literals or objects
 * @version 1.1.0
 * @example
 * // either create your own stylesheet and pass in the sheet or use createStyleSheet()
 * const css = new miniCSS().createStyleSheet();
 * // add new css rule on id
 * css.add('.container', `background-color: red;`).add('#header', { backgroundColor: 'yellow' });
 */

var miniCSS = function miniCSS(sheet) {
  /**
   * @name miniCSS.sheet
   * The stylesheet.sheet that is either passed in on class creation or when using
   * miniCSS.createStyleSheet();
   */
  this.sheet = sheet;
  /**
   * @name miniCSS.style
   * A reference the the stylesheet element
   */

  this.style = null;
  return this;
};
/**
 * Creates a style element and sets miniCSS.sheet to the stylesheet.sheet
 * @name miniCSS.createStyleSheet
 * @type {function}
 * @example
 * css.createStyleSheet(); ||
 * new miniCSS().createStyleSheet();
 */


miniCSS.prototype.createStyleSheet = function createStyleSheet () {
  var style = document.createElement("style");
  document.head.appendChild(style);
  this.sheet = style.sheet;
  this.style = style;
  return this;
};
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


miniCSS.prototype.get = function get (selector) {
  var getSelectors = [];
  var rules = this.getRules();

  for (var i = 0; i < rules.length; i++) {
    if (rules[i].includes(selector)) {
      getSelectors.push(rules[i]);
    }
  }

  return getSelectors;
};
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


miniCSS.prototype.add = function add (selector, style) {
  var sheet = this.sheet;
  var rule;

  if (typeof style === 'string') {
    rule = selector + " { " + style + " }";
  } else if (typeof style === 'object') {
    var convert = convertObjectToCss(style);
    rule = selector + " { " + convert + " }";
  } // insert at the end


  var index = sheet.cssRules.length;
  sheet.insertRule(rule, index);
  return this;
};
/**
 * injects new rules to the stylesheet using innerHTML.
 * This will overide any css added using .add()
 * @name miniCSS.inject
 * @type {function}
 * @param {string} styles - css styles to add
 * @example
 * css.inject(`
 * .class { background-color: red; }
 * #id { background-color: green; }
 * `);
 */


miniCSS.prototype.inject = function inject (styles) {
  var style = this.style;
  style.innerHTML = styles;
  return this;
};
/**
 * Removes a rule from the stylesheet from the sheet.cssRules array.
 * @name miniCSS.remove
 * @type {function}
 * @param {number} index - the index of the rule inside the sheet.cssRules array
 * @example
 * // removes first index of cssRules array
 * css.remove(0);
 */


miniCSS.prototype.remove = function remove (index) {
  var sheet = this.sheet;
  sheet.removeRule(index);
  return this;
};
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


miniCSS.prototype.setSheet = function setSheet (sheet) {
  this.sheet = sheet;
  return this;
};
/**
 * An array holding all the css rules that have been added using set()
 * @name miniCSS.getRules
 * @type {function}
 * @returns {Array} - Returns an array with each rule from sheet.cssRules.cssText
 * @example
 * css.getRules();
 */


miniCSS.prototype.getRules = function getRules () {
  var cssRules = this.sheet.cssRules;
  var rules = [];

  for (var i = 0; i < cssRules.length; i++) {
    rules.push(cssRules[i].cssText);
  }

  return rules;
};

export default miniCSS;
//# sourceMappingURL=mini-css.mjs.map
