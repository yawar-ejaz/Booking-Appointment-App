const Appointments = require('../models/appointments');

const getAppointments = async (req, res, next) => {
    try {
        const result = await Appointments.findAll({
            order: [["date", "DESC"]]
        });
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch items from database!"
        })
        console.log("failed to fetch items from database. " + error)
    }
    // console.log('Getting appointments');
}

const getParticularAppointment = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            console.log("No id provided");
            res.status(500).json({
                success: false,
                message: "Some problem with the id provided!"
            })
        }
        else {
            const data = await Appointments.findByPk(id);
            res.status(200).json(data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch item from database!"
        })
    }
}

const createAppointments = async (req, res, next) => {
    const { name, phone, date } = req.body;
    try {
        await Appointments.create({
            name,
            phone,
            date
        });
        res.status(201).json({
            success: true,
            message: "Appointment Booked Successfully!"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add item to the database!"
        });
        console.log("failed to add item to the database. " + error);
    }
}

const updateAppointment = async (req, res, next) => {
    const id = req.params.id;
    const { name, phone, date } = req.body;
    try {
        const data = await Appointments.findByPk(id);
        if (!data) {
            console.log('Incorrect id');
            return res.status(400).json({
                success: false,
                message: "No data found for this id"
            });
        }
        else {
            await Appointments.update({
                name, phone, date
            },
                {
                    where: {
                        _id: id
                    }
                });
            return res.status(200).json({
                success: true,
                message: "Value updated successfully"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "value not deleted"
        });
    }
    // console.log('Update : ' + id);
}

const deleteAppointment = async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        console.log("No id provided");
    }
    else {
        try {
            const data = await Appointments.findByPk(id);
            if (!data) {
                console.log('Incorrect id');
                return res.status(400).json({
                    success: false,
                    message: "No data found for this id"
                });
            }
            else {
                await Appointments.destroy({
                    where: {
                        _id: id
                    }
                });
                return res.status(200).json({
                    success: true,
                    message: "Value deleted successfully"
                })
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "value not deleted"
            });
        };
    }
}

module.exports = {
    getAppointments,
    getParticularAppointment,
    createAppointments,
    updateAppointment,
    deleteAppointment
}