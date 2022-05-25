<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
      </v-card>
      <v-card>
        <v-card-title class="headline justify-center">
          <h3>
            دیتاست دیجی کالا
          </h3>
        </v-card-title>
        <v-card-text>
          <hr class="my-3">
          <p>این دیتا ست  به صورت زیر ارایه می گردد:<br></p>
          <ul class="pr-4 pl-4">
            <li>
              <h5>
                DK-Data
              </h5>
              <p class="justify-center">
                اطلاعات ابتدا از دیجی کالا استخراج شده و سپس در دیتابیس ما ذخیره شده است. شما می توانید از طریق API ما به این اطلاعات دسترسی داشته باشید. دقت کنید که این اطلاعات با کمی تاخیر نسبت به تغییرات دیجی کالا بروز رسانی می گردند.
              </p>
              <p>
                در زیر نمودار استخراج محصولات بر حسب تاریخ را مشاهده می کنید:
              </p>
            </li>
          </ul>

          <div class="ma-10">
            <v-card
              class="mt-4 mx-auto"
              max-width="400"
            >
              <v-sheet
                class="v-sheet--offset mx-auto"
                color="cyan"
                elevation="12"
                max-width="calc(100% - 32px)"
              >
                <v-sparkline
                  :labels="labels"
                  :value="value"
                  color="white"
                  line-width="3"
                  padding="16"
                  stroke-linecap="round"
                  smooth
                ></v-sparkline>
              </v-sheet>

              <v-card-text class="pt-0">
                <v-divider class="my-2"></v-divider>
                <v-icon
                  class="mr-2"
                  small
                >
                  mdi-clock
                </v-icon>
                <span class="text-caption grey--text font-weight-light">last registration on {{labels[labels.length-1]}}</span>
              </v-card-text>
            </v-card>

          </div>

          <p>
            برای اطلاعات بیشتر: <a
              href="https://vuetifyjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation
            </a>.
          </p>
          <p>
            ارتباط با توسعه دهنده: <a
              href="https://github.com/MohammadMojtabaRoshani-TOMaaR"
              target="_blank"
              rel="noopener noreferrer"
              title="contribute"
            >
              Github
            </a>.
          </p>
          <hr class="my-3">

        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/category"
          >
            ادامه
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    name: 'IndexPage',
    labels: [],
    value: [],
  }),
  methods:{
    async fetchSparklineData(){
      await this.$axios.get("/")
        .then( (response) => {
          this.labels = response.data.labels
          this.value = response.data.value
        })
        .catch(err => console.log(err))
    }
  },
  created() {
    this.fetchSparklineData()
  }
}
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
