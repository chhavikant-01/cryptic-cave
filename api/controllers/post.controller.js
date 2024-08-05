import Post from "../models/post.model.js"
import User from "../models/user.model.js";
import getPosts from "../utils/getPosts.js";

const getAnonymousUserId = async () => {
  const anonymous = await User.findOne({ username: "anonymous" });
  if (!anonymous) {
    const anonymousUser = new User({
      username: "anonymous",
      firstname: "Anonymous",
      lastname: "User",
      email: "anonymous@yourdomain.com",
      password: "securepassword", 
      isAdmin: false,
      profilePicture: "", 
      program: "NA",
      yearOfGraduation: "NA",
  });
  
  await anonymousUser.save();
  }
  return anonymous._id;
}

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

        res.status(201).json({message:"Post succesfully uploaded!", newPost: savedPost})

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

    post.userId = null;
    await post.save();

    res.status(200).json({ message: "The post has been deleted" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const anonymizePost = async (req, res, next) => {
  try {
    const ANONYMOUS_USER_ID = await getAnonymousUserId();
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post doesn't exist!" });
    }

    if (req.user.id !== post.userId.toString()) {
      return res.status(403).json({ message: "You're not allowed to anonymize this post" });
    }

    post.isAnonymous = true;
    post.userId = ANONYMOUS_USER_ID;
    await post.save();

    res.status(200).json({ message: "The post has been anonymized", anonymousId:ANONYMOUS_USER_ID});
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
    const posts = await getPosts();
    res.status(200).json(posts);
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
      res.status(200).json({ message: "The post has been liked", offset: 1 });
    } else {
      await post.updateOne({ $pull: { likes: req.user.id } });
      res.status(200).json({ message: "The post has been disliked", offset: -1 });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const userPosts = async (req,res,next) => {
  try{
    const user = await User.findById(req.params.userId)
    if(!user){
      return res.status(404).json({message: "User not found"})
    }
    const posts = await Post.find({userId: req.params.userId})
    res.status(200).json(posts)
  }catch(e){
    res.status(500).json({message: e.message})
  }
}

export const savePost = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist!" });
    }

    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post doesn't exist!" });
    }

    let updatedSavedPosts;
    if (!user.savedPosts.includes(req.params.postId)) {
      updatedSavedPosts = [...user.savedPosts, req.params.postId];
      
      user.savedPosts = updatedSavedPosts;
      await user.save();
      const { password, ...rest } = user._doc;
      console.log(rest);
      res.status(200).json({ message:"Post has been saved", rest });
    } else {
      updatedSavedPosts = user.savedPosts.filter(postId => postId !== req.params.postId);
      
      user.savedPosts = updatedSavedPosts;
      await user.save();
      const { password, ...rest } = user._doc;
      console.log(rest);
      res.status(200).json({ message:"Post has been removed saved", rest });
    }

    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


