<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Analisis Financiero
        </q-toolbar-title>

        <div>Empresa de tipo: Industria</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      overlay bordered
    >
      <q-list>
        <q-item-label
          header
        >
         Menu 
        </q-item-label>
        <q-item clickable to="/">
          <q-item-section avatar>
             <q-icon name="home"></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label>Inicio</q-item-label>
        </q-item-section>
        </q-item>
        <q-item clickable to="/CrearNuevoPeriodo">
          <q-item-section avatar>
             <q-icon name="post_add"></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label>Crear Nuevo Periodo</q-item-label>
        </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  
];

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(true)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
