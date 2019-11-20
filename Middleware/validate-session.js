const jwt = require('jsonwebtoken');
const User =  require('../db').import('../Models/user')

const validateSession = (req, res, next) => {
    if(req.method == 'OPTIONS') {
        next()
    } else {
        const token = req.headers.authorization;
        if(!token) return res.status(403).send({ auth: false, message: 'No Token Provided.' });
            else {
                jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                    if(!err && decoded){
                        User.findOne({
                            where: {
                                id: decoded.id
                            }
                        }, console.log(decoded))
                        .then(user => {
                            if(!user) throw 'err'
                            req.user = user;
                            next();
                        })
                        .catch(err => next(err))
                    } else {
                        req.errors = err
                        return res.status(500).send('Unauthorized Family Member');
                    }
                })
            }
    }
}

module.exports = validateSession;

// This process validates each user session.  If the request method is equal to "options" it moves on, otherwise it checks for a token, if that token doesnt exists, a response of 403 is noted along with a message.  If a token is provided, verfication of the token (which calls upon the authorization within headers.js) and the JWT Secret matches, it then passes into a function that seeks out "no error" and a "decoded" parameter.  If that is true, it pulls from the User model the decoded id.
// The console log notes the decoded parameter then steps into the user function.  This function asks if there is a user (if not, throws an error) then requests a user from the user.js model.  Once that passes, moves on with the "next" method.
// A catch method is placed in case any error is found and then displays that error within a next method.

// If there is an originating error or the decoded parameter isn't matching, a request for the errors is returned with a status of 500 and sends a string message.
