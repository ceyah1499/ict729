import Schedule from '../models/schedule.model.js';

function calcDiffInHours (startDate, endDate) {
    let diff = (endDate.getTime() - startDate.getTime()) / 1000;
    diff /= (60 * 60);
    diff = Math.abs(Math.round(diff));
    return diff;
}

function partitionToDays (schedule) {
    const d1 = new Date(schedule.startTime);
    const d2 = new Date(schedule.endTime);
    schedule.duration = calcDiffInHours(d1, d2);

    switch (d1.getDay())
    {
        case 1: mon.push(schedule); break;
        case 2: tue.push(schedule); break;
        case 3: wed.push(schedule); break;
        case 4: thu.push(schedule); break;
        case 5: fri.push(schedule); break;
        case 6: sat.push(schedule); break;
        case 0: sun.push(schedule); break;
    }
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

function calculateAllDurations () {
    weekDuration = 
        sumDuration(mon) + 
        sumDuration(tue) + 
        sumDuration(wed) + 
        sumDuration(thu) + 
        sumDuration(fri) + 
        sumDuration(sat) + 
        sumDuration(sun);
    
    mon.unshift({dayDuration: sumDuration(mon), weekPercentage: (sumDuration(mon) / weekDuration).toFixed(2)});
    tue.unshift({dayDuration: sumDuration(tue), weekPercentage: (sumDuration(tue) / weekDuration).toFixed(2)});
    wed.unshift({dayDuration: sumDuration(wed), weekPercentage: (sumDuration(wed) / weekDuration).toFixed(2)});
    thu.unshift({dayDuration: sumDuration(thu), weekPercentage: (sumDuration(thu) / weekDuration).toFixed(2)});
    fri.unshift({dayDuration: sumDuration(fri), weekPercentage: (sumDuration(fri) / weekDuration).toFixed(2)});
    sat.unshift({dayDuration: sumDuration(sat), weekPercentage: (sumDuration(sat) / weekDuration).toFixed(2)});
    sun.unshift({dayDuration: sumDuration(sun), weekPercentage: (sumDuration(sun) / weekDuration).toFixed(2)});
}

let weekDuration = 0;
const mon = [], 
      tue = [], 
      wed = [], 
      thu = [], 
      fri = [], 
      sat = [], 
      sun = [];

export const getSchedules = async (req,res) => {
    try {
        const query = { userID: req.user._id };
        const schedules = await Schedule.find(query).lean();
        
        schedules.forEach(partitionToDays);
        const mappedSchedules = {weekDuration, mon, tue, wed, thu, fri, sat, sun};
        calculateAllDurations();
        
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