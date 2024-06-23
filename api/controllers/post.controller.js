import Post from "../models/post.model.js"
import User from "../models/user.model.js";

export const createPost = async (req, res, next) => {
    try{
        const {
            title, 
            desc, 
            thumbnail, 
            fileType, 
            fileName, 
            category, } = req.body;

          const userId = req.user.id
        
        if(!userId || !title || !fileType){
            return res.status(400).json({message: "Missing required fields"})
        }

        const newPost = new Post( {
            userId,
            title,
            desc,
            thumbnail,
            fileType,
            fileName,
            category
        })

        const savedPost = await newPost.save();

        const user = User.findById(userId);

        if(!user){
            return res.status(404).json({message: "User does not exist!"})
        }

        await user.updateOne({$push: { posts: savedPost._id }});

        res.status(201).json({message: savedPost})

    }catch(e){
        res.status(500).json({message: e.message})
    }
}

export const updatePost = async (req,res,next) => {
    try{
        const postId = req.params.postId;
        const updates = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post doesn't exist!" });
    }

    if(post.userId!==req.user.id){
        return res.status(403).json({message: "You're not authorized to modify this post!"})
    }
    
    if (updates.title !== undefined) {
      post.title = updates.title;
    }
    if (updates.desc !== undefined) {
      post.desc = updates.desc;
    }
    if (updates.thumbnail !== undefined) {
      post.thumbnail = updates.thumbnail;
    }
    if (updates.category !== undefined) {
      
      post.category = { ...post.category, ...updates.category };
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post
    });

    }catch(e){
        res.status(500).json({message: e.message})
    }
}