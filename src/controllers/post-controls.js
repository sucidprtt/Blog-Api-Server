import Post from "../models/post-models.js";
import { uploadRemover } from "../utils/uploadRemover.js";

export const createPost = async (req, res) => {
    const { title, body } = req.body;
    const image = req.file ? req.file.filename : null

    try {
        const post = new Post({ title, body, image })
        const savedPost = await post.save()

        return res.status(201).json({
            message: "Post Created",
            data: savedPost
        })

    } catch (error){
        console.error(error)
        return res.status(500).json({ message: "Unable to Create Post"})
    }
}

export const getPosts = async (req, res) => {
    try{
        const posts = await Post.find()

        return res.status(200).json({
            message: "Posts Found",
            data: posts
        })

    } catch (error){
        console.error(error)
        return res.status(500).json({ message: "Failed to Fetch Posts" })
    }
}

export const getPostById = async (req, res) => {
    const postId = req.params.id

    try{
        const post = await Post.findById(postId)

        if (!post){
            return res.status(404).json({ message: "Post Not Found" })
        }
        return res.status(200).json({
            message: "Post Found",
            data: post
        })

    }catch (error){
        console.error(error)
        return res.status(500).json({ message: "Error Retrieving Post" })
    }
}

export const updatePost = async (req, res) => {
    const postId = req.params.id
    const { title, body } = req.body
    const newImage = req.file ? req.file.filename : null

    try{
        const post = await Post.findById(postId)

        if(!post){
            return res.status(404).json({ message: "Post Not Found"})
        }

        if (newImage) {
            uploadRemover(post.image)
        }

        post.title = title
        post.body = body
        post.image = newImage ? newImage : post.image

        const updatePost = await post.save()

        return res.status(200).json({
            message: "Post Updated",
            data: updatePost
        })

    } catch (error){
        console.error(error)
        return res.status(500).json({ message: "Error Updating Post" })
    }
}

export const deletePost = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findByIdAndDelete(postId)

        if (!post) {
            return res.status(404).json({ message: "Post Not Found" })
        }

        uploadRemover(post.image)

        return res.status(200).json({
            message: "Post Deelted",
            data: post
        })

    } catch (error){
        console.error(error)
        return res.status(500).json({ message: "Error Deleting Post" })
    }
}