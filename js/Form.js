/*

  -- Form Class --

  Construct a form based on a CSS selector and callback
  functions for form validation success and failure.

*/

class Form {
  // Constructs a form object given a CSS selector, defaults callbacks to anonymous functions
  constructor(selector, onValidCallbackFn = function(){}, onInvalidCallbackFn = function(){}) {
    this.form = document.querySelector(selector);
    this.elements = this.constructElements();
    this.onInvalidCallbackFn = onInvalidCallbackFn;
    this.onValidCallbackFn = onValidCallbackFn;

    // Validate the form on submission
    this.form.addEventListener("submit", (e) => {
      if (this.isValid()) {
        this.onValidCallbackFn();
        return true;
      } else {
        // Prevent form from performing default action
        e.preventDefault();
        // TODO: pass a list of elements which failed valid testing
        this.onInvalidCallbackFn( this.getInvalidElements() );
        return false;
      }
    });
  }


  isValid() {
    // Default validity to false
    let validity = true;
    // iterate over each form element and check its validity;
    this.elements.forEach(element => {
      if (! element.isValid()) {
        validity = false;
      }
    });
    return validity;
  }


  getInvalidElements() {
    // Default validity to false
    let invalidElements = [];
    // iterate over each form element and check its validity;
    this.elements.forEach( (element) => {
      if (! element.isValid()) {
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
    if (! this.form) {
      return [];
    }

    // Get all form elements, check for inputs, option-select, and textareas
    // Array.prototype.slice.call() turns a nodelist into an array
    const elements = Array.prototype.slice.call(
      this.form.querySelectorAll("[data-form-check-rules]")
    );

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
