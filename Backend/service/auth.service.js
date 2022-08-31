const passport = require("passport");
//not useed service.

exports.login = (req, res, next) => {
    if(!req.body) {
        res.status(400).send({
            message: "req.body can not be empty!"
          });
    } else {
        console.log('login')
        passport.authenticate('local', (err, user, info) => {
            console.log(err, user, info);
            if (err) {
                console.log(err);
                return next(err);
            }

            if (info) {
                return res.status(401).send(info.reason);
            }

            return req.login(user, loginErr => {
                if (loginErr) {
                    return next(loginErr);
                }
                console.log(user);
                return res.send({
                    user_name: user.user_name
                });
            })
        });
    }
    
}

exports.logout = async (req, res) => {
    console.log('logout', req.user);
    await req.logout();
    req.session.save(err => {
        if (err) {
            res.send
        }
    });
}