import Dtamodelbuyer from "../../models/data_bid_buyer.js";
const cropNameBuyer = async (req, res, next) => {

    try {
        const { cropName } = req.body;

        if (cropName) {
            const findcrop = await Dtamodelbuyer.find({ cropName });
            if (!findcrop) {
                return res
                    .status(400)
                    .json({
                        message: "we could not find the crop"
                    }
                    )
            }
            else if (findcrop.length == 0) {
                return res
                    .status(400)
                    .json({
                        message: "we could not find the crop"
                    }
                    )

            }
            return res
                .status(200)
                .json({
                    message: "we got thr crop",
                    findcrop
                })

        }
        else {
            return res
                .status(400)
                .json({
                    message: "enter the cropname"
                })

        }


    }
    catch (e) {
        console.log(e);
        return res
            .status(400)
            .json({
                message: "internal servor error"
            })
    }
}
export default cropNameBuyer;