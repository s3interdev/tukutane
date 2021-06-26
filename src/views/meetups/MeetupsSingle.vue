<template>
	<v-container>
		<v-row>
			<v-col>
				<v-card>
					<v-img
						class="white--text align-end"
						height="400px"
						src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Nairobi_skyline_P1000021.jpg"
					>
						<v-card-title>Meetup in Nairobi</v-card-title>
						<v-card-subtitle>Saturday, 26th June 2021</v-card-subtitle>
					</v-img>

					<v-card-text class="text--primary">
						<div><strong>Westlands, Crowne Plaza, Nairobi</strong></div>

						<div>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae culpa
							architecto quis qui sapiente pariatur voluptatem, esse sit sed iste
							voluptates necessitatibus commodi? Lorem ipsum dolor sit amet consectetur
							adipisicing elit. Animi, illo quo iusto est, aspernatur voluptates quod
							officiis, ullam quaerat excepturi ratione!
						</div>
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn class="primary">Register</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'MeetupsSingle',
};
</script>

<style></style>
