const express = require("express");
const { check } = require("express-validator");
const tasksController = require("../controllers/tasks-controller");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

// Middleware pour obtenir toutes les tâches
router.get("/", tasksController.createTask);

router.get("/:tid", tasksController.getTasksById);

router.get("/user/:uid", tasksController.getTasksByUserId);

//router.use(checkAuth);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 10 }),
    check("dueDate").not().isEmpty(),
  ],
  tasksController.createTask
);

router.patch("/:tid", tasksController.updateTask);

router.delete("/:tid", tasksController.deleteTask);

module.exports = router;
