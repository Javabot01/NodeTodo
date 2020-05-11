// jshint esversion:10
const request = require('supertest');
const { app } = require('./../app');
const { Task } = require('./../models/task');
describe('Todo CRUD API', () => {
    test('It should be true', () => {
        expect(true).toBe(true);
    });
    test('Read Todos', async () => {
        const response = await request(app).get('/todo/all');
        expect(response.status).toBe(200);
        expect(typeof response.body).toBe('object');
        expect(Array.isArray(response.body)).toBe(true);
        expect(typeof response.body[0]).toBe('object');
        return;
    });
    test('Get One Todo', async () => {
        const task = await Task.findOne();
        console.log(task);

        if (!task) {
            return;
        }
        const response = await request(app).get(`/todo/one?id=${task.id}`);
        // console.log(response.status);
        expect(response.status).toBe(200);
        expect(typeof response.body).toBe('object');
        expect(task.name).toBe(response.body.name);
        expect(String(task.id)).toEqual(response.body._id);
    });
    test('Post Todo', async () => {
        const now = Date.now();
        const data = {
            name: `My test todo created at ${now}`
        };
        const response = await request(app).post('/todo/create').send(data);
        const todo = await Task.findOne({ name: data.name });
        expect(response.status).toBe(200);
        expect(typeof response.body).toBe('object');
        expect(todo.name).toBe(data.name);
        // await todo.remove();
    });
    // test('Delete Todo', async () => {
    //     const task = await Task.findOne();
    //     // console.log(task);
    //     const response = await request(app).delete(`/todo/delete/${task.id}`);
    //     expect(response.status).toBe(200);
    //     expect(typeof response.body).toBe('object');
    // });
    // test('Update Todo', async () => {
    //     const task = await Task.findOne();
    //     console.log(task);

    //     if (!task) {
    //         return;
    //     }

    //     const data = {
    //         name: `My test todo recreated at `
    //     };
    //     const response = await request(app).patch(`/todo/update/${task.id}`, data, { new: true });
    //     const todo = await Task.findOne({ name: data.name });
    //     expect(response.status).toBe(201);
    //     expect(typeof response.body).toBe('object');
    //     expect(todo.name).toBe(data.name);
    // });
});