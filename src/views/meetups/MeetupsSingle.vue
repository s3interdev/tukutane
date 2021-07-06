<template>
	<v-container>
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
		<v-row>
			<v-col>
				<v-card>
					<v-img class="white--text align-end" height="400px" :src="meetup.imageURL">
						<v-card-title>{{ meetup.title }}</v-card-title>
						<v-card-subtitle>{{ meetup.date | date }}</v-card-subtitle>
					</v-img>

					<v-card-text class="text--primary">
						<div>
							<strong>{{ meetup.location }}</strong>
						</div>
						<div>
							{{ meetup.description }}
						</div>
					</v-card-text>
					<v-divider class="mt-8"></v-divider>
					<v-card-actions>
						<div v-if="userIsCreator">
							<MeetupsEditDetails :meetup="meetup" />
						</div>
						<v-spacer></v-spacer>
						<v-btn class="accent">Register</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import MeetupsEditDetails from '@/views/meetups/MeetupsEditDetails';

export default {
	name: 'MeetupsSingle',

	components: {
		MeetupsEditDetails,
	},

	props: ['id'],

	computed: {
		meetup() {
			return this.$store.getters.singleMeetup(this.id);
		},

		userIsAuthenticated() {
			return this.$store.getters.user !== null && this.$store.getters.user !== undefined;
		},

		userIsCreator() {
			if (!this.userIsAuthenticated) {
				return false;
			}

			return this.$store.getters.user.id === this.meetup.creatorId;
		},

		loading() {
			return this.$store.getters.loading;
		},
	},
};
</script>

<style></style>
