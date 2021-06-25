import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: '#ff5722',
				secondary: '#607d8b',
				accent: '#ff9800',
				error: '#f44336',
				warning: '#ffeb3b',
				info: '#00bcd4',
				success: '#4caf50',
			},
		},
	},
});
