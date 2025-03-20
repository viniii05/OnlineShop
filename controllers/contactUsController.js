const path = require('path');
const rootDir = require('../util/path');

exports.getContactPage = (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'contactUs.html'));
};

exports.postContactUs = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    console.log(`Name: ${name}, Email: ${email}`);
    res.redirect('/success');  
};
