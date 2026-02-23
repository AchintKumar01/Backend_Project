import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken" // JWT is a bearer token ye token jiske pass h usko data bhejna h
import bcrypt from "bcrypt" // to encrypt the data like password

// we use hooks of mongoose for encryption search for mongoose-> middleware-> hooks(like pre)
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true, 
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true, 
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName: {
            type: String,
            required: true, 
            trim: true,
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required'] // custom error message
        },
        refreshToken: {
            type: String
        }
    }, {timestamps: true}
)

userSchema.pre("save", async function (next) { // before saving something this function runs act as middleware
    if(!this.isModified("password")) return next() 

    // only encrypt the password whenever there is some modification in the password or first time password written
    this.password = bcrypt.hash(this.password, 10)
    next()
})


userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign( // returns jwt token
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign( 
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)