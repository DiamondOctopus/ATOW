const {
    HTMLField, SchemaField, NumberField, StringField, FilePathField, ArrayField, BooleanField
} = foundry.data.fields;

const requiredInteger = {required: true, integer:true, nullable: false};

/**
 *
 *                              Item Data
 *
 **/
import {AffCodes, Skills} from "../lists.mjs";

class BaseItemData extends foundry.abstract.TypeDataModel {
    static defineSchema() {

    }

    prepareDerivedData() {
        super.prepareDerivedData();
    }
}

export class LifeModules extends BaseItemData {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            //todo add life modules
        }
    }

    prepareDerivedData() {
        super.prepareDerivedData();
    }
}

export class HEModules extends LifeModules {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            //todo add higher education modules + rebates
        }
    }

    prepareDerivedData() {
        super.prepareDerivedData();
        //todo HE rebates calcs
    }
}

/**
 *                           Equipment
 **/

export class EquipData extends BaseItemData {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            cost: new NumberField({...requiredInteger, min: 0, initial: 0}),
            aff: new StringField({
                required: true,
                blank: false,
                options: [...AffCodes, "none"],
                initial: "none"
            }),
            mass: new NumberField({required: true, min: 0, initial: 0}),
            usesPower: new BooleanField({required: true, initial: false}), //wow if only js had multiple inheritance
            powerCap: new NumberField({...requiredInteger, min: 0, initial: 0}), //todo implement these values only being used if usesPower True
            powerDraw: new NumberField({...requiredInteger, min: 0, initial: 0}),
            useSkill: new StringField({
                required: true,
                blank: false,
                options: [...Skills, "none"],
                initial: "none"
            }),
            isSubduing: new BooleanField({required: true, initial: false})
        };
    }

    prepareDerivedData() {
        super.prepareDerivedData();
    }
}

export class ConsumableData extends EquipData {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            charges: new SchemaField({
                min: new NumberField({...requiredInteger, min: 0, initial: 0}),
                value: new NumberField({...requiredInteger, min: 0, initial: 0}),
                max: new NumberField({...requiredInteger, min: 0, initial: 0})
            })
        }
    }

    prepareDerivedData() {
        super.prepareDerivedData();
    }
}

export class WeaponData extends EquipData {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            damage: new NumberField({...requiredInteger, min: 0, initial: 1}),
            penetration: new NumberField({...requiredInteger, min: 0, initial: 0}),
            shots: new NumberField({...requiredInteger, min: 0, initial: 0}),
            // ap codes
            bDam: new BooleanField({required: true, initial: false}),
            eDam: new BooleanField({required: true, initial: false}),
            mDam: new BooleanField({required: true, initial: false}),
            xDam: new BooleanField({required: true, initial: false}),
            sDam: new BooleanField({required: true, initial: false}),
            specialNotes: new StringField({required: true, blank: true}),
            //damage codes
            areaEffect: new BooleanField({required: true, initial: false}),
            burstFire: new BooleanField({required: true, initial: false}),
            continuous: new BooleanField({required: true, initial: false}),
            subduing: new BooleanField({required: true, initial: false}),
            splash: new BooleanField({required: true, initial: false}),
            // end damage codes
            burstShots: new NumberField({...requiredInteger, min: 0, initial: 0}), //wow if only js had multiple inheritance
            massReload: new NumberField({required: true, min: 0, initial: 0}),
            costReload: new NumberField({...requiredInteger, min: 0, initial: 0}),
            isSubduing: new BooleanField({required: true, initial: false}),
            recoil: new NumberField({...requiredInteger, min: 0, initial: 0}),
        };
    }

    prepareDerivedData() {
        super.prepareDerivedData();
    }
}

export class ArmorData extends EquipData {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            mDef: new NumberField({...requiredInteger, min: 0, initial: 0}),
            bDef: new NumberField({...requiredInteger, min: 0, initial: 0}),
            eDef: new NumberField({...requiredInteger, min: 0, initial: 0}),
            xDef: new NumberField({...requiredInteger, min: 0, initial: 0}),
            costPatch: new NumberField({...requiredInteger, min: 0, initial: 0})
        }
    }

    prepareDerivedData() {
        super.prepareDerivedData();
    }
}

export class CarryGearData extends EquipData {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            isCarryWeightAffecting: new BooleanField({required: true, initial: false}),
            carryWeightAffect: new NumberField({required: true, initial: 0}),
            equippable: new BooleanField({required: true, initial: true}),
        }
    }

    prepareDerivedData() {
        super.prepareDerivedData();
    }
}

export class ProstheticData extends EquipData {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            //todo prosthetics
        }
    }

    prepareDerivedData() {
        super.prepareDerivedData();
    }
}