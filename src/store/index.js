import Vue from 'vue';
import Vuex from 'vuex';

import { auth, rtDb } from '@/firebase/config';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		meetups: [],
		user: null,
		loading: false,
		error: null,
	},

	mutations: {
		fetchMeetups(state, payload) {
			state.meetups = payload;
		},

		organizeMeetup(state, payload) {
			state.meetups.push(payload);
		},

		userSignUp(state, payload) {
			state.user = payload;
		},

		userSignIn(state, payload) {
			state.user = payload;
		},

		setLoading(state, payload) {
			state.loading = payload;
		},

		setError(state, payload) {
			state.error = payload;
		},

		clearError(state) {
			state.error = null;
		},
	},

	actions: {
		fetchMeetups({ commit }) {
			commit('setLoading', true);

			rtDb
				.ref('meetups')
				.once('value')
				.then((data) => {
					const meetups = [];
					const meetupsObject = data.val();

					for (let key in meetupsObject) {
						meetups.push({
							id: key,
							title: meetupsObject[key].title,
							location: meetupsObject[key].location,
							imageURL: meetupsObject[key].imageURL,
							description: meetupsObject[key].description,
							date: meetupsObject[key].date,
							creatorId: meetupsObject[key].creatorId,
						});
					}

					commit('fetchMeetups', meetups);
					commit('setLoading', false);
				})
				.catch((error) => {
					console.log(error);
					commit('setLoading', false);
				});
		},

		organizeMeetup({ commit, getters }, payload) {
			const meetup = {
				title: payload.title,
				location: payload.location,
				imageURL: payload.imageURL,
				description: payload.description,
				date: payload.date.toISOString(),
				creatorId: getters.user.id,
			};

			/** reach out to firebase and persist the data */
			rtDb
				.ref('meetups')
				.push(meetup)
				.then((data) => {
					const key = data.key;

					commit('organizeMeetup', { ...meetup, id: key });
				})
				.catch((error) => {
					console.log(error);
				});
		},

		userSignUp({ commit }, payload) {
			commit('setLoading', true);
			commit('clearError');

			auth
				.createUserWithEmailAndPassword(payload.email, payload.password)
				.then((user) => {
					commit('setLoading', false);

					const signedUpUser = {
						id: user.uid,
						registeredMeetups: [],
					};

					commit('userSignUp', signedUpUser);
				})
				.catch((error) => {
					commit('setLoading', false);
					commit('setError', error);
					console.log(error);
				});
		},

		userSignIn({ commit }, payload) {
			commit('setLoading', true);
			commit('clearError');

			auth
				.signInWithEmailAndPassword(payload.email, payload.password)
				.then((user) => {
					commit('setLoading', false);

					const signedInUser = {
						id: user.uid,
						registeredMeetups: [],
					};

					commit('userSignIn', signedInUser);
				})
				.catch((error) => {
					commit('setLoading', false);
					commit('setError', error);
					console.log(error);
				});
		},

		userAutoSignIn({ commit }, payload) {
			commit('userSignIn', { id: payload.uid, registeredMeetups: [] });
		},

		userSignOut({ commit }) {
			auth.signOut();
			commit('userSignIn', null);
		},

		clearError({ commit }) {
			commit('clearError');
		},
	},

	getters: {
		allMeetups(state) {
			return state.meetups.sort((a, b) => {
				return a.date > b.date;
			});
		},

		singleMeetup(state) {
			return (meetupId) => {
				return state.meetups.find((meetup) => {
					return meetup.id === meetupId;
				});
			};
		},

		featuredMeetups(state, getters) {
			return getters.allMeetups.slice(0, 5);
		},

		user(state) {
			return state.user;
		},

		loading(state) {
			return state.loading;
		},

		error(state) {
			return state.error;
		},
	},
});
