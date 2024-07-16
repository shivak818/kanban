import dotenv from "dotenv";
import mongoose from "mongoose";
import request from "supertest";
import app from "../index"; // Import your Express app
import Task from "../models/Task";
import User from "../models/User";
// Connect to a new in-memory database before running any tests
dotenv.config();
beforeAll(async () => {
    const url = process.env.MONGODB_URI;
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
});

// Clear all test data after every test
afterEach(async () => {
    await Task.deleteMany();
    await User.deleteMany();
});

// Remove and close the db and server
afterAll(async () => {
    await mongoose.connection.close();
});

let token;

const registerAndLoginTestUser = async () => {
    const user = {
        name: "Test User",
        email: "testuser@example.com",
        password: "password123",
    };

    await request(app).post("/api/users/register").send(user);

    const response = await request(app)
        .post("/api/users/login")
        .send({ email: user.email, password: user.password });

    token = response.body.token;
};

describe("Task API", () => {
    beforeAll(async () => {
        await registerAndLoginTestUser();
    });

    it("should create a new task", async () => {
        const newTask = {
            title: "Test Task",
            description: "This is a test task",
            status: "To Do",
            assignee: "Tester",
            team: "Test Team",
            priority: "P2",
            dueDate: new Date("2023-12-31"),
            reminderDate: new Date("2023-12-30"),
        };

        const response = await request(app)
            .post("/api/tasks")
            .set("Authorization", token)
            .send(newTask)
            .expect("Content-Type", /json/)
            .expect(200);

        expect(response.body.title).toBe(newTask.title);
        expect(response.body.description).toBe(newTask.description);
    });

    it("should return 400 if title is missing", async () => {
        const newTask = {
            description: "This is a test task",
            status: "To Do",
            assignee: "Tester",
            team: "Test Team",
            priority: "P2",
        };

        const response = await request(app)
            .post("/api/tasks")
            .set("Authorization", token)
            .send(newTask)
            .expect("Content-Type", /json/)
            .expect(400);

        expect(response.body.msg).toBe("Please enter a title for the task");
    });

    it("should return 400 if description is missing", async () => {
        const newTask = {
            title: "Test Task",
            status: "To Do",
            assignee: "Tester",
            team: "Test Team",
            priority: "P2",
        };

        const response = await request(app)
            .post("/api/tasks")
            .set("Authorization", token)
            .send(newTask)
            .expect("Content-Type", /json/)
            .expect(400);

        expect(response.body.msg).toBe(
            "Please enter a description for the task"
        );
    });

    it("should return 400 if status is missing", async () => {
        const newTask = {
            title: "Test Task",
            description: "This is a test task",
            assignee: "Tester",
            team: "Test Team",
            priority: "P2",
        };

        const response = await request(app)
            .post("/api/tasks")
            .set("Authorization", token)
            .send(newTask)
            .expect("Content-Type", /json/)
            .expect(400);

        expect(response.body.msg).toBe("Please select a status for the task");
    });

    it("should return 400 if assignee is missing", async () => {
        const newTask = {
            title: "Test Task",
            description: "This is a test task",
            status: "To Do",
            team: "Test Team",
            priority: "P2",
        };

        const response = await request(app)
            .post("/api/tasks")
            .set("Authorization", token)
            .send(newTask)
            .expect("Content-Type", /json/)
            .expect(400);

        expect(response.body.msg).toBe("Please assign the task to someone");
    });

    it("should return 400 if team is missing", async () => {
        const newTask = {
            title: "Test Task",
            description: "This is a test task",
            status: "To Do",
            assignee: "Tester",
            priority: "P2",
        };

        const response = await request(app)
            .post("/api/tasks")
            .set("Authorization", token)
            .send(newTask)
            .expect("Content-Type", /json/)
            .expect(400);

        expect(response.body.msg).toBe("Please specify the team for the task");
    });

    it("should return 400 if priority is missing", async () => {
        const newTask = {
            title: "Test Task",
            description: "This is a test task",
            status: "To Do",
            assignee: "Tester",
            team: "Test Team",
        };

        const response = await request(app)
            .post("/api/tasks")
            .set("Authorization", token)
            .send(newTask)
            .expect("Content-Type", /json/)
            .expect(400);

        expect(response.body.msg).toBe("Please select a priority for the task");
    });

    it("should get all tasks", async () => {
        const task1 = new Task({
            title: "Task 1",
            description: "Task 1 description",
        });
        const task2 = new Task({
            title: "Task 2",
            description: "Task 2 description",
        });

        await task1.save();
        await task2.save();

        const response = await request(app)
            .get("/api/tasks")
            .set("Authorization", token)
            .expect("Content-Type", /json/)
            .expect(200);

        expect(response.body.length).toBe(2);
    });

    it("should update a task", async () => {
        const task = new Task({
            title: "Task to update",
            description: "Old description",
        });
        await task.save();

        const updatedTask = {
            title: "Task to update",
            description: "New description",
        };

        const response = await request(app)
            .put(`/api/tasks/${task._id}`)
            .set("Authorization", token)
            .send(updatedTask)
            .expect("Content-Type", /json/)
            .expect(200);

        expect(response.body.description).toBe(updatedTask.description);
    });

    it("should delete a task", async () => {
        const task = new Task({
            title: "Task to delete",
            description: "To be deleted",
        });
        await task.save();

        const response = await request(app)
            .delete(`/api/tasks/${task._id}`)
            .set("Authorization", token)
            .expect(200);

        expect(response.body.success).toBe(true);

        const taskInDb = await Task.findById(task._id);
        expect(taskInDb).toBeNull();
    });
});
