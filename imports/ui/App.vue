<template>
  <div id="app">
    <header>
          <h1>
            Time Tracker
          </h1>
    </header>
    <div class="main">
      <TaskForm />

      <ul class="tasks">
        <Task
            class="task"
            v-for="task in tasks"
            v-bind:key="task._id"
            v-bind:task="task"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Task from "./components/Task.vue";
import TaskForm from "./components/TaskForm.vue";
import { TasksCollection } from "../api/TasksCollection";
export default {
  components: {
    Task,
    TaskForm
  },
  data() {
    return {
      hideCompleted: false
    };
  },
  methods: {
    toggleHideCompleted() {
      this.hideCompleted = !this.hideCompleted;
    }
  },
  meteor: {
    tasks() {
      let filteredTasks = TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch();

      if (this.hideCompleted) {
        filteredTasks = filteredTasks.filter(task => !task.checked);
      }

      return filteredTasks;
    },
    incompleteCount() {
      return TasksCollection.find({ checked: { $ne: true } }).count();
    }
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
