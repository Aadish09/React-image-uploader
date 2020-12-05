var axios = require("axios");
const instance = axios.create({
    baseURL:process.env.RURL
})

export default instance