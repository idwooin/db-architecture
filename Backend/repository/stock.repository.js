const model = require("../models");
const sequelize = model.sequelize;

const Stock = function(stock){
    this.branch_id = stock.branch_id
    this.stuff_name = stock.stuff_name;
    this.stock_num = stock.stock_num;
    this.stock_id = stock.stock_id;
    this.expired_date = stock.expired_date;
};

Stock.getAllList = async(newStock, results) => {
    if(!newStock.stuff_name){
        await model.Stock.findAll({
            raw:true,
            where:{branch_id:newStock.branch_id}
        }).then(result=>{
            console.log("Stock retrieving done");
            results(null,result);
        }).catch(err=>{
            console.log("err occured while getting stock list");
            results(err,null);
        })

    }else{
        await model.Stuff.findOne({
            raw:true,
            where:{stuff_name:newStock.stuff_name},
            attributes:['stuff_id'],
        }).then(stuff=>{
            console.log(stuff,newStock.branch_id)
            model.Stock.findAll({
                raw:true,
                where:{branch_id:newStock.branch_id, stuff_id:stuff.stuff_id},
            }).then(result=>{
                console.log("Stock retrieving done");
                results(null,result);
            }).catch(err=>{
                console.log("err occured while getting stock list with"+newStock.branch_id+", "+newStock.stuff_name);
                results(err,null);
            })
        }).catch(err=>{
            console.log("err occured while getting stuff_id (Stock.getAllList with:"+ newStock.stuff_name+")");
            results(err,null);
        })
    }
}

Stock.addItem = async(newStock, results)=>{
    
    try{
        stuff = await model.Stuff.findOne({
            raw:true,
            where:{stuff_name:newStock.stuff_name},
            attributes:['stuff_id'],
        })

        await sequelize.transaction(async t =>{
            citems = {stuff_id:stuff.stuff_id,stock_num:newStock.stock_num,branch_id:newStock.branch_id}
            if (!(newStock.expired_date == "" || newStock.expired_date == null)){
                citems = Object.assign(citems,{expired_date : newStock.expired_date})
            }
            console.log(citems)
            result = model.Stock.create(citems)
        });

        if(!result){
            throw new {msg:"Update incomplete"}
        }

    }catch(err) {
        console.log("err occured while add stock " + err);
        return results(err,null);
    }

    console.log("register stock: ",{...result})

    return results(null,{msg:"Add complete"});
}


Stock.updateStock = async(newStock, results) =>{

    try{
        await sequelize.transaction(async t =>{
            result = model.Stock.update(
                {stock_num:newStock.stock_num},
                {where: {branch_id:newStock.branch_id, stock_id:newStock.stock_id}
            })
        });

        if(!result){
            throw new {msg:"Update incomplete"}
        }

    }catch(err) {
        console.log(err);
        return results(err,null);
    }

    return results(null,{msg:"Update complete"})
}

module.exports = Stock;