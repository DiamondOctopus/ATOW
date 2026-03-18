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
        classes: ['atow', 'sheet', 'actor'],
        position: {
            width: 600,
            height: 600
        },
        window: {
            resizeable: true
        },
        form: {
            submitOnChange: true, //haha oopsie
        },
    }



    async _prepareContext(options) {
        const context = await super._prepareContext(options);

        context.system = this.actor.system;
        context.flags = this.actor.flags;
        context.actor = this.actor;
        context.config = CONFIG.ATOW;

        if(this.actor.type === 'character') {
            this._prepareItems(context);
            this._prepareCharacterData(context);
        }

        if(this.actor.type === 'npc' || this.actor.type === 'enemy') {
            this._prepareItems(context);
        }

        context.enrichedBiography = await foundry.applications.ux.TextEditor.implementation.enrichHTML(
            this.actor.system.biography,
            {
                secrets: this.document.isOwner,
                relativeTo: this.actor,
            }
        );

       return context;
    }


    _prepareCharacterData(context) {

    }
    //nice boxes to call things easily - remember: documents get added to the this.actor.items by dragdrop automatically
    _prepareItems(context) {
        context.items = this.actor.items;
        const gear = [];
        const weapons = [];
        const armors = [];
        const consumables = []
        const carrygear = [];
        const lifemods = [];
        const highered = [];


        for (let i of context.items) {
            i.img - i.img || Item.DEFAULT_ICON;
            if (i.type === 'equipment') {
                gear.push(i);
            } else if (i.type === 'weapon') {
                weapons.push(i);
            } else if (i.type === 'armor') {
                armors.push(i);
            } else if (i.type === 'consumables') {
                consumables.push(i);
            } else if (i.type === 'carrygear') {
                carrygear.push(i);
            } else if (i.type === 'lifemodules') {
                lifemods.push(i);
            } else if (i.type === 'highereducation') {
                highered.push(i);
            }
        }

        context.gear = gear;
        context.weapons = weapons;
        context.armors = armors;
        context.consumables = consumables;
        context.carrygear = carrygear;
        context.lifemodules = lifemods;
        context.highereducation = highered;
    }

    async _prepareEmbeddedDocuments() {

    }
}




