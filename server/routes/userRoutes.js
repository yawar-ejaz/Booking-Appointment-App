const express = require("express")
const router = express.Router();
const { getAppointments, getParticularAppointment, createAppointments, updateAppointment, deleteAppointment } = require('../controllers/userControllers');

router.route("/").get(getAppointments)
router.route("/:id").get(getParticularAppointment)
router.route("/").post(createAppointments)
router.route("/:id").put(updateAppointment);
router.route("/:id").delete(deleteAppointment);

module.exports = router;