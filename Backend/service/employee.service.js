const Emp_repo = require("../repository/employee.repository.js");

exports.newemployee = async(req, res) => {
    let bi = req.user.branch_id
    let en = req.body.employee_name
    let ph = req.body.employee_phone
    let sa = req.body.salary
    let id = req.body.id
    let pw = req.body.pw
  
    Emp_repo.emp_create(bi,en,ph,sa,id,pw,(err,data) => {
      if (err)
          res.status(500).send({
              message:
                  err.message || "Some error occurred"
          });
          else res.send(data);
      });
  }

exports.list = async(req, res) => {
  let bi = req.user.branch_id

  Emp_repo.emp_list(bi,(err,data) => {
    if (err)
        res.status(500).send({
            message:
                err.message || "Some error occurred"
        });
        else res.send(data);
    });
}

exports.salary = async(req, res) => {
    let en = req.body.employee_name
    let bi = req.user.branch_id
    let sa = req.body.salary

    Emp_repo.emp_update(en,bi,sa,(err,data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
            else res.send(data);
    });
}

exports.fire = async(req, res) => {
    let en = req.body.employee_name
    let bi = req.user.branch_id

    Emp_repo.emp_del(en,bi,(err,data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
            else res.send(data);
    });
}