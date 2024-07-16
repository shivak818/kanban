import pkg from "jsonwebtoken";
const { verify } = pkg;

function auth(req, res, next) {
    const authHeader = req.header("Authorization");

    if (!authHeader)
        return res.status(401).json({ msg: "No token, authorization denied" });

    const token = authHeader.split(" ")[1];

    if (!token)
        return res.status(401).json({ msg: "No token, authorization denied" });

    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        if (e.name === "TokenExpiredError") {
            return res.status(401).json({ msg: "Token expired" });
        }
        res.status(400).json({ msg: "Token is not valid" });
    }
}

export default auth;
