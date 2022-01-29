import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            userEndpoint + payload._id,
            payload
        );
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(
            userEndpoint + localStorageService.getUserId()
        );
        return data;
    },
    update: async (payload) => {
        console.log("PAYLOAD_userService:", payload);
        console.log(
            "userEndpoint + localStorageService.getUserId():",
            userEndpoint + localStorageService.getUserId()
        );
        console.log("userEndpoint + payload._id:", userEndpoint + payload._id);
        const { data } = await httpService.patch(
            userEndpoint + payload._id,
            payload
        );
        return data;
    }
};
export default userService;
