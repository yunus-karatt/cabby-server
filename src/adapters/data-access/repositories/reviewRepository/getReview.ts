import Review from "../../models/reviewModel"

export default {
  getReviewForDriver:async(driverId:string)=>{
    try {
      return await Review.find({driverId}).populate('userId')
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}