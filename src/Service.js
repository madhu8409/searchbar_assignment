import { ApiHelper } from "./ApiHelper";
import { BASE_URL } from './ApiHelper';


const apiHelper = new ApiHelper();


export class AccessProductServices {
    getAllProducts(searchQuery){
        const uri =`${BASE_URL}/v6/search/eb17a931b1ab4950928cabbf42527715/?q=${searchQuery}&size=6&suggestions=1&maxSuggestions=6`;
        return apiHelper.get(uri);
    }
  }
 

