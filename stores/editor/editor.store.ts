import {editDataMixin} from "~/stores/editor/mixins/editor.mixin"
import {messengerMixin} from "~/stores/editor/mixins/messenger.mixin"
import {actionMixin} from "~/stores/editor/mixins/action.mixin"
import {screenMixin} from "~/stores/editor/mixins/screen.mixin"
import {widgetMixin} from "~/stores/editor/mixins/widget.mixin"
import {tiptapMixin} from "~/stores/editor/mixins/tiptap.mixin"
import {modalMixin} from "~/stores/editor/mixins/modal.mixin"

export const useEditorStore = defineStore('editor', () => {
  return {
    ...editDataMixin(),
    ...messengerMixin(),
    ...actionMixin(),
    ...screenMixin(),
    ...widgetMixin(),
    ...tiptapMixin(),
    ...modalMixin(),
  }
})

export type EditorStore = ReturnType<typeof useEditorStore>;
