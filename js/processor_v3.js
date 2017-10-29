// form processor - October 2017 version
// this script processes your form data locally only - no server
// this works with a form for which the opening tag is:
// <form id="myForm" action="processor_v3.js" method="post">

// this version still has nested switch-statements

var form = document.getElementById("myForm");

// create empty associative array - actually an Object
var answers = {};

form.onsubmit = checkAnswers;

function checkAnswers() {
  if (!form || form.nodeName !== "FORM") {
    alert("There is no form!");
    return;
  }
  // create an empty array
  var q = [];
  // process every element in the form with this for-loop
  for (var i = 0; i < form.elements.length; i++) {
    // skip an element if it has no name
    if (form.elements[i].name === "") {
      continue;
    }
    // check kinds of form elements with nested switch statements
    // .nodeName returns INPUT, TEXTAREA, etc.
    switch (form.elements[i].nodeName) {
      case 'INPUT':
      // the first nested switch checks all TYPES of input form elements
        switch (form.elements[i].type) {
          case 'text':
          case 'email':
          case 'tel':
          case 'url':
          case 'hidden':
          case 'password':
          case 'button':
          case 'reset':
          case 'submit':
            // if any of the above cases is true for this one form element,
            // push the element's name and its value into the q array
            q.push(form.elements[i].name + "=" + form.elements[i].value);
            break;
          case 'checkbox':
          case 'radio':
            /* if the element is input radio or input checkbox TYPE, then see if it has the "checked" attribute. If so, add it to the q array. NOTE: this stores all checked items! */
            if (form.elements[i].checked) {
              q.push(form.elements[i].name + "=" + form.elements[i].value);
            }
            break;
          case 'file':
            // if the element is file, ignore it
            break;
        } // end nested switch-statement
        break;
        // now done checking for INPUT; check if other kinds
      case 'TEXTAREA':
        // if the element is textarea, add it to the q array
        q.push(form.elements[i].name + "=" + form.elements[i].value);
        break;
      case 'SELECT':
        /* if the element is select, look for selected items. If type is multiple, loop through all of them (with j in new for-loop) NOTE: this stores all selected items! */
        switch (form.elements[i].type) {
          case 'select-one':
            q.push(form.elements[i].name + "=" + form.elements[i].value);
            break;
          case 'select-multiple':
            for (var j = 0; j < form.elements[i].options.length; j++) {
              if (form.elements[i].options[j].selected) {
                q.push(form.elements[i].name + "=" + form.elements[i].options[j].value);
              }
            }
            break;
          } // end nested switch-statement
          break;
      case 'BUTTON':
        // if the element is one of these buttons, ignore it
        switch (form.elements[i].type) {
          case 'reset':
          case 'submit':
          case 'button':
            break;
        } // end nested switch-statement
        break;
    } // end giant switch-statement
  } // end for-loop

  // turn the whole q array into one big string, with & between each pair
  var data = q.join("&");

  // turn the whole q array into one big string, with a line break between
  // each pair - "\n" creates a newline
  var dataWithLineBreaks = q.join("\n");

  // note: the q array is still intact

  // alerts commented out, but they do work
  // alert(data);
  // alert(dataWithLineBreaks);

  processAnswers(q);

  // run the function that is below
  // writeMessage(dataWithLineBreaks);
  writeMessage();

  // just a test of the first thing in the associative array
  alert( answers.theName );

  // reset all the form fields
  form.reset();

  // keep next line as final line, because we are returning data
  // to the same page and we don't want page to reload
  return false;
}

function writeMessage() {
  var msg = "";
  // loop through the associative array (named answers)
  for ( var key in answers ) {
    /* use .hasOwnProperty() to make sure that none of the properties are unexpected results of inheritance */
    if ( answers.hasOwnProperty( key ) ) {
      // construct a line for each item in the associative array. NOTE: this overwrites checked and selected items!
      msg += key + ": " + answers[ key ] + "<br>";
    }
  }
  // write all lines into the paragraph with id="results_text"
  document.getElementById("results_text").innerHTML = msg;
}
function processAnswers(theArray) {
  for (var i = 0; i < theArray.length; i++) {
    // split each into two, creating a mini-array of two items
    var mini = theArray[i].split("=");
    var item = mini[0];
    answers[ item ] = mini[1];
  }
}
