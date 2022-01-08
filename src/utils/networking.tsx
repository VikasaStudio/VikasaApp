import CONFIG from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SetCookieParser from "set-cookie-parser"

const getParsedCookiesMap = function(response : Response) {
    console.log('---------- get parsed cookies map -------------')
    console.log('response headers : ',response);
    var combinedCookieHeader : any = response.headers.get('Set-Cookie');
    var splitCookieHeaders = SetCookieParser.splitCookiesString(combinedCookieHeader)
    var cookies = SetCookieParser.parse(splitCookieHeaders);
    var cookieMap = new Map<any, any>();
    console.log('cookies', cookies);
    cookies.forEach(cookie => {
        cookieMap.set(cookie.name, cookie);
    });
    return cookieMap;
}


/**
 * Taken from :  https://github.com/jshttp/cookie/blob/master/index.js
 * @param name 
 * @param val 
 * @param options 
 * @returns string
 */
const serializeCookie = function(name:string, val:string, options:any) {
    const fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    const pairSplitRegExp = /; */;

    var opt = options || {};
    var encode = encodeURIComponent;
    var enc = opt.encode || encode;

    if (typeof enc !== 'function') {
      throw new TypeError('option encode is invalid');
    }
  
    if (!fieldContentRegExp.test(name)) {
      throw new TypeError('argument name is invalid');
    }
  
    var value = enc(val);
  
    if (value && !fieldContentRegExp.test(value)) {
      throw new TypeError('argument val is invalid');
    }
  
    var str = name + '=' + value;
  
    if (null != opt.maxAge) {
      var maxAge = opt.maxAge - 0;
  
      if (isNaN(maxAge) || !isFinite(maxAge)) {
        throw new TypeError('option maxAge is invalid')
      }
  
      str += '; Max-Age=' + Math.floor(maxAge);
    }
  
    if (opt.domain) {
      if (!fieldContentRegExp.test(opt.domain)) {
        throw new TypeError('option domain is invalid');
      }
  
      str += '; Domain=' + opt.domain;
    }
  
    if (opt.path) {
      if (!fieldContentRegExp.test(opt.path)) {
        throw new TypeError('option path is invalid');
      }
  
      str += '; Path=' + opt.path;
    }
  
    if (opt.expires) {
      if (typeof opt.expires.toUTCString !== 'function') {
        throw new TypeError('option expires is invalid');
      }
  
      str += '; Expires=' + opt.expires.toUTCString();
    }
  
    if (opt.httpOnly) {
      str += '; HttpOnly';
    }
  
    if (opt.secure) {
      str += '; Secure';
    }
  
    if (opt.sameSite) {
      var sameSite = typeof opt.sameSite === 'string'
        ? opt.sameSite.toLowerCase() : opt.sameSite;
  
      switch (sameSite) {
        case true:
          str += '; SameSite=Strict';
          break;
        case 'lax':
          str += '; SameSite=Lax';
          break;
        case 'strict':
          str += '; SameSite=Strict';
          break;
        case 'none':
          str += '; SameSite=None';
          break;
        default:
          throw new TypeError('option sameSite is invalid');
      }
    }
  
    return str;
}


/**
 * 
 * @param username 
 * @param password 
 * @returns Promise
 * @summary Attempts Login via local-strategy, if success then it stores cookies otherwise throws relevant error message.
 */

