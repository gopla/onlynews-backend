const express = require('express')
const router = express.Router()

const con = require('./news.controller')

router.get(`/`, con.index)
router.get(`/:id`, con.show)
router.get(`/topic/:topic`, con.topic)
router.get(`/publisher/:publisher`, con.publisher)

module.exports = router
