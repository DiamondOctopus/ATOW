import {
    ATOWActor, ATOWItem, CharacterData, ActorData, WeaponData, ArmorData, CarryGearData, EquipData, ProstheticData, ConsumableData, LifeModules, HEModules
} from "./module/data-models.mjs";

import {ATOWActorSheet} from "./sheets/actor-sheet.mjs";
import {ATOWItemSheet} from "./sheets/item-sheet.mjs";

Hooks.once("init", () => {


    CONFIG.Actor.documentClass = ATOWActor;
    CONFIG.Item.documentClass = ATOWItem;

    //sheets
    foundry.documents.collections.Actors.unregisterSheet('core', foundry.applications.sheets.ActorSheetV2);
    foundry.documents.collections.Actors.registerSheet('atow-unofficial', ATOWActorSheet,{
        makeDefault: true,
        label: 'ATOW Actor Sheet',
    });
    foundry.documents.collections.Items.unregisterSheet('core', foundry.applications.sheets.ItemSheetV2);
    foundry.documents.collections.Items.registerSheet('atow-unofficial', ATOWItemSheet,{
        makeDefault: true,
        label: 'ATOW Item Sheet',
    });

    //config actors
    CONFIG.Actor.dataModels = {
        character: CharacterData,
        npc: ActorData,
        enemy: ActorData
    };

    //config items
    CONFIG.Item.dataModels = {
        weapon: WeaponData,
        armor: ArmorData,
        equipment: EquipData,
        prosthetic: ProstheticData,
        consumable: ConsumableData,
        carrygear: CarryGearData,
        lifemodules: LifeModules,
        highereducation:  HEModules
    };

    //config trackables
    CONFIG.Actor.trackableAttributes = {
      character: {
          bar: ["resources.health", "resources.fatigue"]
      }
    };

    //config initiative
    CONFIG.Combat.initiative = {
        formula: '2d6'
    }
});