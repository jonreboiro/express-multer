var express = require('express');
var router = express.Router();
const multer  = require('multer')
const path = require('path'); 

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('form.html');
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
  })

const fileFilter = function (req, file, cb) {
    const allowedMimeTypes = ['image/png', 'image/jpeg'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PNG files are allowed'), false);
    }
};
  
const limits = {
    fileSize: 2 * 1024 * 1024
};
  
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
})


router.post('/', upload.single('avatar'), function (req, res, next) {
    const name = req.body.name;
    const filePath = `/uploads/${req.file.filename}`;

    res.send(`
        <p>Zure izena: ${name}</p>
        <p>Fitxategia: <a href="${filePath}" target="_blank">${filePath}</a></p>
      `);
})


module.exports = router;
