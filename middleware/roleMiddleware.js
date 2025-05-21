exports.isOwner = (req, res, next) => {
    if (req.user.role !== "owner") {
        return res.status(403).send("⛔ คุณไม่มีสิทธิ์เข้าถึงหน้านี้");
    }
    next();
};

exports.isStaff = (req, res, next) => {
    if (req.user.role !== "staff") {
        return res.status(403).send("⛔ คุณไม่มีสิทธิ์เข้าถึงหน้านี้");
    }
    next();
};