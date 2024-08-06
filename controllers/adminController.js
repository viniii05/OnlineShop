const path = require('path');
const rootDir = require('../util/path'); 
exports.getAdminPage = (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'admin.html'));
};
