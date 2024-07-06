import express from 'express'
import { listDarkMatterBlocks } from '../controllers/darkmatter-controller.mjs'

const router = express.Router()

router.route('/').get(listDarkMatterBlocks)

export default router;