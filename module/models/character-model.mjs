import {ActorData} from "./data-models.mjs";
import {AffCodes, Skills} from "../lists.mjs";


const {
    HTMLField, SchemaField, NumberField, StringField, FilePathField, ArrayField, BooleanField
} = foundry.data.fields;

const requiredInteger = {required: true, integer:true, nullable: false};


export class CharacterData extends ActorData {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            experienceTotal: new NumberField({...requiredInteger, initial: 0}),
            experienceSpendable: new NumberField({...requiredInteger, initial: 0}),
            background: new SchemaField({
                height: new StringField({required: true, blank: true}),
                weight: new StringField({required: true, blank: true}),
                eyeColor: new StringField({required: true, blank: true}),
                hairColor: new StringField({required: true, blank: true})
            }),
            money: new NumberField({required: true, blank: true})
        };
    }

    prepareDerivedData() {
        super.prepareDerivedData();
        //todo so so so so much
    }
}