const router = require('express').router();
const {post} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) =>{
    try {
        const newPost = await post.create({
            ...req.body,
            username: req.session.username,
        });

        res.status(200).json(newPost);
    } catch (error) {
        res.status(400).json(err);        
    }
});

router.delete('/:username', withAuth, async (req, res) => {
    try {
        const postData = await post.destroy({
            where: {
                id: req.params.id,
                username: req.params.username,
            },
        });

        if(!postData) {
            res.status(404).json({ message: 'No post found with that id!'});
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;