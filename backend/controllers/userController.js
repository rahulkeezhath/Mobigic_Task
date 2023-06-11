const User = require('../models/userModel')
const File = require('../models/fileModel')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')


// Registration endpoint
const userSignup = asyncHandler(async (req,res) => {
    try {
        const {username, password} = req.body
         if (!username || !password) {
           res.status(400);
           throw new Error("Please Add all Fields");
         }
         
        const existingUser = await User.findOne({username});
        if(existingUser){
            res.status(400)
            throw new Error("User already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const HashedPassword = await bcrypt.hash(password, salt)
         const user = await User.create({
        username,
        password: HashedPassword
        })
        if(user) {  
        res.status(201).json({
            _id: user.id,
            username: user.username,
            token: generateAuthToken(user._id)
        })
    } else {
          res.status(400);
          throw new Error("Invalid User");
    }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" }); 
    }
 })

// Login endpoint
const userLogin = asyncHandler(async (req,res) => {
    try {
        const {username, password} = req.body

        const user = await User.findOne({username})
        if (user && (await bcrypt.compare(password, user.password))) {
          res.status(200).json({
            _id: user.id,
            username: user.username,
            token: generateAuthToken(user._id),
          });
        } else {
          res.status(400);
          throw new Error("Invalid Credentials");
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}) 


// Upload endpoint
const uploadFile = asyncHandler(async (req,res) =>{
    try {
        const { userId } = req.body;
        const { filename } = req.file;
      // Generate a unique 6-digit code
      const code = Math.random().toString().slice(2, 8);
        console.log("code",code)
      // Create the file record
      const newFile = new File({ filename, code, userId})
      await newFile.save()

      res.status(200).json({code})
    } catch (error) {
         res.status(500).json({ message: "Internal server error" });
    }
})

// List files endpoint
const getFiles = asyncHandler(async (req,res) => {
    try {
        const {userId} = req.body
        const files = await File.find({userId})
        res.status(200).json({files})
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})


// Delete file endpoint
const deleteFile = asyncHandler(async(req,res) => {
    try {
        const {id} = req.params
        await File.findByIdAndDelete(id)
        res.status(200).json({message: 'File Deleted'})
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

// Download file endpoint
const downloadFile = asyncHandler(async (req,res) => {
    try {
      const { code } = req.params;

      // Find file by code
      const file = await File.findOne({ code });
      if (!file) {
        return res.status(404).json({ message: "File Not Found" });
      }

      // Check if the code is correct
      const isCodeValid = req.query.code === file.code;
      if (!isCodeValid) {
        return res.status(401).json({ message: "Invalid Code" });
      }

      // Serve the file for download
      res.download(`uploads/${file.filename}`)
    } catch (error) {
         res.status(500).json({ message: "Internal server error" });
    }
})

const generateAuthToken = (id) => {
    return jwt.sign({ id }, process.env.JWTPRIVATEKEY, { expiresIn: "10d" });
    }
 

module.exports = {
    userSignup,
    userLogin,
    uploadFile,
    getFiles,
    deleteFile,
    downloadFile
 }