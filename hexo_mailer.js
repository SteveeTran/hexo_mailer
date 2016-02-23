var fs = require('fs');
var ejs = require('ejs');

var csvFile = fs.readFileSync("friend_list.csv", "utf8");
var emailTemplate = fs.readFileSync("email_template.ejs", "utf8");

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

friends = csvParse(csvFile);

friends.forEach(function(row){

    firstName = row["first_name"];
    numMonthsSinceContact = row["months_since_contact"];
    templateCopy = emailTemplate;

    var customizedTemplate = ejs.render(emailTemplate,
                { firstName: firstName,
                  monthsSinceContact: numMonthsSinceContact
                });

    console.log(customizedTemplate);
})

console.log(friends);
