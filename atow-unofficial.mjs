import {
    ATOWActor, ATOWItem, CharacterData, ActorData, WeaponData, ArmorData, CarryGearData, EquipData, ProstheticData, ConsumableData, LifeModules, HEModules
} from "./module/data-models.mjs";

import {ATOWActorSheet} from "./sheets/actor-sheet.mjs";
import {ATOWItemSheet} from "./sheets/item-sheet.mjs";

Hooks.once("init", () => {


    CONFIG.Actor.documentClass = ATOWActor;
    CONFIG.Item.documentClass = ATOWItem;

    //sheets
    Actors.unregisterSheet('core', ActorSheetV2);
    Actors.registerSheet('atow-unofficial', ATOWActorSheet,{
        makeDefault: true,
        label: 'ATOW Actor Sheet',
    });
    Items.unregisterSheet('core', ItemSheetV2);
    Items.unregisterSheet('atow-unofficial', ATOWItemSheet,{
        makeDefault: true,
        label: 'ATOW Item Sheet',
    });

    //config actors
    CONFIG.Actor.dataModels = {
        player: CharacterData,
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
      player: {
          bar: ["resources.health", "resources.fatigue"]
      }
    };

    //config initiative
    CONFIG.Combat.initiative = {
        formula: '2d6'
    }
});