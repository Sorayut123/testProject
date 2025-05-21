const User = require('../models/userModel');

exports.getStaffManagement = async (req, res) => {
    if (req.session.user?.role !== 'owner') {
        return res.redirect('/login');
    }

    const staffList = await User.getAllStaff();
    res.render('staffManagement', { staffList });
};

exports.deleteStaff = async (req, res) => {
    if (req.session.user?.role !== 'owner') {
        return res.redirect('/login');
    }

    await User.deleteUser(req.params.id);
    res.redirect('/staff-management');
};
