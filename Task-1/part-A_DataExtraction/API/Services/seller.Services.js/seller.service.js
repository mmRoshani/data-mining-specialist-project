let Seller = require("../../models/Seller")

const sellerExistence = async  (seller) => {
    if (!seller)
        return  null

    let fetchedSeller = await Seller.findOne({DK_ID: seller.id})

    if(!fetchedSeller){
        let _newSeller = new Seller({date_modify: Date.now(),DK_ID: seller.id, ...seller})
        await _newSeller.save()
            .catch(err => console.log(err))
    }

    return await Seller.findOne({DK_ID: seller.id}).exec()

}

module.exports = {
    sellerExistence
}