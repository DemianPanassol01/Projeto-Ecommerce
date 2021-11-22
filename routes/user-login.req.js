const express = require('express');
const catchAsync = require('../admin/errors/catchAsync');
const router = express.Router();
const passport = require('passport');

const User = require('../admin/schemas/user');

router.get('/sign-in', (req, res) => {
    if (req.isAuthenticated()) {
        req.flash("error", "Você já está logado!");
        return res.redirect('/home');
    }
    res.render('./userLogin/sign-in.ejs')
});

router.post('/sign-in', passport.authenticate('local', { failureFlash: true, failureRedirect: '/sign-in' }), (req, res) => {
    res.redirect('/home');
});

router.get('/sign-out', (req, res) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "Primeiro você deve se logar");
        return res.redirect('/sign-in')
    };

    req.logout();
    req.flash("success", "Você foi deslogado");
    res.redirect('/home');
});

router.get('/create-account', (req, res) => {
    if (req.isAuthenticated()) {
        req.flash("error", "Você já está logado!");
        return res.redirect('/home');
    }

    const info = {
        name: '',
        email: '',
        password: '',
        passwordConf: ''
    };

    if (req.session.data) {
        const { user } = req.session.data;
        info.name = user.name;
        info.email = user.username
    }

    req.session.data = null;
    res.render('./userLogin/create-account.ejs', { info });
});

router.post('/create-account', async(req, res) => {
    const { user, passwordConf } = req.body;
    const { name, username, password } = user;

    if (password !== passwordConf) {
        req.session.data = user;
        req.flash("error", "As senhas não batem, tente novamente");
        return res.redirect('/create-account');
    };

    try {
        const newUser = new User({ name, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, error => {
            if (error) {
                req.flash('error', 'Parece que aconteceu um erro no login automático, por favor, tente logar à sua conta manualmente')
                return res.redirect('/sign-in')
            }
            req.flash('success', 'Seja Bem-Vindo!');
            res.redirect('/home');
        });

    } catch (error) {
        req.flash("error", error.message);
        return res.redirect('/create-account');
    }
});

module.exports = router;