import dataModel from "../../models/DataModel.js";
const buy_quantity = async (req, res) => {
  try {
    const { cropName, cropQuantity } = req.body;
    if (cropName && cropQuantity) {
      const crop_get = await dataModel.find({
        cropName, cropQuantity: { $gte: cropQuantity }
      })
      if (crop_get.length > 0) {
        return res
          .status(200)
          .json({
            message: "we got the details",
            crop_get
          })
      }
      else {
        return res
          .status(400)
          .json({
            message: "no data found"
          })
      }
    }
    else {
      return res
        .status(400)
        .json({
          message: "fill all the credentials"
        })
    }
  }
  catch (e) {
    console.log(e)
    return res
      .status(400)
      .json({
        message: "internal error occures"
      })
  }
}
export default buy_quantity