import getReview from "../../../adapters/data-access/repositories/reviewRepository/getReview";
import saveReview from "../../../adapters/data-access/repositories/reviewRepository/saveReview";
import { ReviewInterface } from "../../interfaces/comman";

export default {
  addNewReview: async (data: ReviewInterface) => {
    try {
      return await saveReview.saveReview(data);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getReviewForDriver:async (driverId:string)=>{
    try {
      return await getReview.getReviewForDriver(driverId)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
};
