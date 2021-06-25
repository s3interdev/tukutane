<template>
	<v-app>
		<TheToolbar />
		<v-main>
			<router-view></router-view>
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
