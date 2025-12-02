const {
    HTMLField, SchemaField, NumberField, StringField, FilePathField, ArrayField, BooleanField
} = foundry.data.fields;

const requiredInteger = {required: true, integer:true, nullable: false};


/**
*                       End Models
**/

// apply things to all items or actors ie data validation or anything your heart desires

export class ATOWActor extends Actor {
    async applyDamage(damage) {
        const { value } = this.system.resources.health;
        const { fvalue } = this.system.resources.fatigue;
//        if ( this.system.isSubduing ) {
//            await this.update({"system.resources.fatigue": fvalue - damage})
//        } else {
            await this.update({"system.resources.health": value - damage});
            await this.update({"system.resources.fatigue": fvalue - 1});
//        }
        await ChatMessage.implementation.create({
            content: `${this.name} took ${damage} damage`
        });
    }
    prepareDerivedData() {
        super.prepareDerivedData();

        const { health } = this.system.resources;
        health.value = Math.clamp(health.value, health.min, health.max);
        const { fatigue } = this.system.resources;
        fatigue.value = Math.clamp(fatigue.value, fatigue.min, fatigue.max);
    }
}

export class ATOWItem extends Item {
    //do whatever you want man fuck it
}