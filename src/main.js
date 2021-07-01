import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import DateFilter from '@/filters/date';
import TheAlert from '@/components/common/TheAlert';

/** import firebase auth service */
import { auth } from '@/firebase/config';

Vue.config.productionTip = false;
Vue.filter('date', DateFilter);
Vue.component('TheAlert', TheAlert);

let app;

auth.onAuthStateChanged((user) => {
	if (user) {
		store.dispatch('userAutoSignIn', user);
	}

	if (!app) {
		new Vue({
			router,
			store,
			vuetify,
			render: (h) => h(App),
		}).$mount('#app');
	}
});
