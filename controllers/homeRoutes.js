const router = require('express').Router();
const { post, post } = require('.');
const {post,users} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await post.findAll({
            include: [
                {
                    model: users,
                    attributes: ['username']
                },
            ],
        });

        const post = postData.map((post) => post.get({plain:true}));

        res.render('homepage', {
            post,
            logged_in: req.session.logged_in
        });
    } catch (err){
        res.status(500).json(err);
    }
});

router.get('/post/:username', async (req,res) => {
    try {
        const postData = await post.findByPk(req.params.username, {
            include: [
                {
                    model: users,
                    attributes: ['username']
                },
            ],
        });

        const post = postData.get({plain: true});
        
        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {
    try {
        const usersData = await users.findByPk(req.session.user_id, {
            attributes: { exculude: ['password'] },
            include: [{ model: post } ],
        });
        
        const users = usersData.get({ plain: true });
        res.render('profile', {
            ...users,
            logged_in: true
        });
    } catch (error) {
        res.status(500).json(err);
    }
});

router.get('/login', (req,res)=> {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;