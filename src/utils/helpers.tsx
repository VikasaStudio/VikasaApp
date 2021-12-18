import CONFIG from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * 
 * @param username 
 * @param password 
 * @returns Promise
 * @summary Attempts Login via local-strategy, if success then it stores cookies otherwise throws relevant error message.
 */
export async function AttemptLocalLogin(username:string, password:string){
    try{
        return new Promise(async (resolve, reject) => {
            const res = await fetch('http://10.0.2.2:3000/api/auth/vendor/login', {
                method: 'POST',
                credentials: 'include',
                headers:{
                    Accept: 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                    "strategy": "local"
                })
            });
            console.log(res);
            console.log('headers', res.headers);
            let cookie = res.headers.get('set-cookie');
            console.log('cookie :',cookie);
            console.log(res.status);

            if(res.status == 200) {

                //persist the cookies.
                await AsyncStorage.setItem(CONFIG.SharedPreferenceKeys.AccessToken,"value");
                await AsyncStorage.setItem(CONFIG.SharedPreferenceKeys.RefreshToken,"value");
                await AsyncStorage.setItem(CONFIG.SharedPreferenceKeys.Username,"value");
                console.log(' [AttemptLocalLogin] : SharedPreferences set');

                resolve(username);
            }
            const responseJSON = await res.json();
            console.log(responseJSON);
            reject(responseJSON);
        });
        
    }
    catch(err){
        console.error(err);
    }
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