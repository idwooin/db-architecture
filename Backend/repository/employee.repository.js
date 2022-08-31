const model = require("../models")
const Sequelize = require('sequelize')
const {sequelize} = require('../models/connection')

const Emp = ()=>{

}

Emp.emp_list = (bi,results)=>{
    model.Employee.findAll({
        raw:true,
        where:{
            branch_id:bi
        },
        attributes:['employee_id','employee_name','employee_phone','salary'],
    }).then(result=>{
        results(null,result)
    }).catch(err=>{
        results(err,null)
        console.log(err)
    })
}

Emp.emp_create = async (bi,en,ph,sa,id,pw,results) =>{
    try{
        await sequelize.transaction(async (t)=>{

            let q = {employee_name: en, branch_id:bi}

            if (!(sa == ""||sa==null)){
                q = Object.assign(q,{salary:sa})
            }
            if (!(ph == ""||ph==null)){
                q = Object.assign(q,{employee_phone:ph})
            }

            result = await model.Employee.create(q,{transaction:t});

            if (result == null){
                throw "Create incomplete"
            }

            result = await model.User.create({
                user_id: id,
                user_name: en,
                user_pw: pw,
                type: 1,
                employee_id:result.employee_id,
                branch_id:bi,
            },{transaction:t});

            if (result == null){
                throw "Create incomplete"
            }

            results(null,"Create complete")
        })
    }catch(err){
        console.log(err)
        results(err,null)
    }
}

Emp.emp_update = (en,bi,sa,results) =>{
    model.Employee.update({
        salary:sa
    },{where:{
        employee_name: en,
        branch_id: bi,
    }}).then(result=>{
        if (result == null){
            throw new {msg:"Update incomplete"}
        }
        results(null,{msg:"Update complete"})
    }).catch(err=>{
        results(err,null)
        console.log(err)
    })
}

Emp.emp_del = async (en,bi,results) =>{
    try{
        await sequelize.transaction(async (t)=>{
            who = await model.Employee.findOne({
                where:{
                    employee_name:en,
                    branch_id:bi,
                },
                attributes:['employee_id']
            })

            result = await model.Employee.destroy({
                where:{
                    employee_name:en,
                    branch_id:bi,
                }
            })
            
            if (result == null){
                throw "Delete incomplete"
            }

            result = await model.User.destroy({
                where:{
                    employee_id: who.employee_id
                }
            })

            if (result == null){
                throw "Delete incomplete"
            }

            results(null,"Delete complete")
        })
    }catch(err){
        results(err,null)
        console.log(err)
    }
}

module.exports = Emp;