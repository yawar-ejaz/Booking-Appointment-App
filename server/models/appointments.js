const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const DataTypes = Sequelize.DataTypes;

const Appointments = sequelize.define('appointments', {
    _id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
});

module.exports = Appointments;