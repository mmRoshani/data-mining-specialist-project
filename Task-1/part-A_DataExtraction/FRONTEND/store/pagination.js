export const state = () => ({
    pageNumber: 1
})

export const mutations = {
    incrementPageNumber(state){
        console.log("paginationUpdate")
        state.pageNumber++
    },
    decrementPageNumber(state){
        console.log("paginationUpdate")
        state.pageNumber--
    }
}