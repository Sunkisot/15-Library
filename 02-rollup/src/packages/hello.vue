<template>
  <div class="hello">{{ msg }}</div>
</template>

<script>
export default {
  name: "Hello",
  data() {
    return {
      msg: "123",
    };
  },
};
</script>

<style scoped>
.hello {
  color: red
}
</style>