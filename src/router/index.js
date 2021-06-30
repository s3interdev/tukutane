import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '@/store';

import Home from '@/views/Home';
import MeetupsExplore from '@/views/meetups/MeetupsExplore';
import MeetupsOrganize from '@/views/meetups/MeetupsOrganize';
import MeetupsSingle from '@/views/meetups/MeetupsSingle';
import UserProfile from '@/views/user/UserProfile';
import UserSignUp from '@/views/user/UserSignUp';
import UserSignIn from '@/views/user/UserSignIn';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			title: 'Home',
		},
	},
	{
		path: '/meetups',
		name: 'MeetupsExplore',
		component: MeetupsExplore,
		meta: {
			title: 'Explore Meetups',
		},
	},
	{
		path: '/meetups/organize-meetup',
		name: 'MeetupsOrganize',
		component: MeetupsOrganize,
		beforeEnter: (to, from, next) => {
			if (store.getters.user) {
				next();
			} else {
				next('/sign-in');
			}
		},
		meta: {
			title: 'Organize a Meetup',
		},
	},
	{
		path: '/meetups/:id',
		name: 'MeetupsSingle,',
		component: MeetupsSingle,
		props: true,
		meta: {
			title: 'Meetup',
		},
	},
	{
		path: '/profile',
		name: 'UserProfile',
		component: UserProfile,
		beforeEnter: (to, from, next) => {
			if (store.getters.user) {
				next();
			} else {
				next('/sign-in');
			}
		},
		meta: {
			title: 'User Profile',
		},
	},
	{
		path: '/sign-up',
		name: 'UserSignUp',
		component: UserSignUp,
		meta: {
			title: 'Sign Up',
		},
	},
	{
		path: '/sign-in',
		name: 'UserSignIn',
		component: UserSignIn,
		meta: {
			title: 'Sign In',
		},
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	document.title = `${to.meta.title} | Tukutane | Make Friends, Find Support`;
	next();
});

export default router;
