
import { AxiosInstance } from "axios";
import axiosInstance from "../../http/client/axios.client";

type IFoodRepo = {
    // add types
    getAll: () => Promise<object>;
    getByType: (type: string) => Promise<object>;
}

export function FoodRepo(axios: AxiosInstance): IFoodRepo {
    return {
        getAll: async () => {
            try {
                return (await axios.get('/all')).data
            }
            catch (err) {
                console.log(err)
            }
        }
        ,
        getByType: async (type: string) => {
            try {
                return (await axios.get(`${type}`)).data
            }
            catch (err) {
                console.log(err)
            }
        }
    }
}

export default FoodRepo(axiosInstance)