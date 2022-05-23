let axios = require("axios")
let Category = require("../../models/Category");


async function compareMain_DK_Route(){
    await axios.get("https://api.digikala.com/v1/")
        .then(response => {
            let categories = response.data.data.main_categories.categories

            categories.forEach(async item => {
//TODO: FIX UPDATE REPITED
                 await Category.findOne({DK_id: item.id},async function (err, category){
                    if (category){

                        await Object.defineProperty(item, DK_id, await Object.getOwnPropertyDescriptor(item, id));
                        delete item[id];

                        let equal =JSON.stringify(item) === JSON.stringify(category)
                        if (!equal){
                            await Category.deleteMany(
                                {DK_id: category.DK_id},
                                async function(err) {
                                    if (err){
                                        console.log(err)
                                    }else{
                                        const newCategory = Category(category)
                                        await newCategory.save().exec();
                                    }
                            })
                        }
                    }
                })
            })

        }).catch(err => console.log(err))
    return await Category.find({}).exec();
}

module.exports ={
    compareMain_DK_Route
}