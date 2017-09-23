var formCheck =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormElement__ = __webpack_require__(1);
/*

  -- Form Class --

  Construct a form based on a CSS selector and callback
  functions for form validation success and failure.

*/



class Form {
  // Constructs a form object given a CSS selector, defaults callbacks to anonymous functions
  constructor(selector, onValidCallbackFn = function () {}, onInvalidCallbackFn = function () {}) {
    this.form = document.querySelector(selector);
    this.elements = this.constructElements();
    this.onInvalidCallbackFn = onInvalidCallbackFn;
    this.onValidCallbackFn = onValidCallbackFn;

    // Validate the form on submission
    this.form.addEventListener("submit", e => {
      if (this.isValid()) {
        this.onValidCallbackFn();
        return true;
      } else {
        // Prevent form from performing default action
        e.preventDefault();
        // TODO: pass a list of elements which failed valid testing
        this.onInvalidCallbackFn(this.getInvalidElements());
        return false;
      }
    });
  }

  isValid() {
    // Default validity to false
    let validity = true;
    // iterate over each form element and check its validity;
    this.elements.forEach(element => {
      if (!element.isValid()) {
        validity = false;
      }
    });
    return validity;
  }

  getInvalidElements() {
    // Default validity to false
    let invalidElements = [];
    // iterate over each form element and check its validity;
    this.elements.forEach(element => {
      if (!element.isValid()) {
        invalidElements.push(element.getElement());
      }
    });
    return invalidElements;
  }

  getElements() {
    return this.elements;
  }

  getFormElements() {
    // If the form is invalid, abandon the function
    if (!this.form) {
      return [];
    }

    // Get all form elements, check for inputs, option-select, and textareas
    // Array.prototype.slice.call() turns a nodelist into an array
    const elements = Array.prototype.slice.call(this.form.querySelectorAll("[data-form-check-rules]"));

    // Return array of references to these elements
    return elements;
  }

  // Return an array of FormElement objects based on elemnts in this form
  constructElements() {
    const htmlElements = this.getFormElements();
    const formElements = [];

    htmlElements.forEach(htmlElement => {
      formElements.push(new __WEBPACK_IMPORTED_MODULE_0__FormElement__["a" /* default */](htmlElement));
    });

    return formElements;
  }
}
/* harmony export (immutable) */ __webpack_exports__["Form"] = Form;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormRules__ = __webpack_require__(2);
/*

  -- Form Element --

  A form element is any form element that has data to be checked.
  Each element can have multiple validation rules attached.

*/



class FormElement {

  constructor(elReference) {
    this.element = elReference;
    this.rules = [];
    this.associateRules();
  }

  getElement() {
    return this.element;
  }

  // Associate rules
  associateRules() {
    // Be sure the element has rules attached
    if (!this.element.dataset["formCheckRules"]) {
      return false;
    }
    // Grab the rules from the element
    const rulesString = this.element.dataset.formCheckRules.toString();
    const rules = rulesString.split(" ");
    // Parse out CSS class names from element
    rules.forEach(ruleName => {
      // Parse out CSS class names from element
      if (__WEBPACK_IMPORTED_MODULE_0__FormRules__["a" /* default */].hasRule(ruleName)) {
        // Push associated rule function onto list of this
        // elements rules
        this.addRule(__WEBPACK_IMPORTED_MODULE_0__FormRules__["a" /* default */].getRuleFn(ruleName));
      }
    });
  }

  addRule(ruleFn) {
    // Escape if the rules array already has the given function
    if (this.rules.includes(ruleFn)) {
      return false;
    }
    this.rules.push(ruleFn);
  }

  removeRule() {
    if (this.rules.includes(ruleFn)) {
      return false;
    }

    const ruleIndex = this.rules.indexOf(ruleFn);
    this.rules.splice(ruleIndex, 1);
  }

  isValid() {
    let validity = true;
    // iterate over form element values and pass elements value
    // if any of them return false, the form will be invalid
    this.rules.forEach(ruleFn => {
      if (!ruleFn(this.element.value)) {
        validity = false;
      }
    });

    return validity;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FormElement;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*

  -- Form Validation Rules --

  This class contains a getter function for rules functions,
  as well ass all data validation rules in the form of
  predicate functions.

*/

class FormRules {

  // Return the full list of rules and associated functions as an object
  static getRules() {
    return {
      "hasValue": this.hasValue,
      "isValidDayWord": this.isValidDayWord,
      "isValidDayNumber": this.isValidDayNumber
    };
  }

  // Return a reference to validation function for a given CSS class
  static getRuleFn(ruleClass) {
    const rules = FormRules.getRules();
    if (rules[ruleClass]) {
      return rules[ruleClass];
    }
    return undefined;
  }

  // Check if a rule has been defined for a given rule name
  static hasRule(ruleClass) {
    const rules = FormRules.getRules();
    if (rules[ruleClass]) {
      return true;
    }
    return false;
  }

  /*
    -- Form Validation Predicates --
     To add a new validation rule,
    you will need to associate the CSS class in getRules function above
    and add the related validation predicate function below.
  */

  static hasValue(val) {
    if (val == undefined || val == "" || val == NaN || val == null) {
      return false;
    }
    return true;
  }

  static isValidDayNumber(val) {
    const minDayNum = 1;
    const maxDayNum = 31;
    const number = parseInt(val);

    if (number <= maxDayNum && number >= minDayNum) {
      return true;
    }
    return false;
  }

  static isValidDayWord(val) {
    const dayWords = ["monday", "tuesday", "wednesday", "thursday", "friday"];

    if (!FormRules.hasValue(val)) {
      return false;
    }

    if (dayWords.includes(val.toLowerCase())) {
      return true;
    }

    return false;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FormRules;


/***/ })
/******/ ]);