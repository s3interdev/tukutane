import Vue from 'vue';
import Vuex from 'vuex';

import { auth, rtDb, cdStorage } from '@/firebase/config';

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

		updateMeetup(state, payload) {
			const meetup = state.meetups.find((meetup) => {
				return meetup.id === payload.id;
			});

			if (payload.title) {
				meetup.title = payload.title;
			}

			if (payload.description) {
				meetup.description = payload.description;
			}

			if (payload.date) {
				meetup.date = payload.date;
			}
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
				description: payload.description,
				date: payload.date.toISOString(),
				creatorId: getters.user.id,
			};

			let imageURL;
			let key;

			rtDb
				.ref('meetups')
				.push(meetup)
				.then((data) => {
					key = data.key;
					return key;
				})
				.then((key) => {
					const file = payload.meetupImage.name;
					const extension = file.slice(file.lastIndexOf('.'));
					const filePath = `meetups/${key}${extension}`;
					const storageRef = cdStorage.ref(filePath);
					const res = storageRef.put(payload.meetupImage);

					return res;
				})
				.then((res) => {
					return res.ref.getDownloadURL().then((imageURL) => {
						return rtDb
							.ref('meetups')
							.child(key)
							.update({ imageURL: imageURL });
					});
				})
				.then(() => {
					commit('organizeMeetup', { ...meetup, imageURL: imageURL, id: key });
				})
				.catch((error) => {
					console.log(error);
				});
		},

		updateMeetup({ commit }, payload) {
			commit('setLoading', true);

			const updateObject = {};

			if (payload.title) {
				updateObject.title = payload.title;
			}

			if (payload.description) {
				updateObject.description = payload.description;
			}

			if (payload.date) {
				updateObject.date = payload.date;
			}

			rtDb
				.ref('meetups')
				.child(payload.id)
				.update(updateObject)
				.then(() => {
					commit('setLoading', false);
					commit('updateMeetup', payload);
				})
				.catch((error) => {
					console.log(error);
					commit('setLoading', false);
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
