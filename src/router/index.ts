import authRouter from '@/Auth/auth.router'
import chatRouter from '@/Chat/chat.router'
import likesRouter from '@/Likes/likes.router'
import recommendationRouter from '@/Recommendation/recommendation.router'
import userRouter from '@/User/user.router'

import { Router } from 'express'

const router = Router()

router.use('/api/auth/', authRouter)
router.use('/api/users/', userRouter)
router.use('/api/chats/', chatRouter)
router.use('/api/likes/', likesRouter)
router.use('/api/recommendation/', recommendationRouter)

export default router
