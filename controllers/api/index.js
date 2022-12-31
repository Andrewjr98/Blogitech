const router = require('express').router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');


router.use('/users', userRoutes);
router.use('/post', postRoutes);

module.exports = router;