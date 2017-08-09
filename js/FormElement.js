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


  // Associate rules
  associateRules() {
    // Parse out CSS class names from element
    this.element.classList.forEach( (className) => {
      // Parse out CSS class names from element
      if (FormRules.hasRule(className)) {
        // Push associated rule function onto list of this
        // elements rules
        this.addRule(FormRules.getRuleFn(className));
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
