<template>
	<v-app>
		<v-navigation-drawer absolute temporary v-model="drawer">
			<v-list shaped>
				<v-subheader>Tukutane</v-subheader>
				<v-list-item-group color="primary" v-model="group">
					<v-list-item>
						<v-list-item-icon>
							<v-icon>mdi-account-group</v-icon>
						</v-list-item-icon>
						<v-list-item-title>View Meetups</v-list-item-title>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar color="primary" dark app>
			<v-app-bar-nav-icon
				class="d-sm-none"
				@click="drawer = !drawer"
			></v-app-bar-nav-icon>
			<v-toolbar-title>Tukutane</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn class="d-none d-sm-block" color="primary" depressed>
				<v-icon left>mdi-account-group</v-icon>
				View Meetups
			</v-btn>
		</v-app-bar>
		<v-main></v-main>
	</v-app>
</template>

<script>
export default {
	name: 'App',

	data() {
		return {
			drawer: false,
			group: null,
		};
	},
};
</script>
