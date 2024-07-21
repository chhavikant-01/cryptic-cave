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
            fileUrl, 
            category, } = req.body;

          const userId = req.user.id
        
        if(!userId || !title || !fileType || !fileUrl){
            return res.status(400).json({message: "Missing required fields"})
        }

        const newPost = new Post( {
            userId,
            title,
            desc,
            thumbnail,
            fileUrl,
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

        res.status(201).json({message: "Post created successfully"})

    }catch(e){
        console.log(e)
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

export const deletePost = async (req, res, next) => {
  try {
    
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post doesn't exist!" });
    }

    if (req.user.id !== post.userId.toString()) {
      return res.status(403).json({ message: "You're not allowed to delete this post" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    await user.updateOne({ $pull: { posts: post._id } });

    await post.deleteOne();

    res.status(200).json({ message: "The post has been deleted" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const getPost = async (req,res,next) => {
  try{
    const post = await Post.findById(req.params.postId);

    if(!post){
      return res.status(404).json({message: "Post doesn't exist!"})
    }

    res.status(200).json(post)
} catch(e){
    res.status(500).json({message: e.message})
}
}

export const allPosts = async (req, res, next) => {
  try {
    const data = await Post.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({message: err.message});
  }
}

export const likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post doesn't exist!" });
    }

    if (!post.likes.includes(req.user.id)) {

      await post.updateOne({ $push: { likes: req.user.id } });
      res.status(200).json({ message: "The post has been liked" });
    } else {
      await post.updateOne({ $pull: { likes: req.user.id } });
      res.status(200).json({ message: "The post has been disliked" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

