import express from 'express'
import { createPost } from '../controllers/post-controls.js'

const router = express.Router()

router.post(
    '/post',
    createPost
)

export default router