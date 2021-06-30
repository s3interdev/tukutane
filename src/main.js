import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import DateFilter from '@/filters/date';
import Alert from '@/components/common/Alert';

/** import firebase auth service */
import { auth } from '@/firebase/config';

Vue.config.productionTip = false;
Vue.filter('date', DateFilter);
Vue.component('Alert', Alert);

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
