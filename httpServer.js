import http from "http";
import fs from "fs";

let tasks = [
    {
        id: 1,
        taskName: "Develop Login Page",
        assignedTo: "Rahul Sharma",
        status: "Pending"
    },
    {
        id: 2,
        taskName: "Design Dashboard",
        assignedTo: "Amit Kumar",
        status: "Completed"
    },
    {
        id: 3,
        taskName: "Testing Module",
        assignedTo: "Priya Singh",
        status: "In Progress"
    }
];

const server = http.createServer((req, res) => {

    // HOME PAGE
    if (req.url === "/" && req.method === "GET") {

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(`
            <h1>Welcome to Employee Task Management System</h1>
        `);
    }

    // ALL TASKS
    else if (req.url === "/tasks" && req.method === "GET") {

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(tasks, null, 2));
    }

    // ABOUT
    else if (req.url === "/about" && req.method === "GET") {

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(`
            <h2>Employee Task Management Application</h2>
            <p>Node.js HTTP and FS Module Demo</p>
        `);
    }

    // SERVE HTML USING FS MODULE
    else if (req.url === "/home" && req.method === "GET") {

        fs.readFile("./public/index.html", "utf-8", (err, data) => {

            if (err) {

                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });

                res.end("Error Reading File");
            }
            else {

                res.writeHead(200, {
                    "Content-Type": "text/html"
                });

                res.end(data);
            }
        });
    }

    // POST TASK
    else if (req.url === "/add-task" && req.method === "POST") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {

            try {

                const task = JSON.parse(body);

                if (
                    !task.id ||
                    !task.taskName ||
                    !task.assignedTo ||
                    !task.status
                ) {

                    res.writeHead(400, {
                        "Content-Type": "application/json"
                    });

                    return res.end(JSON.stringify({
                        message: "All fields required"
                    }));
                }

                tasks.push(task);

                res.writeHead(201, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Task Added Successfully",
                    task
                }));
            }
            catch {

                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Invalid JSON"
                }));
            }
        });
    }

    // INVALID ROUTE
    else {

        res.writeHead(404, {
            "Content-Type": "text/plain"
        });

        res.end("404 Page Not Found");
    }
});

server.listen(3000, () => {

    console.log(
        "HTTP Server running at http://localhost:3000"
    );
});