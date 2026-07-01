// const jwt = require('jsonwebtoken')


// module.exports = function (req, res, next){
//          try {
//                  const token = req.headers.authorization.split(" ")[1]; 
//                  const decoded = jwt.verify(token, process.env.jwt_secret);
//                  req.body.userId = decoded.userId;
//                  next();
//          } catch (error) {
//                   res.status(401).send({success: false, message: "Invalid token"});
//          }

// };
// const jwt = require('jsonwebtoken');

// module.exports = function (req, res, next) {
//     try {
//         const authHeader = req.headers.authorization;
        
//         // 1. Check if the header exists and starts with 'Bearer '
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return res.status(401).send({ success: false, message: "Authorization header missing or malformed" });
//         }

//         // 2. Safely extract the token string
//         const token = authHeader.split(" ")[1]; 

//         // 3. Verify token (Make sure process.env.jwt_secret matches your .env file casing!)
//         const decoded = jwt.verify(token, process.env.jwt_secret);
        
//         // 4. Attach to req.userId instead of req.body (Perfect for GET requests)
//         req.userId = decoded.userId; 
        
//         next();
//     } catch (error) {
//         res.status(401).send({ success: false, message: "Invalid token" });
//     }
// };
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]; 
        const decoded = jwt.verify(token, process.env.jwt_secret);
        
        // FIX: Attach directly to req, not req.body
        req.userId = decoded.userId; 
        
        next();
    } catch (error) {
        res.status(401).send({ success: false, message: "Invalid token" });
    }
};