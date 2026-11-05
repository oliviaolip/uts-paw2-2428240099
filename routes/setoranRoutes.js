const router = require('express').Router();
const ctrl = require('../controllers/setoranController');

router.post('/', ctrl.create);
router.get('/', ctrl.list);
router.get('/:id', ctrl.detail);

module.exports = router;