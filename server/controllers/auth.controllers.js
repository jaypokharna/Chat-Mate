import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generate.token.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await User({
      fullName,
      username,
      password: hashPassword,
      gender,
      profilePicture:
        gender === "male" ? boyProfilePicture : girlProfilePicture,
    });

    if (newUser) {
      // generate jwt token here
      generateTokenAndSetCookie(newUser._id, res);

      // return res.status(201).json({message: 'User created

      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePicture: newUser.profilePicture,
      });
    } else {
      res.staus(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup Controller", error.message);
    res.status(500).json({ error: "Internal server error !" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        user?.password || ""
      );

      if (!user || !isPasswordCorrect) {
        return res.status(400).json({ message: "Wrong password !" });
      }

      generateTokenAndSetCookie(user._id, res);

      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePicture: user.profilePicture,
      });
    } else {
      res.status(400).json({ error: "User not found !" });
    }
  } catch (error) {
    console.log("Error in login Controller", error.message);
    res.status(500).json({ error: "Internal server error !" });
  }
};

export const logout = (req, res) => {
  try {
    
    res.cookie("jwt",{
        maxAge :0
    })
    res.status(200).json({message : "Logged out successfully"});

  } catch (error) {
    console.log("Error in logut Controller", error.message);
    res.status(500).json({ error: "Internal server error !" });
  }
};
