const express = require('express');
const router = express.Router();
router.post('/login', function (req, res) {
    if (req.body.username === 'demo' && req.body.password === 'demo') {
        req.session.authUser = {
            username: 'demo'
        }
        return res.json({
            username: 'demo'
        })
    }
    res.status(401).json({
        error: 'Bad credentials'
    })
})

// POST `/api/logout` to log out the user and remove it from the `req.session`
router.post('/api/logout', function (req, res) {
    delete req.session.authUser
    res.json({
        ok: true
    })
})


module.exports = router;