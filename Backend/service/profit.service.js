const Profit_repo = require("../repository/profit.repository.js");

exports.list = (req, res) => {
    // Validate request
    if (!req.body) {
     res.status(400).send({
       message: "Content can not be empty!"
     });
   };

  let sd=req.query.startdate;
  let ed=req.query.enddate;
  let pc=req.query.profitcode;
  let bi=req.user.branch_id;
  let sc=req.query.sumcode;

  Profit_repo.findByCode_and_Date(sd,ed,pc,bi,sc,(err,data) => {
    if (err)
        res.status(500).send({
            message:
                err.message || "Some error occurred"
        });
        else res.send(data);
    });
}

exports.newprofit= async(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    };

    let data_arr = req.body;
    let bi = req.user.branch_id;

    Profit_repo.update_profit(data_arr,bi,(err,data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
            else res.send(data);
        });
}