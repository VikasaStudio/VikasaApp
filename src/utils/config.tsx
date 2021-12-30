
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Orders from '../screens/Orders/Orders';
import Inventory from '../screens/Inventory/Inventory';
import CreateInventory from '../screens/Inventory/AddItem';
import Dashboard from '../screens/Dashboard';
import Menu from '../screens/Menu';
import AuthScreen from '../screens/AuthScreen';

export default {
    'VikasaAPI':'http://10.0.2.2:3000/api',

    'SharedPreferenceKeys':{
        'AccessToken': '__Secure-AccessToken',
        'RefreshToken': '__Secure-RefreshToken',
        'Username': 'username'
    },

    'Screens':{
        'Auth' : {name:'AuthScreen', component: gestureHandlerRootHOC(AuthScreen)},

        'Dashboard' : {name:'Dashboard', component: gestureHandlerRootHOC(Dashboard)},
        'ProfileMenu' : {name:'Menu', component: gestureHandlerRootHOC(Menu)},
        
        'OrderDashboard' : {name:'Orders', component: null},

        'Inventory' : {name:'Inventory', component:gestureHandlerRootHOC(Inventory)},
        'AddItem' : {name:'AddItem', component: gestureHandlerRootHOC(CreateInventory)}
    }
}