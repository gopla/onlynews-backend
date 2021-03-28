const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')
module.exports = router

const NEWS = require('../api/news/news.router')
const USER = require('../api/user/user.router')
const BOOKMARK = require('../api/bookmark/bookmark.router')
const PUBLISHER = require('../api/publisher/publisher.router')
const TOPIC = require('../api/topic/topic.router')

router.use('/news', NEWS)
router.use('/user', USER)
router.use('/publisher', PUBLISHER)
router.use('/topic', TOPIC)

router.use(verifyToken)
router.use('/bookmark', BOOKMARK)
router.use('/loggedin/news', NEWS)

router.use(USER)
