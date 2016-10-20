/**
 *  myutils 我的小工具集
 *
 */

/**
 * 微信版本本地无openid，
 * @returns {boolean} true(需要去腾讯取下openid了),false
 */
function wxNoOpenid(){
    //如果是微信版，openid没有，去转一圈，取个openid
    if(_ClientInfo.cli===3){
        var clientInfo=window.JSON.parse(window.localStorage.getItem(CLIENT_INFO));
        if(clientInfo){
            if(isblank(clientInfo.openid))
                return true;
        } else {
            return true;
        }
    }
    return false;
}
