import { check } from 'meteor/check';
import { TasksCollection } from './db/TasksCollection'

Meteor.methods({
    'tasks.insert'(text) {
        check(text, String);
        if (!this.userId) {
            throw new Meteor.Error('not authorized')
        }
        TasksCollection.insert({
            text,
            userId: this.userId,
            createdAt: new Date()

        })
    },
    'tasks.remove'(taskId) {
        check(taskId, String);
        if (!this.userId) {
            throw new Meteor.Error('not authorized')
        }
        const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

        if (!task) {
            throw new Meteor.Error('Access denied.');
        }

        TasksCollection.remove(taskId);
    },
    'tasks.setIsChecked'(taskId, isCheckd) {
        check(taskId, String)
        check(isCheckd, Boolean)
        if (!this.userId) {
            throw new Meteor.Error('not authorized')
        }
        TasksCollection.update({ _id: taskId }, {
            set: {
                isCheckd
            }

        })
    },

})