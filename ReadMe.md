# FormCheck

FormCheck is a JavaScript library for simple front-end form validation.

To validate a form, pass a CSS selector to the FormCheck Form constructor. Form rules
are validated automatically based on values in the data-form-check-rules attribute on HTML inputs.

Available rules:
- hasValue
- isValidDayNumber
- isValidDayWord

On failure, invalid elements will be passed back to the
invalidForm callback function.

To use the library in your own projects, include the bundled public/formcheck.js in your project.
Please note, however, that it is currently in development. For a fully-featured library, explore something
like [Parsely](http://parsleyjs.org/).

## Demo
To try out the demo, download or clone this repository and open the public/index.html
in your browser.

The demo uses the following code:

```JavaScript

window.onload = () => {
  // Target the HTML form
  const form = new formCheck.Form("#testForm", validForm, invalidForm);

  // The callback for form validation failure
  function invalidForm(elements) {
    elements.forEach((element) => {
      element.style.borderColor = "red";
    });
  }

  function validForm() {
    alert("Valid!");
  }

};

```
