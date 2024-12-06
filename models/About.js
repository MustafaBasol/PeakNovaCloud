import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    title:{
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
    }
}, { timestamps:true });


const ABOUT = mongoose.models.About || mongoose.model('About', aboutSchema);

export default ABOUT

