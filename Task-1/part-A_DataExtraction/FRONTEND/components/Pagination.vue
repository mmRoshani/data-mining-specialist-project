<template>
 <div>
   <div class="v-pagination-row">
     <button 
     class="v-pagination__more"
      @click="increment"
     >&lt</button>
     <span v-for="(item,index) in new Array(20)">
       <button
         class="v-pagination__item"
       >{{index + 1}}</button>
     </span>
     <button class="v-pagination__more">&gt</button>
   </div>
   <slot :pageNumber="pageNumber"/>
 </div>
</template> 

<script>
export default {
  data() {
  return {
    name: "Pagination",
    PageNumber: 1
    }
  },
  methods: {
    increment(){
      if (this.pageNumber > 1){
        this.$store.state.pagination.increment()
      }
    }
  }
}
</script>

<style scoped>
.v-pagination-row{
  padding: 5px 0 ;
}
</style>
