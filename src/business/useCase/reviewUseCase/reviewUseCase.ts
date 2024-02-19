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
};
