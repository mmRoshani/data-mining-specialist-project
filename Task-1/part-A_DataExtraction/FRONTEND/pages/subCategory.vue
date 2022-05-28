<template>
  <v-row>
    <v-col class="text-center">
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
          :items="subCategories"
          :loading="loading"
          loading-text="لطفا شکیبا باشید"
          :search="search"
          @click:row="handleRowClick"
        ></v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      name: "subCategory",
      title: "loading...",
      loading: false,
      mainCategory: null,
      subCategories: [],
      error: null,
      search: "",
      headers: [
        { text: "modify_date", value: "modify_date" },
        { text: "Link", sortable: false, value: "url.uri" },
        { text: "products_count", value: "products_count" },
        { text: "code", value: "code" },
        { text: "title_fa", sortable: false, value: "title_fa" },
        { text: "DK_ID", value: "DK_ID" },
      ],
    };
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData();
      },
      { immediate: true }
    );
  },
  methods: {
    async fetchData() {
      this.error = this.mainCategory = null;
      this.loading = true;
      this.mainCategory = this.$route.params.mainCategory;

      await this.$axios
        .post(
          "/category/main",
          { data: { code: this.mainCategory.code, page: 5 } },
          (err, _) => {
            if (err) {
              this.error = err.toString();
            }
          }
        )
        .then((response) => {
          this.subCategories = response.data;
          this.title = this.mainCategory.title_fa;
          this.loading = false;
        })
        .catch((err) => console.log(err));
    },
    handleRowClick(selectedRowData, selectedRow) {
      if (selectedRowData.code == null) {
        this.snackbar = true;
      } else {
        this.$router.push({
          name: "products",
          params: {
            subCategory: selectedRowData,
          },
        });
      }
    },
  },
};
</script>

<style scoped>
</style>
