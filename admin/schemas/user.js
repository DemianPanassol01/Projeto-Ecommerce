const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
});

const options = {
    errorMessages: {
        UserExistsError: 'Parece que já existe alguém cadastrado com esse Email',
        TooManyAttemptsError: 'Muitas tentativas de login, por favor, tente novamente mais tarde',
        IncorrectPasswordError: 'Email ou Senha estão incorretos',
        IncorrectUsernameError: 'Email ou Senha estão incorretos'
    }
}

UserSchema.plugin(passportLocalMongoose, options);
const User = mongoose.model('User', UserSchema);

module.exports = User;