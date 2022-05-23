<template>
  <v-row>
    <v-col class="text-center">

        <v-data-table
          :headers="headers"
          :items="categories"
          :items-per-page="10"
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
        There is no "DK-id" attribute for selected row
      </v-snackbar>

    </v-col>
  </v-row>
</template>

<script>

export default {
  data () {
    return {
      name: 'CategoryPage',
      headers: [
        { text: 'DK-link',sortable: false, value: 'url.uri' },
        { text: 'local link',sortable: false, value: 'url.uri' },
        { text: 'code (string)',sortable: false, value: 'code' },
        { text: 'title',sortable: false, value: 'title_fa' },
        { text: 'DK-id (int)', value: 'DK_id' },
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
        })
        .catch(err => console.log(err))

    },
    handleRowClick(selectedRowData,selectedRow){
      if (selectedRowData.DK_id == null){
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
