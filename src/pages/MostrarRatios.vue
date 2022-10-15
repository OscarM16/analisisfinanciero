<template>
<q-page class="q-pa-md">
    <div class="row justify-center">
        <div class="col-12 justify-center">
            <h3> Mostrar Ratios del Año {{this.$route.params.anioactual}}</h3>
        </div>
        <div>
            <p>{{this.periodo}}</p>
            <h4>Suma de efectivo + inventario</h4>
            <h5>{{this.suma}}</h5>
            <button @click="this.sumas()">hola</button>
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
            suma: 0,
            tiempoEsperar: false
        };
    },
    created() {
        this.id = this.$route.params.id
        this.lsitartareas()
    },
    mounted() {
        this.lleno = true
        // this.ocultarMapaTimeout()
        this.realizarOperaciones()
    },
    methods: {
        async lsitartareas() {
            const docRef = doc(db, "periodos", this.$route.params.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                this.periodo.push(docSnap.data())
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        },
        sumas() {
            this.suma = parseFloat(this.periodo[0].balancegeneral.activos.efectivo) + parseFloat(this.periodo[0].balancegeneral.activos.inventarios)
        },
        realizarOperaciones() {
            clearTimeout(this.tiempoEsperar)
            this.tiempoEsperar = setTimeout(() => {
                // Pones aca los metodos que vas a ocupar
                // Para que cuando pasen 2 seg despues del mounted
                // Los datos ya estan cargados y no da error
                this.sumas()
            }, 2000)
        }
    }
}
</script>
