// Assignment code here

function generatePassword() {

  // ask the user length of password between 8 and 128 characters
  var passwordLength = window.prompt("How many characters would you like your password to be? Please enter a number between 8 and 128.");

  // convert input from string to integer
  passwordLength = parseInt(passwordLength);

  //check input meets requirements (number between 8 and 128)
  while ((passwordLength < 8 || passwordLength > 128) || isNaN(passwordLength)) {
    console.log("made it into the while ((passwordLength < 8 || passwordLength > 128) || isNaN(passwordLength)) statement, now trying confirm");
    window.confirm("You need to provide a valid answer! Please enter a number between 8 and 128.");
    console.log("number confirm should have fired");
    passwordLength = window.prompt("How many characters would you like your password to be? Please enter a number between 8 and 128.");
    passwordLength = parseInt(passwordLength);
  }

  // validate at least one of the below character sets is selected
  var passwordSelection = false;
  //this will be the set of characters used in the generated password
  var characterSet = '';
  while (!passwordSelection) {
    // ask the user if they want lowercase characters
    var passwordLower = window.confirm("Do you want lowercase characters?");
    if (passwordLower) {
      characterSet += 'abcdefghijklmnopqrstuvwxyz';
      passwordSelection = true;
    }

    // ask the user if they want uppercase characters
    var passwordUpper = window.confirm("Do you want uppercase characters?");
    if (passwordUpper) {
      characterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      passwordSelection = true;
    }

    // ask the user if they want numeric characters
    var passwordNumeric = window.confirm("Do you want numbers?");
    if (passwordNumeric) {
      characterSet += '0123456789';
      passwordSelection = true;
    }

    // ask the user if they want special characters
    var passwordSpecial = window.confirm("Do you want special characters?");
    if (passwordSpecial) {
      characterSet += "!#$%&()*+,-./:;<=>?@[\]^_`{|}~\"'"; //OWASP approved set ignoring space
      passwordSelection = true;
    }
    
    console.log("The value of passwordSelection is: " + passwordSelection);
    // if at least one of the above character sents is not selected restart questions at passwordLower
    if (!passwordSelection) {
      console.log("made it into the !passwordSelection if statement, now trying confirm");
      window.confirm("At least one character option must be selected.");
      console.log("passwordSelection confirm should have fired");
    }
  }
  // generates random password based on selections
  var passwd = '';

  for(var i = 0; i < passwordLength; i++) {
    var positionRandom = Math.floor(Math.random() * characterSet.length); 

    passwd += characterSet.charAt(positionRandom);
  }
  return passwd;

}
// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
