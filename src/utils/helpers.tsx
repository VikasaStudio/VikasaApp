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

//Convert Cookie Object to string.
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

export async function AttemptLocalLogin(username:string, password:string) 
{
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
        console.log('stringify cookie = ',stringifiedCookie)
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
    });

    // Either user was already logged in or this is a new login.
    if(res.status == 200) {

        const cookies = getParsedCookiesMap(res);
        console.log(`Cookie Map : `, cookies);

        //no need to persist cookie, existing cookies are valid.
        if(cookies.size === 0)
            return username;

        //persist the cookies.

        //store entire object as stringified json
        await AsyncStorage.setItem(CONFIG.SharedPreferenceKeys.AccessToken, 
            JSON.stringify(cookies.get(CONFIG.SharedPreferenceKeys.AccessToken)));
        
        await AsyncStorage.setItem(CONFIG.SharedPreferenceKeys.RefreshToken,
            JSON.stringify(cookies.get(CONFIG.SharedPreferenceKeys.RefreshToken)));

        await AsyncStorage.setItem(CONFIG.SharedPreferenceKeys.Username, "value");

        return username;
    }
    const responseJSON = await res.json();
    console.log(responseJSON);
    throw new Error(responseJSON);
}

/**
 * @summary Checks if any previous session is already active.
 */
export async function checkIfSessionActive(){
    const res = await fetch(`${CONFIG.VikasaAPI}/auth/vendor/login`, {
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
}


export function logout(globalContextValue : any){
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
    console.log(res);
    if(res.status != 200)
        throw new Error("Failed to create empty store")
    return res;
}

/**
 * 
 * @param data 
 * @summary Fetch all stores associated with given vendor
 */
 export async function getStores(data : any){
    const res = await fetch(`${CONFIG.VikasaAPI}/shop`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    });
    console.log(res);
    if(res.status != 200)
        throw new Error("Failed to fetch store details")
    return res;
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
    console.log(res);
    if(res.status != 200){
        throw new Error("Inventory could not be created");
    }
    return res;
}
export async function createItem(data : any) {
    const res = await fetch(`${CONFIG.VikasaAPI}/shop/inventory/item`, {
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
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
    console.log(res);
    if(res.status != 200){
        throw new Error("Item could not be created.");
    }
    return res;
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
            
            console.log(res.status);
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
    
            console.log(res.status);
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
    console.log('Inventory Data Fetch: ',res);
    if(res.status == 201 || res.status == 200)
        return res;
    return [];
}
export async function addShopItems(){

}
export async function createInventory() {
    
}

//-------------- Orders CRUD
export async function fetchOrders(offset: number, limit:number){
    const res = await fetch(`${CONFIG.VikasaAPI}/shop/order`, {
        method:'GET',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        }
    });
    console.log('Order Data Fetch : ', res);
    if(res.status == 201 || res.status == 200)
        return res;
    return [];
}