<template>
<q-page class="q-pa-md">
    <div class="row">
        <div class="col-12 justify-center">
            <h3>Periodo del Año {{this.$route.params.anioactual}}</h3>
        </div>
        <div>
            <q-intersection>
      <!--:to="{ name: 'DetallePeriodo', params: { id: index.id } }-->
        <q-item clickable v-ripple>
          <q-btn color="teal" :to="{ name: 'VerPeriodo', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
      <div>Ver Periodo {{this.$route.params.anioactual}}</div>
    </q-btn>
        </q-item>
        <q-item clickable v-ripple>
          <q-btn color="teal" :to="{ name: 'ModificarPeriodo', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
      <div>Modificar Periodo</div>
    </q-btn>
        </q-item>
        <q-item clickable v-ripple>
          <q-btn color="teal" :to="{ name: 'MostrarRatios', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
      <div>Mostrar Ratios</div>
    </q-btn>
        </q-item>
        <q-item clickable v-ripple>
          <q-btn color="teal" :to="{ name: 'ReporteBalance', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
      <div>Reporte Balance General</div>
    </q-btn>
        </q-item>
        <q-item clickable v-ripple>
          <q-btn color="teal" :to="{ name: 'ReporteEstadoRes', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
      <div>Reporte Balance Estado Resultados</div>
    </q-btn>
        </q-item>
        <q-item clickable v-ripple>
          <q-btn color="teal" :to="{ name: 'ReporteVerticalBG', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
      <div>Reporte Vertical de Balance General</div>
    </q-btn>
        </q-item>
        <q-item clickable v-ripple>
          <q-btn color="teal" :to="{ name: 'ReporteVerticalER', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
      <div>Reporte Vertical del Estado Resultados</div>
    </q-btn>
        </q-item>
        <q-item clickable v-ripple>
          <q-btn color="teal" :to="{ name: 'ReporteDupont', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
      <div>Reporte de Rentabilidad con Formula Dupont</div>
    </q-btn>
        </q-item>
        
      </q-intersection>
        </div>
    </div>

</q-page>
</template>

<script>
import {db} from "boot/firebase"
import {
    doc,
    getDoc
} from "firebase/firestore";

export default {
    name: 'DetallePeriodo',
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
          /*
            const docRef = doc(db, "periodos", this.$route.params.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                this.periodo.push(docSnap.data())
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
          */
        }
    }
}
</script>
