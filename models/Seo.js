import mongoose from "mongoose";


const SEOSchema = new mongoose.Schema({
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
        maxlength: 160, 
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
        validate: {
            validator: function (v) {
                return /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`,
        },
    },
    ogTitle: {
        type: String,
        maxlength: 70, 
    },
    ogDescription: {
        type: String,
        maxlength: 200,
    },
    ogImage: {
        type: String,
        validate: {
            validator: function (v) {
                return /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`,
        },
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
