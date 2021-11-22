const express = require('express');

const router = express.Router();

router.get('/sobre', (req, res) => {
    res.render('./pages/sobre-nos.ejs')
});
 
module.exports = router;
