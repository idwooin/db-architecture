const Commute_repo = require("../repository/commute.repository.js");

exports.commute = async(req,res) => {
    let id = req.user.employee_id
    let startd = req.body.startd
    let endd = req.body.endd
    Commute_repo.commute_new(id, startd, endd, (err,data)=>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
        else res.send(data);
    })
}

exports.commutelist = async(req,res) => {
    let startd = req.query.startd
    let endd = req.query.endd
    Commute_repo.commute_list(startd, endd, (err,data)=>{
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
        else res.send(data);
    })
}