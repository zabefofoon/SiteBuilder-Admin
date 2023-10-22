import {ResponsiveMode} from "~/models/Node"
import {computed} from "#imports"

export type ScreenSize = {
  width: string
  height: string
}

export const screenMixin = () => {
  const screenSize = ref<ResponsiveMode>('large')

  const calculatedScreenSize = computed((): ScreenSize => {
    const width = screenSize.value === 'large' ? '100%' : '390px'
    return {width, height: '100%'}
  })

  const setScreenSize = (value: ResponsiveMode) => screenSize.value = value

  return {
    screenSize,
    setScreenSize,
    calculatedScreenSize
  }
}