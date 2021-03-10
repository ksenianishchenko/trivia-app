import IApiService from "../abstractions/api/service/apiService";
import { LocalApiService } from "../modules/api/service/localApiService";
import { RestApiService } from "../modules/api/service/restApiService";

const apiService: IApiService = new RestApiService();

export default apiService;