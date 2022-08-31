const Cost_repo = require("../repository/cost.repository.js");

exports.list = async(req, res) => {
    // Validate request
    if (!req.query) {
     res.status(400).send({
       message: "Query can not be empty!"
     });
   };

  let sd=req.query.startdate;
  let ed=req.query.enddate;
  let code=req.query.costcode;
  let bi=req.user.branch_id;
  let sc=req.query.sumcode;


  Cost_repo.findByCode_and_Date(sd,ed,code,bi,sc,(err,data) => {
    if (err)
        res.status(500).send({
            message:
                err.message || "Some error occurred"
        });
        else res.send(data);
    });
}

exports.newcost = async(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    };
    
    let data_arr = req.body;
    let bi = req.user.branch_id;

    Cost_repo.update_cost(data_arr,bi,(err,data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
            else res.send(data);
        });
}