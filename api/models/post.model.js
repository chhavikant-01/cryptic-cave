import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
    },
    Title: {
        type: String,
        required: true,
        max: 15,
    },
    Desc: {
        type: String,
        max: 500,
    },
    thumbnail: {
        type: String,
        default: "",
    },
    fileType: {
        type: String,
        enum: ["ppt","pdf","doc","txt","img"],
        default: "",
        validate: {
            validator: function(v){
                return ["ppt","pdf","doc","txt","img"].includes(v);
            },
            message: props => `${props.value} is not a valid fileType`
        }
    },
    fileName: {
        type: String,
        default: "",
    },
    likes: {
        type: Array,
        default: [],
    }
    },
    {
        timestamps: true
    }
);