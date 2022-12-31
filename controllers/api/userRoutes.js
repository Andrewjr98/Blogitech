const router = require('express').router();
const {users} = require('../../models');

router.post('/', async (req, res) => {
    try {
        const usersData = await users.create(req.body);

        req.session.save(() => {
        req.session.username = usersData.username;
        req.session.logged_in = true

        res.status(200).json(usersData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const usersData = await users.findOne({ where: { username: req.body.username  }});
        if (!usersData) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password, try again'});
                return;
        }
        const validPassword = await usersData.checkPassword(req.body.password);

        if (!validPassword) {
            res
            .status(400)
            .json({ message: 'Incorrect username or password, Try again or reset.'})
            return;
        }

        req.session.save(() => {
            req.session.username = usersData.username;
            req.session.logged_in = true;

            res.json({ users: usersData, message: 'You have successfully signed in!!!'})
        });
    } catch (err) { 
        res.status(400).json(err);
        
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in){
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;