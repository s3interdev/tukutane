<template>
	<v-container>
		<v-row justify="center">
			<v-col cols="12" sm="10" md="8" lg="6">
				<v-card flat>
					<v-card-subtitle>ORGANIZE MEETUP</v-card-subtitle>
					<form @submit.prevent="onOrganizeMeetup">
						<v-container fluid>
							<v-row>
								<v-col>
									<v-text-field
										prepend-icon="mdi-clipboard-list"
										name="title"
										label="Meetup Title"
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
										prepend-icon="mdi-map-marker"
										name="location"
										label="Meetup Location"
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
										prepend-icon="mdi-location-enter"
										name="imageURL"
										label="Meetup Image URL"
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
										prepend-icon="mdi-comment"
										name="description"
										label="Meetup Description"
										id="description"
										placeholder="Meetup description"
										v-model="description"
										required
									></v-textarea>
								</v-col>
							</v-row>
							<v-row>
								<v-col>
									<v-menu
										v-model="dateMenu"
										:close-on-content-click="false"
										:nudge-right="40"
										transition="scale-transition"
										offset-y
										min-width="auto"
									>
										<template v-slot:activator="{ on, attrs }">
											<v-text-field
												v-model="date"
												label="Meetup Date"
												prepend-icon="mdi-calendar"
												readonly
												v-bind="attrs"
												v-on="on"
											></v-text-field>
										</template>
										<v-date-picker
											v-model="date"
											@input="dateMenu = false"
										></v-date-picker>
									</v-menu>
								</v-col>
							</v-row>
							<v-col>
								<v-row>
									<v-menu
										ref="menu"
										v-model="timeMenu"
										:close-on-content-click="false"
										:nudge-right="40"
										:return-value.sync="time"
										transition="scale-transition"
										offset-y
										max-width="290px"
										min-width="290px"
									>
										<template v-slot:activator="{ on, attrs }">
											<v-text-field
												v-model="time"
												label="Meetup Time"
												prepend-icon="mdi-clock"
												readonly
												v-bind="attrs"
												v-on="on"
											></v-text-field>
										</template>
										<v-time-picker
											v-if="timeMenu"
											v-model="time"
											full-width
											format="24hr"
											@click:minute="$refs.menu.save(time)"
										></v-time-picker>
									</v-menu>
								</v-row>
							</v-col>
						</v-container>
					</form>
					<v-card-actions>
						<v-btn color="accent" :disabled="!validForm" type="submit">
							Organize Meetup
						</v-btn>
					</v-card-actions>
				</v-card>
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
			date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
				.toISOString()
				.substr(0, 10),
			dateMenu: false,
			time: new Date(),
			timeMenu: false,
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
				date: this.selectedDateTime,
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

		selectedDateTime() {
			const date = new Date(this.date);

			if (typeof this.time === 'string') {
				let hours = this.time.match(/^(\d+)/)[1];
				let minutes = this.time.match(/:(\d+)/)[1];

				date.setHours(hours);
				date.setMinutes(minutes);
			} else {
				date.setHours(this.time.getHours());
				date.setMinutes(this.time.getMinutes());
			}

			return date;
		},
	},
};
</script>

<style></style>
