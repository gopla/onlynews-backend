const express = require('express')
const router = express.Router()
module.exports = router

const NEWS = require('../api/news/news.router')

router.use('/news', NEWS)
