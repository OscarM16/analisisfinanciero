<template>
<q-page class="q-pa-md">
    <div class="row justify-center">
        <div class="col-12 justify-center">
            <h3>Periodos Disponibles</h3>
        </div>
        <div>
            <p>{{this.periodos}}</p>
            <q-intersection v-for="index in periodos" :key="index" transition="flip-right" class="example-item">
                <!--:to="{ name: 'DetallePeriodo', params: { id: index.id } }-->
                <q-item clickable v-ripple :to="{ name: 'DetallePeriodo', params: { id: index.id, anioactual: index.informacion.anio}}">
                    <q-item-section avatar>
                        <q-avatar color="primary" text-color="white">
                            <span class="material-icons">
                                description
                            </span>
                        </q-avatar>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Año {{ index.informacion.anio }}</q-item-label>
                        <q-item-label caption lines="1">Mas informacion</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <span class="material-icons" style="font-size:2em;">
                            arrow_forward_ios
                        </span>
                    </q-item-section>
                </q-item>

            </q-intersection>
        </div>
    </div>

</q-page>
</template>

<script>
import {
    db
} from "boot/firebase"
import {
    orderBy
} from "firebase/firestore";
export default {
    name: 'PageIndex',

    data() {
        return {
            periodos: [],
        };
    },
    created() {
        this.lsitartareas()
    },
    methods: {
        async lsitartareas() {
            try {
                db.collection('periodos')
                    .orderBy('anio')
                    .get()
                    .then(query => {
                        query.forEach(item => {
                            const periodoDB = {
                                id: item.id,
                                informacion: item.data()
                            }
                            this.periodos.push(periodoDB)
                        })
                    })
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
