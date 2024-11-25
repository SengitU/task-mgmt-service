import { Router } from "express";

import createHandler from "./create";
import updateHandler from "./update";
import findAllByUserHandler from "./findAllByUser";

const taskRoute = Router();

/**
 * Task
 * @typedef {object} Task
 * @property {number} id - unique identifier generated via backend
 * @property {string} title - title of the task
 * @property {string} description - descriptionof the task
 * @property {string} status - status of task CLOSED | OPEN
 * @property {string} dueAt - due date of the task isoDate format
 * @property {string} createdAt - creation date of the task isoDate format
 */

/**
 * POST /task
 * @summary Creates a new task
 * @security JWT auth
 * @param {Task} request.body.required
 * @return {object} 201 - created task - application/json
 * @example response - 201 - created task example
 * { "id": 27, "title": "Test Task", "description": "Test task description", "status": "OPEN", "dueAt": "2024-11-26T00:00:00.000Z", "createdAt": "2024-11-25T22:12:06.232Z", "updatedAt": "2024-11-25T22:12:06.232Z", "authorId": 31}
 */
taskRoute.post("/task", createHandler);

/**
 * GET /task
 * @summary Get tasks for authenticated user
 * @security JWT auth
 * @param {string} searchTerm.path - Filters tasks by search term
 * @return {object} 200 - found tasks - application/json
 * @example response - 200 - list of tasks match the criteria
 * [{"id": 24,"title": "Search backend","description": "handle search term and dueAt on getAll endpoint","status": "OPEN","dueAt": "2024-11-25T00:00:00.000Z","createdAt": "2024-11-25T01:15:08.284Z","authorId": 31},{"id": 25,"title": "Search frontend","description": "parse dueAt ranges with date-fns","status": "OPEN","dueAt": "2024-11-25T00:00:00.000Z","createdAt": "2024-11-25T01:15:50.580Z","authorId": 31}]
 */
taskRoute.get("/task", findAllByUserHandler);

/**
 * PUT /task
 * @summary Update task, title, description, status and dueAt could be updated
 * @security JWT auth
 * @param {number} id.path - Id for task to change
 * @param {Task} request.body
 * @return {object} 200 - updated task - application/json
 * @example response - 200 - updated task example
 * [{"id": 24,"title": "Search backend","description": "handle search term and dueAt on getAll endpoint","status": "OPEN","dueAt": "2024-11-25T00:00:00.000Z","createdAt": "2024-11-25T01:15:08.284Z","authorId": 31},{"id": 25,"title": "Search frontend","description": "parse dueAt ranges with date-fns","status": "OPEN","dueAt": "2024-11-25T00:00:00.000Z","createdAt": "2024-11-25T01:15:50.580Z","authorId": 31}]
 */
taskRoute.put("/task/:taskId", updateHandler);

export default taskRoute;
