import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';

const insertTask = obj =>  {

  TasksCollection.insert({
    text: obj.text,
    timer: obj.timer
  })
};

Meteor.startup(() => {
  if (TasksCollection.find().count() === 0) {
    [
      {
        text: 'Add new topic on this page',
        timer: '00-00-00'
      },
      {
        text: 'Add second topic on this page',
        timer: '00-00-00'
      },
    ].forEach(insertTask);
  }
});
