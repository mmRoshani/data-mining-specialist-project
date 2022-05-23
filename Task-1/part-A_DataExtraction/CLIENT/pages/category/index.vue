<template>
  <button>Show message from backend</button>
</template>

<script>
export default {
  methods: {
    async getAllMainCategories() {
      try {
        const response = await this.$axios.get("/category");
        console.log("**data:");
        console.log(response);
      } catch (err) {
        console.log("**error:");
        console.log(err);
      }
    },
  },
  beforeMount() {
    this.getAllMainCategories();
  },
};
</script>
