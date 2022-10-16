<template>
<q-page class="q-pa-md">
    <div class="row" v-show="this.cargandoDatos">
        <div class="col items-center" style="justify-content: center; margin-top: 150px;">
            <div class="row justify-center">
                <q-spinner-clock color="primary" size="25em" />
            </div>
        </div>
    </div>
    <div class="row-12" v-show="!this.cargandoDatos">
        <div class="col-12 justify-center">
            <h3> Reporte Vertical del Balance General del Año {{this.$route.params.anioactual}}</h3>
        </div>
        <div class="q-pa-md">
            <div class="q-gutter-sm">
                <q-radio v-model="anioActual" :val=anioActual :label=this.$route.params.anioactual />
            </div>

            <div class="q-px-sm">
                El año actual es: <strong>{{ anioActual }}</strong>
            </div>
        </div>
        <div class="q-pa-md">
            <div class="q-gutter-sm">
                <q-radio v-for="index in aniosArray" :key="index" v-model="eleccion" :val=index :label=index />
            </div>

            <div class="q-px-sm">
                El año a comparar es:  <strong>{{ eleccion }}</strong>
            </div>
        </div>
        <p>{{this.periodoActual[0]}}</p>
        <p>{{this.periodoComparar[0]}}</p>

    </div>
</q-page>
</template>

<script>
import {
    db
} from "boot/firebase"
import {
    doc,
    getDoc
} from "firebase/firestore";

export default {
    name: 'ReporteVerticalBG',
    data() {
        return {
            periodoActual: [],
            periodos: [],
            eleccion: 'Ninguna',
            anioActual: "",
            aniosArray: [],
            periodoComparar: [],
            id: String,
            cargandoDatos: true,
            llaveCargandoDatos: false,
        };
    },
    created() {
        this.id = this.$route.params.id
        this.listarPeriodoActual()
        this.listarPeriodos()
        this.anioActual = this.$route.params.anioactual 
    },
    watch: {
        llaveCargandoDatos() {
            console.log("se ocullto")
            this.cargandoDatoss()
        },
        eleccion () {
            console.log("Se a cambiado la eleccion")
            this.obtenerPeriodoComparar()
            console.log(this.periodoComparar[0])
            console.log(this.periodoComparar[0].id)
            console.log(this.periodoComparar[0].informacion)
            console.log(this.periodoComparar[0].informacion.balancegeneral)
        }
    },
    methods: {
        cargandoDatoss() {
            this.cargandoDatos = false
            console.log(this.cargandoDatos)
        },
        obtenerPeriodoComparar() {
            this.periodoComparar = this.periodos.filter((item) => {
                if (item.informacion.anio === this.eleccion) {
                    return true
                }
            })
        },
        async listarPeriodos() {
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
                            if (periodoDB.informacion.anio !== this.$route.params.anioactual ) {
                                this.aniosArray.push(periodoDB.informacion.anio)
                            }
                            this.periodoCopia = this.periodos.slice()
                        })
                    })
            } catch (error) {
                console.log(error)
            }
        },
        async listarPeriodoActual() {
            const docRef = doc(db, "periodos", this.$route.params.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                this.periodoActual.push(docSnap.data())
                if (this.periodoActual.length !== 0) {
                    this.llaveCargandoDatos = true
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
    }
}
</script>
