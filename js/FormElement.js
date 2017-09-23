/*

  -- Form Element --

  A form element is any form element that has data to be checked.
  Each element can have multiple validation rules attached.

*/

import FormRules from './FormRules';

export default class FormElement {

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
    if (! this.element.dataset["formCheckRules"]) {
      return false;
    }
    // Grab the rules from the element
    const rulesString = this.element.dataset.formCheckRules.toString();
    const rules = rulesString.split(" ");
    // Parse out CSS class names from element
    rules.forEach( (ruleName) => {
      // Parse out CSS class names from element
      if (FormRules.hasRule(ruleName)) {
        // Push associated rule function onto list of this
        // elements rules
        this.addRule(FormRules.getRuleFn(ruleName));
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
    this.rules.forEach( (ruleFn) => {
      if (! ruleFn(this.element.value)) {
        validity = false;
      }
    });

    return validity;
  }
}
