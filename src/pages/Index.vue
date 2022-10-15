<template>
<q-page class="q-pa-md">
    <div class="row justify-center">
        <div class="col-12 justify-center">
            <h3>Periodos Disponibles</h3>
        </div>
        <div class="col-12">
            <q-input rounded outlined bottom-slots type="number"  v-model="barraBusqueda" v-on:keyup="buscartexto()" label="Que año desea buscar" counter>
                <template v-slot:prepend>
                    <q-icon name="search" />
                </template>
                <template v-slot:append>
                    <q-icon v-show="this.barraBusqueda !== ''" name="close" @click="this.limpiar()" class="cursor-pointer" />
                </template>
            </q-input>
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
export default {
    name: 'PageIndex',

    data() {
        return {
            periodos: [],
            periodoCopia: [],
            barraBusqueda: ""
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
                            this.periodoCopia = this.periodos.slice()
                        })
                    })
            } catch (error) {
                console.log(error)
            }
        },
        buscartexto() {
            // eslint-disable-next-line eqeqeq
            if (this.barraBusqueda == '') {
                this.limpiar()
            }
            // eslint-disable-next-line array-callback-return
            this.periodos = this.periodoCopia.filter((item) => {
                if ((item.informacion.anio.indexOf(this.barraBusqueda) >= 0) ) {
                    return true
                }
            })
        },
        limpiar () {
            this.periodos = this.periodoCopia.slice()
            this.barraBusqueda = ""
        }
    }
}
</script>
