<template>
<q-page class="q-pa-md">
    <div class="row" v-show="this.cargandoDatos">
        <div class="col items-center" style="justify-content: center; margin-top: 150px;">
            <div class="row justify-center"> <q-spinner-clock
          color="primary"
          size="25em"
        /></div>
        </div>
    </div>
    <div class="row-12"  v-show="!this.cargandoDatos">
        <div class="col-12 justify-center">
            <h3> Mostrar Ratios del Año {{this.$route.params.anioactual}}</h3>
        </div>
        <div>
            <p>{{this.periodo}}</p>
            <h4>Suma de efectivo + inventario</h4>
            <h5>{{this.suma}}</h5>
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
    name: 'MostrarRatios',
    data() {
        return {
            periodo: [],
            id: String,
            cargandoDatos: true,
            llaveCargandoDatos: false,
            suma: 0,
            
        };
    },
    created() {
        this.id = this.$route.params.id
        this.lsitartareas()
    },
    mounted() {
    },
    watch: {
        llaveCargandoDatos () {
            this.realizarOperaciones()
            this.cargandoDatosFin()
        }
    },
    methods: {
        cargandoDatosFin() {
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
        },
        sumas() {
            this.suma = parseFloat(this.periodo[0].balancegeneral.activos.efectivo) + parseFloat(this.periodo[0].balancegeneral.activos.inventarios)
        },
        realizarOperaciones() {
            this.sumas()
        }
    }
}
</script>
