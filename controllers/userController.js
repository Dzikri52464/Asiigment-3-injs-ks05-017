const { User } = require('../models');
const {comparePassword} = require('../helepers/bcrypt');
const {generateToken} = require('../helepers/jwt');

class UserController{
    static register(req, res){
        const { email, password, username } = req.body;
        User.create({
            email,
            password,
            username
        })
        .then(result => {
            let response = {
                id: result.id,
                username: result.username,
                email: result.email
            }
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static login(req, res){
        const { email, password } = req.body;
        User.findOne({
            where: {
                email
            }
        })
        .then(user => {
            if(!user){
                throw{
                    name: "User Login Error",
                    devMessage: `User with email ${email} not found`
                }
            }
            const isCorrect = comparePassword(password, user.password)
            if (!isCorrect){
                throw{
                    name: "User Login Error",
                    devMessage: `User's Password with email ${email} does not match`
                }
            }
            let payload = {
                id: user.id,
                username: user.username,
                email: user.email
            }
            const token = generateToken(payload)
            
            return res.status(201).json({token})
        })
        .catch(err => {
            res.status(500).json(err)
            console.log(err)
        })
    }
}
module.exports = UserController