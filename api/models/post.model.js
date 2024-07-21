import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
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
    likes: {
        type: [String], 
        default: [],
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
        category: {

        },
        pyq: {
            type: Boolean,
            default: false,
        },
        notes: {
            type: Boolean,
            default: false,
        },
        ebook: {
            type: Boolean,
            default: false,
        },
        lecturePPT: {
            type: Boolean,
            default: false,
        }
    }
}, {
    timestamps: true
});

export default mongoose.model('Post', postSchema);
