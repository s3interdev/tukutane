<template>
	<v-container>
		<v-row justify="center">
			<v-col cols="12" sm="10" md="8" lg="6">
				<h4>ORGANIZE A MEETUP</h4>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col cols="12" sm="10" md="8" lg="6">
				<form @submit.prevent="onOrganizeMeetup">
					<v-row>
						<v-col>
							<v-text-field
								name="title"
								label="Title"
								id="title"
								placeholder="Meetup title"
								v-model="title"
								required
							></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-text-field
								name="location"
								label="Location"
								id="location"
								placeholder="Meetup location"
								v-model="location"
								required
							></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-text-field
								name="imageURL"
								label="Image URL"
								id="imageURL"
								placeholder="Meetup image URL"
								v-model="imageURL"
								required
							></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-img :src="imageURL" max-height="250" max-width="500"></v-img>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-textarea
								name="description"
								label="Description"
								id="description"
								placeholder="Meetup description"
								v-model="description"
								required
							></v-textarea>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-btn class="accent" :disabled="!validForm" type="submit">
								Organize Meetup
							</v-btn>
						</v-col>
					</v-row>
				</form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'MeetupsOrganize',

	data() {
		return {
			title: '',
			location: '',
			imageURL: '',
			description: '',
		};
	},

	methods: {
		onOrganizeMeetup() {
			if (!this.validForm) {
				return;
			}

			const meetupData = {
				title: this.title,
				location: this.location,
				imageURL: this.imageURL,
				description: this.description,
				date: new Date(),
			};

			this.$store.dispatch('organizeMeetup', meetupData);
			this.$router.push('/meetups');
		},
	},

	computed: {
		validForm() {
			return (
				this.title !== '' &&
				this.location !== '' &&
				this.imageURL !== '' &&
				this.description !== ''
			);
		},
	},
};
</script>

<style></style>
