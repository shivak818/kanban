import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import React, { useState } from "react";

const TaskFilter = ({ onFilter }) => {
    const [assignee, setAssignee] = useState("");
    const [priority, setPriority] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [reminderDate, setReminderDate] = useState("");
    const [status, setStatus] = useState("All");

    const handleStatusFilter = (event) => {
        const newStatus = event.target.value;
        setStatus(newStatus);
        handleFilter(assignee, newStatus, priority, dueDate, reminderDate);
    };

    const handleAssigneeFilter = (event) => {
        const newAssignee = event.target.value;
        setAssignee(newAssignee);
        handleFilter(newAssignee, status, priority, dueDate, reminderDate);
    };

    const handlePriorityFilter = (event) => {
        const newPriority = event.target.value;
        setPriority(newPriority);
        handleFilter(assignee, status, newPriority, dueDate, reminderDate);
    };

    const handleDueDateFilter = (event) => {
        const newDueDate = event.target.value;
        setDueDate(newDueDate);
        handleFilter(assignee, status, priority, newDueDate, reminderDate);
    };

    const handleReminderDateFilter = (event) => {
        const newReminderDate = event.target.value;
        setReminderDate(newReminderDate);
        handleFilter(assignee, status, priority, dueDate, newReminderDate);
    };

    const handleFilter = (
        newAssignee,
        newStatus,
        newPriority,
        newDueDate,
        newReminderDate
    ) => {
        const filters = {
            assignee: newAssignee.trim() ? newAssignee : undefined,
            priority: newPriority || undefined,
            status: newStatus || undefined,
            dueDate: newDueDate ? new Date(newDueDate) : undefined,
            reminderDate: newReminderDate
                ? new Date(newReminderDate)
                : undefined,
        };
        onFilter(filters);
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
            >
                <h4>Filter By:</h4>
                <TextField
                    label="Assignee"
                    variant="outlined"
                    size="small"
                    sx={{
                        margin: "1rem",
                        backgroundColor: "whitesmoke",
                        borderRadius: "5px",
                    }}
                    value={assignee}
                    onChange={handleAssigneeFilter}
                    name="assignee"
                />
                <FormControl
                    variant="outlined"
                    size=""
                    sx={{
                        width: "200px",
                        margin: "1rem",
                        height: "42px",
                        backgroundColor: "whitesmoke",
                        borderRadius: "5px",
                    }}
                >
                    <InputLabel sx={{ top: "-0.5rem", bottom: "1.5rem" }}>
                        Status
                    </InputLabel>
                    <Select
                        value={status}
                        onChange={handleStatusFilter}
                        name="status"
                        label="Status"
                        sx={{ height: "100%" }}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="To Do">To Do</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Done">Done</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Due Date"
                    type="date"
                    variant="outlined"
                    size="small"
                    sx={{
                        margin: "1rem",
                        backgroundColor: "whitesmoke",
                        borderRadius: "5px",
                    }}
                    value={dueDate}
                    onChange={handleDueDateFilter}
                    name="dueDate"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Reminder Date"
                    type="date"
                    variant="outlined"
                    size="small"
                    sx={{
                        margin: "1rem",
                        backgroundColor: "whitesmoke",
                        borderRadius: "5px",
                    }}
                    value={reminderDate}
                    onChange={handleReminderDateFilter}
                    name="reminderDate"
                    InputLabelProps={{ shrink: true }}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
            >
                <h4 style={{ marginRight: "1rem" }}>Sort By:</h4>
                <FormControl
                    variant="outlined"
                    size=""
                    sx={{
                        width: "200px",
                        margin: "1rem",
                        height: "43px",
                        backgroundColor: "whitesmoke",
                        borderRadius: "5px",
                    }}
                >
                    <InputLabel sx={{ top: "-0.5rem", bottom: "1.5rem" }}>
                        Priority
                    </InputLabel>
                    <Select
                        value={priority}
                        onChange={handlePriorityFilter}
                        name="priority"
                        label="Priority"
                        sx={{ height: "100%" }}
                    >
                        <MenuItem value="All">All Priorities</MenuItem>
                        <MenuItem value="P0">P0</MenuItem>
                        <MenuItem value="P1">P1</MenuItem>
                        <MenuItem value="P2">P2</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export default TaskFilter;
