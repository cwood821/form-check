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

  // Check if a rule has been defined for a given CSS class
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

    if (! FormRules.hasValue(val)) {
      return false;
    }

    if (dayWords.includes(val.toLowerCase())) {
      return true;
    }

    return false;
  }
}
