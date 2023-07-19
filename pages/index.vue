<template>
  <div>
    <h1>Тестовое задание</h1>

    <label for="sortSelect">Сортировать по:</label>
    <select id="sortSelect" v-model="store.sortOrder" @change="onSortOrderChange">
      <option value="asc">По возрастанию</option>
      <option value="desc">По убыванию</option>
    </select>

    <ul>
      <li v-for="comment in comments" :key="comment.id" @click="goToComment(comment.id)">
        <p>{{ comment.name }}</p>
      </li>
    </ul>

    <button @click="prevPage" :disabled="store.currentPage === 1">Предыдущая</button>
    <button @click="nextPage" :disabled="comments.length < 10">Следующая</button>
  </div>
</template>

<script>
import store from '@/store/index.js';

export default {
  name: 'IndexPage',
  computed: {
    store() {
      return store
    }
  },
  data() {
    return {
      comments: [],
      perPage: 10,
    };
  },

  async created() {
    await this.fetchComments(); // вызываем метод при создании компонента
  },

  methods: {
    goToComment(commentId) {
      this.$router.push(`/comments/${commentId}`);
    },

    async fetchComments() {
      try {
        this.comments = await this.$axios.$get(`comments?_sort=id&_order=${this.store.sortOrder}&_page=${this.store.currentPage}&_limit=${this.perPage}`);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
        this.comments = [];
      }
    },

    async prevPage() {
      if (this.store.currentPage > 1) {
        this.store.currentPage--;
        await this.fetchComments();
      }
    },

    async nextPage() {
      this.store.currentPage++;
      await this.fetchComments();
    },

    onSortOrderChange() {
      this.store.currentPage = 1; // сбросить текущую страницу на 1 при изменении фильтра
      this.fetchComments();
    },
  },
};
</script>
