const mongoose = require('mongoose');
const { Schema } = mongoose;

const contentBlockSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['text', 'image'], 
    },
    content: {
        type: String,
        required: function () {
            return this.type === 'text';
        },
        trim: true,
    },
    title: {
        type: String,
        required: function () {
            return this.type === 'text';
        },
        trim: true,
    },    
    imageUrl: {
        type: String,
        required: function () {
            return this.type === 'image';
        },
    },
    caption: {
        type: String,
        trim: true,
    },
});

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Blog title is required'],
            trim: true,           
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        content: [contentBlockSchema],
        coverImage: {
            type: String,
            default: '',
            trim: true,
        },
        language:{
            type:String,
            enum:['en', 'tr', 'fr'],
            required:true
        },  
        summary:{
            type: String,
            required:true,
            trim:true
        },  
        seo: {
            metaTitle: {
                type: String,                
                trim: true,
            },
            metaDescription: {
                type: String,                
                trim: true,
            },
            metaKeywords:{
                    type: String,
                    lowercase: true,
                    trim: true,
            }
        },
    },{ timestamps: true }
);

const BLOG = mongoose.models.Blog || mongoose.model('Blog', blogSchema)

export default  BLOG
