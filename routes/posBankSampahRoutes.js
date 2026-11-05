const router = require('express').Router();
const ctrl = require('../controllers/posBankSampahController');

router.post('/', ctrl.create);
router.get('/', ctrl.list);

module.exports = router;