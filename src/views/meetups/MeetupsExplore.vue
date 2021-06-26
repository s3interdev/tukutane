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
						<v-btn color="info" depressed to="/meetups/1">
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

	data() {
		return {
			meetups: [
				{
					imageURL:
						'https://upload.wikimedia.org/wikipedia/commons/e/ec/Aerial_View_of_Sea_Point%2C_Cape_Town_South_Africa.jpg',
					id: 'cape-town',
					title: 'Meetup in Cape Town',
					date: 'Saturday, 26th June 2021',
				},
				{
					imageURL:
						'https://www.proudtanzaniasafaris.com/wp-content/uploads/2019/07/DarEsSalaam.jpg',
					id: 'dar-es-salaam',
					title: 'Meetup in Dar-es-Salaam',
					date: 'Saturday, 26th June 2021',
				},
				{
					imageURL:
						'https://cdn.pixabay.com/photo/2017/06/06/03/35/kampala-2376011_1280.jpg',
					id: 'kampala',
					title: 'Meetup in Kampala',
					date: 'Saturday, 26th June 2021',
				},
				{
					imageURL: 'https://live.staticflickr.com/65535/50409058181_e508db66fb_b.jpg',
					id: 'lagos',
					title: 'Meetup in Lagos',
					date: 'Saturday, 26th June 2021',
				},
				{
					imageURL:
						'https://cdn.pixabay.com/photo/2014/02/21/22/33/old-port-271664_1280.jpg',
					id: 'mombasa',
					title: 'Meetup in Mombasa',
					date: 'Saturday, 26th June 2021',
				},
				{
					imageURL: 'https://live.staticflickr.com/8794/16703357583_45fe283970_b.jpg',
					id: 'nairobi-a',
					title: 'Meetup in Nairobi',
					date: 'Saturday, 26th June 2021',
				},
				{
					imageURL:
						'https://upload.wikimedia.org/wikipedia/commons/a/ae/Nairobi_skyline_P1000021.jpg',
					id: 'nairobi-b',
					title: 'Meetup in Downtown Nairobi',
					date: 'Saturday, 26th June 2021',
				},
			],
		};
	},
};
</script>

<style></style>
