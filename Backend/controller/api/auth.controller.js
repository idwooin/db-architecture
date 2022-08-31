const express = require('express');
const passport = require('passport')
const router = express.Router();

router.post("/login", passport.authenticate('local'), (req, res) => {
    if (!req.body) {
        res.status(401).send({
            message: "Unauthorized"
        });
    } else {
        res.redirect('/')
    }
});

router.get("/logout", (req, res) => {
    req.logout(err => {
        if(err){
            res.status(400).send({
                message: "logout err"
            });
        } else {
            res.send("logout");
        }
    });
});

module.exports = router;