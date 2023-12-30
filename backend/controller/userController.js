import User from '../models/User.js';


export const registerUser = async (req, res) => {

    // 404 not found
    // 500 server error
    // 403 unauthorized
    // 400 bad request

    try {

        // const email = req.body.email;
        // const username = req.body.username;
        // const password = req.body.password;

        const { password, username, email } = req.body;


        const isUserExists = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { username: username.toLowerCase() }
            ]
        });

        if (isUserExists) {
            return res.status(400).send("email or username already exists");
        }

        const userInfo = new User({
            username: username,
            password: password,
            email: email
        });

        await userInfo.save();

        userInfo.password = undefined;

        return res.status(201).send(userInfo);
    } catch (err) {
        console.log("error at registerUser", err.message);
        res.send("something went wrong" + err.message);
    }


};