/**
 * Helper functions when converting an object to a css string
 */

// https://gist.github.com/nblackburn/875e6ff75bc8ce171c758bf75f304707
export const camelCaseToKebabCase = function(string) {
    return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// Slightly modified version of https://github.com/natew/object-to-css
export const convertObjectToCss = function(obj) {
    const keys = Object.keys(obj);
    if (!keys.length) { return ''; }
    let i, len = keys.length;
    let result = '';
  
    for (i = 0; i < len; i++) {
      const key = keys[i];
      const val = obj[key];
      result += camelCaseToKebabCase(key) + ':' + val + ';';
    }
  
    return result;
}