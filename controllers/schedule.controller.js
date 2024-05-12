import Schedule from '../models/schedule.model.js';

function calcDiffInHours (startDate, endDate) {
    let diff = (endDate.getTime() - startDate.getTime()) / 1000;
    diff /= (60 * 60);
    diff = Math.abs(Math.round(diff));
    return diff;
}

function sumDuration (dayObject) {
    let sum = 0;
    for( let el in dayObject ) {
        if (dayObject.hasOwnProperty( el )) {
            sum += parseFloat(dayObject[el].duration);
        }
    }
    return sum;
}

export const getSchedules = async (req,res) => {
    try {
        const query = { userID: req.user._id };
        const schedules = await Schedule.find(query).lean();

        

        const mon = schedules.filter(function(schedule) {
            const d1 = new Date(schedule.startTime);
            const d2 = new Date(schedule.endTime);
            schedule.duration = calcDiffInHours(d1, d2);
            return d1.getDay() === 1;
        });
        const tue = schedules.filter(function(schedule) {
            const d1 = new Date(schedule.startTime);
            const d2 = new Date(schedule.endTime);
            schedule.duration = calcDiffInHours(d1, d2);
            return d1.getDay() === 2;
        });
        const wed = schedules.filter(function(schedule) {
            const d1 = new Date(schedule.startTime);
            const d2 = new Date(schedule.endTime);
            schedule.duration = calcDiffInHours(d1, d2);
            return d1.getDay() === 3;
        });
        const thu = schedules.filter(function(schedule) {
            const d1 = new Date(schedule.startTime);
            const d2 = new Date(schedule.endTime);
            schedule.duration = calcDiffInHours(d1, d2);
            return d1.getDay() === 4;
        });
        const fri = schedules.filter(function(schedule) {
            const d1 = new Date(schedule.startTime);
            const d2 = new Date(schedule.endTime);
            schedule.duration = calcDiffInHours(d1, d2);
            return d1.getDay() === 5;
        });
        const sat = schedules.filter(function(schedule) {
            const d1 = new Date(schedule.startTime);
            const d2 = new Date(schedule.endTime);
            schedule.duration = calcDiffInHours(d1, d2);
            return d1.getDay() === 6;
        });
        const sun = schedules.filter(function(schedule) {
            const d1 = new Date(schedule.startTime);
            const d2 = new Date(schedule.endTime);
            schedule.duration = calcDiffInHours(d1, d2);
            return d1.getDay() === 0;
        });

        const weekDuration = 
            sumDuration(mon) + 
            sumDuration(tue) + 
            sumDuration(wed) + 
            sumDuration(thu) + 
            sumDuration(fri) + 
            sumDuration(sat) + 
            sumDuration(sun);
        
        mon.unshift({dayDuration: sumDuration(mon), weekPercentage: (sumDuration(mon) / weekDuration * 100).toFixed(2)});
        tue.unshift({dayDuration: sumDuration(tue), weekPercentage: (sumDuration(tue) / weekDuration * 100).toFixed(2)});
        wed.unshift({dayDuration: sumDuration(wed), weekPercentage: (sumDuration(wed) / weekDuration * 100).toFixed(2)});
        thu.unshift({dayDuration: sumDuration(thu), weekPercentage: (sumDuration(thu) / weekDuration * 100).toFixed(2)});
        fri.unshift({dayDuration: sumDuration(fri), weekPercentage: (sumDuration(fri) / weekDuration * 100).toFixed(2)});
        sat.unshift({dayDuration: sumDuration(sat), weekPercentage: (sumDuration(sat) / weekDuration * 100).toFixed(2)});
        sun.unshift({dayDuration: sumDuration(sun), weekPercentage: (sumDuration(sun) / weekDuration * 100).toFixed(2)});

        const mappedSchedules = {weekDuration, mon, tue, wed, thu, fri, sat, sun};
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
        req.body.userID = req.user._id;
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