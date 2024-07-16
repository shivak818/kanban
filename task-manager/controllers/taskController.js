import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ date: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createTask = async (req, res) => {
    const {
        title,
        description,
        status,
        assignee,
        team,
        priority,
        dueDate,
        reminderDate,
    } = req.body;

    if (!title) {
        return res
            .status(400)
            .json({ msg: "Please enter a title for the task" });
    }
    if (!description) {
        return res
            .status(400)
            .json({ msg: "Please enter a description for the task" });
    }
    if (!status) {
        return res
            .status(400)
            .json({ msg: "Please select a status for the task" });
    }
    if (!assignee) {
        return res
            .status(400)
            .json({ msg: "Please assign the task to someone" });
    }
    if (!team) {
        return res
            .status(400)
            .json({ msg: "Please specify the team for the task" });
    }
    if (!priority) {
        return res
            .status(400)
            .json({ msg: "Please select a priority for the task" });
    }

    try {
        const newTask = new Task({
            title,
            description,
            status,
            assignee,
            team,
            priority,
            dueDate,
            reminderDate,
        });

        const savedTask = await newTask.save();
        res.json(savedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: "Task not found" });
        }

        await Task.deleteOne({ _id: req.params.id });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        if (!updatedTask) {
            return res.status(404).json({ msg: "Task not found" });
        }
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
