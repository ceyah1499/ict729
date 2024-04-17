import Course from '../models/course.model.js';

export const getCourses = async (req,res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getCourse = async (req,res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({message: "Course not found"});
        }
        
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createCourse = async (req,res) => {
    try {
        const course = await Course.create(req.body);
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updateCourse = async (req,res) => {
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndUpdate(id, req.body);

        if(!course) {
            return res.status(404).json({message: "Course not found"});
        }

        const updatedCourse = await Course.findById(id);
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deleteCourse = async (req,res) => {
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndDelete(id);

        if(!course) {
            return res.status(404).json({message: "Course not found"});
        }

        res.status(200).json({message: "Course deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}