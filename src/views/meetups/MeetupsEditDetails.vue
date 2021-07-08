<template>
	<div class="text-center">
		<v-dialog persistent max-width="600px" v-model="dialog">
			<template v-slot:activator="{ on, attrs }">
				<v-btn color="error" dark v-bind="attrs" v-on="on">
					EDIT MEETUP
				</v-btn>
			</template>
			<v-card ref="form">
				<v-card-title>
					<span class="text-h5">EDIT MEETUP</span>
				</v-card-title>
				<v-divider class="mb-3"></v-divider>
				<v-card-text>
					<v-container>
						<v-row>
							<v-col cols="12">
								<v-text-field
									prepend-icon="mdi-clipboard-list"
									label="Meetup Title"
									v-model="title"
									required
								></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-textarea
									prepend-icon="mdi-comment"
									label="Meetup Description"
									counter
									maxlength="300"
									v-model="description"
									required
								></v-textarea>
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>
				<v-divider class="mt-8"></v-divider>
				<v-card-actions>
					<v-btn color="secondary" depressed @click="dialog = false">Close</v-btn>
					<v-spacer></v-spacer>
					<v-btn color="accent" depressed @click="submitChanges">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	name: 'MeetupsEditDetails',

	props: ['meetup'],

	data() {
		return {
			dialog: false,
			title: this.meetup.title,
			description: this.meetup.description,
		};
	},

	methods: {
		submitChanges() {
			if (this.title.trim() === '' || this.description.trim() === '') {
				return;
			}

			this.dialog = false;
			this.$store.dispatch('updateMeetup', {
				id: this.meetup.id,
				title: this.title,
				description: this.description,
			});
		},
	},

	computed: {
		form() {
			return {
				title: this.title,
				description: this.description,
			};
		},
	},
};
</script>

<style></style>
