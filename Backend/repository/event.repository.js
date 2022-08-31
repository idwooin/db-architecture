const model = require("../models");
const sequelize = model.sequelize;
//이벤트 코드:7
const event_code = 5;

const Event = function(event){
    this.stuff_name = event.stuff_name;
    this.disprice = event.disprice;
    this.disrate = event.disrate;
    this.startdate = event.startdate;
    this.enddate = event.enddate;
    this.event_type = event.event_type;
};

Event.registerNewEvent = async(event, results)=>{
    try{
        res = await model.Event.findAll({
            raw:true,
            where:{stuff_name:event.stuff_name},
            attributes:['stuff_id']
        })

        if(res.length>1){
            throw "already event!"
        }
        model.Stuff.findAll({
            raw:true,
            where:{stuff_name:event.stuff_name},
            attributes:['stuff_id']
        }).then(stuff_id=>{
            model.Code.findOne({
                raw:true,
                where: {code:event_code, code_name:event.event_type},
                attributes: ['sec_code']
            }).then(event_code_result=>{
                let citems = {stuff_id:stuff_id[0].stuff_id,
                    startdate:event.startdate,
                    enddate:event.enddate,
                    eventcode:event_code_result.sec_code,
                    stuff_name:event.stuff_name}
                if (!(event.disrate==null || event.disrate == "")){
                    citems = Object.assign(citems,{disrate: event.disrate})
                }
                if (!(event.disprice==null || event.disprice == "")){
                    citems = Object.assign(citems,{disprice:event.disprice})
                }
                console.log(citems)
                model.Event.create(citems).then(result=>{
                    console.log("register new event done")
                    results(null,event)
                }).catch(err=>{
                    console.log("err ocuured while creating event")
                    results(err,null)
                })

            }).catch(err=>{
                console.log("err ocuured while getting event_code")
                results(err,null);
            })

        }).catch(err=>{
            console.log("err ocuured while getting stuff_id")
            results(err,null);
        })
    }catch(err){
        console.log(err)
        results(err,null)
    }
}


Event.getAllEvenetList = async (event_type,stuff_name,results)=>{
    //물품 이름만 있는 경우

    let where = {};
    

    try{
        if (!(stuff_name == null || stuff_name == "")){
            res = await model.Stuff.findOne({
                raw:true,
                where:{stuff_name:stuff_name},
                attributes:['stuff_id']
            })

            if (res == null){
                console.log("there is no stuff like that");
                results(err,null);
            }
            else{
                where = Object.assign(where,{stuff_id:res.stuff_id})
            }
        }
        if (!(event_type == null || event_type == "")){
            res = await model.Code.findOne({
                raw:true,
                where:{code:event_code,code_name:event_type},
                attributes:['sec_code']
            })
            if (res == null){
                throw "there is  no event_type like that"
            }
            else{
                where = Object.assign(where,{eventcode:res.sec_code})
            }
        }

        model.Event.findAll({
            raw:true,
            where:where,
        }).then(result=>{
            results(null,result)
        }).catch(err=>{
            console.log("err occured while getting event list ")
            results(err,null)
        })

    }catch(err){
        console.log(err)
        results(err,null)
    }
}


Event.deleteEvent = (event_id, results) => {
    model.Event.destroy({
        where:{id:event_id}
    }).then(result=>{
        console.log("delte event...done")
        results(null,202)
    }).catch(err=>{
        console.log("err occured while deleting event");
        return results(err,null);
    });

}

module.exports = Event;