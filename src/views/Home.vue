<template>
	<v-container>
		<v-row align="center" justify="space-around">
			<v-col class="text-center">
				<v-btn color="info" large router to="/meetups">Explore Meetups</v-btn>
			</v-col>
			<v-col class="text-center">
				<v-btn color="secondary" large router to="/meetups/organize-meetup">
					Organize Meetup
				</v-btn>
			</v-col>
		</v-row>
		<v-row align="center" justify="space-around">
			<v-col class="text-center">
				<v-carousel>
					<v-carousel-item
						v-for="meetup in meetups"
						:key="meetup.id"
						:src="meetup.imageURL"
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

	data() {
		return {
			meetups: [
				{
					imageURL:
						'https://upload.wikimedia.org/wikipedia/commons/e/ec/Aerial_View_of_Sea_Point%2C_Cape_Town_South_Africa.jpg',
					id: 'cape-town',
					title: 'Meetup in Cape Town',
				},
				{
					imageURL:
						'https://www.proudtanzaniasafaris.com/wp-content/uploads/2019/07/DarEsSalaam.jpg',
					id: 'dar-es-salaam',
					title: 'Meetup in Dar-es-Salaam',
				},
				{
					imageURL:
						'https://cdn.pixabay.com/photo/2017/06/06/03/35/kampala-2376011_1280.jpg',
					id: 'kampala',
					title: 'Meetup in Kampala',
				},
				{
					imageURL: 'https://live.staticflickr.com/65535/50409058181_e508db66fb_b.jpg',
					id: 'lagos',
					title: 'Meetup in Lagos',
				},
				{
					imageURL:
						'https://cdn.pixabay.com/photo/2014/02/21/22/33/old-port-271664_1280.jpg',
					id: 'mombasa',
					title: 'Meetup in Mombasa',
				},
				{
					imageURL: 'https://live.staticflickr.com/8794/16703357583_45fe283970_b.jpg',
					id: 'nairobi-a',
					title: 'Meetup in Nairobi',
				},
				{
					imageURL:
						'https://upload.wikimedia.org/wikipedia/en/b/b2/Nairobi_uhuru_park.JPG',
					id: 'nairobi-b',
					title: 'Meetup in Downtown Nairobi',
				},
			],
		};
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
</style>
