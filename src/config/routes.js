const express = require('express')
const router = express.Router()
module.exports = router

const NEWS = require('../api/news/news.router')
const USER = require('../api/user/user.router')

router.use('/news', NEWS)
router.use('/user', USER)

router.use(USER)
