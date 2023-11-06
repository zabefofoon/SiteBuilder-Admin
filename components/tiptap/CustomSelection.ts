import {Mark, markInputRule, markPasteRule, mergeAttributes,} from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customSelection: {
      /**
       * Set an italic mark
       */
      setCustomSelection: () => ReturnType,
      /**
       * Toggle an italic mark
       */
      toggleCustomSelection: () => ReturnType,
      /**
       * Unset an italic mark
       */
      unsetCustomSelection: () => ReturnType,
    }
  }
}

export const starInputRegex = /(?:^|\s)((?:\*)((?:[^*]+))(?:\*))$/
export const starPasteRegex = /(?:^|\s)((?:\*)((?:[^*]+))(?:\*))/g
export const underscoreInputRegex = /(?:^|\s)((?:_)((?:[^_]+))(?:_))$/
export const underscorePasteRegex = /(?:^|\s)((?:_)((?:[^_]+))(?:_))/g

export const CustomSelection = Mark.create({
  name: 'customSelection',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  renderHTML({HTMLAttributes}) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, {
      ...HTMLAttributes,
      class: 'focused',
    }), 0]
  },

  addCommands() {
    return {
      setCustomSelection: () => ({commands}) => {
        return commands.setMark(this.name)
      },
      toggleCustomSelection: () => ({commands}) => {
        return commands.toggleMark(this.name)
      },
      unsetCustomSelection: () => ({commands}) => {
        return commands.unsetMark(this.name)
      },
    }
  },

  addInputRules() {
    return [
      markInputRule({
        find: starInputRegex,
        type: this.type,
      }),
      markInputRule({
        find: underscoreInputRegex,
        type: this.type,
      }),
    ]
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: starPasteRegex,
        type: this.type,
      }),
      markPasteRule({
        find: underscorePasteRegex,
        type: this.type,
      }),
    ]
  },
})
