require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Bağlantısı
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(flash());

// Flash Message Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

// View Engine
app.set("view engine", "ejs");

// Rotalar
app.use("/", require("./routes/index"));

// Server Başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
