const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    // const authHeader = req.headers.authorization;

    // if (!authHeader || !authHeader.startsWith("Bearer ")) {

    //     return res.status(401).json({
    //         message: "No token provided"
    //     });
    // }

    // const token = authHeader.split(" ")[1];

    console.log("Cookies:",req.cookies);

    const token = req.cookies.access;

    console.log("Token:",token);

    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("Decoded:",decoded);

        req.user = decoded;

        next();
    }

    catch(error) {

        console.log(error);

        return res.status(401).json({
            message: error.message
        });
    }

};

module.exports = authMiddleware;