<template>
<q-page class="q-pa-md">
    <div class="row">
        <div class="col-12">
            <h3> REPORTE Balance General del Año {{this.$route.params.anioactual}}</h3>
        </div>
        <div class="q-pa-md">
            <q-btn color="teal">
                <q-icon left size="3em" name="download" />
                <div>Descargar PDF</div>
            </q-btn>
        </div>
        <div class="row">
            <div class="col" style="background-color: red; padding: 30px; margin: 5%;">
                <p>{{this.periodo}}</p>
                <div class="row">
                    <div class="col">
                        <h5>Balance General</h5>
                    </div>
                </div>
            </div>
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
    name: 'ReporteBalance',
    data() {
        return {
            periodo: [],
            id: String
        };
    },
    created() {
        this.id = this.$route.params.id
        this.lsitartareas()
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
        }
    }
}
</script>
