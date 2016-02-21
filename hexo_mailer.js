var fs = require('fs');

var csvFile = fs.readFileSync("friend_list.csv", "utf8");

// var Person = function(first_name, last_name, monnths_since_contact, email_address){
//   this.first_name = first_name;
//   this.last_name = last_name;
//   this.monnths_since_contact = monnths_since_contact;
//   this.email_address = email_address;
// }

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

var csv_data = csvParse(csvFile);

console.log("lol");
