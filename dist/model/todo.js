"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
class Todo {
    constructor(description, executeddate) {
        this.description = description;
        this.createddate = Date.now();
        this.executeddate = executeddate;
    }
}
exports.Todo = Todo;
