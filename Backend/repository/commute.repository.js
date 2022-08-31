const model = require("../models")
const Sequelize = require('sequelize')

const Commute = ()=>{}

Commute.commute_new = (id,s,e,results)=>{
    model.Commute.create({
        employee_id: id,
        commute_start: s,
        commute_end: e,
    }).then(result=>{
        if (result == null){
            throw new {msg:"Create incomplete"}
        }
        results(null,{msg:"Create complete"})
    }).catch(err=>{
        results(err,null)
        console.log(err)
    })
}

Commute.commute_list = (s,e,results)=>{
    let where = {};

    if (!(s == null)){

        where = Object.assign(where,{commute_start: {
            [Sequelize.Op.gte]: s
        }})
    }

    if (!(e == null)){
        where = Object.assign(where,{commute_end: {
            [Sequelize.Op.lte]: e
        }})
    }

    model.Commute.findAll({
        raw:true,
        where:where,
        attributes:['commute_start','commute_end','employee_id'],
    }).then(result=>{
        results(null,result)
    }).catch(err=>{
        results(err,null)
        console.log(err)
    })
}

module.exports = Commute;