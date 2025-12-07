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
            }),
            biography: new HTMLField({required: true, blank: true}),

            attributes: new SchemaField(Object.keys(CONFIG.ATOW.attributes).reduce((obj, attribute) => {
                obj[attribute] = new SchemaField({
                    xp: new NumberField({...requiredInteger, min: 0, initial: 0}),
//                    mod: new NumberField({...requiredInteger, initial: 0}),
//                    score: new NumberField({...requiredInteger, min: 0, initial: 0}),
                });
                return obj;


            }, {})),

            skills: new SchemaField(Object.keys(CONFIG.ATOW.skillData).reduce((obj, skill) => {
                obj[skill] = new SchemaField({
                    xp: new NumberField({...requiredInteger, min: 0, initial: 0}),
                    tn: new NumberField({...requiredInteger, min: 0, initial: 0}),
                    complexity: new StringField({
                        options: Object.keys(CONFIG.ATOW.skillComplexity),
                        required: true,
                        blank: false,
                        initial: "bas",
                    }),
                    actions: new StringField({
                        options: Object.keys(CONFIG.ATOW.skillActions),
                        required: true,
                        blank: false,
                        initial: "single"
                    }),
                    level: new NumberField({...requiredInteger, min: 0, initial: 0}),
                    linkmod: new NumberField({...requiredInteger, min: 0, initial: 0}),

                });
                return obj;
            }, {})),

        }
    }

    prepareBaseData() {

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
        };
    }

    prepareDerivedData() {
        super.prepareDerivedData();

        //todo add attribute modifier calcs
        //todo add skill level calcs
        //todo add roll modifier calcs
        //todo so so so so much

        //attribute  score and link modifier calculation
        for(const key in this.attributes) {

            const attribute = this.attributes[key];

            attribute.score =  Math.floor(attribute.xp *.01);

            if(attribute.score === 0){
                attribute.mod = -4;
            } else if(attribute.score === 1) {
                attribute.mod = -2;
            } else if(attribute.score <= 3){
                attribute.mod = -1;
            } else if(attribute.score <= 6) {
                attribute.mod = 0
            } else if(attribute.score <= 9) {
                attribute.mod = 1;
            } else if (attribute.score === 10){
                attribute.mod = 2;
            } else if (attribute.score >= 11) {
                attribute.mod = Math.floor(attribute.score/3)
            }

            attribute.label = game.i18n.localize(CONFIG.ATOW.attributes[key]);

        }
    }

}
