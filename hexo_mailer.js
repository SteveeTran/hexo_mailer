var fs = require('fs');

var csvFile = fs.readFileSync("friend_list.csv", "utf8");
var emailTemplate = fs.readFileSync("emailTemplate.html", "utf8");

var csvParse = function(csvFile){
  var array_of_people = [];
  var lines = csvFile.split("\n");
  var keys = lines[0].split(",");

  lines.shift(); //removes the first line since it is stored in variable keys
  lines.pop(); //takes care of the extra line that is created for some reason
  var line = "";

  for(var x = 0; x < lines.length; x++){ //iterate through number of people
    array_of_people.push({});
    line = lines[x].split(",");
    for(var y = 0; y < line.length; y++){
      array_of_people[x][keys[y]] = line[y];
    }
  }

  return array_of_people;
}

friendList = csvParse(csvFile);

friendList.forEach(function(row){

    firstName = row["firstName"];
    numMonthsSinceContact = row["monthsSinceContact"];

    // we make a copy of the emailTemplate variable to a new variable to ensure
    // we don't edit the original template text since we'll need to us it for
    // multiple emails

    templateCopy = emailTemplate;

    // use .replace to replace FIRST_NAME and NUM_MONTHS_SINCE_CONTACT with firstName and  monthsSinceLastContact
    templateCopy = templateCopy.replace(/FIRST_NAME/gi,
    firstName).replace(/NUM_MONTHS_SINCE_CONTACT/gi, numMonthsSinceContact);

    console.log(templateCopy);


})

console.log(friendList);
