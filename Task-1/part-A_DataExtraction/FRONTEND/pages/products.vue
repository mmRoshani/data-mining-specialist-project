<template>
      <!--table-->
        <div>
      <v-card>
        <v-card-title>
          {{ title }}
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
          :items="products"
          :loading="loading"
          loading-text="لطفا شکیبا باشید"
          :search="search"
          @click:row="handleRowClick"
        ></v-data-table>
      </v-card>
      <!--table/-->
        <v-row
          class="mt-2"
          align="center"
          justify="center"
        >
          <span class="grey--text">در هر صفحه:</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="mr-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="ml-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="ml-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          </v-row>
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
      sortBy: 'DK_ID',
      page: 1,
      updatedPage: 0,
      itemsPerPage: 20,
      itemsPerPageArray: [20],
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
  computed: {
      numberOfPages () {
        return Math.ceil(this.products.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== 'Name')
      },
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
    },handleRowClick(selectedRowData,selectedRow){
      if (selectedRowData.code == null){
        this.snackbar = true
      }else {
        this.$router.push({
          name: "products",
          query: {
            page: 1,
          },
          params: {
            subCategory: selectedRowData,
          }
        })
      }
    },
    async nextPage () {
        this.page += 1
        await this.updateProducts()
      },
      formerPage () {
        this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
      async updateProducts(){
        this.loading = true
        await this.$axios.post(
        "/category/fetch_products",
        {"data": {"code": this.subCategory.code, "page": this.page}},
        (err, _) => {
          if (err) {
            this.error = err.toString()
          }
        }).then(response=>{
        this.products = this.products.concat(response.data)
        this.loading = false
      }).catch(err => console.log(err))
      }
  }
}
</script>

<style scoped>

</style>
