import mongoose from "mongoose";

const logosSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true        
    },
    language:{
        type:String,
        enum:['en', 'tr', 'fr'],
        required:true
    },
    Icon:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    }
}, { timestamps:true });

const LOGOS = mongoose.models.Logos || mongoose.model('Logos', logosSchema);

export default LOGOS