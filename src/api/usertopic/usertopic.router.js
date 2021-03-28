const express = require('express')
const router = express.Router()

const con = require('./usertopic.controller')

router.get(`/`, con.index)
router.post(`/`, con.store)
router.delete(`/`, con.delete)

module.exports = router
