<template>
	<v-container>
		<v-row>
			<v-col v-for="meetup in meetups" :key="meetup.id">
				<v-card>
					<v-img
						class="white--text align-end"
						gradient="to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)"
						height="200px"
						:src="meetup.imageURL"
					>
						<v-card-title>{{ meetup.title }}</v-card-title>
						<v-card-subtitle>{{ meetup.date }}</v-card-subtitle>
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
	},
};
</script>

<style></style>
