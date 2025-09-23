import {Skills, AffCodes} from "./module/lists.js";
// data model
const { HTMLField, NumberField, SchemaField, StringField, BooleanField } = foundry.data.fields;

class ActorDataModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        return {
            resources: new SchemaField({
                health: new SchemaField({
                    min: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                    value: new NumberField({required: true, integer: true, min: 0, initial: 10}),
                    max: new NumberField({required: true, integer: true, min: 0, initial: 10})
                }),
                fatigue: new SchemaField({
                    min: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                    value: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                    max: new NumberField({required: true, integer: true, min: 0, initial: 0})
                })
            })
        };
    }
}

class CharacterActorDataModel extends ActorDataModel {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            experienceTotal: new NumberField({required: true, integer: true}),
            experienceSpendable: new NumberField({required: true, integer: true}),
            background: new SchemaField({
                biography: new HTMLField({required: true, blank:true}),
                height: new StringField({required: true, blank:true}),
                weight: new StringField({required: true, blank:true}),
                eyeColor: new StringField({required: true, blank:true}),
                hairColor: new StringField({required: true, blank:true})
            }),
            money: new NumberField({required: true, blank:true})
        };
    }
}

class ItemDataModel extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        return {
          cost: new NumberField({required: true, integer: true, min: 0, initial: 0}),
            aff: new StringField({
                required: true,
                blank:false,
                options: [...AffCodes, "none"],
                initial: "none"
          }),
            mass: new NumberField({required: true, min: 0, initial: 0}),
            usesPower: new BooleanField({required: true, initial: false}),
            powerCap: new NumberField({required: true, integer: true, min: 0, initial: 0}),
            powerDraw: new NumberField({required: true, integer: true, min: 0, initial: 0}),
            useSkill: new StringField({
                required: true,
                blank:false,
                options: [...Skills, "none"],
                initial: "none"
            })
        };
    }
}

export class WeaponDataModel extends ItemDataModel {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            damage: new NumberField({required: true, integer: true, min: 0, initial: 1}),
            penetration: new NumberField({required: true, integer: true, min: 0, initial: 0}),
            shots: new NumberField({required: true, integer: true, min: 0, initial: 0}),
            APCode: new StringField({
                required: true,
                blank: true
            }),
            BDCode: new StringField({
                required: true,
                blank: true
            }),
            burst: new BooleanField({required: true, initial: false}),
            burstShots: new NumberField({required: true, integer: true, min: 0, initial: 0}),
            massReload: new NumberField({required: true, min: 0, initial: 0}),
            costReload: new NumberField({required: true, integer: true, min: 0, initial: 0})
        };
    }
}

export class ArmorDataModel extends ItemDataModel {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            mDef: new NumberField({required: true, integer: true, min: 0, initial: 0}),
            bDef: new NumberField({required: true, integer: true, min: 0, initial: 0}),
            eDef: new NumberField({required: true, integer: true, min: 0, initial: 0}),
            xDef: new NumberField({required: true, integer: true, min: 0, initial: 0}),
            costPatch: new NumberField({required: true, integer: true, min: 0, initial: 0})
        }
    }
}