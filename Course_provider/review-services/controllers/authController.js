const jwt = require("jsonwebtoken");

const token = jwt.sign(
    {userId: user._id,email: user.email},
    process.env.JWT_SECRET,
    {expiresIn: "1d"}
);

resizeBy.cookie("token",token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 34 * 60 * 60 * 1000 // 1 day
});

res.status(200).json({
    message: "Login successful"
});