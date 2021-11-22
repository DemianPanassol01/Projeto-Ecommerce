module.exports.isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'Você deve estar Logado para acessar essa página')
        return res.redirect('/sign-in');
    }
    next()
};

module.exports.souEu = (req, res, next) => {
    const { username } = req.user;

    if (username !== 'panassol1@gmail.com') {
        req.flash('error', 'Pra evitar uma bagunça, só eu(Demian) posso fazer isso :)')
        return res.redirect('/admin')
    }

    next();
};

module.exports.requireHTTPS = (req, res, next) => {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
        return res.redirect('https://' + req.get('Host') + req.url);
    }
    next();
};

module.exports.erro500 = (err, req, res, next) => {
    let { message, statusCode = 500 } = err;
    if (statusCode === 500) {
        message = 'Algo deu errado, por favor recarregue a página';
    }
    res.status(statusCode).render("./layout/error.ejs", { message, statusCode });
};