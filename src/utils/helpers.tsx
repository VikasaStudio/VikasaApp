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
            const res = await fetch('http://10.0.2.2:3000/api/auth/otp', {
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
            const res = await fetch('http://10.0.2.2:3000/api/auth/verify/otp', {
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
