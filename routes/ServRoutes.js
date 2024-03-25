const router = require('express').Router();

const verifyToken = require('../helpers/verify-token');
const { imageUpload } = require('../helpers/image-upload');
const servController = require('../controller/servController');

router.post('/create', verifyToken, imageUpload.array('images'), servController.create);

router.get('/', servController.getAll);
router.get('/myserv', verifyToken, servController.getAllUserServ);
router.get('/mycontratantes', verifyToken, servController.getAllUserContratantes);
router.get('/:id', servController.getServById);
router.get('/transferData/:id', servController.TrasnferData)
router.get('/scheduleData', servController.ScheduleDataToChat) // botão que inicia o chat 

router.delete('/:id', verifyToken, servController.removeServById);

router.patch('/orcamento/:id', verifyToken, servController.UpdateAvaliable)
router.patch('/:id', verifyToken, imageUpload.array('images'), servController.updateServ);
router.patch('/schedule/:id', verifyToken, servController.schedule);
router.patch('/concluiservico/:id', verifyToken, servController.concludeServ);
router.patch('/avaliate/:id', verifyToken, imageUpload.array('images'), servController.Avaliate);

module.exports = router;
