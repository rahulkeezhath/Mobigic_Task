const router = require('express').Router();
const {userSignup, userLogin, uploadFile, getFiles, deleteFile, downloadFile} = require('../controllers/userController');
const upload = require('../helpers/multer');
const { protect } = require('../middleware/authMiddleware');



router.post('/signup', userSignup)
router.post('/login', userLogin)
router.post('/upload', upload.single('file'), protect, uploadFile)
router.get('/files', protect, getFiles)
router.delete("/files/:id", protect, deleteFile);
router.get('/download/:code', protect, downloadFile)



module.exports = router;