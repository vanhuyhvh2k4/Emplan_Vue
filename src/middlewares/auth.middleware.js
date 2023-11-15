import Cookies from "js-cookie";

const requireAuth = (to, from, next) => {
    const token = Cookies.get("gid");
    if(token) {
        next();
    } else {
        next({name: 'login'});
    }
};

export default requireAuth;