import type {Action} from "./Action"

export class ActionManager {

  readonly actions: Action[] = []

  readonly undoneActions: Action[] = []

  execute(action: Action) {
    action.do()
    this.actions.push(action)
    this.emptyUndoneActions()
  }

  executeUndo() {
    const lastAction = this.actions.pop()
    if (lastAction) {
      lastAction.undo()
      this.undoneActions.push(lastAction)
    }
  }

  executeRedo() {
    const lastUndoneAction = this.undoneActions.pop()
    if (lastUndoneAction) {
      lastUndoneAction.redo()
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

  static of() {
    return new ActionManager()
  }
}