const express = require('express')
const router = express.Router()

const con = require('./user.controller')

router.get(`/`, con.index)
router.post(`/`, con.store)

router.post(`/login`, con.login)
router.post(`/register`, con.register)

module.exports = router