export async function AttemptLocalLogin(username:string, password:string, globalContextValue : any) 
{
    console.log('Attempting Local Login');
    //check if any access token stored.
    var storedAccessTokenCookie = await AsyncStorage.getItem(CONFIG.SharedPreferenceKeys.AccessToken);
    var parsedAccessTokenCookie = null;
    if(storedAccessTokenCookie != null)
        parsedAccessTokenCookie = JSON.parse(storedAccessTokenCookie);
    
    console.log(`parsed AccessToken : ${parsedAccessTokenCookie}`)

    const header = new Headers({
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
    });

    if(parsedAccessTokenCookie)
    {
        var stringifiedCookie = serializeCookie(parsedAccessTokenCookie.name, parsedAccessTokenCookie.value, parsedAccessTokenCookie);
        header.append('Cookie', stringifiedCookie)
    }
    const res = await fetch(`${CONFIG.VikasaAPI}/auth/vendor/login`, {
        headers:header,
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "password": password,
            "strategy": "local"
        })
    }).catch(err=>{console.log(err)})
    if(!res)
        return;
    const responseJSON = await res.json();
    console.log(responseJSON)
    // Either user was already logged in or this is a new login.
    if(res.status == 200) {
        const cookies = getParsedCookiesMap(res);

        //no need to persist cookie, existing cookies are valid.
        if(cookies.size === 0){
            let cookieObject = await AsyncStorage.getItem(CONFIG.SharedPreferenceKeys.AccessToken);
            if(cookieObject == null)
            {
                globalContextValue.setUsername(null);
                globalContextValue.setAccessTokenCookie(null);
                return;
            }
            cookieObject = JSON.parse(cookieObject);
            globalContextValue.setUsername(username);
            globalContextValue.setAccessTokenCookie(cookieObject);
        }

        //persist the cookies.

        //store entire object as stringified json
        await AsyncStorage.setItem(CONFIG.SharedPreferenceKeys.AccessToken, 
            JSON.stringify(cookies.get(CONFIG.SharedPreferenceKeys.AccessToken)));
        
        await AsyncStorage.setItem(CONFIG.SharedPreferenceKeys.RefreshToken,
            JSON.stringify(cookies.get(CONFIG.SharedPreferenceKeys.RefreshToken)));

        await AsyncStorage.setItem(CONFIG.SharedPreferenceKeys.Username, username);
        
        globalContextValue.setUsername(username);
        globalContextValue.setAccessTokenCookie(cookies.get(CONFIG.SharedPreferenceKeys.AccessToken));
    }
    else {
        globalContextValue.setAccessTokenCookie(null);
        globalContextValue.setUsername(null);
    }
    throw new Error(responseJSON);
}

/**
 * @summary Checks if any previous session is already active if access token and refresh tokens are available.
 * @returns Promise : boolean
 */
export async function checkIfTokenValid(globalContextValue : any) {
    try
    {
        //check if any access token stored.
        var storedAccessTokenCookie = await AsyncStorage.getItem(CONFIG.SharedPreferenceKeys.AccessToken);
        var storedRefreshTokenCookie = await AsyncStorage.getItem(CONFIG.SharedPreferenceKeys.RefreshToken);

        var parsedAccessTokenCookie = null;
        var parsedRefreshTokenCookie = null;

        // both must be available.
        if(storedAccessTokenCookie && storedRefreshTokenCookie) {
            parsedAccessTokenCookie = JSON.parse(storedAccessTokenCookie);
            parsedRefreshTokenCookie = JSON.parse(storedRefreshTokenCookie);
        }
        else {
            globalContextValue.setUsername(null);
            return;
        }

        const header = new Headers({
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
        });

        if(!parsedAccessTokenCookie){
            globalContextValue.setUsername(null)
            return;
        }
        //attempt login using existing access token
        var stringifiedCookie = serializeCookie(parsedAccessTokenCookie.name, parsedAccessTokenCookie.value, parsedAccessTokenCookie);
        header.append('Cookie', stringifiedCookie)
        const res = await fetch(`${CONFIG.VikasaAPI}/auth/vendor/login`, {
            headers:header,
            credentials: 'include',
            method: 'POST'
        });

        if(res.status == 200){
            let username = await AsyncStorage.getItem(CONFIG.SharedPreferenceKeys.Username);
            globalContextValue.setUsername(username)
            return;
        }

        //attempt to regenerate access token using refresh token
        var stringifiedCookie = serializeCookie(parsedRefreshTokenCookie.name, parsedRefreshTokenCookie.value, parsedRefreshTokenCookie);
        const header2 = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': stringifiedCookie
        })

        const renew_res = await fetch(`${CONFIG.VikasaAPI}/auth/renewtoken`, {
            headers: header2,
            credentials: 'include',
            method: 'POST'
        });

        if(renew_res.status == 200)
        {
            const cookies = getParsedCookiesMap(res);

            //no need to persist cookie, existing cookies are valid.
            if(cookies.size === 0){
                globalContextValue.setUsername(null)
                return
            }

            //store new access token as stringified json
            await AsyncStorage.setItem(CONFIG.SharedPreferenceKeys.AccessToken, 
                JSON.stringify(cookies.get(CONFIG.SharedPreferenceKeys.AccessToken)));
            
            let username = await AsyncStorage.getItem(CONFIG.SharedPreferenceKeys.Username);
            globalContextValue.setAccessTokenCookie(cookies.get(CONFIG.SharedPreferenceKeys.AccessToken));

            globalContextValue.setUsername(username)
            return;
        }
        
        //refresh token expired, log-out and remove shared preference keys.
        await logout(globalContextValue);
    }
    catch(err) {
        console.log('Error while verifying if token valid. : ', err);
        globalContextValue.setUsername(null)
    }
}


