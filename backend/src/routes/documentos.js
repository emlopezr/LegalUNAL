const { Router } = require('express')
const router = Router();

router.get('/', (req, res) => {
    res.send('Documentos')
})

module.exports = router;