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

    prepareDerivedData() {
        super.prepareDerivedData();

        //todo add skill level calcs
        //todo add roll modifier calcs
        //todo so so so so much
        //remember items are in this.parent.items
        //attribute  score and link modifier calculation
        for (const key in this.attributes) {

            const attribute = this.attributes[key];

            attribute.score = Math.floor(attribute.xp * .01);

            if (attribute.score === 0) {
                attribute.mod = -4;
            } else if (attribute.score === 1) {
                attribute.mod = -2;
            } else if (attribute.score <= 3) {
                attribute.mod = -1;
            } else if (attribute.score <= 6) {
                attribute.mod = 0
            } else if (attribute.score <= 9) {
                attribute.mod = 1;
            } else if (attribute.score === 10) {
                attribute.mod = 2;
            } else if (attribute.score >= 11) {
                attribute.mod = Math.floor(attribute.score / 3)
            }

            attribute.label = game.i18n.localize(CONFIG.ATOW.attributes[key]);

        }
        //skill handling for non-players
        if (this.parent.type !== 'character') {
            console.log('this is', this.parent.type);
            //todo add skill handling w/no modules
        } else {
            console.log ('should only see this on characters - this is a', this.parent.type);
        }


    }



}


