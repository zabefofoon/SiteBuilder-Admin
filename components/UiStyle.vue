<script lang="ts">
import {defineComponent, h} from 'vue'

export default defineComponent({
  setup(props, {attrs, slots}) {
    return () => h("style", attrs, slots)
  }
})
</script>