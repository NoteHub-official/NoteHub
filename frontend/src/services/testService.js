import api from "@/services/api";

export default {
    register () {
        return api.post('status', {name: "Brian Yin "});
    }
}