const Buy_repo = require("../repository/buy.repository.js");

exports.list = async(req, res) => {
    // Validate request
    if (!req.query) {
     res.status(400).send({
       message: "Query can not be empty!"
     });
   };

  let sd=req.query.startdate;
  let ed=req.query.enddate;
  let code=req.query.buycode;
  let age = req.query.age;
  let sex = req.query.sex;
  let bi=req.user.branch_id;
  let sc=req.query.sumcode;


  Buy_repo.findByCode_and_Date(sd,ed,code,age,sex,bi,sc,(err,data) => {
    if (err)
        res.status(500).send({
            message:
                err.message || "Some error occurred"
        });
        else res.send(data);
    });
}

exports.newbuy = async(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    };
    
    let data_arr = req.body;
    let bi = req.user.branch_id;

    Buy_repo.update_buy(data_arr,bi,(err,data) => {
        if (err)
            res.status(500).send({
                message:
                    err || "Some error occurred"
            });
        else res.send(data);
    });
}