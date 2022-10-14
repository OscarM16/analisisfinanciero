<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
    <div class="col-12 justify-center">
      <h3>Periodos Disponibles</h3>
    </div>
    <div >
      <q-intersection
        v-for="index in anios"
        :key="index"
        transition="flip-right"
        class="example-item"
      >
      <!--:to="{ name: 'DetallePeriodo', params: { id: index.id } }-->
        <q-item clickable v-ripple :to="{ name: 'DetallePeriodo', params: { id: index.id }}">
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              Q
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Año {{ index.ani }}</q-item-label>
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
      elementos: [],
      anios: [
      {
        id: 1,
        ani: "2017"
      },
      {
        id: 2,
        ani: "2018"
      },
      {
        id: 3,
        ani: "2019"
      },
      {
        id: 4,
        ani: "2020"
      },
      {
        id: 5,
        ani: "2021"
      }
    ]
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
          console.log(res.data())
          const periodoDB = {
            id: res.id,
            informacion: res.data()
          }
          console.log(periodoDB)
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
