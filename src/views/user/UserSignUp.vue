<template>
	<v-container>
		<v-row justify="center">
			<v-col cols="12" sm="10" md="8" lg="6">
				<v-card ref="form">
					<v-card-subtitle>SIGN UP</v-card-subtitle>
					<v-divider class="mb-3"></v-divider>
					<v-card-text>
						<v-row>
							<v-col>
								<v-text-field
									ref="email"
									v-model="email"
									:rules="emailRules"
									:error-messages="errorMessages"
									label="E-mail"
									required
									prepend-icon="mdi-email"
								></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-text-field
									ref="password"
									v-model="password"
									type="password"
									:rules="passwordRules"
									:error-messages="errorMessages"
									label="Password"
									required
									prepend-icon="mdi-lock"
								></v-text-field>
							</v-col>
						</v-row>
						<v-divider class="mt-8"></v-divider>
						<v-card-actions>
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
							<v-btn color="accent" depressed @click="submit">Sign Up</v-btn>
						</v-card-actions>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'UserSignUp',

	data() {
		return {
			errorMessages: '',
			formHasErrors: false,
			email: null,
			emailRules: [
				(v) => !!v || 'This is a required field.',
				(v) => /.+@.+\..+/.test(v) || 'This field must be valid.',
			],
			password: null,
			passwordRules: [
				(v) => !!v || 'This is a required field.',
				(v) => (v && v.length >= 6) || 'Minimum password length is 6 characters.',
			],
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

		submit() {
			this.formHasErrors = false;

			Object.keys(this.form).forEach((f) => {
				if (!this.form[f]) this.formHasErrors = true;

				this.$refs[f].validate(true);
			});

			if (!this.formHasErrors) {
				this.$store.dispatch('userSignUp', {
					email: this.email,
					password: this.password,
				});
			}
		},
	},

	computed: {
		form() {
			return {
				email: this.email,
				password: this.password,
			};
		},

		user() {
			return this.$store.getters.user;
		},
	},

	watch: {
		name() {
			this.errorMessages = '';
		},

		user(value) {
			if (value !== null && value !== undefined) {
				this.$router.push('/');
			}
		},
	},
};
</script>

<style></style>
