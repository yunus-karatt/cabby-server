import { ReviewInterface } from "../../../../business/interfaces/comman";
import Review from "../../models/reviewModel";

export default{
  saveReview:async(data:ReviewInterface)=>{
    try {
      const review= new Review({...data})
      return await review.save()
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}