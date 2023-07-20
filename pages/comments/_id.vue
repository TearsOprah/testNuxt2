<template>
  <div class="comment">
    <div class="comment__info">
      <p v-if="!comment">Такого комментария нет</p>

      <p v-if="comment">Комментарий {{ comment.id }}</p>
      <p v-if="comment">Name: {{ comment.name }}</p>
      <p v-if="comment">Email: {{ comment.email }}</p>
      <p v-if="comment">Body: {{ comment.body }}</p>
    </div>
    <button class="primary-button" @click="goToHome">На главную</button>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    try {
      const commentId = params.id;
      const response = await $axios.$get(`comments/${commentId}`);
      return { comment: response };
    } catch (error) {
      console.error('Ошибка при получении комментария:', error);
      return { comment: null };
    }
  },
  methods: {
    goToHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style>

.comment {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: start;
}

.comment__info {
  background: #C5C6EF;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

</style>
