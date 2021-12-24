export default {
    'VikasaAPI':'http://10.0.2.2:3000/api',

    'SharedPreferenceKeys':{
        'AccessToken': '__Secure-AccessToken',
        'RefreshToken': '__Secure-RefreshToken',
        'Username': 'username'
    },

    'Screens':{
        'Auth' : {name:'AuthScreen', component:''},

        'Dashboard' : {name:'Dashboard', component:''},
        'ProfileMenu' : {name:'Menu', component:''},
        
        'OrderDashboard' : {name:'Orders', component:''},

        'Inventory' : {name:'Inventory', component:''},
        'AddItem' : {name:'AddItem', component:''}
    }
}