<template>
  <div>
  <v-card>
      <v-card-title>
          محصولات دسته بندی {{ title }}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
    <v-data-table
      :headers="headers"
      v-bind:items="products"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      loading-text="لطفا شکیبا باشید"
      :loading="loading"
      :search="search"
      class="elevation-1"
    ></v-data-table>
  </v-card>
    <div class="text-center pt-2">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination
                v-model="page"
                class="my-4"
                :length="10"
                @previous="updateTable"
                @next="updateTable"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      name: "products",
      title:"loading...",
      loading: false,
      subCategory: null,
      products: [],
      error: null,
      search: '',
      page: 1,
      updatedPage: 0,
      pageCount: 100,
      itemsPerPage: 20,
      headers: [
        { text: 'modify_date', value: 'modify_date' },
        { text: 'Link',sortable: false, value: 'url.uri' },
        { text: 'rating (count)', value: 'rating.count' },
        { text: 'rating (score)', value: 'rating.rate' },
        { text: 'status', value: 'status' },
        { text: 'title_fa',sortable: false, value: 'title_fa' },
        { text: 'DK_ID', value: 'DK_ID' },
      ],
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
      console.log(this.page)

      this.error = this.subCategory = null
      this.loading = true
      this.subCategory = this.$route.params.subCategory
      this.page = this.$route.query.page
      this.title = this.subCategory.title_fa
      await this.$axios.post(
        "/category/fetch_products",
        {"data": {"code": this.subCategory.code, "page": this.page}},
        (err, _) => {
          if (err) {
            this.error = err.toString()
          }
        }).then(response=>{
        this.products = response.data
        this.loading = false
      }).catch(err => console.log(err))
    },updateTable(value){
      this.$router.push({
        name: "products",
        query: {
          page: value,
        },
        params: {
          subCategory: this.subCategory,
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
