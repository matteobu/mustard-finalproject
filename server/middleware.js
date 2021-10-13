module.exports.requireLoggedInUser = function (req, res, next) {
    // console.log("req.session :>> ", req.session);
    if (
        !req.session.userID &&
        req.url !== "/login" &&
        req.url !== "/register"
    ) {
        res.redirect("/register");
    } else {
        next();
    }
};

module.exports.requireLoggedOutUser = function (req, res, next) {
    const { userID } = req.session;

    if (userID) {
        res.redirect("/profile");
    } else {
        next();
    }
};

module.exports.editProfile = function (req, res, next) {
    const { signatureDone } = req.session;

    if (signatureDone) {
        res.redirect("/profile/edit");
    } else {
        next();
    }
};

module.exports.requireLogOut = function (req, res, next) {
    if (!req.session.signatureDone) {
        res.redirect("/petition");
    } else {
        next();
    }
};

module.exports.requireNoSignature = function (req, res, next) {
    if (req.session.signatureDone) {
        res.redirect("/thanks");
    } else {
        next();
    }
};

module.exports.requireSignature = function (req, res, next) {
    if (!req.session.signatureDone) {
        res.redirect("/petition");
    } else {
        next();
    }
};
