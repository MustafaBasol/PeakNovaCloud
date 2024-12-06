import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true        
    },
    language:{
        type:String,
        enum:['en', 'tr', 'fr'],
        required:true
    }
}, { timestamps:true });


const FAQ = mongoose.models.Faq || mongoose.model('Faq', faqSchema);

export default FAQ

