<template>
<q-page class="q-pa-md">
    <div class="row" v-show="this.cargandoDatos">
        <div class="col items-center" style="justify-content: center; margin-top: 150px;">
            <div class="row justify-center">
                <q-spinner-clock color="primary" size="25em" />
            </div>
        </div>
    </div>
    <div class="row" v-show="!this.cargandoDatos">
        <div class="row-12">
            <div class="col-12 justify-center">
                <h3 style="text-align: center; font-weight: bold;"> Reporte Dupont del Año {{this.$route.params.anioactual}}</h3>
            </div>
        </div>
        <div class="row">
            <p>{{this.periodo}}</p>
        </div>
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
    name: 'ReporteDupont',
    data() {
        return {
            periodo: [],
            id: String,
            cargandoDatos: true,
            llaveCargandoDatos: false,
        };
    },
    created() {
        this.id = this.$route.params.id
        this.lsitartareas()
    },
    watch: {
        llaveCargandoDatos() {
            console.log("se ocullto")
            this.cargandoDatoss()
        }
    },
    methods: {
        cargandoDatoss() {
            this.cargandoDatos = false
            console.log(this.cargandoDatos)
        },
        async lsitartareas() {
            const docRef = doc(db, "periodos", this.$route.params.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                this.periodo.push(docSnap.data())
                if (this.periodo.length !== 0) {
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
