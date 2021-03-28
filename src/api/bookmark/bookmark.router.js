const express = require('express')
const router = express.Router()

const con = require('./bookmark.controller')

router.get(`/`, con.index)
router.get(`/my`, con.show)
router.post(`/`, con.store)

module.exports = router
