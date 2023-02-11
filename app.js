// // apiKey
// // b207d17bb083b7cbe6641ad021ac3b19-us21

// // audience_id
// // 6bd4920d8d
 
                // --------------------------This code is working perfectly----------------
 
 
 // Requiring Packages
 const express = require("express");

 const mailchimp = require("@mailchimp/mailchimp_marketing");
 // Mailchimp Configuration
 mailchimp.setConfig({
     apiKey:"b207d17bb083b7cbe6641ad021ac3b19-us21",
     server:"us21"
 })
 // Installing Plugins to Express.js
 const app = express();

 app.use(express.urlencoded({extended:true}));
 app.use(express.static(__dirname+ '/'));
 // Responding to Home Page with HTML file
 app.get("/",function(req,res){
     res.sendFile(__dirname+"/signup.html");
 })
 // Fetching data from Client Request and adding it to mailchimp
 app.post("/",function(req,res){
     const listId = "6bd4920d8d";
     var firstName = req.body.fname;
     var lastName = req.body.lname;
     var email = req.body.email;
     async function run() {
         try{
             const response = await mailchimp.lists.addListMember(listId, {
                 email_address: email,
                 status: "subscribed",
                 merge_fields: {
                 FNAME: firstName,
                 LNAME: lastName
                 }
             });
             
             console.log(`Successfully added contact as an audience member. The contact's id is ${response.id }.`);
             res.sendFile(__dirname+"/success.html")
         }
         catch(e){
             console.log(e);
             res.sendFile(__dirname+"/failure.html")
            } 
        }
        run();
    })


    // below is the code for try again code we put in failure.html

    app.post("/failure", function(req, res){

        res.sendFile(__dirname+ "/signup.html");
    });
    
    app.listen(3000, function(){
        console.log("Server is running on Port 3000.");
    })
    
    
    





