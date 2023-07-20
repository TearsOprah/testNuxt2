<template>
  <div class="comments">
    <!-- Заголовок страницы -->
    <h1 class="comments__title">Тестовое задание</h1>

    <!-- Таблица комментариев -->
    <CommentsList :comments="comments" @sort-by-id="sortById" />

    <!-- Навигация по станицам-->
    <Pagination :currentPage="store.currentPage" :hasMoreComments="comments.length >= 10" :comments="comments"
                @prev-page="prevPage" @next-page="nextPage" />
  </div>
</template>

<script>
import store from '@/store/index.js';
import Pagination from '../components/Pagination.vue';
import CommentsList from "@/components/CommentsList.vue";
export default {
  name: 'IndexPage',
  components: {
    Pagination,
    CommentsList,
  },
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

    // Загрузка комментариев с сервера
    async fetchComments() {
      try {
        this.comments = await this.$axios.$get(`comments?_sort=id&_order=${this.store.sortOrder}&_page=${this.store.currentPage}&_limit=${this.perPage}`);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
        this.comments = [];
      }
    },

    // Переход на предыдущую страницу комментариев
    async prevPage() {
      if (this.store.currentPage > 1) {
        this.store.currentPage--;
        await this.fetchComments();
      }
    },

    // Переход на следующую страницу комментариев
    async nextPage() {
      this.store.currentPage++;
      await this.fetchComments();
    },

    // обработка сортировки по клику на заголовок "ID"
    sortById() {
      if (this.store.sortOrder === 'asc') {
        this.store.sortOrder = 'desc';
      } else {
        this.store.sortOrder = 'asc';
      }
      this.store.currentPage = 1; // сбросить текущую страницу на 1 при изменении фильтра
      this.fetchComments();
    },
  },
};
</script>

<style>

</style>
