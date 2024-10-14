import Post from "../models/post.model.js"
import User from "../models/user.model.js";
import getPosts from "../utils/getPosts.js";
import path from "path";
import { fileURLToPath } from 'url';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import multer from 'multer';
import multerS3 from 'multer-s3';
import stream from 'stream';


// Construct __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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



// export const createPost = async (req, res, next) => {
//   try {
//       const { title, desc, program, course, resourceType } = req.body;

//       // Extract the uploaded file from multer (req.file)
//       const file = req.file;

//       if (!file) {
//           return res.status(400).json({ message: "File is required" });
//       }

//       const userId = req.user.id;

//       if (!userId || !title || !file.mimetype || !file.filename) {
//           return res.status(400).json({ message: "Missing required fields" });
//       }

//       const fileUrl = `/uploads/${file.filename}`;

//       const newPost = new Post({
//           userId,
//           title,
//           desc,
//           fileUrl: file.filename,
//           fileType: file.mimetype,
//           fileName: file.originalname,
//           category:{
//             program,
//             course,
//             resourceType
//           }
//       });

//       const savedPost = await newPost.save();

//       const user = await User.findById(userId);

//       if (!user) {
//           return res.status(404).json({ message: "User does not exist!" });
//       }

//       await user.updateOne({ $push: { posts: savedPost._id } });

//       res.status(201).json({ message: "Post successfully uploaded!", newPost: savedPost });

//   } catch (e) {
//       console.log(e);
//       res.status(500).json({ message: e.message });
//   }
// };

// export const downloadFile = async (req, res, next) => {
//   const folderId = req.user.id;
//   const fileName = req.params.fileName;
//   const directoryPath = path.join(__dirname, `../uploads/${folderId}/`); 

//     const filePath = path.join(directoryPath, fileName);

//     res.download(filePath, (err) => {
//       if (err) {
//           console.error("Error while downloading file:", err);
//           res.status(500).json({
//               message: "Could not download the file. " + err,
//           });
// }})};

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
    const user = await User.findById(req.user.id);
    user.posts = user.posts.filter(postId => postId.toString() !== post._id.toString());
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
      res.status(200).json({ message:"Post has been saved", rest });
    } else {
      updatedSavedPosts = user.savedPosts.filter(postId => postId !== req.params.postId);
      
      user.savedPosts = updatedSavedPosts;
      await user.save();
      const { password, ...rest } = user._doc;
      res.status(200).json({ message:"Post has been removed saved", rest });
    }

    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Initialize the S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,  // Ensure correct region from env
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

// Set up multer to upload files to S3 using the AWS SDK v3
const upload = multer({
  storage: multerS3({
    s3: s3Client,  // This needs to be correctly passed
    bucket: process.env.S3_BUCKET_NAME,
    key: function (req, file, cb) {
      const fileName = `${new Date().getTime()}__${file.originalname}`;
      cb(null, fileName);
    },
  }),
  limits: { fileSize: 5000000 }, // 5 MB file size limit
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|webp|pdf|doc|docx|xls|xlsx|ppt|pptx)$/)) {
      return cb(new Error("Unsupported file format"));
    }
    cb(null, true);
  },
});

// Upload post function
export const uploadPost = async (req, res, next) => {

  upload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { title, desc, program, course, resourceType } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "File is required" });
      }

      // Process the uploaded file information
      const fileUrl = req.file.location;  // Get the S3 file URL
      const fileKey = req.file.key;  // Get the S3 file`s key

      // Create and save the new post with the uploaded file details
      const newPost = new Post({
        userId: req.user.id,
        title,
        desc,
        fileUrl,
        fileKey,
        fileType: req.file.mimetype,
        fileName: req.file.originalname,
        category: {
          program,
          course,
          resourceType,
        },
      });

      const savedPost = await newPost.save();

      // Update the user's post list
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await user.updateOne({ $push: { posts: savedPost._id } });

      res.status(201).json({ message: "Post successfully uploaded!", newPost: savedPost });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

export const downloadPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post doesn't exist!" });
    }

    // Extract the necessary file information from the post
    const { fileName, fileType, fileKey } = post;

    if (!fileKey) {
      return res.status(400).json({ message: "File key is missing in the post!" });
    }

    // Set up the parameters to get the object from S3
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,  // Ensure this is a valid string
    };

    // Get the file from S3
    const command = new GetObjectCommand(params);

    const s3Response = await s3Client.send(command);

    // Set the response headers to allow for file download
    res.set({
      "Content-Type": fileType || "application/octet-stream",  // Default to binary if fileType is missing
      "Content-Disposition": `attachment; filename="${fileName || 'file'}"`,  // Default to 'file' if fileName is missing
    });

    // Pipe the S3 response stream to the response object
    const passThroughStream = new stream.PassThrough();
    stream.pipeline(s3Response.Body, passThroughStream, (err) => {
      if (err) {
        console.error("Error streaming file from S3:", err);
        return res.status(500).json({ message: "Error downloading file" });
      }
    });

    passThroughStream.pipe(res); // Pipe the file content back to the client

  } catch (e) {
    console.error("Download error:", e);
    res.status(500).json({ message: e.message });
  }
};

