const Event = require("../repository/event.repository.js");

exports.registerNewEvent = async(req,res)=>{
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    };

    const event = new Event({
        stuff_name: req.body.stuff_name,
        disprice: req.body.disprice,
        disrate: req.body.disrate,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        event_type: req.body.event_type
    });

    Event.registerNewEvent(event,(err,data)=>{
        if (err) 
        res.status(500).send({message : err.message 
            || "Some error occurred while creating the event."
        })
        else res.send(data);
    })
};

exports.getAllEvenetList = async(req,res)=>{
    const event_type = req.query.event_type;
    const stuff_name = req.query.stuff_name;
    Event.getAllEvenetList(event_type,stuff_name,(err,data)=>{
        if(err)
        res.status(500).send({
            message:
                err.message || "Some err occured while retrieving event"
        });
        else res.send(data);
    })
};


exports.deleteEvent=async(req, res)=>{
    const event_id = req.query.event_id;
    Event.deleteEvent(event_id,(err,data)=>{
        if(err)
        res.status(500).send({
            message:
             err.message || "Some error occurred while destroy pacakges."
        });
        else res.send(data);
    });
};
