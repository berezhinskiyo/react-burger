
export function getCookie  (name : string) : string|undefined{
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
export function getToken()  : string|null{
    const token = getCookie("accessToken")
    return token ? token.split(' ')[1] : null;
}
type TProp = {
   [id: string]: any;
  };
export function setCookie(name: string, value: string|null, props: TProp  = {}) {
    props = {
        path: "/",
        ...props
    };
    let exp = props.expires;
    if (typeof exp === 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = d;
        props.expires = exp.toUTCString();
    }
    if (exp  && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = (typeof value === "string")? encodeURIComponent(value) : "";
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
            const propValue = props[propName as keyof typeof props];
            if (propValue !== true) {
                updatedCookie += '=' + propValue;
            }
    }
    document.cookie = updatedCookie;
}

export function deleteCookie( name: string) {
    setCookie(name, null, { expires: -1 });
}