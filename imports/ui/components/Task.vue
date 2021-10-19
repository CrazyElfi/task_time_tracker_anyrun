<template>
  <li class="list_item_wrapper"
      v-bind:class="taskClassName">
    <input
        type="checkbox"
        readOnly
        v-bind:checked="!!this.task.checked"
        @click="toggleChecked"
    />

    <div class="task">
      {{ task.text }}
    </div>

    <div class="actions">
      <div class="timer">{{ task.timer }}</div>
      <button
          class="btn btn-start"
          @click="onStartTimer"
      >
        Start
      </button>

      <button
          class="btn btn-stop"
          @click="onPauseTimer"
      >
        Pause
      </button>
      <button class="btn btn-delete"
              @click="deleteThisTask">x
      </button>
    </div>
  </li>
</template>

<script>
import { TasksCollection } from '../../api/TasksCollection'

export default {
  props: ['task'],
  data () {
    return {}
  },
  computed: {
    taskClassName: function () {
      return this.task.checked ? 'checked' : ''
    },
  },
  methods: {
    toggleChecked () {
      // Set the checked property to the opposite of its current value
      TasksCollection.update(this.task._id, {
        $set: { checked: !this.task.checked },
      })
    },
    updateThisTask () {
      // TasksCollection.update(this.task._id, {
      //   $set: { timer: '00-00-00' }
      // })
    },
    deleteThisTask () {
      TasksCollection.remove(this.task._id)
    },
    onStartTimer () {
      console.log('start')

    },
    onPauseTimer () {
      console.log('Pause')
    },
  },
}
</script>

<style lang="css" scoped>
.list_item_wrapper {
  border: 1px solid #402caf;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px 15px;
  border-radius: 10px;
  width: 70vw;
  position: relative;
}

.list_item_wrapper > .task {
  font-weight: bold;
  margin-right: 10px;
}

.actions {
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  right: 10px;
}

.timer {
  margin-right: 5px;
}

.btn {
  border: none;
  cursor: pointer;
  border-radius: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 10px;
  color: #FFFFFF;
  font-weight: bold
}

.btn-start {
  background-color: #7bd782;
  border: 1px solid #7bd782;
}

.btn-start:hover {
  background-color: #01d00f
}

.btn-stop {
  background-color: transparent;
  border: 1px solid #fc5c65;
  color: #fc5c65;
}

.btn-stop:hover {
  background-color: #fc5c65;
  color: #FFFFFF;
  border: none
}

.btn-delete {
  background-color: #fc5c65
}

.btn-delete:hover {
  background-color: #ff0411
}
</style>
