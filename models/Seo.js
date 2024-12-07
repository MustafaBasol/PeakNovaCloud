import mongoose from "mongoose";


const SEOSchema = new mongoose.Schema({
    page:{
        type:String,
        required:true
    },
    language:{
        type:String,
        enum:['en', 'tr', 'fr'],
        required:true
    },    
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,
    },
    keywords: {
        type: [String],
        required: false,
    },
    slug: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true, 
        trim: true,
    },
    URL: {
        type: String,        
    },
    ogTitle: {
        type: String, 
    },
    ogDescription: {
        type: String,
    },
    ogImage: {
        type: String,
    },
    robots: {
        type: String,
        enum: ['index, follow', 'noindex, nofollow', 'index, nofollow', 'noindex, follow'],
        default: 'index, follow',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

SEOSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const SEO = mongoose.models.SEO || mongoose.model('SEO', SEOSchema);

export default SEO;
