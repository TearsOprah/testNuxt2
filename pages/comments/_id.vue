<template>
  <div>
    <div v-if="!comment">
      <p>Такого комментария нет</p>
      <a href="/">На главную</a>
    </div>

    <h1 v-if="comment">Комментарий {{ comment.id }}</h1>
    <p v-if="comment">{{ comment.name }}</p>
    <p v-if="comment">{{ comment.email }}</p>
    <p v-if="comment">{{ comment.body }}</p>
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
    } finally {
      console.log('закончил')
    }
  },
};
</script>
