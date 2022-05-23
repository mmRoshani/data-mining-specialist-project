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
            </li>
          </ul>
          <v-alert
            border="right"
            colored-border
            type="error"
            elevation="2"
          >
            <p>
              پروژه فوق تنها برای استفاده های آموزش ایجاد و پشتیبانی میگردد و مسولیت هر گونه سواستفاده بر عهده شخص استفاده کننده میباشد.
            </p>
          </v-alert>
          <v-alert
            border="bottom"
            colored-border
            type="warning"
            elevation="2"
          >
            <p>
              قبل از استفاده از این پروژه می بایست شما به عنوان کابر مجاز تشخیص داده شوید و در صورت تشخیص استفاده غیر مجاز ip شما بلاک می گرددو
            </p>
            <p>
              کاربران اصلی این سایت توسعه دهندگان ها هستند.
            </p>
          </v-alert>
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
            چنل دیسکورد:  <a
              href="https://chat.vuetifyjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="chat"
            >
              discord
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
            to="/inspire"
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
  name: 'IndexPage'
}
</script>
