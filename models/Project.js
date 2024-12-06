import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:false        
    },
    language:{
        type:String,
        enum:['en', 'tr', 'fr'],
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false
    }
}, { timestamps:true });


const PROJECT = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default PROJECT