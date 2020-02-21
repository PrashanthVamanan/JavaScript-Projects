const jsonForm = document.querySelector('.jsonForm');
const errorMsg = document.querySelector('.error-msg');
const csvForm = document.querySelector('.csvForm');
const downloadButton = document.querySelector('.csvButton');
const csvOutput = document.querySelector('.csv')

let i = 0;

jsonForm.addEventListener('submit', e => {
  e.preventDefault();

  const jsonInput = jsonForm.jsonInput.value;

  if (jsonInput == '' || jsonInput == null || jsonInput == undefined) {
    errorMsg.innerHTML = 'Please enter valid JSON';
    errorMsg.style.display = 'block';
    clearErrorMessage();
  } else {
    let result = validateJSONInput(jsonInput);
    errorMsg.innerHTML = result.error;
    errorMsg.style.display = 'block';
    clearErrorMessage();
    // jsonForm.reset();

    if (result.finalResult) {
      let input = JSON.parse(jsonInput);
      let headers = '';
      let csv = '';

      if (typeof (input) === 'object' && !(input instanceof Array)) {
        //input is an object
        headers = Object.keys(input).join(",");
        csv = csv + headers + "\n";
        csv += getCSVString(input);
      } else {
        //input is an array of objects
        headers = Object.keys(input[0]).join(",");
        csv = csv + headers + "\n";

        input.forEach(item => {
          csv = csv + getCSVString(item) + "\n";
        });
      }
      if (csv.length) {
        let csvOutput = csvForm.csvOutput;
        csvOutput.value = csv;
        csvForm.style.display = 'flex';
      } else {
        csvForm.style.display = 'none';
      }
    } else {
      csvForm.style.display = 'none';
    }

  }
})

//Validator only for simple json not array of json objects
validateJSONInput = jsonInput => {
  let jsonElements = jsonInput.split("\n");
  let length = jsonElements.length;
  let finalResult = null;
  let errorMessage = null;

  if (jsonElements[0].trim() !== '{') {
    try {
      let result = JSON.parse(jsonInput);
      if (result) {
        return {
          finalResult: true,
          error: 'Valid JSON'
        }
      }
    } catch (err) {
      return {
        finalResult: false,
        error: err
      }
    }
  }

  //Curly brace check
  if (jsonElements[0].trim() !== '{' || jsonElements[length - 1].trim() !== '}') {
    finalResult = false;
    errorMessage = "JSON should start and end with curly braces!";
  } else {
    for (let i = 1; i < length - 1; i++) {
      let eachKeyValue = jsonElements[i].trim().split(":");

      if (!eachKeyValue[0].trim().startsWith("\"") || !eachKeyValue[0].trim().endsWith("\"")) {
        errorMessage = "Keys should be surrounded within double quotes";
        finalResult = false;
      } else {

        if (typeof (eachKeyValue[1]) === 'string' && isNaN(eachKeyValue[1])) {
          finalResult = eachKeyValue[1].trim().startsWith("\"") ? true : false;
          errorMessage = !finalResult ? 'String values must include double quotes' : null;

          if (i === length - 2) {
            console.log(eachKeyValue[1].trim().endsWith("\""));
            finalResult = eachKeyValue[1].trim().endsWith("\"") ? true : false;
            errorMessage = !finalResult ? 'Last key value pair should not end with a comma' : null;
          }
          else {
            finalResult = eachKeyValue[1].trim().endsWith(",") ? true : false;
            errorMessage = !finalResult ? 'All key value pairs except the last one should end with a comma' : null
          }
        }
      }
    }
  }
  errorMessage = finalResult ? 'Valid JSON' : errorMessage;
  return {
    finalResult: finalResult,
    error: errorMessage
  }
}

clearErrorMessage = () => {
  setTimeout(function () {
    errorMsg.innerHTML = '';
    errorMsg.style.display = 'none';
  }, 2000)
}

getCSVString = obj => {
  let csv = '';
  let objectLength = Object.entries(obj).length;
  i = 0;

  for (let [key, value] of Object.entries(obj)) {
    i++;
    csv = csv + value;
    csv = i !== objectLength ? csv + "," : csv;
  }
  return csv;
}

downloadButton.addEventListener('click', e => {
  e.preventDefault();

  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csvOutput.value));
  element.setAttribute('download', 'test.csv');
  element.style.display = 'none';

  if (typeof element.download != "undefined") {
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  } else {
    alert('This functionality is not supported by the current browser, recommend trying with Google Chrome instead.  (http://caniuse.com/#feat=download)');
  }

});