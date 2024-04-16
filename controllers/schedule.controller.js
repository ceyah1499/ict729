import Schedule from '../models/schedule.model.js';

export const getSchedules = async (req,res) => {
    try {
        const schedules = await Schedule.find({});
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getSchedule = async (req,res) => {
    try {
        const { id } = req.params;
        const schedule = await Schedule.findById(id);
        res.status(200).json(schedule);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createSchedule = async (req,res) => {
    try {
        const schedule = await Schedule.create(req.body);
        res.status(200).json(schedule);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updateSchedule = async (req,res) => {
    try {
        const { id } = req.params;
        const schedule = await Schedule.findByIdAndUpdate(id, req.body);

        if(!schedule) {
            return res.status(404).json({message: "Event not found"});
        }

        const updatedSchedule = await Schedule.findById(id);
        res.status(200).json(updatedSchedule);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deleteSchedule = async (req,res) => {
    try {
        const { id } = req.params;
        const schedule = await Schedule.findByIdAndDelete(id);

        if(!schedule) {
            return res.status(404).json({message: "Event not found"});
        }

        res.status(200).json({message: "Event deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}