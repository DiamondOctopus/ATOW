import {ATOWActorSheet} from "./actor-sheet.mjs";

export class ATOWCharacterSheet extends ATOWActorSheet {


    static PARTS = {
        header: {
            template: 'systems/atow-unofficial/templates/actor-sheet-header.hbs',
        },
        tabs: {
            template: 'templates/generic/tab-navigation.hbs',
        },
        ataglance: {
            template: 'systems/atow-unofficial/templates/tabs/ataglance.hbs',
            scrollable: [""],
        },
        inventory: {
            template: 'systems/atow-unofficial/templates/tabs/inventory.hbs',
            scrollable: [""],
        },
        main: {
            template: 'systems/atow-unofficial/templates/actor-sheet-main.hbs',
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


}

//todo make life modules affect stats - i think this is for prepareEmbeddedDocuments?
