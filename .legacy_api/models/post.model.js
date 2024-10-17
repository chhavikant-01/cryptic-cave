import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        max: 15,
    },
    desc: {
        type: String,
        max: 500,
    },
    thumbnail: {
        type: String,
        default: "",
    },
    fileType: {
        type: String,
        // enum: ["ppt", "pdf", "doc", "txt", "png", "jpg", "jpeg"],
        // default: "img", 
        // validate: {
        //     validator: function(v) {
        //         return ["ppt", "pdf", "doc", "txt", "img"].includes(v);
        //     },
        //     message: props => `${props.value} is not a valid fileType`
        // }
    },
    fileName: {
        type: String,
        default: "",
    },
    fileUrl: {
        type: String,
        default: "",
    },
    fileKey: {
        type: String,
        default: "",
    },
    savedPosts: {
        type: [String],
        default: [],
    },
    likes: {
        type: [String], 
        default: []},
    comments: {
        type: [String], 
        default: [],
    },
    isAnonymous: {
        type: Boolean,
        default: false,
    },
    category: {
        program: {
            type: String,
            default: "NA", 
        },
        semester: {
            type: Number,
            default: -1, 
        },
        course: {
            type: String,
            default: "NA", 
        },
        resourceType: {
            type: String,
            default: "NA", 
        },
        
    }
}, {
    timestamps: true
});

export default mongoose.model('Post', postSchema);
