<template>
	<v-container>
		<v-row>
			<v-col>
				<v-card>
					<v-img class="white--text align-end" height="400px" :src="meetup.imageURL">
						<v-card-title>{{ meetup.title }}</v-card-title>
						<v-card-subtitle>{{ meetup.date }}</v-card-subtitle>
					</v-img>

					<v-card-text class="text--primary">
						<div>
							<strong>{{ meetup.location }}</strong>
						</div>

						<div>
							{{ meetup.description }}
						</div>
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn class="accent">Register</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'MeetupsSingle',

	props: ['id'],

	computed: {
		meetup() {
			return this.$store.getters.singleMeetup(this.id);
		},
	},
};
</script>

<style></style>
