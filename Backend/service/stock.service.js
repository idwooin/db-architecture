const Stock = require("../repository/stock.repository.js");
const Stuff = require("../repository/stuff.repository.js");

exports.getAllList = async (req, res) => {
    //req.params 가 있는지 체크
    //있으면 해당 물건의 개수만, 아니면 모든 리스트 리턴
    //repository에서 findOneItem, findAllItem 생성
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    };

    const newStock = new Stock({
        branch_id: req.user.branch_id,
        stuff_name: req.query.stuff_name
    });

    Stock.getAllList(newStock,(err,data)=>{
        if (err) 
        res.status(500).send({message : err.message 
            || "Some error occurred while retrieving the stock."
        })
        else res.send(data);
    })
}

exports.addItem = async (req, res) => {
    //유효한item인지 확인 필요
    //repository에서 createItem 생성
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    };

    const newStock = new Stock({
        branch_id: req.user.branch_id,
        stuff_name: req.body.stuff_name,
        stock_num: req.body.stock_num,
        expired_date: req.body.expired_date
    });

    Stock.addItem(newStock,(err,data)=>{
        if (err) 
        res.status(500).send({message : err.message 
            || "Some error occurred while creating new stock."
        })
        else res.send(data);
    })

}

exports.setOderNum = (req, res) => {
    //repository에서 updateStock 생성
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    };

    const newStock = new Stock({
        branch_id: req.user.branch_id,
        stock_id: req.body.stock_id,
        stock_num: req.body.stock_num,
    });

    Stock.updateStock(newStock,(err,data)=>{
        if (err) 
        res.status(500).send({message : err.message 
            || "Some error occurred while updating  stock."
        })
        else res.send(data);
    })
}