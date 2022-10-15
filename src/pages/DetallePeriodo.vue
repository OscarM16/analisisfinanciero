<template>
<q-page class="q-pa-md">
    <div class="row justify-center">
        <div class="col-12 justify-center">
            <h3>Periodo del Año {{this.$route.params.anioactual}}</h3>
        </div>
        <div>
            <p>{{this.periodo}}</p> 
            <q-intersection>
      <!--:to="{ name: 'DetallePeriodo', params: { id: index.id } }-->
        <q-item clickable v-ripple>
          <q-btn color="teal" :to="{ name: 'VerPeriodo', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
      <q-icon left size="3em" name="map" />
      <div>Ver Periodo {{this.$route.params.anioactual}}</div>
    </q-btn>
        </q-item>
        <q-item clickable v-ripple>
          <q-btn color="teal">
      <q-icon left size="3em" name="map" />
      <div>Modificar Periodo</div>
    </q-btn>
        </q-item>
        <q-item clickable v-ripple>
          <q-btn color="teal">
      <q-icon left size="3em" name="map" />
      <div>Reporte Balance General</div>
    </q-btn>
        </q-item>
        <q-item clickable v-ripple>
          <q-btn color="teal">
      <q-icon left size="3em" name="map" />
      <div>Reporte Balance Estado Resultados</div>
    </q-btn>
        </q-item>
        <q-item clickable v-ripple>
          <q-btn color="teal">
      <q-icon left size="3em" name="map" />
      <div>Reporte Vertical de Balance General</div>
    </q-btn>
        </q-item>
        <q-item clickable v-ripple>
          <q-btn color="teal">
      <q-icon left size="3em" name="map" />
      <div>Reporte Vertical del Estado Resultados</div>
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
            const docRef = doc(db, "periodos", this.$route.params.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                this.periodo.push(docSnap.data())
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
    }
}
</script>