export async function logout(globalContextValue : any){
    await AsyncStorage.removeItem(CONFIG.SharedPreferenceKeys.AccessToken);
    await AsyncStorage.removeItem(CONFIG.SharedPreferenceKeys.RefreshToken);
    await AsyncStorage.removeItem(CONFIG.SharedPreferenceKeys.Username);
    globalContextValue.setAccessTokenCookie(null)
    globalContextValue.setUsername(null);
}

/**
 * 
 * @param data 
 * @summary Creates empty store with no inventory & data.
 */
export async function createEmptyStore(data : any){
    const res = await fetch(`${CONFIG.VikasaAPI}/shop`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            vendorId: data.vendorId,
            localDomain: data.localDomain,
            displayName: data.displayName,
            description: data.description || '',
            imagesUrl: data.imagesUrl || null
        })
    });
    if(res.status != 200)
        throw new Error("Failed to create empty store")
    return res;
}

/**
 * 
 * @param data 
 * @summary Fetch all stores associated with given vendor
 */
 export async function getShops(globalContextValue:any) 
 {
    console.log('Fetching Shops...');

    //check if any access token stored.
    var storedAccessTokenCookie = await AsyncStorage.getItem(CONFIG.SharedPreferenceKeys.AccessToken);
    var parsedAccessTokenCookie = null;
    if(storedAccessTokenCookie != null)
        parsedAccessTokenCookie = JSON.parse(storedAccessTokenCookie);
    
    console.log(`parsed AccessToken : ${parsedAccessTokenCookie}`)

    const header = new Headers({
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
    });

    if(parsedAccessTokenCookie)
    {
        var stringifiedCookie = serializeCookie(parsedAccessTokenCookie.name, parsedAccessTokenCookie.value, parsedAccessTokenCookie);
        header.append('Cookie', stringifiedCookie)
    }

    const res = await fetch(`${CONFIG.VikasaAPI}/shop?vendorId=${globalContextValue.username}`, {
        method: 'GET',
        headers: header
    }).catch(err=>{
        console.log('Failed to fetchh shop ', err);
    });
    if(!res)
        throw new Error('Network error.');

    const responseJSON = await res.json();
    console.log('Shop Fetch Complete');
    if(res.status != 200)
        throw new Error("Failed to fetch store details, "+responseJSON)
    return responseJSON;
}

export async function getInventories(storeId:string){
    console.log('Fetching Inventory...');

    //check if any access token stored.
    var storedAccessTokenCookie = await AsyncStorage.getItem(CONFIG.SharedPreferenceKeys.AccessToken);
    var parsedAccessTokenCookie = null;
    if(storedAccessTokenCookie != null)
        parsedAccessTokenCookie = JSON.parse(storedAccessTokenCookie);

    const header = new Headers({
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
    });

    if(parsedAccessTokenCookie)
    {
        var stringifiedCookie = serializeCookie(parsedAccessTokenCookie.name, parsedAccessTokenCookie.value, parsedAccessTokenCookie);
        header.append('Cookie', stringifiedCookie)
    }

    const res = await fetch(`${CONFIG.VikasaAPI}/shop/${storeId}/inventory`, {
        method: 'GET',
        headers: header
    }).catch(err=>{
        console.log('Fetch Exception :');
        console.error(err);
    });
    if(!res)
        throw new Error('Network error.');

    const responseJSON = await res.json();
    if(res.status != 200){
        console.log('response status code is not 200')
        throw new Error("Failed to fetch Inventory details, "+responseJSON)
    }
    return responseJSON;
}

