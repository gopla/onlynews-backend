const express = require('express')
const router = express.Router()

const con = require('./news.controller')

router.post(`/`, con.index)
router.post(`/:id`, con.show)
router.post(`/topic/:topic`, con.topic)
router.post(`/publisher/:publisher`, con.publisher)
router.post(`/title/:title`, con.title)
router.get(`/usertopic/my`, con.usertopic)

module.exports = router
