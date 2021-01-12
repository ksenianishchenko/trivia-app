import IApiService from "../abstractions/api/service/apiService";
import { LocalApiService } from "../modules/api/service/localApiService";

const apiService: IApiService = new LocalApiService();

export default apiService;