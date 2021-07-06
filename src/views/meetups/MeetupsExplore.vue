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
		<v-row justify="center">
			<v-col cols="12" sm="10" md="8" lg="6" v-for="meetup in meetups" :key="meetup.id">
				<v-card>
					<v-img
						class="white--text align-end"
						gradient="to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)"
						height="200px"
						:src="meetup.imageURL"
					>
						<v-card-title>{{ meetup.title }}</v-card-title>
						<v-card-subtitle>{{ meetup.date | date }}</v-card-subtitle>
					</v-img>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="info" depressed :to="'/meetups/' + meetup.id">
							<v-icon left>mdi-arrow-right</v-icon>
							View Meetup
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'MeetupsExplore',

	computed: {
		meetups() {
			return this.$store.getters.allMeetups;
		},

		loading() {
			return this.$store.getters.loading;
		},
	},
};
</script>

<style></style>
