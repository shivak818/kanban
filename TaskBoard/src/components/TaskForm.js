import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormHelperText,
    IconButton,
    Menu,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";

const TaskForm = ({ open, onClose, onSubmit, onUpdateTask, initialTask }) => {
    const [formData, setFormData] = useState(
        initialTask || {
            title: "",
            description: "",
            dueDate: new Date(),
            reminderDate: new Date(),
            status: "To Do",
            team: "",
            assignee: "",
            priority: "P2",
        }
    );
    const [errors, setErrors] = useState({});
    const [openStatusMenu, setOpenStatusMenu] = useState(false);
    const anchorRef = useRef(null);

    const handleReset = () => {
        setFormData({
            title: "",
            description: "",
            dueDate: new Date(),
            reminderDate: new Date(),
            status: "To Do",
            team: "",
            assignee: "",
            priority: "P2",
        });
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Title is required*";
        }
        if (!formData.description.trim()) {
            newErrors.description = "Description is required*";
        }
        if (!formData.assignee.trim()) {
            newErrors.assignee = "Assignee is required*";
        }
        if (!formData.team.trim()) {
            newErrors.team = "Team is required*";
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            if (initialTask) {
                onUpdateTask(formData);
            } else {
                onSubmit(formData);
            }
            handleReset();
            onClose();
        }
    };

    const handleClick = () => {
        setOpenStatusMenu(true);
    };

    const handleClose = (newStatus) => {
        if (newStatus) {
            setFormData({ ...formData, status: newStatus });
        }
        setOpenStatusMenu(false);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle
                sx={{ display: "flex", justifyContent: "space-between" }}
            >
                <Typography variant="h6">
                    {initialTask ? "Edit Task" : "Create Task"}
                </Typography>
                <IconButton onClick={onClose}>
                    <CancelOutlinedIcon fontSize="medium" />
                </IconButton>
            </DialogTitle>
            <DialogContent className="form">
                <Box
                    mt={2}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{ marginRight: "1rem" }}
                    >
                        Title:
                    </Typography>
                    <TextField
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        sx={{ width: "70%", backgroundColor: "#d5d5d5" }}
                        size="small"
                        disabled={initialTask ? true : false}
                        error={!!errors.title}
                    />
                </Box>
                {errors.title && (
                    <FormHelperText error>{errors.title}</FormHelperText>
                )}
                <Box
                    mt={2}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{ marginRight: "1rem" }}
                    >
                        Description:
                    </Typography>
                    <TextField
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        sx={{ width: "70%", backgroundColor: "#d5d5d5" }}
                        size="small"
                        disabled={initialTask ? true : false}
                        error={!!errors.description}
                    />
                </Box>
                {errors.description && (
                    <FormHelperText error>{errors.description}</FormHelperText>
                )}
                <Box
                    mt={2}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{ marginRight: "1rem" }}
                    >
                        Team:
                    </Typography>
                    <TextField
                        name="team"
                        value={formData.team}
                        onChange={handleChange}
                        sx={{ width: "70%", backgroundColor: "#d5d5d5" }}
                        size="small"
                        disabled={initialTask ? true : false}
                        error={!!errors.team}
                    />
                </Box>
                {errors.team && (
                    <FormHelperText error>{errors.team}</FormHelperText>
                )}
                <Box
                    mt={2}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{ marginRight: "1rem" }}
                    >
                        Assignee:
                    </Typography>
                    <TextField
                        name="assignee"
                        value={formData.assignee}
                        onChange={handleChange}
                        sx={{ width: "70%", backgroundColor: "#d5d5d5" }}
                        size="small"
                        disabled={initialTask ? true : false}
                        error={!!errors.assignee}
                    />
                </Box>
                {errors.assignee && (
                    <FormHelperText error>{errors.assignee}</FormHelperText>
                )}
                <Box
                    mt={2}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{ marginRight: "1rem" }}
                    >
                        Due Date:
                    </Typography>
                    <TextField
                        type="date"
                        variant="outlined"
                        size="small"
                        sx={{
                            margin: "1rem",
                            backgroundColor: "whitesmoke",
                            borderRadius: "5px",
                        }}
                        value={formData.dueDate}
                        onChange={handleChange}
                        name="dueDate"
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>
                <Box
                    mt={2}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{ marginRight: "1rem" }}
                    >
                        Reminder Date:
                    </Typography>
                    <TextField
                        type="date"
                        variant="outlined"
                        size="small"
                        sx={{
                            margin: "1rem",
                            backgroundColor: "whitesmoke",
                            borderRadius: "5px",
                        }}
                        value={formData.reminderDate}
                        onChange={handleChange}
                        name="reminderDate"
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>
                <Box
                    mt={2}
                    display={initialTask ? "flex" : "block"}
                    alignItems="center"
                    justifyContent={"space-around"}
                >
                    <Box display="flex" alignItems="center">
                        <Typography
                            variant="subtitle1"
                            sx={{ marginRight: initialTask ? "1rem" : "7rem" }}
                        >
                            Priority:
                        </Typography>
                        <Select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            sx={{
                                backgroundColor: initialTask
                                    ? "whitesmoke"
                                    : "#d5d5d5",
                                height: initialTask ? "42px" : "auto",
                            }}
                        >
                            <MenuItem value="P0">P0</MenuItem>
                            <MenuItem value="P1">P1</MenuItem>
                            <MenuItem value="P2">P2</MenuItem>
                        </Select>
                    </Box>
                    {initialTask && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ marginRight: "1rem" }}
                                >
                                    Status:
                                </Typography>
                                <Button
                                    ref={anchorRef}
                                    variant="contained"
                                    onClick={handleClick}
                                >
                                    {formData.status || "Status"}
                                </Button>
                            </Box>
                            <Menu
                                anchorEl={anchorRef.current}
                                open={openStatusMenu}
                                onClose={() => handleClose(formData.status)}
                                MenuListProps={{
                                    "aria-labelledby": "simple-menu",
                                }}
                            >
                                <MenuItem onClick={() => handleClose("To Do")}>
                                    Assign
                                </MenuItem>
                                <MenuItem
                                    onClick={() => handleClose("In Progress")}
                                >
                                    In Progress
                                </MenuItem>
                                <MenuItem onClick={() => handleClose("Done")}>
                                    Done
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                {!initialTask && (
                    <Button onClick={handleReset} variant="contained">
                        Reset
                    </Button>
                )}
                <Button onClick={handleSubmit} variant="contained">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskForm;
