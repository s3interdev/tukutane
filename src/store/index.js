import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		meetups: [
			{
				imageURL:
					'https://upload.wikimedia.org/wikipedia/commons/e/ec/Aerial_View_of_Sea_Point%2C_Cape_Town_South_Africa.jpg',
				id: 'T4w4z7a2Mj9Sgc3qNAbA',
				title: 'Meetup in Cape Town',
				date: '2021-07-02',
				location: 'Crowne Plaza, Cape Town',
				description:
					"Red Five standing by. Obi-Wan is here. The Force is with him. A tremor in the Force. The last time I felt it was in the presence of my old master. You're all clear, kid. Let's blow this thing and go home!",
			},
			{
				imageURL:
					'https://www.proudtanzaniasafaris.com/wp-content/uploads/2019/07/DarEsSalaam.jpg',
				id: 'kEtymxaybUHDNMNnFmQw',
				title: 'Meetup in Dar-es-Salaam',
				date: '2021-07-03',
				location: 'Crowne Plaza, Dar-es-Salaam',
				description:
					"Dantooine. They're on Dantooine. I don't know what you're talking about. I am a member of the Imperial Senate on a diplomatic mission to Alderaan-- I'm trying not to, kid. You're all clear, kid. Let's blow this thing and go home!",
			},
			{
				imageURL:
					'https://cdn.pixabay.com/photo/2017/06/06/03/35/kampala-2376011_1280.jpg',
				id: 'ZsAyiz2V8vgfX4vDBTjZ',
				title: 'Meetup in Kampala',
				date: '2021-07-09',
				location: 'Crowne Plaza, Kampala',
				description:
					"What!? All right. Well, take care of yourself, Han. I guess that's what you're best at, ain't it? Remember, a Jedi can feel the Force flowing through him. She must have hidden the plans in the escape pod. Send a detachment down to retrieve them, and see to it personally, Commander. There'll be no one to stop us this time!",
			},
			{
				imageURL: 'https://live.staticflickr.com/65535/50409058181_e508db66fb_b.jpg',
				id: 'RUq2V7EnDPwVmb1har2p',
				title: 'Meetup in Lagos',
				date: '2021-07-10',
				location: 'Crowne Plaza, Lagos',
				description:
					"Partially, but it also obeys your commands. A tremor in the Force. The last time I felt it was in the presence of my old master. Dantooine. They're on Dantooine. Kid, I've flown from one side of this galaxy to the other. I've seen a lot of strange stuff, but I've never seen anything to make me believe there's one all-powerful Force controlling everything. There's no mystical energy field that controls my destiny. It's all a lot of simple tricks and nonsense.",
			},
			{
				imageURL:
					'https://cdn.pixabay.com/photo/2014/02/21/22/33/old-port-271664_1280.jpg',
				id: 'nFcqx1u2UdgYTZqfVBDA',
				title: 'Meetup in Mombasa',
				date: '2021-07-16',
				location: 'Mombasa Garage, Mombasa',
				description:
					"Don't be too proud of this technological terror you've constructed. The ability to destroy a planet is insignificant next to the power of the Force. Hey, Luke! May the Force be with you. Dantooine. They're on Dantooine.",
			},
			{
				imageURL: 'https://live.staticflickr.com/8794/16703357583_45fe283970_b.jpg',
				id: 'ErznXBkTXbw5qPXN25gb',
				title: 'Meetup in Nairobi',
				date: '2021-07-17',
				location: 'Nairobi Garage, Nairobi',
				description:
					"I can't get involved! I've got work to do! It's not that I like the Empire, I hate it, but there's nothing I can do about it right now. It's such a long way from here. The more you tighten your grip, Tarkin, the more star systems will slip through your fingers.",
			},
			{
				imageURL:
					'https://upload.wikimedia.org/wikipedia/commons/a/ae/Nairobi_skyline_P1000021.jpg',
				id: 's1eJZ6ArFB7ybziWVce9',
				title: 'Meetup in Downtown Nairobi',
				date: '2021-07-23',
				location: 'iHub, Nairobi',
				description:
					"But with the blast shield down, I can't even see! How am I supposed to fight? What good is a reward if you ain't around to use it? Besides, attacking that battle station ain't my idea of courage. It's more like…suicide.",
			},
		],

		user: {
			id: 'yQ55bb5shwBN1rrTSiFg',
			registeredMeetups: ['s1eJZ6ArFB7ybziWVce9', 'ErznXBkTXbw5qPXN25gb'],
		},
	},

	mutations: {},

	actions: {},

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
	},
});
