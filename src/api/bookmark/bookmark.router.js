const express = require('express')
const router = express.Router()

const con = require('./bookmark.controller')

router.get(`/`, con.index)
router.post(`/my`, con.show)
router.post(`/`, con.store)
router.delete(`/`, con.delete)

module.exports = router
