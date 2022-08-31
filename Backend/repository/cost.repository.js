const model = require("../models")
const Sequelize = require('sequelize')
const {sequelize} = require('../models/connection')

const Cost = ()=>{}

Cost.findByCode_and_Date = (start,end,code,bi,sumcode,results)=>{
    let where = {
        cost_date:{
            [Sequelize.Op.gte]:start,
            [Sequelize.Op.lte]:end
        },
        branch_id:bi,
    }

    if (!(code==""||code==null)){
        where = Object.assign(where,{costcode: code})
    }

    if (sumcode == 0){
        model.Cost.findAll({
            raw:true,
            where: where,
            attributes:['cost_date','cost','costcode'],
        }).then(result=>{
            results(null,result)
        }).catch(err=>{
            results(err,null)
            console.log(err)
        })
    }
    else{
        model.Cost.findAll({
            raw:true,
            where: where,
            attributes:[[Sequelize.fn('sum', Sequelize.col('cost')), 'sumCost']],
        }).then(result=>{
            results(null,result)
        }).catch(err=>{
            results(err,null)
            console.log(err)
        })
    }

}

Cost.update_cost= async(data_arr,bi,results) =>{

    try{
        await sequelize.transaction(async(t)=>{
            let i;
            for (i=0; i<data_arr.length; i++){
                let c = data_arr[i].costcode;
                let cost = data_arr[i].cost_size;

                if (c == 6){
                    stuffs = await model.Stock.findOne({
                        where:{
                            stock_id: data_arr[i].stock_id,
                        },
                        attributes: ['stuff_id']
                    })

                    price = await model.Stuff.findOne({
                        where: {stuff_id: stuffs.stuff_id},
                        attributes:['first_cost']
                    })

                    cost = (data_arr[i].stock_num)*(price.first_cost);

                    stat = await model.Stock.increment({
                        stock_num: data_arr[i].stock_num,
                    },{
                        where: {
                            stock_id: data_arr[i].stock_id,
                        },
                    });
                }
                else if (c == 7){
                    temp = await model.Stock.findAll({
                        raw:true,
                        where:{
                            stock_id: data_arr[i].stock_id,
                            branch_id: bi,
                        }
                    })

                    if (temp == null){
                        throw "stockid is not exist or that stockid does not exist in your branch"
                    }

                    fc = await model.Stuff.findByPk(temp[0].stuff_id);
                    cost = (fc.first_cost)*(temp[0].stock_num);
                    console.log(cost)
                    temp = await model.Stock.update({
                        stock_num: 0,
                    },{
                        where:{
                            stock_id: data_arr[i].stock_id,
                        }
                    })
                }

                result = await model.Cost.create({
                    costcode:c,
                    cost:cost,
                    cost_date:data_arr[i].time,
                    branch_id: bi
                })


                if (result == null){
                    throw "Cost Create incomplete"
                }
            }
        })
    }catch(err){
        results(err,null)
        console.log(err)
    }

    results(null,"Create complete")
}

module.exports = Cost;