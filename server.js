if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const helmet = require("helmet");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const passport = require('passport');
const LocalStrategy = require('passport-local');

const homeRouter = require("./routes/home.req");
const produtoRouter = require("./routes/produto.req");
const produtosRouter = require("./routes/produtos.req");
const sobreRouter = require("./routes/sobre.req");
const contatoRouter = require("./routes/contato.req");
const loginRouter = require("./routes/user-login.req");
const carrinhoRouter = require("./routes/carrinho.req");
const adminRouter = require("./routes/admin.req");

const User = require("./admin/schemas/user");
const Errors = require("./admin/errors/Errors");
const { requireHTTPS, erro500 } = require('./admin/utils/middlewares');

const mongoServer = `mongodb+srv://${process.env.MONGO_SERVER_ID}:${process.env.MONGO_SERVER_PASSWORD}@cluster0.wpqcr.mongodb.net/projetoEcommerce?retryWrites=true&w=majority`;

mongoose.connect(mongoServer, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Banco de dados conectado");
});

const app = express();

app.use(
    helmet({
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                defaultSrc: ["'self'", "http://*"],
                scriptSrc: ["'self'", "https://*"],
                imgSrc: ["'self'", "data:", "https://*"],
            },
        }
    })
);
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
    cookieSession({
        name: "42658742564",
        maxAge: new Date(Date.now() + 3600000),
        secure: true,
        keys: [
            "f&vkOHwaD*kRnCQ",
            "Vm^*&@CFKmUvRDRfBsXFdBc4",
            "MBQLPkPB6vmSntYye0y3z",
            "JNiPCQg43#YUNvKkyi8PspFmlBge6NG",
        ],
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use(requireHTTPS); // ==> Comentar essa linha para poder rodar a aplicação no localhost

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    res.redirect("/home");
});

app.use(homeRouter);
app.use(produtoRouter);
app.use(produtosRouter);
app.use(sobreRouter);
app.use(contatoRouter);
app.use(loginRouter);
app.use(carrinhoRouter);
app.use(adminRouter);

app.all("*", (req, res, next) => {
    next(new Errors("Parece que você acessou uma página que não existe :(", 404));
});

app.use(erro500);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Ouvindo a porta ${port}`);
});