<template>
	<v-app>
		<TheToolbar />
		<v-main>
			<v-container>
				<router-view></router-view>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import TheToolbar from '@/components/common/TheToolbar';

export default {
	name: 'App',

	components: {
		TheToolbar,
	},
};
</script>
