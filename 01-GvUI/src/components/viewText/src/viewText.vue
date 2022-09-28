<template>
    <p :style="{ fontSize, fontWeight, color }">{{ value }}</p>
</template>

<script>
export default {
    name: 'LcText',
    props: {
        value: {
            type: String,
            require: true,
            default: '展示文本'
        },
        fontSize: {
            type: String,
            default: '20px'
        },
        fontWeight: {
            type: [String, Number],
            default: 700
        },
        color: {
            type: String,
            default: 'rgba(0,0,0,.65)'
        }
    }
};
</script>

<style scoped lang="scss">
@import '../../../style/viewText.scss';
</style>
