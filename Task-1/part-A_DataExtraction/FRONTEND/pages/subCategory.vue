<template>

</template>

<script>
export default {
  data() {
    return {
      name: "subCategory",
      loading: false,
      mainCategory: null,
      mainCategoryRoute: null,
      error: null,
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData()
      },
      { immediate: true }
    )
  },
  methods: {
    async fetchData() {
      this.error = this.mainCategory = null
      this.loading = true
      this.mainCategoryRoute = this.$route.params.mainCategory.url.uri
      await this.$axios.get(
        "/category" + this.mainCategoryRoute,
        (err, mainCategory) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.mainCategory = mainCategory
        }
      }).then(data=>{
        console.log(data)
      }).catch(err => console.log(err))
    },
  }

}
</script>

<style scoped>

</style>
