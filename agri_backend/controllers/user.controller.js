const Users = require('../model/user.model')
const { generateToken } = require('../middleware/jwt.auth');
const User = require('../model/user.model');

module.exports = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            let userlogin = await Users.findOne({ email })
            if (userlogin) {
                if (await userlogin.matchPassword(password)) {
                    let params = {
                        _id: userlogin.id,
                        name: userlogin.name
                    }
                    let token = generateToken(params)

                    res.status(200).send({
                        status: true,
                        userlogin,
                        token
                    })
                } else {
                    res.status(401).send({ data: null, message: "Please enter valid credentials." })
                }
            } else {
                res.status(404).send({ data: null, message: "User doesnot exists." })
            }
        } catch (error) {
            console.error("Backend Error:", error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    },

    signup: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            let user = await Users.findOne({ email });
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }
            let signupUser = Users.create({ name, email, password })
            res.status(200).send({ data: signupUser, message: "successful" })
        } catch (error) {
            console.error("Backend Error:", error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            let role = req.params.role
            const user = await User.find({role:role})
                .collation({ locale: "en", strength: 2 })
                .sort({ name: 1 });
        } catch (error) {
            console.error("Backend Error:", error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    },

    deleteUsers: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByIdAndDelete(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "User deleted successfully"
            });
        } catch (error) {
            console.error("Backend Error:", error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    },

    approveUser: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await Users.findByIdAndUpdate(id, { isActive: true }, { new: true, runValidators: true })

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: user
            });

        } catch (error) {
            console.error("Backend Error:", error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    },

    pendingUser: async (req, res) => {
        try {
            let { page = 1, limit = 5 } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);

            const skip = (page - 1) * limit;

            const users = await Users.find({ isActive: false }).sort({ _id: -1 })
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });

            const total = await Users.countDocuments({ isActive: false });

            res.status(200).json({
                success: true,
                page,
                totalPages: Math.ceil(total / limit),
                totalProducts: total,
                data: users,
            });
        } catch (error) {
            console.error("Backend Error:", error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    },
}