import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name, nickName, value, options) => {
    return cookies.set(name, nickName, value, { ...options });
}

export const getCookie = (name) => {
    return cookies.get(name);
}
export const getNickName = (nickName) => {
    return cookies.get(nickName);
}

