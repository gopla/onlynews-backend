const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')
module.exports = router

const NEWS = require('../api/news/news.router')
const USER = require('../api/user/user.router')
const BOOKMARK = require('../api/bookmark/bookmark.router')

router.use('/news', NEWS)
router.use('/user', USER)

router.use(verifyToken)
router.use('/bookmark', BOOKMARK)

router.use(USER)
