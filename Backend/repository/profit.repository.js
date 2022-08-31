const model = require("../models")
const Sequelize = require('sequelize')
const sequelize = model.sequelize;

const Profit = ()=>{

}

Profit.findByCode_and_Date = (start,end,code,bi,sumcode,results) =>{

    let where = {
        profit_date:{
            [Sequelize.Op.gte]: start,
            [Sequelize.Op.lte]: end,
        },
        branch_id:bi,
    }

    if (!(code == "" || code == null)){
        where = Object.assign(where,{profitcode: code})
    }

    if (sumcode == 0){
        model.Profit.findAll({
            raw:true,
            where:where,
            attributes:['profit_date','profit','profitcode'],
        }).then(result=>{
            results(null,result)
        }).catch(err=>{
            results(err,null)
            console.log(err)
        })
    }
    else{
        model.Profit.findAll({
            raw:true,
            where:where,
            attributes:[[Sequelize.fn('sum', Sequelize.col('profit')), 'sumProfit']],
        }).then(result=>{
            results(null,result)
        }).catch(err=>{
            results(err,null)
            console.log(err)
        })
    }
}

Profit.update_profit = async (data_arr,bi,results) =>{

    try{
        let i;
        let result;

        await sequelize.transaction(async t => {
            for (i=0; i<data_arr.length; i++){

                result = await model.Profit.create({
                    profit_date:data_arr[i].date,
                    profit:data_arr[i].profit,
                    profitcode:data_arr[i].profitcode,
                    branch_id:bi,
                })
    
                if (result == null){
                    throw new {msg:"Create incomplete"}
                }
            }
        });
        
    } catch(err) {
        console.log(err);
        return results(err,null);
    }

    return results(null,{msg:"Create complete"})
}

module.exports = Profit;