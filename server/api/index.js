const express = require('express');
const router = express.Router();
const login = require("./login")
router.use(login)

module.exports = router;
