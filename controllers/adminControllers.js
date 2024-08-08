const path = require('path');
const rootDir = require('../util/path'); 

exports.getAdminPage = (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'admin.html'));
};
exports.getAdminEditorDelete = (req,res)=>{
    res.sendFile(path.join(rootDir, 'views', 'adminOnly.html'));
}