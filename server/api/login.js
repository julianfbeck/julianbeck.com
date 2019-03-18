const express = require('express');
const router = express.Router();


router.post('/login', (req, res) => {
  console.log("login")
    if (req.body.username === 'demo' && req.body.password === 'demo') {
      req.session.authUser = { username: 'demo' }
      return res.json({ username: 'demo' })
    }
    res.status(401).json({ message: 'Bad credentials' })
  })
  
  // Add POST - /api/logout
  router.post('/logout', (req, res) => {
    delete req.session.authUser
    res.json({ ok: true })
  })


module.exports = router;