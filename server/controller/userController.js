import User from "../model/userModel.js"

export const create = async(req, res) => {
    try {
        const newUser = new User(req.body);
        const {address} = newUser;

        const userExist = await User.findOne({address});
        if(userExist){
            return res.status(400).json({message: "Entry with specified date already exists."});
        }

        const savedData = await newUser.save();
        // res.status(200).json(savedData);
        res.status(200).json({message:"Entry added!"});
    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
};

export const getAllUsers = async(req, res) => {
    try {
        const userData = await User.find();
        if(!userData || userData.length===0) {
            return res.status(404).json({message:"Data not found."})
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
};

export const getUserByID = async(req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist) {
            return res.status(404).json({message:"Entry not found."})
        }
        res.status(200).json(userExist);
    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
};

export const update = async(req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist) {
            return res.status(404).json({message:"Entry not found."})
        }
        const updatedData = await User.findByIdAndUpdate(id, req.body, {
            new:true
        });
        res.status(200).json({message:"Entry updated successfully!"});
    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
};

export const deleteUser = async(req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist) {
            return res.status(404).json({message:"Entry not found."})
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({message:"Entry deleted successfully."});
    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
};