/**
 * 
 * @param data 
 * @summary Creates empty inventory within a store, with no items added.
 */
export async function createEmptyInventory(data : any){
    const res = await fetch(`${CONFIG.VikasaAPI}/shop/inventory`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            vendorId: data.vendorId,
            storeId: data.storeId,
            inventoryName: data.inventoryName
        })
    });
    if(res.status != 200){
        throw new Error("Inventory could not be created");
    }
    return res;
}
export async function createItem(data: { displayName: any; category: any; variant: any; quantity: any; pricePerUnit: any; description: any; storeId: any; inventoryId: any; itemType?: any; MRP?: any; currency?: any; }) {
    //check if any access token stored.
    var storedAccessTokenCookie = await AsyncStorage.getItem(CONFIG.SharedPreferenceKeys.AccessToken);
    var parsedAccessTokenCookie = null;
    if(storedAccessTokenCookie != null)
        parsedAccessTokenCookie = JSON.parse(storedAccessTokenCookie);

    const header = new Headers({
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
    });

    if(parsedAccessTokenCookie)
    {
        var stringifiedCookie = serializeCookie(parsedAccessTokenCookie.name, parsedAccessTokenCookie.value, parsedAccessTokenCookie);
        header.append('Cookie', stringifiedCookie)
    }

    const res = await fetch(`${CONFIG.VikasaAPI}/shop/inventory/item`, {
        method: 'POST',
        headers: header,
        body: JSON.stringify({
            itemType: data.itemType || 'sellable',
            inventoryId: data.inventoryId,
            storeId: data.storeId,
            category: data.category,
            variant: data.variant,
            displayName: data.displayName,
            description: data.description,
            quantity: data.quantity,
            MRP: data.MRP || data.pricePerUnit,
            pricePerUnit: data.pricePerUnit,
            currency: data.currency || 'INR'
        })
    });
    var resJSON = await res.json();
    if(res.status != 201){
        throw new Error("Item could not be created.");
    }
    return resJSON;
}

export async function deleteItem(data : any){
    console.log('Deleting Item...');

    //check if any access token stored.
    var storedAccessTokenCookie = await AsyncStorage.getItem(CONFIG.SharedPreferenceKeys.AccessToken);
    var parsedAccessTokenCookie = null;
    if(storedAccessTokenCookie != null)
        parsedAccessTokenCookie = JSON.parse(storedAccessTokenCookie);

    const header = new Headers({
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
    });

    if(parsedAccessTokenCookie)
    {
        var stringifiedCookie = serializeCookie(parsedAccessTokenCookie.name, parsedAccessTokenCookie.value, parsedAccessTokenCookie);
        header.append('Cookie', stringifiedCookie)
    }

    const res = await fetch(`${CONFIG.VikasaAPI}/shop/inventory/item`, {
        method: 'DELETE',
        headers: header,
        body: JSON.stringify({
            itemId: data.itemId,
            inventoryId: data.inventoryId,
            storeId: data.storeId,
            vendorId: data.vendorId
        })
    });
    var resJSON = await res.json();

    console.log(resJSON)

    if(res.status != 200){
        throw new Error("Item could not be deleted or does not exist.");
    }
    return resJSON;
}
/**
 * 
 * @param mobileNumber 
 * @summary Generates OTP and associates it with mobileNumber.
 */
 export async function sendMobileOTP(mobileNumber : string){
    return new Promise(async (resolve, reject)=>{
        try{
            const res = await fetch(`${CONFIG.VikasaAPI}/auth/otp`, {
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    "address":mobileNumber,
                    "addressType":"mobile"
                })
            });
            
            if(res.status == 200)
                return resolve('OTP Successfully Sent.');
            return reject('Unable to generate OTP, Try Again');
        }
        catch(err){
            console.error(err);
            reject(err);
        }
    });
    
}

/**
 * 
 * @param mobileNumber 
 * @param otp 
 * @summary verify otp associated with given string (mobile/email)
 */
