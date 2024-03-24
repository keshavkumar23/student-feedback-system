const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Faculty = require("../models/FacultySchema");

const jwtSecretKey = "ehfwiehfsdhvlisecbeviubfv;nfnvoiufbvoidflksgkdjblsdgv";

const loginFaculty = async (req, res) => {
    const { userType, email, password } = req.body;
    if (userType === 'faculty') {
        const foundUser = await Faculty.findOne({ email });
        if (foundUser) {
            const isUser = bcrypt.compareSync(password, foundUser.password);
            if (isUser) {
                jwt.sign({ userId: foundUser._id, userType }, jwtSecretKey, {}, (err, token) => {
                    res.cookie('token', token, { sameSite: 'none', secure: true }).json({
                        id: foundUser._id,
                        userType: userType,
                    })
                })
            }
        }
    }

}

module.exports = {
    loginFaculty
};
