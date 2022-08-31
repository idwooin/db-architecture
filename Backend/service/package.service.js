const Package = require("../repository/package.repository.js");
const Profit = require("../repository/profit.repository.js");

exports.getAllPackageLsit=async(req, res)=>{
    const type = req.query.package_type;
    const brach_id = req.user.branch_id;
    Package.getAllPackageLsit(type,brach_id,(err,data)=>{
        if(err)
        res.status(500).send({
            message:
             err.message || "Some error occurred while retrieving pacakges."
        });
        else res.send(data);
    });
};

exports.registerNewPackage=async(req, res)=>{
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    };

    console.log(req.body.package_type)

    //Regist a new Package
    const package = new Package({
        branch_id : req.user.branch_id,
        weight : req.body.weight,
        b_phone : req.body.b_phone,
        b_address : req.body.b_address,
        b_name : req.body.b_name,
        s_phone : req.body.s_phone,
        s_address : req.body.s_address,
        s_name : req.body.s_name,
        commision : req.body.commision,
        package_price : req.body.package_price,
        package_type : req.body.package_type
    });

    Package.registerNewPackage (package,(err,data)=>{
        if (err) 
        res.status(500).send({message : err.message 
            || "Some error occurred while creating the User."
        })
        else {
            res.send(data);
        };
    });
};
