const HttpError = require("../util/http-error"); // Assurez-vous que le chemin d'accès est correct
const { validationResult } = require("express-validator");

const Task = require("../models/task");

const uuid = require("uuid");
const DUMMY_TASKS = [
  {
    id: "t1",
    title: "Acheter du lait",
    description: "Acheter du lait au supermarché",
    dueDate: "2024-04-15",
    priority: "haute",
    assignee: "u1",
  },
];

const getTasks = (req, res, next) => {
  res.json({ tasks: DUMMY_TASKS });
};

const getTasksById = async (req, res, next) => {
  const taskId = req.params.tid;
  let task;
  try {
    task = await Task.findById(taskId);
  } catch (e) {
    console.log(e);
    const err = new HttpError("Une erreur DB est survenue", 500);
    return next(err);
  }

  if (!task) {
    return next(new HttpError("Tache non trouvée", 404));
  }

  res.json({ task: task.toObject({ getter: true }) });
};

const getTasksByUserId = async (req, res, next) => {
  const userId = req.params.uid; // Récupère l'ID utilisateur de l'URL

  let tasksForUser;
  try {
    tasksForUser = await Task.find({ assignee: userId });
  } catch (e) {
    console.log(e);
    const err = new HttpError("Une Erreur BD est survenue", 500);
    return next(err);
  }

  if (tasksForUser?.length === 0) {
    return next(new HttpError("Utilisateur non trouvé", 404));
  }

  res.json({
    tasks: tasksForUser.map((task) => task.toObject({ getters: true })),
  });
};

//POST
const createTask = async (req, res, next) => {
  const { title, description, dueDate, priority, assignee } = req.body;

  const createdTask = new Task({
    title,
    description,
    dueDate,
    priority,
    assignee,
  });

  try {
    await createdTask.save();
  } catch (e) {
    const err = new HttpError("création BD en erreur", 500);
    return next(err);
  }
  res.status(201).json({ task: createdTask });
};
//PUT
const updateTask = (req, res, next) => {
  const { title, description } = req.body;
  const taskId = req.params.tid;
  // nous prenons une copie de la tâche a modifier, la modifierons et ensuite nous nettrons
  // la tâche dans la liste. Ceci nous protège en cas d'erreur...
  const updatedTask = { ...DUMMY_TASKS.find((t) => t.id === taskId) };
  const taskIndex = DUMMY_TASKS.findIndex((t) => t.id === taskId);
  if (title) updatedTask.title = title;
  if (description) updatedTask.description = description;
  if (dueDate) updatedTask.dueDate = dueDate;
  if (priority) updatedTask.priority = priority;

  DUMMY_TASKS[taskIndex] = updatedTask;

  res.status(200).json({ task: updatedTask });
};

//DELETE
const deleteTask = (req, res, next) => {
  const taskId = req.params.tid;
  DUMMY_TASKS = DUMMY_TASKS.filter((t) => t.id !== taskId);
  res.status(200).json({ message: "Deleted task." });
};

exports.getTasks = getTasks;
exports.getTasksById = getTasksById;
exports.getTasksByUserId = getTasksByUserId;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
