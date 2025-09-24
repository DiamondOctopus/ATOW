export class ATOWItemSheet extends HandlebarsApplicationMixin(foundry.applications.sheets.ItemSheetV2) {
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
            title: 'Item Sheet'
        }
    }
}