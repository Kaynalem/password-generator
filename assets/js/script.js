// Assignment code here

function generatePassword() {

  // ask the user length of password between 8 and 128 characters
  var passwordLength = window.prompt("How many characters would you like your password to be? Please enter a number between 8 and 128.");

  // convert input from string to integer
  passwordLength = parseInt(passwordLength);

  //check input meets requirements (number between 8 and 128)
  while ((passwordLength < 8 || passwordLength > 128) || isNaN(passwordLength)) {
    window.alert("You need to provide a valid answer! Please enter a number between 8 and 128.");
    passwordLength = window.prompt("How many characters would you like your password to be? Please enter a number between 8 and 128.");
    passwordLength = parseInt(passwordLength);
  }

  // validate at least one of the below character sets is selected
  var passwordSelection = false;
  //this will be the set of characters used in the generated password
  var characterSet = '';
  //instantiate user selection variables
  var passwordLower = "";
  var passwordUpper = "";
  var passwordNumeric = "";
  var passwordSpecial = "";
  //instantiate character sets
  var lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
  var upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var numbers = '0123456789';
  var specials = "!#$%&()*+,-./:;<=>?@[\]^_`{|}~\"'"; //OWASP approved set ignoring space

  while (!passwordSelection) {
    // ask the user if they want lowercase characters
    passwordLower = window.confirm("Do you want lowercase characters?");
    if (passwordLower) {
      characterSet += lowerLetters;
      passwordSelection = true;
    }

    // ask the user if they want uppercase characters
    passwordUpper = window.confirm("Do you want uppercase characters?");
    if (passwordUpper) {
      characterSet += upperLetters;
      passwordSelection = true;
    }

    // ask the user if they want numeric characters
    passwordNumeric = window.confirm("Do you want numbers?");
    if (passwordNumeric) {
      characterSet += numbers;
      passwordSelection = true;
    }

    // ask the user if they want special characters
    passwordSpecial = window.confirm("Do you want special characters?");
    if (passwordSpecial) {
      characterSet += specials; 
      passwordSelection = true;
    }
    
    // if at least one of the above character sets is not selected restart questions at passwordLower
    if (!passwordSelection) {
      window.alert("At least one character option must be selected.");
    }
  }

  function randomPassword(){
     // generates random password based on selections
    var passwd = '';
    for(var i = 0; i < passwordLength; i++) {
      var positionRandom = Math.floor(Math.random() * characterSet.length); 

      passwd += characterSet.charAt(positionRandom);
    }
    return passwd;
  }

  //checks to see if provided password (passwd) contains at least one character from the user selected character sets
  function charsMatch(passwd, charSet) {
    var result = false;
    for(var i = 0; i < charSet.length; i++) {
      // if password includes a given character in the provided character set, stop checking and return true
      if(passwd.includes(charSet.charAt(i))) {
        result = true;
        break;
      }
    }
    return result;
  }
  
  var completedPassword = "";
  var ready = false;
  var ready2 = false;
  // continuously runs randomPassword to generate a password (ready) then checks each user selected character set to see if the password contains a character from that set (ready2)
  while(!ready) {
    completedPassword = randomPassword();
    while(!ready2) {
    if (passwordLower) { //if user selected lowercase, run this check
      if(charsMatch(completedPassword, lowerLetters)) {//check if contains lower
        ready = true;
        ready2= true;
      } else { // if no lower, break loop and generate new password and check again
        ready = false;
        ready2= false;
        break;
      }
    }
    if (passwordUpper) { //if user selected uppercase, run this check
      if(charsMatch(completedPassword, upperLetters)) {//check if contains upper
        ready = true;
        ready2= true;
      } else { // if no upper, break loop and generate new password and check again
        ready = false;
        ready2= false;
        break;
      }
    }
    if (passwordNumeric) { //if user selected numbers, run this check
      if(charsMatch(completedPassword, numbers)) {//check if contains number
        ready = true;
        ready2= true;
      } else {
        ready = false;
        ready2= false;
        break;
      }
    }
    if (passwordSpecial) { //if user selected special characters run this check
      if(charsMatch(completedPassword, specials)) {//check if contains special characgters
        ready = true;
        ready2= true;
      } else { // if no special characters , break loop and generate new password and check again
        ready = false;
        ready2= false;
        break;
      }
    }
  }
}

return completedPassword;

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
