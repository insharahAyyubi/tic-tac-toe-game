const express = require("express");
const router = express.Router();
router.get('/', (req,res) => {
    res.render('index');
})
router.get('/logout', (req,res) => {
    return res.render('index', {
        logout: "true"
    });
})
module.exports = router;