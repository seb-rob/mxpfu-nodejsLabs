const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  // Copy the code here
  res.send(JSON.stringify({users},null,4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  // Copy the code here
  const filteredUsers = users.filter(val => val.email === req.params.email)
  res.send(filteredUsers)//This line is to be replaced with actual return value
});

// GET by specific ID request: Retrieve a single user with lastName
router.get("/lastname/:lastname",(req,res)=>{
    // Copy the code here
    const filteredUsers = users.filter(val => val.lastname === req.params.lastname)
    res.send(filteredUsers)//This line is to be replaced with actual return value
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  // Copy the code here
  const newUser = {
      firstName: req.query.firstName,
      lastName: req.query.lastName,
      email: req.query.email,
      DOB: req.query.DOB
    }
    users.push(newUser)
    res.send("The user" + (' ')+ (req.query.firstName) + " Has been added!")
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Copy the code here
  const email = req.params.email;
    let filtered_users = users.filter((user) => user.email === email);
    if (filtered_users.length > 0) {
        let filtered_user = filtered_users[0];
        let DOB = req.query.DOB;
        let firstName = req.query.firstName;
        let lastName = req.query.lastName;

        if(DOB) {
            filtered_user.DOB = DOB
        }
        if(firstName) {
            filtered_user.firstName = firstName
        }
        if(lastName) {
            filtered_user.lastName = lastName
        }

        users = users.filter((user) => user.email != email);
        users.push(filtered_user);
        res.send(`User with the email  ${email} updated.`);
    }
    else{
        res.send("Unable to find user!");
    }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Copy the code here
  const email = req.params.email;
  users = users.filter(val => val.email != email)
  res.send(`User with the email  ${email} deleted.`);
});

module.exports=router;