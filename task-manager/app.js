const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "tasks.json");


function getTasks() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}


function saveTasks(tasks) {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}


function addTask(label) {
    const tasks = getTasks();
    tasks.push({
        id: tasks.length + 1,
        label: label,
        status: "pending"
    });

    saveTasks(tasks);
    console.log("Task added!");
}


function listTasks() {
    const tasks = getTasks();

    if (tasks.length === 0) {
        console.log("No tasks found.");
        return;
    }

    tasks.forEach(t => {
        console.log(`${t.id}. ${t.label} [${t.status}]`);
    });
}


function removeTask(id) {
    let tasks = getTasks();
    const updated = tasks.filter(t => t.id !== id);

    if (updated.length === tasks.length) {
        console.log("Task not found!");
        return;
    }

    
    updated.forEach((t, i) => t.id = i + 1);

    saveTasks(updated);
    console.log("Task removed!");
}


function updateTask(id, newLabel) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === id);

    if (!task) {
        console.log("Task not found!");
        return;
    }

    task.label = newLabel;
    saveTasks(tasks);
    console.log("Task updated!");
}


function markDone(id) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === id);

    if (!task) {
        console.log("Task not found!");
        return;
    }

    task.status = "done";
    saveTasks(tasks);
    console.log("Task marked as done!");
}


const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case "add":
        addTask(args.slice(1).join(" "));
        break;

    case "list":
        listTasks();
        break;

    case "remove":
        removeTask(Number(args[1]));
        break;

    case "update":
        updateTask(Number(args[1]), args.slice(2).join(" "));
        break;

    case "done":
        markDone(Number(args[1]));
        break;

    default:
        console.log(`
Commands:
  node app.js add "Task name"
  node app.js list
  node app.js remove <id>
  node app.js update <id> "New task"
  node app.js done <id>
`);
}
