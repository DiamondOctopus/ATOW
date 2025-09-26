const { HandlebarsApplicationMixin } = foundry.applications.api
const { ActorSheetV2 } = foundry.applications.sheets

export class ATOWActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
    // ActorSheetV2 automatically provides:
    // - DragDrop setup with '.draggable' selector in _onRender()
    // - Permission checks via _canDragStart/_canDragDrop (checks isEditable)
    // - Basic item dragging for elements with data-item-id
    // - Active effect dragging for elements with data-effect-id
    // - Item sorting within the same actor via _onSortItem
    // - Document drop handling with delegation to _onDropItem, _onDropActiveEffect, etc.
    static DEFAULT_OPTIONS = {
        position: {
            width: 600,
            height: 600
        },
        window: {
            resizeable: true,
            title: 'Character Sheet'
        },
    }

    static TABS = {
        initial: "main",
        tabs: [
            {
                id: "main",
                label: "Main"
            },
            {
                id: "inventory",
                label: "Inventory"
            }
        ]

    }

    static PARTS = {
        form: {
            template: 'systems/atow-unofficial/templates/actor-sheet.hbs'
        }
    }
//    async _prepareContext() {
//        const context = await super.perpareContext()
//        context.system = this.actor.system
//        context.flags = this.actor.flags
//        return context
//    }
}