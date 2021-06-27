import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import DateFilter from '@/filters/date';

/** import firebase auth service */
import { auth } from '@/firebase/config';

Vue.config.productionTip = false;
Vue.filter('date', DateFilter);

let app;

auth.onAuthStateChanged(() => {
	if (!app) {
		new Vue({
			router,
			store,
			vuetify,
			render: (h) => h(App),
		}).$mount('#app');
	}
});
