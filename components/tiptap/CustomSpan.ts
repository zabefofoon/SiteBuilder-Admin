import {Mark, markInputRule, markPasteRule, mergeAttributes,} from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customSpan: {
      /**
       * Set an italic mark
       */
      setCustomSpan: () => ReturnType,
      /**
       * Toggle an italic mark
       */
      toggleCustomSpan: () => ReturnType,
      /**
       * Unset an italic mark
       */
      unsetCustomSpan: () => ReturnType,
    }
  }
}

export const starInputRegex = /(?:^|\s)((?:\*)((?:[^*]+))(?:\*))$/
export const starPasteRegex = /(?:^|\s)((?:\*)((?:[^*]+))(?:\*))/g
export const underscoreInputRegex = /(?:^|\s)((?:_)((?:[^_]+))(?:_))$/
export const underscorePasteRegex = /(?:^|\s)((?:_)((?:[^_]+))(?:_))/g

export const CustomSpan = Mark.create({
  name: 'customSpan',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  parseHTML() {
    return [
      {
        style: 'color=red',
      },
    ]
  },

  renderHTML({HTMLAttributes}) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, {
      ...HTMLAttributes,
      style: `color: red;`
    }), 0]
  },

  addCommands() {
    return {
      setCustomSpan: () => ({commands}) => {
        return commands.setMark(this.name)
      },
      toggleCustomSpan: () => ({commands}) => {
        return commands.toggleMark(this.name)
      },
      unsetCustomSpan: () => ({commands}) => {
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
