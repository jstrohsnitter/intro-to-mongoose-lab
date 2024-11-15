const mongoose = require('mongoose')

const crmSchema = new mongoose.Schema({
    name: String,
    age: Number,
})

const crmModel = mongoose.model('crm', crmSchema)

module.exports = crmModel