<template>
  <v-row>
    <v-col class="text-center">

        <v-data-table
          :headers="headers"
          :items="categories"
          :items-per-page="10"
          :loading="loading"
          loading-text="لطفا شکیبا باشید"
          class="elevation-1 mt-4"
          @click:row="handleRowClick"
        ></v-data-table>

      <v-snackbar
        :timeout="2600"
        v-model="snackbar"
        color="red accent-4"
        absolute
        rounded="pill"
        bottom
      >
        There is no "code" attribute for selected row
      </v-snackbar>

    </v-col>
  </v-row>
</template>

<script>

export default {
  data () {
    return {
      name: 'CategoryPage',
      loading: true,
      headers: [
        { text: 'modify date', value: 'modify_date' },
        { text: 'local link',sortable: false, value: 'url.uri' },
        { text: 'code (string)',sortable: false, value: 'code' },
        { text: 'title',sortable: false, value: 'title_fa' },
        { text: 'DK-ID (int)', value: 'DK_ID' },
      ],
      categories: [],
      snackbar: false,
      timeout: 2000,
    }
  },
  methods: {
    async getAllCategories(){
      await this.$axios.$get('/category')
        .then(data => {
          this.categories = data
          this.loading = false
        })
        .catch(err => console.log(err))

    },
    handleRowClick(selectedRowData,selectedRow){
      if (selectedRowData.DK_ID == null){
        this.snackbar = true
      }else {
        this.$router.push({
          name: "subCategory",
          params: {
            mainCategory: selectedRowData
          }
        })
      }
    }
  },
  created() {
    this.getAllCategories()
  }

}
</script>
