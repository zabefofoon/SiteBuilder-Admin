export const widgetMixin = () => {
  const isShowWidgets = ref(false)
  const showWidgets = (value: boolean) => isShowWidgets.value = value

  return {
    isShowWidgets,
    showWidgets
  }
}