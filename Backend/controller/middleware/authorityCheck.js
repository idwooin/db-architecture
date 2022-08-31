exports.authority_employee_check = (req, res, next) => {
    if(!req.user) {
      res.status(401).send({
        messege: "Unauthorized"
      });
    } else if (req.user.user_type > 1) {
        console.log(req.user.user_type);
        res.status(401).send({
            messege: "do not have permission to access this api"
        });
    } else {
        next();
    }
}

exports.authority_employer_check = (req, res, next) => {
    if(!req.user) {
      res.status(401).send({
        messege: "Unauthorized"
      });
    } else if (req.user.user_type > 0) {
        console.log(req.user.user_type);
        res.status(401).send({
            messege: "do not have permission to access this api"
        });
    } else {
        next();
    }
}