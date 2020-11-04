import express from 'express'
import { apiRouter } from './src/api'
export const router = express.Router()

router.use('/api', apiRouter)