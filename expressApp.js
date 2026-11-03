import express from "express";

const app = express();

app.use(express.json());

let tasks = [
    {
        id: 1,
        taskName: "Develop Login Page",
        assignedTo: "Rahul Sharma",
        status: "Pending",
        priority: "High"
    },
    {
        id: 2,
        taskName: "Design Dashboard",
        assignedTo: "Amit Kumar",
        status: "In Progress",
        priority: "Medium"
    },
    {
        id: 3,
        taskName: "Database Setup",
        assignedTo: "Priya Singh",
        status: "Completed",
        priority: "Low"
    }
];


// GET ALL TASKS
app.get("/tasks", (req, res) => {

    res.json(tasks);
});


// GET TASK BY ID
app.get("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(
        task => task.id === id
    );

    if (!task) {

        return res.status(404).json({
            message: "Task Not Found"
        });
    }

    res.json(task);
});


// ADD NEW TASK
app.post("/tasks", (req, res) => {

    const task = req.body;

    if (
        !task.id ||
        !task.taskName ||
        !task.assignedTo ||
        !task.status ||
        !task.priority
    ) {

        return res.status(400).json({
            message: "All Fields Required"
        });
    }

    tasks.push(task);

    res.status(201).json({
        message: "Task Added Successfully",
        task
    });
});


// UPDATE TASK
app.put("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = tasks.findIndex(
        task => task.id === id
    );

    if (index === -1) {

        return res.status(404).json({
            message: "Task Not Found"
        });
    }

    tasks[index] = {
        ...tasks[index],
        ...req.body
    };

    res.json({
        message: "Task Updated Successfully",
        task: tasks[index]
    });
});


// DELETE TASK
app.delete("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = tasks.findIndex(
        task => task.id === id
    );

    if (index === -1) {

        return res.status(404).json({
            message: "Task Not Found"
        });
    }

    const deletedTask = tasks[index];

    tasks.splice(index, 1);

    res.json({
        message: "Task Deleted Successfully",
        deletedTask
    });
});


// INVALID ROUTE
app.use((req, res) => {

    res.status(404).json({
        message: "Route Not Found"
    });
});


app.listen(4000, () => {

    console.log(
        "Express Server running at http://localhost:4000"
    );
});