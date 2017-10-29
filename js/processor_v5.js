// form processor - October 2017 version
// this script processes your form data locally only - no server
// this works with a form for which the opening tag is:
// <form id="myForm" action="processor_v5.js" method="post">

/*
   This version is based almost completely on processor_v4.js

   Differences:
   The writeMessage() function
   The parseArrayElements() function

*/

var form = document.getElementById("myForm");

// this will be an associative array of the user's answers
var userAnswers = {};

form.onsubmit = checkAnswers;

function checkAnswers() {
  // process every element in the form with this for-loop
  for (var i = 0; i < form.elements.length; i++) {
    // skip an element if it has no name
    if (form.elements[i].name == "") {
      // keep looping
      continue;
    } else if (form.elements[i].nodeName == 'INPUT') {
      /* this switch-statement checks for each type of INPUT element - there are even more INPUT elements - add others if needed */
      switch (form.elements[i].type) {
        case 'text':
        case 'email':
        case 'tel':
        case 'url':
        case 'hidden':
        case 'password':
          /* if any of the above cases is true for this one form element, add the name:value pair to userAnswers using the function below this one */
          addPairToAssocArray(form.elements[i].name, form.elements[i].value);
          break;
        // continue with more INPUT form elements
        case 'radio':
          /* if the element is INPUT radio, then see if it has the "checked" attribute. If so, add it to userAnswers */
          if (form.elements[i].checked) {
            addPairToAssocArray(form.elements[i].name, form.elements[i].value);
          }
          break;
        case 'checkbox':
          /* different from radio b/c checkbox can have more than one answer, so we need an array for this - uses a different function */
          if (form.elements[i].checked) {
            addMultipleToAssocArray(form.elements[i].name, form.elements[i].value);
          }
          break;
        case 'file':
        case 'button':
        case 'reset':
        case 'submit':
          // if the element is any of those, just ignore it
          break;
      } // end switch
    } else if (form.elements[i].nodeName == 'TEXTAREA') {
      // add it to userAnswers using same function as for single INPUT elements
      addPairToAssocArray(form.elements[i].name, form.elements[i].value);
    } else if (form.elements[i].nodeName == 'SELECT') {
      /* this switch-statement checks if SELECT menu allows multiple or not. If multiple, loop through all of them (with j in new for-loop) */
      switch (form.elements[i].type) {
        case 'select-one':
          addPairToAssocArray(form.elements[i].name, form.elements[i].value);
          break;
        case 'select-multiple':
          for (var j = 0; j < form.elements[i].options.length; j++) {
            if (form.elements[i].options[j].selected) {
              // use same function used for checkboxes
              addMultipleToAssocArray(form.elements[i].name, form.elements[i].options[j].value);
            }
          }
          break;
      } // end switch
    } else if (form.elements[i].nodeName == 'BUTTON') {
      // ignore it and keep looping
      continue;
    } else {
      alert("Error! " + form.elements[i].nodeName);
    }
  } // end of for-loop

  // run the function that is below
  writeMessage();

  // reset all the form fields
  form.reset();

  // reset the Object
  userAnswers = {};

  // keep next line as final line of this function, because we are
  // returning data to the same page, and we don't want page to reload
  return false;

} // end of function checkAnswers()

function writeMessage() {
  var warrior = userAnswers.theName;
  var animal = userAnswers.theAnimal;
  var color = userAnswers.color;
  var appearance = userAnswers.appearance;
  var weapons = parseArrayElements("weapon");
  var potions = parseArrayElements("potions");

  var msg = "The mighty warrior " + warrior;
  msg += ", who is " + appearance;
  msg += ", carries a " + weapons + ". ";
  msg += warrior + ", clad all in " + color;
  msg += ", is accompanied by a faithful " + animal;
  msg += " and protected by potions for " + potions + ".";

  // writes message into the paragraph with id="results_text"
  document.getElementById("results_text").innerHTML = msg;
}

function parseArrayElements( a ) {
  var string = "";
  if (!userAnswers[ a ] || userAnswers[ a ].length == 0) {
    string = "no " + a; // example: "no potions"
  } else if (userAnswers[ a ].length == 1) {
    string = userAnswers[ a ][0]; // example: "knife"
  } else {
    for (var i = 0; i < userAnswers[ a ].length; i++) {
      if ( i == 0 ) {
        string = userAnswers[ a ][i];
      } else {
        string += " and " + userAnswers[ a ][i];
      }
    }
  }
  return string;
}

// writes one new key-value pair into the Object named userAnswers
function addPairToAssocArray(n, v) {
  userAnswers[ n ] = v;
}

// writes multiple values into an array value in the Object named userAnswers
function addMultipleToAssocArray(n, v) {
  var found = false;
  // loop through all keys and check if n already exists
  for ( var key in userAnswers ) {
    if (key === n) {
      found = true;
    }
  }
  // if n does not exist, create it as an array
  if (!found) {
    userAnswers[ n ] = [];
  }
  // now add the value to the array
  userAnswers[ n ].push( v );
}
