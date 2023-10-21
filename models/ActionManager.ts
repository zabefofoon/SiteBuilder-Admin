import type {Action} from "./Action"
import {EditorStore} from "~/stores/editor/editor.store"

export class ActionManager {

  readonly actions: Action[] = []

  readonly undoneActions: Action[] = []

  constructor(private readonly editorStore: EditorStore) {
  }

  execute(action: Action) {
    action.do(this.editorStore)
    this.actions.push(action)
    this.emptyUndoneActions()
  }

  executeUndo() {
    const lastAction = this.actions.pop()
    if (lastAction) {
      lastAction.undo(this.editorStore)
      this.undoneActions.push(lastAction)
    }
  }

  executeRedo() {
    const lastUndoneAction = this.undoneActions.pop()
    if (lastUndoneAction) {
      lastUndoneAction.redo(this.editorStore)
      this.actions.push(lastUndoneAction)
    }
  }

  emptyActions(): void {
    this.actions.splice(0, this.actions.length)
    this.emptyUndoneActions()
  }

  private emptyUndoneActions(): void {
    this.undoneActions.splice(0, this.undoneActions.length)
  }

  static of(editorStore: EditorStore) {
    return new ActionManager(editorStore)
  }
}