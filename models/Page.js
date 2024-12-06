import mongoose from 'mongoose';

const PageContentSchema = new mongoose.Schema({
    section: { type:String, required:true },
    title: { type: String, required: false },
    description: { type: String, required: false },
    image: { type: String, required: false },
    buttonText: { type: String, required: false },    
    language:{
        type:String,
        enum:['en', 'tr', 'fr'],
        required:true
    },    
    cards:[{
        title:{ type:String, required:false },
        description: { type: String, required: false },
        Icon:{ type:String, required:false },
        color:{ type:String, required:false }
    }]
});

const PAGE = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);

export default PAGE