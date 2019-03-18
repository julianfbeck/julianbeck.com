const express = require('express');
const router = express.Router();
const login = require("./login")
router.use(login)
router.get('/test', function (req, res) {
    res.send('Hello World!');
});
module.exports = router;
