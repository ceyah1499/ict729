import Schedule from '../models/schedule.model.js';

export const getSchedules = async (req,res) => {
    try {
        const query = { userID: req.user._id };
        const schedules = await Schedule.find(query);
        const mon = schedules.filter(function(schedule) {
            const d = new Date(schedule.startTime);
            return d.getDay() === 1;
        });
        const tue = schedules.filter(function(schedule) {
            const d = new Date(schedule.startTime);
            return d.getDay() === 2;
        });
        const wed = schedules.filter(function(schedule) {
            const d = new Date(schedule.startTime);
            return d.getDay() === 3;
        });
        const thu = schedules.filter(function(schedule) {
            const d = new Date(schedule.startTime);
            return d.getDay() === 4;
        });
        const fri = schedules.filter(function(schedule) {
            const d = new Date(schedule.startTime);
            return d.getDay() === 5;
        });
        const sat = schedules.filter(function(schedule) {
            const d = new Date(schedule.startTime);
            return d.getDay() === 6;
        });
        const sun = schedules.filter(function(schedule) {
            const d = new Date(schedule.startTime);
            return d.getDay() === 7;
        });
        const mappedSchedules = {mon, tue, wed, thu, fri, sat, sun};
        res.status(200).json(mappedSchedules);
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