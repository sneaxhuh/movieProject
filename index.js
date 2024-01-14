const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const path = require('path');


const app = express();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/dashboard/uploads/profiles');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage });

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: true
}));


app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'public'));


mongoose.connect('mongodb+srv://sneax:blLV9SGefyROyt7n@cluster0.yairrc8.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log("Connected to Database");
    })
    .catch((err) => {
        console.error("Error in Connecting to Database:", err);
    });

const userSchema = new mongoose.Schema({
    user: String,
    email: String,
    password: String,
    profilePicture: String
});

const User = mongoose.model('User', userSchema);


app.post("/sign_up", upload.single('profilePicture'), async (req, res) => {
    console.log(req.file);
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;
    const profilePicture = req.file ? `/dashboard/uploads/profiles/${req.file.filename}` : 'images/defaultpfp.jpg';
    console.log(profilePicture)
  
    try {
      const existingUser = await User.findOne({ "email": email }).exec();
  
      if (existingUser) {
        return res.redirect('index.html?error=email_exists');
      } else {
        const newUser = new User({
          "user": user,
          "email": email,
          "password": password,
          "profilePicture": profilePicture
        });
  
        const savedUser = await newUser.save();
        console.log("Record Inserted Successfully");
        res.redirect('login.html');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });


app.post("/login", async (req, res) => {
    const user = req.body.user;
    const password = req.body.password;
    
    try {
      
        const existingUser = await User.findOne({ "user": user }).exec();

        if (existingUser) {
            if (existingUser.password && existingUser.password === password) {
               
                req.session.user = existingUser;
                return res.redirect('./dashboard/main.html');
            } else if (existingUser.googleId) {
             
                req.session.user = existingUser;
                return res.redirect('./dashboard/main.html');
            } else {
                return res.redirect('login.html?error=incorrect_password');
            }
        } else {
            console.log(`User not found for username: ${user}`);
            return res.redirect('login.html?error=user_not_found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});





app.listen(3000, () => {
    console.log("Listening on port 3000");
});

app.get("/dashboard/profilepage.html", (req, res) => {
    if (req.session.user) {
       
        return res.render('dashboard/profilepage', {
            email: req.session.user.email,
            user: req.session.user.user,
            profilePicture: req.session.user.profilePicture 
        });
    } else {

        return res.redirect('../login.html');
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profilepage.html'));
});