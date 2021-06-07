<template>
  <div>
    <div ref="copyThis">Bu yazı kopyalandı!</div>
    <button type="button" @click="copy">Kopyala!</button>
  </div>
</template>

<script>
export default {
  methods: {
    copy() {
      this.$copyTextWithToast({ text: this.$refs.copyThis.innerText });
    },
  },
};
</script>
