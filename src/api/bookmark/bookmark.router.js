const express = require('express')
const router = express.Router()

const con = require('./bookmark.controller')

router.get(`/`, con.index)
router.get(`/:id`, con.show)
router.post(`/`, con.store)

module.exports = router
