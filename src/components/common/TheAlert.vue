<template>
	<v-alert border="left" color="error" dark dismissible @input="onClose" :value="true">
		{{ text }}
	</v-alert>
</template>

<script>
export default {
	props: ['text'],

	methods: {
		onClose() {
			this.$emit('closing');
		},
	},
};
</script>

<style></style>
