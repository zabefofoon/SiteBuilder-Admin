import {useEditorStore} from "~/stores/editor/editor.store"
import {WidgetBrief} from "~/models/Widget"

const widgetCategories = [
  {
    code: 'text',
    name: 'Text'
  }, {
    code: 'media',
    name: 'Media'
  }, {
    code: 'custom',
    name: 'Custom'
  }
]

const widgetBriefs: WidgetBrief[] = [
  {
    code: 'textEditor',
    name: 'TextEditor',
    description: 'Simple Text Editor',
    thumbnail: '',
    category: 'text'
  },
  {
    code: 'picture',
    name: 'Picture',
    description: 'Responsive Image',
    thumbnail: '',
    category: 'media'
  },
  {
    code: 'video',
    name: 'Video',
    description: 'Local Video',
    thumbnail: '',
    category: 'media'
  },
  {
    code: 'youtube',
    name: 'Youtube',
    description: 'Youtube Embedded',
    thumbnail: '',
    category: 'media'
  },
  {
    code: 'carousel',
    name: 'Carousel',
    description: 'Carousel Slider',
    thumbnail: '',
    category: 'media'
  },
  {
    code: 'imageMap',
    name: 'Image Map',
    description: 'Can create area for link',
    thumbnail: '',
    category: 'media'
  }
]

export const widgetMixin = () => {
  const editorStore = useEditorStore()

  const isShowWidgets = ref(false)
  const showWidgets = (value: boolean) => isShowWidgets.value = value

  watch(() => editorStore.editData?.selectedNodeIds,
      () => editorStore.showWidgets(false))

  return {
    widgetCategories,
    widgetBriefs,
    isShowWidgets,
    showWidgets
  }
}