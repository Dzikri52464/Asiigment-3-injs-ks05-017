const router = require('express').Router();
const PhotoController = require ('../controllers/photoController');
const authentication = require('../middlewares/authentication');

router.use(authentication)
router.get('/photos', PhotoController.GetAllPhotos);
router.get('/photos/:id', PhotoController.GetOnePhotoById);
router.post('/photos/create', PhotoController.CreatePhoto);
router.put('/photos/:id', PhotoController.GetOnePhotoById);
router.delete('/photos/:id',PhotoController.DeletOnePhotoById);

module.exports=router