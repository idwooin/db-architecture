const model = require("../models");
const sequelize = model.sequelize;
//택배 코드:7
const package_code = 7;
const packageProfitCode = 2;

const Package = function(pacakge){
    this.branch = pacakge.branch;
    this.weight = pacakge.weight;
    this.b_phone = pacakge.b_phone;
    this.b_address = pacakge.b_address;
    this.b_name = pacakge.b_name;
    this.s_phone = pacakge.s_phone;
    this.s_address = pacakge.s_address;
    this.s_name = pacakge.s_name;
    this.commision = pacakge.commision;
    this.package_price = pacakge.package_price;
    this.package_type = pacakge.package_type;
    this.branch_id = pacakge.branch_id;
}

Package.getAllPackageLsit = (type,branch_id, results) =>{
                //타입 있는 경우
    if(type != null){
        model.Code.findOne({
            raw:true,
            where: {code:package_code,code_name:type},
            attributes: ['sec_code']
        }).then(codeValue=>{
            model.Package.findAll({
                raw:true,
                where:{pakage_type:codeValue.sec_code, branch_id:branch_id}
            }).then(result=>{
                console.log("get all package ("+type+"),("+branch_id+")");
                results(null,result);
            })
        }).catch(err=>{
            console.log("err occuered while get all package (get code value) "+type+"),("+branch_id+")");
            results(err, null);
        })
    }
    //타입 없는 경우
    else{
        model.Package.findAll({
            raw:true,
            where:{branch_id:branch_id},
        }).then(result=>{
            console.log("get all package ("+branch_id+")");
            results(null,result);
        }).catch(err=>{
            console.log("err occuered while get all package (Package find All) ("+branch_id+")");
            results(err, null);
        })
    }
};

Package.registerNewPackage = async (package, results) => {
    try {
        const code = await model.Code.findOne({
            raw:true,
            where: {
                code:package_code,
                code_name:package.package_type
            },
            attributes:['sec_code']
        });
        

        await sequelize.transaction(async t => {
            await model.Package.create({
                weight : package.weight,
                b_phone : package.b_phone,
                b_address : package.b_address,
                b_name : package.b_name,
                s_phone : package.s_phone,
                s_address : package.s_address,
                s_name : package.s_name,
                commision : package.commision,
                package_price : package.package_price,
                pakage_type : code.sec_code,
                branch_id : package.branch_id
            },{transaction:t});
            

            const today = new Date();
            let year = today.getFullYear();
            let month = ('0' + (today.getMonth() + 1)).slice(-2);
            let day = ('0' + today.getDate()).slice(-2);

            let dateString = year + '-' + month  + '-' + day;

            const data_arr = [{
                date:dateString,
                profit:package.package_price,
                profitcode:packageProfitCode,
                cost:package.commision,
            }];

            await model.Profit.create({
                profit_date:data_arr[0].date,
                profit:data_arr[0].profit,
                profitcode:data_arr[0].profitcode,
                branch_id:package.branch_id,
            },{transaction:t});

            await model.Cost.create({
                cost_date:data_arr[0].date,
                cost:data_arr[0].cost,
                costcode:8,
                branch_id:package.branch_id,
            },{transaction:t});


        });
    } catch(err) {
        console.log("err occured while register package " + err);
        return results(err,null);
    }

    console.log("register package: ",{ ...package });
    return results(null,{ ...package });
}


module.exports = Package;
