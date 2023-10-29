<template>
  Video<br/>{{node}}
</template>

<script setup lang="ts">
import {Node as NodeClass} from '~/models/Node'

defineProps<{
  node: NodeClass
}>()
</script>

<style lang="scss" scoped>

</style>