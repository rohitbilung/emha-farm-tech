const mongoose = require('mongoose')
const bycrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["admin", "user"],
    },
    img: {
        type: String,
        default: ""
    },
    isActive: {
        type: String,
        default: false
    },
},
    {
        timestamps: true,
    }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bycrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bycrypt.genSalt(10)
    this.password = await bycrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

module.exports = User