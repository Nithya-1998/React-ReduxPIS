import Axios from "axios";

class LoginTest {
    apiUserId = () => {
        return Axios.get('http://localhost:3000/login').then((res) => {
            return res.data;
        })
    }
    apiPassword = () => {
        return Axios.get('http://localhost:3000/login').then((res) => {
            return res.data;
        })
    }

}
export default LoginTest;