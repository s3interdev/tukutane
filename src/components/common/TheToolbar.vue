<template>
	<div>
		<v-navigation-drawer absolute temporary v-model="drawer">
			<v-list shaped>
				<v-subheader class="text-h6">Tukutane</v-subheader>
				<v-list-item-group color="primary" v-model="selectedMenuItem">
					<v-list-item
						v-for="menuItem in menuItems"
						:key="menuItem.text"
						:to="menuItem.link"
					>
						<v-list-item-icon>
							<v-icon>{{ menuItem.icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-title>{{ menuItem.text }}</v-list-item-title>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar color="primary" dark app>
			<v-app-bar-nav-icon
				class="d-md-none"
				@click="drawer = !drawer"
			></v-app-bar-nav-icon>
			<v-toolbar-title class="text-h5">
				<router-link to="/" custom v-slot="{ navigate }" style="cursor: pointer">
					<span @click="navigate" role="link">Tukutane</span>
				</router-link>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items class="d-none d-md-block">
				<v-btn
					color="primary"
					depressed
					v-for="menuItem in menuItems"
					:key="menuItem.text"
					:to="menuItem.link"
				>
					<v-icon left dark>{{ menuItem.icon }}</v-icon>
					{{ menuItem.text }}
				</v-btn>
			</v-toolbar-items>
		</v-app-bar>
	</div>
</template>

<script>
export default {
	name: 'TheToolbar',

	data() {
		return {
			drawer: false,
			selectedMenuItem: 0,
			menuItems: [
				{ text: 'Explore Meetups', icon: 'mdi-account-group', link: '/meetups' },
				{
					text: 'Organize Meetup',
					icon: 'mdi-bullhorn',
					link: '/meetups/organize-meetup',
				},
				{ text: 'View Profile', icon: 'mdi-account', link: '/profile' },
				{ text: 'Sign Up', icon: 'mdi-clipboard-edit', link: '/sign-up' },
				{ text: 'Sign In', icon: 'mdi-lock-open', link: '/sign-in' },
			],
		};
	},
};
</script>

<style></style>
