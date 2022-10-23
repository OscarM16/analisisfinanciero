<template>
<q-layout view="hhh Lpr fFf">
    <q-header bordered class="bg-primary text-white">
        <q-toolbar>
            <q-btn fdense flat round icon="menu" @click="left = !left" />

            <q-toolbar-title>
                Empresa de Agroindustria
            </q-toolbar-title>

            <div>Analisis Financiero</div>
        </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" overlay bordered>
        <q-list>
            <q-item-label header>
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

export default {
  name: "MainLayout",
  data () {
    return {
      left: false
    }
  }
}
</script>
