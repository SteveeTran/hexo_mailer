var fs = require('fs');
var ejs = require('ejs');
var FeedSub = require('feedsub');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('xaECNJaoROxK78AqlStmYA');

var blogContent = new FeedSub('http://SteveeTran.github.io/atom.xml', {
        emitOnStart: true
});

// blogContent.read(function(err,blogPosts){
//     console.log(blogPosts);
// })

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

function sendEmail(to_name, to_email, from_name, from_email, subject, message_html){
  var message = {
      "html": message_html,
      "subject": subject,
      "from_email": from_email,
      "from_name": from_name,
      "to": [{
              "email": to_email,
              "name": to_name
          }],
      "important": false,
      "track_opens": true,
      "auto_html": false,
      "preserve_recipients": true,
      "merge": false,
      "tags": [
          "Fullstack_Hexomailer_Workshop"
      ]
  };
  var async = false;
  var ip_pool = "Main Pool";
  mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
      // console.log(message);
      // console.log(result);
  }, function(e) {
      // Mandrill returns the error as an object with name and message keys
      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
      // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
  });

console.log(friends);
