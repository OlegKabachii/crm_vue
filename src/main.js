import Vue from 'vue'
import Vuelidate from "vuelidate";
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import currencyFilter from "@/filters/currency.filter";


Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader', Loader)

firebase.initializeApp({
    apiKey: "AIzaSyCne-4Jak3vLywPUy5FkMQBDK7X0KGjcCg",
    authDomain: "vuejs-crm-a140d.firebaseapp.com",
    projectId: "vuejs-crm-a140d",
    storageBucket: "vuejs-crm-a140d.appspot.com",
    messagingSenderId: "778118834697",
    appId: "1:778118834697:web:0e3ace3bfdc85582b4a6d8",
    measurementId: "${config.measurementId}"
})

let app

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }

})

