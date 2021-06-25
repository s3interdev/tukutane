import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home';
import ViewAllMeetups from '@/views/meetup/ViewAllMeetups';
import CreateMeetup from '@/views/meetup/CreateMeetup';
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
		name: 'ViewAllMeetups',
		component: ViewAllMeetups,
		meta: {
			title: 'All Meetups',
		},
	},
	{
		path: '/meetup/create-meetup',
		name: 'CreateMeetup',
		component: CreateMeetup,
		meta: {
			title: 'Create Meetup',
		},
	},
	{
		path: '/profile',
		name: 'UserProfile',
		component: UserProfile,
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
