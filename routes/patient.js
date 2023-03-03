const ex = require("express");
const route = ex.Router();
const patient = require("../model/patient1");
//get all the patient result
route.get("/patient", (req, res) => {
    patient.find().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});

//get a single patient result
route.get("/patient/:id", (req, res) => {
    patient.findById(req.params.id).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});
//create a patient
route.post("/patient", async (req, res) => {
    const { name, age, contact, address, pincode } = req.body;
    if (!name || !age || !contact || !address || !pincode) {
        return res.status(422).json({ error: "please fill all the fields" });
    }
    else {
        const p = new patient(req.body);
        try {
            await p.save();
        } catch (err) {
            res.send(err);
        }
    }
    const p = new patient(req.body);
    try {
        await p.save();
        res.send(p);
    } catch (err) {
        res.send(err);
    }
    // const p = await patient.create(req.body)
    // res.json(p);


});
//delete patient result
route.delete("/patient/:id", async (req, res) => {
    try {
        await patient.remove({ _id: req.params.id });
        res.status(200).json({ message: "done" });

    } catch (err) {
        res.json(err);

    }

});

//update patient result
route.put("/patient/:id", async (req, res) => {
    try {
        const p = await patient.updateOne({ _id: req.params.id }, req.body);
        res.json(p);
    } catch (err) {
        res.json(err);
    }
});



module.exports = route;