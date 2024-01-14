const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const path = require('path');


const app = express();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser((email, done) => {
    User.findOne({ "email": email }, (err, user) => {
        done(err, user);
    });
});


passport.use(new GoogleStrategy({
    clientID: '619643815098-1fc1bv9mdaa67jai162qq7rv0lr5uvv2.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
    console.log("done");
    console.log(profile);
    process.nextTick(async () => {
        try {
            const existingUser = await User.findOne({ "email": profile.emails[0].value }).exec();

            if (existingUser) {
                // User already exists, log them in
                return done(null, existingUser);
            } else {
                // User doesn't exist, create a new user
                // const newUser = new User({
                //     "user": profile.displayName,
                //     "email": profile.emails[0].value,
                //     "profilePicture": profile.photos[0].value
                // });

                // const savedUser = await newUser.save();
                return done(null);
            }
        } catch (err) {
            console.error(err);
            return done(err);
        }
    });
}));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes...




 
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

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
passport.authenticate('google'),
    (req, res) => {
        console.log("Google OAuth Successful");
        // console.log(req.user); 
        res.redirect('/dashboard/main.html');
    }
);

app.post("/sign_up", upload.single('profilePicture'), async (req, res) => {
    
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
        const user = req.body.user;
        const password = req.body.password;
    
        if (req.body.oauth) {
            
            return res.redirect('/auth/google');
        }
      
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