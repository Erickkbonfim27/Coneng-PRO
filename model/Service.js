const mongoose = require('../db/conn')
const { Schema } = mongoose

const Service = mongoose.model(

    'Service',
    new Schema({
        title: {type: String, required:true},
        Description: {type: String, required:true},
        TempoExperiencia: {type: String, required:true},
        ServicosPrestadosConeng: {type: String, required:false},
        PossuiFerramentasProprias: {type: String, required:true},
        LocalDeTrabalho: {type: String, required:true},
        images: {type: Array, required:true},
        avaliable: {type: String},
        userOwner: Object,
        Contratante: Object,
        experiencia: [{type: Object}],
    },{timestamps: true},)
)

module.exports = Service