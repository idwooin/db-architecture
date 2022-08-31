const Stuff_repo = require("../repository/stuff.repository.js");

exports.getList = (req,res) => {
     let sn=req.query.stuff_name;
     let id=req.query.stuff_id;
     let sc=req.query.stuffcode;
   
     Stuff_repo.getList(sn,id,sc,(err,data) => {
       if (err)
           res.status(500).send({
               message:
                   err.message || "Some error occurred"
           });
           else res.send(data);
       });

}

exports.addItem = (req,res) => {

    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      };
     
     let data_arr = req.body;
   
     Stuff_repo.addItem(data_arr,(err,data) => {
       if (err)
           res.status(500).send({
               message:
                   err.message || "Some error occurred"
           });
           else res.send(data);
       });

}

exports.updateItem = (req,res) => {

    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      };
     
     let data_arr = req.body;
   
     Stuff_repo.updateItem(data_arr,(err,data) => {
       if (err)
           res.status(500).send({
               message:
                   err.message || "Some error occurred"
           });
           else res.send(data);
       });

}

exports.deleteItem = (req,res) => {

    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      };
   
     let id = req.body.stuff_id;

     Stuff_repo.deleteItem(id,(err,data) => {
       if (err)
           res.status(500).send({
               message:
                   err.message || "Some error occurred"
           });
           else res.send(data);
       });

}