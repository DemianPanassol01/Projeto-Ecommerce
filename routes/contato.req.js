const express = require('express');

const router = express.Router();

router.get('/contato', (req, res) => {
    res.render('./pages/contato.ejs')
});

router.post('/contato', (req, res) => {
    res.redirect('/contato')
});


module.exports = router;