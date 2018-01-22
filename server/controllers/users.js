var mongoose = require('mongoose');
var User = mongoose.model('User');


module.exports = {
    login: function(req, res) {
        User.find({ name: req.body.name }, function(err, users) {
            if (users.length < 1) {
                User.create({ name: req.body.name }, function(err, user) {
                    req.session.user = user;
                    req.session.save();
                })
            } else {
                req.session.user = users[0];
                req.session.save();
            }


            console.log(req.session.user);
            res.json({ user: req.session.user });
        })
    }
}