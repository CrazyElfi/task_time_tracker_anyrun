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
      <div class="timer">
        <span v-if="timePassed !== null">{{ formattedTime }} </span>
        <span v-else>{{ "00:00:00" }}</span>
      </div>

      <button
          class="btn btn-start"
          @click="startTimer"
      >
        Start
      </button>

      <button
          class="btn btn-pause"
          @click="pauseTimer"
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
import {TasksCollection} from '../../api/TasksCollection'

function querySelector(s) {

}

export default {
  props: ['task'],
  data() {
    return {
      timerTask: '',
      startDate: null,
      timePassed: null,
      interval: null
    }
  },
  computed: {
    taskClassName: function () {
      return this.task.checked ? 'checked' : ''
    },
    formattedTime: function () {
      let durationTask
      if (this.timePassed) {
        durationTask = Math.abs((this.timePassed / 1000).toFixed(0))
        let hours = Math.floor(durationTask / 3600) % 24
        hours = (hours < 10) ? "0" + hours : hours

        let minutes = Math.floor(durationTask / 60) % 60;
        minutes = (minutes < 10) ? "0" + minutes : minutes;

        let seconds = durationTask % 60;
        seconds = (seconds < 10) ? "0" + seconds : seconds

        return `${hours}:${minutes}:${seconds}`
      }
      return 0
    }
  },
  methods: {
    toggleChecked() {
      // Set the checked property to the opposite of its current value
      TasksCollection.update(this.task._id, {
        $set: {checked: !this.task.checked},
      })
    },
    updateThisTask() {
      // TasksCollection.update(this.task._id, {
      //   $set: { timer: '00-00-00' }
      // })
    },
    deleteThisTask() {
      TasksCollection.remove(this.task._id)
    },
    // startTimer() {
    //   this.startDate = new Date();
    //   console.log("startDate in getSeconds", this.startDate)
    //
    //   this.interval = setInterval(element => {
    //     const currentDate = new Date()
    //
    //     if(this.timePassed) {
    //       console.log("if")
    //       this.timePassed = this.timePassed + currentDate.getTime() - this.startDate.getTime();
    //     }
    //
    //     this.timePassed = currentDate.getTime() - this.startDate.getTime();
    //
    //   }, 1000)
    // },
    pauseTimer() {
      clearInterval(this.interval)
    },
    startTimer() {
      if(this.startDate) {
        let start = new Date().getTime() - this.timePassed
        this.startDate = new Date(start)
      } else {
        this.startDate = new Date()
      }
      this.interval = setInterval(() => {
        let currentDate = new Date()
        this.timePassed = currentDate.getTime() - this.startDate.getTime()
      }, 1000)
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

.btn-pause {
  background-color: transparent;
  border: 1px solid #402caf;
  color: #402caf;
}

.btn-pause:hover {
  background-color: #402caf;
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
