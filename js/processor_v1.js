// basic version of a form-handling script

// use the variable "form" to represent the whole form
var form = document.getElementById("myForm");

// when form is submitted, run the named function
form.onsubmit = checkAnswers;

// the rest of this script is a function that reads the first two elements
// in the form and pops alerts
function checkAnswers() {

  alert(form.elements[0].name + " is " + form.elements[0].value);

  // note this returns the second form element, regardless of whether it
  // has been selected
  alert(form.elements[1].name + " is " + form.elements[1].value);

  // reset all the form fields
  form.reset();

  // keep next line as final line, because we are returning data
  // to the same page and we don't want page to reload it
  return false;

} // end of function checkAnswers()
