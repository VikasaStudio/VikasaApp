import CONFIG from './config';

/**
 * 
 * @param username 
 * @param password 
 * @returns Promise
 * @summary Attempts Login via local-strategy, if success then it stores cookies otherwise throws relevant error message.
 */
 export async function AttemptLocalLogin(username:string, password:string){
    try{
        return new Promise(async (resolve, reject)=>{
            console.log('Attempting Login');
            const res = await fetch('http://10.0.2.2:3000/api/auth/vendor/login', {
                method: 'POST',
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
            console.log(res.headers.get('set-cookie'));
            console.log(res.status);
            if(res.status == 200)
                resolve(username);
            const responseJSON = await res.json();
            reject(responseJSON);
        });
        
    }
    catch(err){
        console.error(err);
    }
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
            if(res.status == 201 || res.status == 200)
                return resolve('Vendor Registered Successfully.');
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