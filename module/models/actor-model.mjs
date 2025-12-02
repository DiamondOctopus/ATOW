const {
    HTMLField, SchemaField, NumberField, StringField, FilePathField, ArrayField, BooleanField
} = foundry.data.fields;

const requiredInteger = {required: true, integer:true, nullable: false};


/**
 *
 *                              Actor Data
 *
 **/

export class ActorData extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        return {
            resources: new SchemaField({
                health: new SchemaField({
                    min: new NumberField({...requiredInteger, min: 0, initial: 0}),
                    value: new NumberField({...requiredInteger, min: 0, initial: 10}),
                    max: new NumberField({...requiredInteger, min: 0, initial: 10})
                }),
                fatigue: new SchemaField({
                    min: new NumberField({...requiredInteger, min: 0, initial: 0}),
                    value: new NumberField({...requiredInteger, min: 0, initial: 10}),
                    max: new NumberField({...requiredInteger, min: 0, initial: 10})
                }),
                biography: new HTMLField({required: true, blank: true}),
            }),
            attributes: new SchemaField({
                //todo add attribute scores
                //todo add skill levels
            })
        };
    }

    prepareDerivedData() {
        super.prepareDerivedData();
    }
}

/**
 *
 *                              Character Data
 *
 */



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
            //todo add attribute and skill exp spends
        };
    }

    prepareDerivedData() {
        super.prepareDerivedData();
        //todo add attribute modifier calcs
        //todo add skill level calcs
        //todo add roll modifier calcs
        //todo so so so so much
    }
}