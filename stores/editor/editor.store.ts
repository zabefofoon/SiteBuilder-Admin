import {editDataMixin} from "~/stores/editor/mixins/editor.mixin"
import {messengerMixin} from "~/stores/editor/mixins/messenger.mixin"
import {actionMixin} from "~/stores/editor/mixins/action.mixin"
import {screenMixin} from "~/stores/editor/mixins/screen.mixin"

export const useEditorStore = defineStore('editor', () => {
  return {
    ...editDataMixin(),
    ...messengerMixin(),
    ...actionMixin(),
    ...screenMixin()
  }
})

export type EditorStore = ReturnType<typeof useEditorStore>;
