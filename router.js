const router = require('express').Router();
const empCtrl = require('./controller/EmpCtrl');
router.post('/addData', empCtrl.postFunc);
router.get('/getData', empCtrl.getAllFunc);
router.delete('/deleteData', empCtrl.deleteFunc);
router.put('/updateData/:id', empCtrl.updateFunc);
router.get('/pagination', empCtrl.paginationFunc);

module.exports = router;