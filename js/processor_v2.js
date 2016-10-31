// form processor - October 2016 version
// this script processes your form data locally only - no server
// this works with a form for which the opening tag is:
// <form id="myForm" action="/echo/html/" method="post">

// this version adapted from somebody else's code. Contains
// nested switch-statements, which are pretty confusing

var form = document.getElementById("myForm");
form.onsubmit = checkAnswers;

function checkAnswers() {
  if (!form || form.nodeName !== "FORM") {
    alert("There is no form!);")
    return;
  }
  // create an empty array
  var q = [];
  // process every element in the form with this for-loop
  for (var i = 0; i < form.elements.length; i++) {
    // skip an element if it has no name
    if (form.elements[i].name == "") {
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
        // if the element is input radio or input checkbox TYPE, then see if it
        // has the "checked" attribute. If so, add it to the q array
        if (form.elements[i].checked) {
          q.push(form.elements[i].name + "=" + form.elements[i].value);
        }
        break;
      }
      break;
      // now done checking for INPUT; check if other kinds
      case 'file':
      // if the element is file, ignore it
      break;
      case 'TEXTAREA':
      // if the element is textarea, add it to the q array
      q.push(form.elements[i].name + "=" + form.elements[i].value);
      break;
      case 'SELECT':
      // if the element is select, look for selected items
      // if type is multiple, loop through all of them (with j in new for-loop)
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
      }
      break;
      case 'BUTTON':
      // if the element is one of these buttons, ignore it
      switch (form.elements[i].type) {
        case 'reset':
        case 'submit':
        case 'button':
        break;
      }
      break;
    }
  }
  // turn the whole q array into one big string, with & between each pair
  var data = q.join("&");

  // turn the whole q array into one big string, with a line break between
  // each pair - "\n" creates a newline
  var dataWithLineBreaks = q.join("\n");

  // note: the q array is still intact

  // alerts commented out, but they do work
  // alert(data);
  // alert(dataWithLineBreaks);

  // run the function that is below
  writeMessage(dataWithLineBreaks);

  // reset all the form fields
  form.reset();

  // keep next line as final line, because we are returning data
  // to the same page and we don't want page to reload
  return false;
}

function writeMessage(msg) {
  // write message into the paragraph
  document.getElementById("results_text").innerHTML = msg;
}
