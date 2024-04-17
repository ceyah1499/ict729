import Permission from '../models/permission.model.js';

export const getPermissions = async (req,res) => {
    try {
        const permissions = await Permission.find({});
        res.status(200).json(permissions);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getPermission = async (req,res) => {
    try {
        const { id } = req.params;
        const permission = await Permission.findById(id);

        if (!permission) {
            return res.status(404).json({message: "Permission not found"});
        }
        
        res.status(200).json(permission);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createPermission = async (req,res) => {
    try {
        const permission = await Permission.create(req.body);
        res.status(200).json(permission);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updatePermission = async (req,res) => {
    try {
        const { id } = req.params;
        const permission = await Permission.findByIdAndUpdate(id, req.body);

        if(!permission) {
            return res.status(404).json({message: "Permission not found"});
        }

        const updatedPermission = await Permission.findById(id);
        res.status(200).json(updatedPermission);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deletePermission = async (req,res) => {
    try {
        const { id } = req.params;
        const permission = await Permission.findByIdAndDelete(id);

        if(!permission) {
            return res.status(404).json({message: "Permission not found"});
        }

        res.status(200).json({message: "Permission deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}