export async function verifyOTP(key : string, otp : string){
    return new Promise(async (resolve, reject)=>{
        try{
            const res = await fetch(`${CONFIG.VikasaAPI}/auth/verify/otp`, {
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    "address":key,
                    "otp":otp
                })
            });
            if(res.status == 200)
                return resolve('OTP Verified Successfully.');
            reject('OTP Verification Failed.');
        }
        catch(err){
            console.error(err);
            reject('Unexpected Error while verifying OTP. Try Again');
        }
    });
    
}


export async function registerVendor(data:any){
    return new Promise(async (resolve, reject)=>{
        try{
            const res = await fetch(`${CONFIG.VikasaAPI}/auth/vendor/register`, {
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    "username":data.username,
                    "password":data.password,
                    "displayName":data.bussinessName,
                    "mobile":data.mobile
                })
            });
            if(res.status == 201 || res.status == 200) {

                return resolve('Vendor Registered Successfully.');
            }
            return reject('Unable to Register, Try again with new username.');
        }       
        catch(err){
            console.log(err);
            reject(err);
        }
    });
}

//------------ Inventory & Items CRUD
export async function fetchInventory(vendorId:string, shopId:string, offset: number, limit: number){
    const res = await fetch(`${CONFIG.VikasaAPI}/shop/${shopId}/inventory?vendorId=${vendorId}`, {
        method:'GET',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        }
    });
    if(res.status == 201 || res.status == 200)
        return res;
    return [];
}
export async function createInventory() {
    
}
export async function getItems(filter:any){
    console.log('Fetching Items...');

    //check if any access token stored.
    var storedAccessTokenCookie = await AsyncStorage.getItem(CONFIG.SharedPreferenceKeys.AccessToken);
    var parsedAccessTokenCookie = null;
    if(storedAccessTokenCookie != null)
        parsedAccessTokenCookie = JSON.parse(storedAccessTokenCookie);

    const header = new Headers({
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
    });

    if(parsedAccessTokenCookie)
    {
        var stringifiedCookie = serializeCookie(parsedAccessTokenCookie.name, parsedAccessTokenCookie.value, parsedAccessTokenCookie);
        header.append('Cookie', stringifiedCookie)
    }

    var url = `${CONFIG.VikasaAPI}/shop/${filter.storeId}/inventory/items`
    if(filter.offset != null){
        url=`${url}?offset=${filter.offset}`
    }
    if(filter.limit != null)
        url=`${url}&limit=${filter.limit}`
    console.log('-url-', url);
    const res = await fetch(url, {
        method: 'GET',
        headers: header
    }).catch(err=>{
        console.log('Fetch Exception :');
        console.error(err);
    });
    if(!res)
        throw new Error('Network error.');

    const responseJSON = await res.json();

    if(res.status != 200){
        console.log('response status code is not 200')
        throw new Error("Failed to fetch Item details, "+responseJSON)
    }
    return responseJSON;
}
//-------------- Orders CRUD
export async function fetchOrders(filter: { offset: number; limit: number; vendorId: any; storeId: any; orderState: any; orderType: any; }){
    console.log('Fetching Orders...');

    //check if any access token stored.
    var storedAccessTokenCookie = await AsyncStorage.getItem(CONFIG.SharedPreferenceKeys.AccessToken);
    var parsedAccessTokenCookie = null;
    if(storedAccessTokenCookie != null)
        parsedAccessTokenCookie = JSON.parse(storedAccessTokenCookie);
    filter.offset = filter.offset || 0;
    filter.limit = filter.limit || 20;
    const header = new Headers({
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
    });

    if(parsedAccessTokenCookie)
    {
        var stringifiedCookie = serializeCookie(parsedAccessTokenCookie.name, parsedAccessTokenCookie.value, parsedAccessTokenCookie);
        header.append('Cookie', stringifiedCookie)
    }

    var url = `${CONFIG.VikasaAPI}/shop/order?vendorId=${filter.vendorId}`;
    if(filter.storeId)
        url+=`&storeId=${filter.storeId}`;
    if(filter.orderState)
        url+=`&orderState=${filter.orderState}`;
    if(filter.orderType)
        url+=`&orderType=${filter.orderType}`

    const res = await fetch(url, {
        method:'GET',
        headers:header
    });
    const responseJSON = await res.json();

    console.log('orders ', responseJSON)
    if(res.status == 201 || res.status == 200)
        return responseJSON;
    return [];
}