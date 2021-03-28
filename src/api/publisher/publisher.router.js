const express = require('express')
const router = express.Router()

const con = require('./publisher.controller')

router.get(`/`, con.index)
router.post(`/`, con.store)

module.exports = router
