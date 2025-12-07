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
            resizeable: true,
            title: 'Character Sheet'
        },
        form: {
            submitOnChange: true, //haha oopsie
        },
    }


    static PARTS = {
        header: {
            template: 'systems/atow-unofficial/templates/actor-sheet-header.hbs',
        },
        tabs: {
            template: 'templates/generic/tab-navigation.hbs',
        },

        main: {
            template: 'systems/atow-unofficial/templates/actor-sheet-main.hbs',
        },
        ataglance: {
            template: 'systems/atow-unofficial/templates/tabs/ataglance.hbs',
            scrollable: [""],
        },
        inventory: {
            template: 'systems/atow-unofficial/templates/tabs/inventory.hbs',
            scrollable: [""],
        },

    }

    static TABS = {
        primary: {
            tabs: [
                {
                    id: "ataglance",
                    label: "At A Glance",
                },
                {
                    id: "inventory",
                    label: "Inventory",
                }

            ],
            initial: "ataglance",
        }
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

    _prepareItems(context) {
        context.items = this.actor.items;
        const gear = [];
        const weps = [];
        const armors = [];


        for (let i of context.items) {
            i.img - i.img || Item.DEFAULT_ICON;
            if (i.type === 'equipment') {
                gear.push(i);
            } else if (i.type === 'weapon') {
                weps.push(i);
            } else if (i.type === 'armor') {
                armors.push(i);
            }
        }

        context.gear = gear;
        context.weps = weps;
        context.armors = armors;
    }






}