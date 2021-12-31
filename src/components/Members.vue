<template>
  <div>
    Day la {{ firstName }} {{ lastName }}
    <button @click="$emit('increase-salary')">Increase</button>
  </div>
</template>

<script>
export default {
  props: ['firstName', 'lastName'],
}
</script>