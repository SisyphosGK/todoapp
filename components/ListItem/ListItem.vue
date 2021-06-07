<template>
  <li class="c-list-item" :class="{ done: isDone }">
    <input
      :id="idComputed"
      type="checkbox"
      class="c-list-item__checkbox"
      :checked="isDone"
      @change="changeTaskStatus"
    />

    <label :for="idComputed"></label>

    <div class="u-margin-left">
      {{ taskName }} <br />
      <small class="u-text-small"> {{ date }}</small>
    </div>

    <span class="c-list-item__delete" @click="deleteTask"></span>
  </li>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
    taskName: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '04.06.2021',
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    idComputed() {
      return `item-${this.id}`;
    },
  },

  methods: {
    changeTaskStatus(e) {
      const checked = e.target.checked;
      this.$emit('taskStatusChange', this.id, checked);
    },

    deleteTask(e) {
      this.$emit('taskDelete', this.id);
    },
  },
};
</script>

<style lang="scss">
@import './ListItem';
</style>
