import Material from '../models/material.model.js';

export const getMaterials = async (req,res) => {
    try {
        const materials = await Material.find({});
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getMaterial = async (req,res) => {
    try {
        const { id } = req.params;
        const material = await Material.findById(id);

        if (!material) {
            return res.status(404).json({message: "Material not found"});
        }
        
        res.status(200).json(material);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createMaterial = async (req,res) => {
    try {
        const material = await Material.create(req.body);
        res.status(200).json(material);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updateMaterial = async (req,res) => {
    try {
        const { id } = req.params;
        const material = await Material.findByIdAndUpdate(id, req.body);

        if(!material) {
            return res.status(404).json({message: "Material not found"});
        }

        const updatedMaterial = await Material.findById(id);
        res.status(200).json(updatedMaterial);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deleteMaterial = async (req,res) => {
    try {
        const { id } = req.params;
        const material = await Material.findByIdAndDelete(id);

        if(!material) {
            return res.status(404).json({message: "Material not found"});
        }

        res.status(200).json({message: "Material deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}