const express = require('express')
const router = express.Router()

const con = require('./user.controller')

router.get(`/`, con.index)
router.get(`/auth/google`, con.login)
router.get(`/auth_callback`, con.callback)

module.exports = router