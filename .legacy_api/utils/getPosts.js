import mongoose from "mongoose";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

const getPosts = async () => {
    try {
        const result = await Post.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "author"
                }
            },
            {
                $unwind: {
                    path: "$author",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    desc: 1,
                    thumbnail: 1,
                    fileType: 1,
                    fileName: 1,
                    fileUrl: 1,
                    category: 1,
                    likes: 1,
                    comments: 1,
                    saved:1,
                    createdAt: 1,
                    updatedAt: 1,
                    author: {
                        _id: "$author._id",
                        username: "$author.username",
                        name: { $concat: ["$author.firstname", " ", "$author.lastname"] },
                        profilePicture: "$author.profilePicture",
                        program: "$author.program",
                        yearOfGraduation: "$author.yearOfGraduation",
                        numberOfPosts: { $size: {$ifNull : ["$author.posts",[]] } },
                        numberOfFollowers: { $size: {$ifNull:["$author.followers",[]]} },
                    }
                }
            },
            {
                $sort: { createdAt: -1 }
            }
        ]);

        return result;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

export default getPosts;