<template>
  <div>
    <p v-if="!comment">Такого комментария нет</p>

    <h1 v-if="comment">Комментарий {{ comment.id }}</h1>
    <p v-if="comment">{{ comment.name }}</p>
    <p v-if="comment">{{ comment.email }}</p>
    <p v-if="comment">{{ comment.body }}</p>

    <router-link to="/">На главную</router-link>
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
