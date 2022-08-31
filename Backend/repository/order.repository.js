const model = require("../models");
const { Op } = require("sequelize");
const sequelize = model.sequelize;
const moment = require("moment");

const Order = {}

Order.createOrder = async (order, results) => {
    const cost = await model.Stuff.findOne({
        raw: true,
        where:{
            stuff_id: order.stuff_id,
        },
        attributes:['first_cost']
    });

    if(!cost) {
        return results("wrong stuff_id",null);
    }

    const date = moment().format("YYYY-MM-DD");
    
    let createdOrder;
    try {
        await sequelize.transaction(async t => {
            createdOrder = await model.Order.create({
                order_num: order.order_num,
                order_cost: order.order_num * cost.first_cost,
                stuff_id: order.stuff_id,
                branch_id: order.branch_id,
                order_date: date,
            },{transaction:t});
    
            await model.Cost.create({
                costcode: 4,
                cost: order.order_num * cost.first_cost,
                cost_date: date,
                branch_id: order.branch_id,
                type_id: createdOrder.order_id,
            },{transaction:t});
        });
        
    } catch(err) {
        console.log("createOrder err", err);
        return results(err,null);
    }

    console.log("order is created");
    return results(null, createdOrder);
}

Order.findAllOrder = (branch_id, results) => {
    model.Order.findAll({
        raw: true,
        where: {
            branch_id: branch_id,
        },
        attributes:['order_id','order_num','order_cost','order_date','stuff_id','branch_id'],
    })
    .then(result => {
        console.log("find All Orders");
        return results(null, result);
    })
    .catch(err => {
        console.log("findAllOrders err", err);
        return results(err, null);
    });
}

Order.deleteOrder = async (order_id, branch_id, results) => {
    try{
        await sequelize.transaction(async t => {
            await model.Order.destroy({
                where: {
                    order_id: order_id,
                    branch_id: branch_id,
                },
            });

            await model.Cost.destroy({
                where: {
                    costcode: 4,
                    type_id: order_id,
                    branch_id: branch_id,
                }
            });
        });
    } catch (err) {
        console.log("deleteOrder err", err);
        return results(err, null);
    }

    console.log("Order is deleted");
    return results(null, "done");
}

Order.findAllNeccesaryOrder = (branch_id, results) => {
    model.Stock.findAll({
        raw: true,
        where: {
            stock_Num: {
                [Op.lte]: 5,
            },
            branch_id: branch_id,
        },
        attributes: ['stock_id', 'stock_num', 'expired_date', 'stuff_id','branch_id']
    })
    .then(result => {
        console.log("find All Neccesary Orders");
        return results(null, result);
    })
    .catch(err => {
        console.log("find All Neccesary Orders err", err);
        return results(err, null);
    });
}

module.exports = Order;