<template>
  <div class="container u-margin-top-large">
    <div class="row">
      <div class="col col--xs-12 u-text-align-left">
        <h1 class="u-color-muted u-font-weight-600 u-margin-bottom-medium">
          Hoşgeldin <b class="u-color-primary">Gürkan Köse !</b>
        </h1>
      </div>

      <div class="col col-12 col--2xl-12 u-padding-right@2xl-up u-margin-bottom">
        <form @submit.prevent="addNewTask">
          <Input
            v-model="todoInputModel"
            tag="input"
            input-element="input"
            input-type="text"
            :has-label-text="false"
            placeholder="Not Alın"
          />
        </form>
      </div>

      <div class="col col-12 col--2xl-12 u-padding-right@2xl-up u-margin-bottom-small@xl-down">
        <div class="u-display-flex u-justify-content-space-between u-align-items-center">
          <div>
            <h2 class="u-margin-0">Yapılacaklar</h2>
          </div>

          <div v-if="todoList.length >= 1">
            <v-select
              v-model="selectedFilter"
              :options="['Tümü', 'Tamamlanmışlar', 'Devam Edenler']"
              class="u-margin-right-small"
            />
          </div>
        </div>

        <ul v-if="todoList.length >= 1" class="o-todo-list">
          <ListItem
            v-for="item in todoList"
            :id="item.id"
            :key="item.id"
            :task-name="item.text"
            :is-done="item.isDone"
            @taskStatusChange="onTaskStatusChange"
            @taskDelete="onTaskDelete"
          />
        </ul>

        <div v-if="todoList.length < 1" class="u-margin-top">
          <svg-icon name="IconAlert" title="Uyarı" class="u-color-warning u-font-size-medium" />
          Yapılacaklar listesi boş
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'page',

  data() {
    return {
      selectedCategory: 'todoApp',

      selectedFilter: 'Tümü',

      todoInputModel: '',
      todoList: [],
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.finish();
    });
  },

  methods: {
    addNewTask(e) {
      e.preventDefault();

      if (this.todoInputModel == '') {
        return;
      }
      console.log('Eklendi');

      let newTask = {
        id: this.todoInputModel + this.todoList.length,
        text: this.todoInputModel,
        isDone: false,
      };

      this.todoList.push(newTask);
      console.log(this.todoList);
      this.todoInputModel = '';
    },

    onTaskStatusChange(id, status) {
      console.log('Değişim yapılacak id ve durum: ' + id, status);
      let item = this.todoList.find(i => i.id == id);
      console.log('Değişim yapılacak item: ' + item);

      if (item) {
        item.isDone = status;
      }

      console.log('Değişim sonrası itemlist: ' + this.todoList);
    },

    onTaskDelete(id) {
      console.log(id);

      let index = this.todoList.findIndex(i => i.id == id);
      console.log('Silinmek istenen index: ' + index);
      if (index > -1) {
        this.todoList.splice(index, 1);
      }

      console.log(this.todoList);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/abstracts/index';

.o-todo-list {
  @include list-unstyled();
}
</style>
