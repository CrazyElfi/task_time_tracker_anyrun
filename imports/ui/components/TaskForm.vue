<template>
  <form class="new-task" @submit.prevent="handleSubmit">
    <input
        id="input"
        type="text"
        placeholder="Type to add new tasks"
        v-model="newTask"
    />
    <button type="submit">Add Task</button>
  </form>
</template>

<script>
import Vue from "vue";
import { TasksCollection } from "../../api/TasksCollection";

export default {
  data() {
    return {
      newTask: ""
    }
  },
  methods: {
    handleSubmit(event) {
      TasksCollection.insert({
        text: this.newTask,
        timer: "00-00-00",
        createdAt: new Date() // current time
      });

      // Clear form
      this.newTask = "";
    }
  },
}
</script>
<style scoped>
.new-task {
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.new-task >  button {
  width: 8vw;
  background-color: #402caf;
  color: #FFFFFF;
  border: none;
  height: 30px;
  font-weight: bold;
}
#input {
  width: 40vw;
  height: 20px;
  padding: 4px;
}
</style>
