<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
    <div class="col-12 justify-center">
      <h3>Periodos Disponibles</h3>
    </div>
    <div >
      <p>{{this.periodos}}</p>
      <q-intersection
        v-for="index in periodos"
        :key="index"
        transition="flip-right"
        class="example-item"
      >
      <!--:to="{ name: 'DetallePeriodo', params: { id: index.id } }-->
        <q-item clickable v-ripple :to="{ name: 'DetallePeriodo', params: { id: index.id, anioactual: index.informacion.anio}}">
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              Q
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Año {{ index.informacion.anio }}</q-item-label>
            <q-item-label caption lines="1">Mas informacion</q-item-label>
          </q-item-section>
        </q-item>
        
      </q-intersection>
    </div>
  </div>
    
  </q-page>
</template>

<script>
import {db} from "boot/firebase"

export default{
  name: 'PageIndex',

  data() {
    return {
      periodos: [],
    };
  },
  created () {
    this.lsitartareas()
  },
  methods : {
    async lsitartareas() {
      try {
        const resDB = await db.collection('periodos').get()
        resDB.forEach(res => {
          const periodoDB = {
            id: res.id,
            informacion: res.data()
          }
          this.periodos.push(periodoDB)
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
