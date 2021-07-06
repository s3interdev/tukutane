<template>
	<v-container>
		<v-row justify="center">
			<v-col cols="12" sm="10" md="8" lg="6">
				<v-card ref="form">
					<v-card-title>
						<span class="text-h5">ORGANIZE MEETUP</span>
					</v-card-title>
					<v-divider class="mb-3"></v-divider>
					<v-card-text>
						<v-row>
							<v-col>
								<v-text-field
									ref="title"
									v-model="title"
									:rules="requiredFieldRule"
									:error-messages="errorMessages"
									label="Meetup Title"
									required
									prepend-icon="mdi-clipboard-list"
								></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-text-field
									ref="location"
									v-model="location"
									:rules="requiredFieldRule"
									:error-messages="errorMessages"
									label="Meetup Location"
									required
									prepend-icon="mdi-map-marker"
								></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-file-input
									ref="meetupImage"
									v-model="meetupImage"
									:rules="requiredFieldRule"
									:error-messages="errorMessages"
									label="Meetup Image"
									accept="image/png, image/jpeg, image/jpg"
									required
									prepend-icon="mdi-camera"
									@change="onFileSelected"
								></v-file-input>
							</v-col>
						</v-row>
						<v-row justify="center">
							<v-col cols="12" sm="10" md="8" lg="6">
								<v-img :src="previewImage" max-height="250" max-width="500"></v-img>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-textarea
									ref="description"
									v-model="description"
									:rules="requiredFieldRule"
									:error-messages="errorMessages"
									label="Meetup Description"
									counter
									maxlength="300"
									required
									prepend-icon="mdi-comment"
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
											ref="date"
											v-model="date"
											label="Meetup Date"
											prepend-icon="mdi-calendar"
											readonly
											v-bind="attrs"
											v-on="on"
										></v-text-field>
									</template>
									<v-date-picker v-model="date" @input="dateMenu = false"></v-date-picker>
								</v-menu>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
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
											ref="time"
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
							</v-col>
						</v-row>
						<v-divider class="mt-8"></v-divider>
						<v-card-actions>
							<v-btn color="secondary" depressed @click="close">Close</v-btn>
							<v-spacer></v-spacer>
							<v-slide-x-reverse-transition>
								<v-tooltip left v-if="formHasErrors">
									<template v-slot:activator="{ on, attrs }">
										<v-btn class="my-0" icon v-bind="attrs" @click="resetForm" v-on="on">
											<v-icon>mdi-refresh</v-icon>
										</v-btn>
									</template>
									<span>Refresh Form</span>
								</v-tooltip>
							</v-slide-x-reverse-transition>
							<v-btn color="accent" depressed @click="submit">Organize Meetup</v-btn>
						</v-card-actions>
					</v-card-text>
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
			errorMessages: '',
			formHasErrors: false,
			title: null,
			location: null,
			meetupImage: null,
			previewImage: null,
			description: null,
			date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
				.toISOString()
				.substr(0, 10),
			time: '14:30',
			dateMenu: false,
			timeMenu: false,
			requiredFieldRule: [(v) => !!v || 'This is a required field.'],
		};
	},

	methods: {
		resetForm() {
			this.errorMessages = [];
			this.formHasErrors = false;

			Object.keys(this.form).forEach((f) => {
				this.$refs[f].reset();
			});
		},

		close() {
			this.$router.push('/meetups');
		},

		onFileSelected(image) {
			this.meetupImage = image;
			this.previewImage = URL.createObjectURL(this.meetupImage);
		},

		submit() {
			this.formHasErrors = false;

			Object.keys(this.form).forEach((f) => {
				if (!this.form[f]) this.formHasErrors = true;

				this.$refs[f].validate(true);
			});

			if (!this.formHasErrors) {
				const meetupData = {
					title: this.title,
					location: this.location,
					meetupImage: this.meetupImage,
					description: this.description,
					date: this.formattedDateAndTime,
				};

				this.$store.dispatch('organizeMeetup', meetupData);
				this.$router.push('/meetups');
			}
		},
	},

	computed: {
		form() {
			return {
				title: this.title,
				location: this.location,
				description: this.description,
				meetupImage: this.meetupImage,
				date: this.date,
				time: this.time,
			};
		},

		formattedDateAndTime() {
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

	watch: {
		name() {
			this.errorMessages = '';
		},
	},
};
</script>

<style></style>
