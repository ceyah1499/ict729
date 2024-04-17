import Enrollment from '../models/enrollment.model.js';

export const getEnrollments = async (req,res) => {
    try {
        const enrollments = await Enrollment.find({});
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getEnrollment = async (req,res) => {
    try {
        const { id } = req.params;
        const enrollment = await Enrollment.findById(id);

        if (!enrollment) {
            return res.status(404).json({message: "Enrollment not found"});
        }
        
        res.status(200).json(enrollment);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createEnrollment = async (req,res) => {
    try {
        const enrollment = await Enrollment.create(req.body);
        res.status(200).json(enrollment);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updateEnrollment = async (req,res) => {
    try {
        const { id } = req.params;
        const enrollment = await Enrollment.findByIdAndUpdate(id, req.body);

        if(!enrollment) {
            return res.status(404).json({message: "Enrollment not found"});
        }

        const updatedEnrollment = await Enrollment.findById(id);
        res.status(200).json(updatedEnrollment);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deleteEnrollment = async (req,res) => {
    try {
        const { id } = req.params;
        const enrollment = await Enrollment.findByIdAndDelete(id);

        if(!enrollment) {
            return res.status(404).json({message: "Enrollment not found"});
        }

        res.status(200).json({message: "Enrollment deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}