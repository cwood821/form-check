/*

  -- Form Class --
  
  Construct a form based on a CSS selector and a callback
  function for form failure.

*/

class Form {
  // Constructs a form object given a CSS selector.
  constructor(selector, onValidCallbackFn, onInvalidCallbackFn) {
    this.form = document.querySelector(selector);

    this.elements = this.constructElements();
    this.onInvalidCallbackFn = onInvalidCallbackFn;

    // Add event listener to form and prevent default
    this.form.addEventListener("submit", (e) => {
      // e.preventDefault();

      // Validate the form on submission
      if (this.isValid()) {
        onValidCallbackFn();
        return true;
      } else {
        e.preventDefault();
        // Call the invalid callback
        // TODO: passback list of elements which failed valid testing
        this.onInvalidCallbackFn();
        return false;
      }
    });
  }

  isValid() {
    let validity = true;
    // iterate over form element values and pass elements value
    this.elements.forEach(element => {
      if (!element.isValid()) {
        validity = false;
      }
    });
    // if one of the rules fails, return false
    return validity;
  }

  getElements() {
    return this.elements;
  }

  getFormElements() {
    let elements = [];
    // If the form is invalid, abandon the function
    if (!this.form) {
      return [];
    }

    // Get all form elements, check for inputs, option-select, and textareas
    // Array.prototype.slice.call() turns a nodelist into an array
    const inputs = Array.prototype.slice.call(
      this.form.querySelectorAll("input")
    );
    const textareas = Array.prototype.slice.call(
      this.form.querySelectorAll("textarea")
    );
    const selects = Array.prototype.slice.call(
      this.form.querySelectorAll("select")
    );

    // Concatenate all form elements
    elements = elements.concat(inputs);
    elements = elements.concat(textareas);
    elements = elements.concat(selects);

    // Return array of references to these elements
    return elements;
  }

  // Return an array of FormElement objects based on elemnts in this form
  constructElements() {
    const htmlElements = this.getFormElements();
    const formElements = [];

    htmlElements.forEach(htmlElement => {
      formElements.push(new FormElement(htmlElement));
    });

    return formElements;
  }
}
