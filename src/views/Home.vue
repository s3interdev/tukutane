<template>
	<v-container>
		<v-row align="center" justify="space-around">
			<v-col class="text-center">
				<v-btn color="info" large router to="/meetups">Explore Meetups</v-btn>
			</v-col>
			<v-col class="text-center">
				<v-btn color="accent" large router to="/meetups/organize-meetup">
					Organize Meetup
				</v-btn>
			</v-col>
		</v-row>
		<v-row align="center" justify="space-around">
			<v-col class="text-center">
				<v-progress-circular
					:size="89"
					:width="5"
					indeterminate
					color="info"
					v-if="loading"
				>
				</v-progress-circular>
			</v-col>
		</v-row>
		<v-row align="center" justify="space-around" v-if="!loading">
			<v-col class="text-center">
				<v-carousel cycle hide-delimiters style="cursor:pointer;">
					<v-carousel-item
						v-for="meetup in meetups"
						:key="meetup.id"
						:src="meetup.imageURL"
						@click="onLoadMeetup(meetup.id)"
					>
						<div class="title">
							{{ meetup.title }}
						</div>
					</v-carousel-item>
				</v-carousel>
			</v-col>
		</v-row>
		<v-row align="center" justify="space-around">
			<v-col class="text-center">
				<p>
					Join a group to meet people, make friends, find support, grow a business, and
					explore your interests.
				</p>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'Home',

	methods: {
		onLoadMeetup(id) {
			this.$router.push('/meetups/' + id);
		},
	},

	computed: {
		meetups() {
			return this.$store.getters.featuredMeetups;
		},

		loading() {
			return this.$store.getters.loading;
		},
	},

	mounted() {
		this.$store.dispatch('fetchMeetups');
	},
};
</script>

<style scoped>
.title {
	position: absolute;
	margin: auto;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.2);
	color: #ffffff;
	font-size: 32px;
	padding: 20px;
}

.v-progress-circular {
	margin: 1rem;
}
</style>
