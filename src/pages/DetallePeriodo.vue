<template>
<q-page class="q-pa-md">
    <div class="row-12">
        <div class="row-12">
            <div class="col-12 justify-center">
                <q-btn round color="warning" icon="navigate_before" @click="anteriorPagina()" size="25px" style="position: absolute; top: 50px; left: 30px;"></q-btn>
                <h3 style="text-align: center; font-weight: bold;">Menu de Opciones Periodo del Año {{this.$route.params.anioactual}}</h3>
            </div>
        </div>
        <div class="row-12">
            <div class="row-12">
                <q-list bordered>
                    <q-item clickable style="min-height: 100px;" :to="{ name: 'VerPeriodo', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
                        <q-item-section style="padding: 0px;align-items: center;justify-content:center; font-size: 30px; background-color:#C7F0B6; border-radius: 15px;">Ver Periodo {{this.$route.params.anioactual}}</q-item-section>
                    </q-item>
                </q-list>
            </div>
            <div class="row">
                <div class="col-4">
                    <q-item style="min-height: 100px;">
                        <q-item-section style="display:flex;align-items: center;justify-content:center;flex-direction: column; font-size: 30px; background-color: #FAE20E; border-radius: 15px;">REPORTES</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple style="min-height: 100px;" :to="{ name: 'ReporteBalance', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
                        <q-item-section style="display:flex;align-items: center;justify-content:center;flex-direction: column; font-size: 30px; background-color: #FAE84A; border-radius: 15px;">Balance General</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple style="min-height: 100px;" :to="{ name: 'ReporteVerticalBG', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
                        <q-item-section style="display:flex;align-items: center;justify-content:center;flex-direction: column; font-size: 30px; background-color: #FAEC79; border-radius: 15px;">Balance General<q-item-label style="font-size: 18px; font-weight: bold;" caption lines="1">Analisis Vertical</q-item-label></q-item-section>
                    </q-item>

                    <q-item clickable v-ripple style="min-height: 100px;" :to="{ name: 'ReporteHorizontalBG', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
                        <q-item-section style="display:flex;align-items: center;justify-content:center;flex-direction: column; font-size: 30px; background-color: #FAF2AB; border-radius: 15px;">Balance General<q-item-label style="font-size: 18px; font-weight: bold;" caption lines="1">Analisis Horizontal </q-item-label></q-item-section>
                    </q-item>
                </div>
                <div class="col-4">
                    <q-item style="min-height: 100px;">
                        <q-item-section style="display:flex;align-items: center;justify-content:center;flex-direction: column; font-size: 30px; background-color: #FA9E13; border-radius: 15px;">REPORTES</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple style="min-height: 100px;" :to="{ name: 'ReporteEstadoRes', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
                        <q-item-section style="display:flex;align-items: center;justify-content:center;flex-direction: column; font-size: 30px; background-color: #FAA936; border-radius: 15px;">Estado Resultado</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple style="min-height: 100px;" :to="{ name: 'ReporteVerticalER', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
                        <q-item-section style="display:flex;align-items: center;justify-content:center;flex-direction: column; font-size: 30px; background-color: #FAB756; border-radius: 15px;">Estado Resultado <q-item-label style="font-size: 18px; font-weight: bold;" caption lines="1">Analisis Vertical </q-item-label></q-item-section>
                    </q-item>

                    <q-item clickable v-ripple style="min-height: 100px;" :to="{ name: 'ReporteHorizontalER', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
                        <q-item-section style="display:flex;align-items: center;justify-content:center;flex-direction: column; font-size: 30px; background-color: #FABD72; border-radius: 15px;"> Estado Resultado <q-item-label style="font-size: 18px; font-weight: bold;" caption lines="1">Analisis Horizontal </q-item-label></q-item-section>
                    </q-item>
                </div>
                <div class="col-4">
                    <q-item style="min-height: 100px;">
                        <q-item-section style="display:flex;align-items: center;justify-content:center;flex-direction: column; font-size: 30px; background-color: #970AF0; border-radius: 15px;">OTRAS OPCIONES</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple style="min-height: 100px;" :to="{ name: 'ModificarPeriodo', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
                        <q-item-section style="display:flex;align-items: center;justify-content:center;flex-direction: column; font-size: 30px; background-color: #B144F0; border-radius: 15px;">Modificar Periodo</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple style="min-height: 100px;" :to="{ name: 'MostrarRatios', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
                        <q-item-section style="display:flex;align-items: center;justify-content:center;flex-direction: column; font-size: 30px; background-color: #C76DF0; border-radius: 15px;">Ver Ratios</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple style="min-height: 100px;" :to="{ name: 'ReporteDupont', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
                        <q-item-section style="display:flex;align-items: center;justify-content:center;flex-direction: column; font-size: 30px; background-color: #D48DF0; border-radius: 15px;">Reporte DuPont</q-item-section>
                    </q-item>
                </div>
            </div>
        </div>
        <!--
        <div class="row-12">
            <q-intersection>
                <q-item clickable v-ripple style="display:flex;align-items: center;justify-content:center;flex-direction: column;">
                    <q-btn size="md" style="font-size: auto ;min-width: 550px; max-width: 550px; background-color: #5E74F0;" :to="{ name: 'VerPeriodo', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
                        <div>Ver Periodo {{this.$route.params.anioactual}}</div>
                    </q-btn>
                </q-item>
                <q-item clickable v-ripple style="display:flex;align-items: center;justify-content:center;flex-direction: column;">
                    <q-btn size="md" style="font-size: auto ;min-width: 550px; max-width: 550px;background-color: #5E74F0;" :to="{ name: 'ModificarPeriodo', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
                        <div>Modificar Periodo</div>
                    </q-btn>
                </q-item>
                <q-item clickable v-ripple style="display:flex;align-items: center;justify-content:center;flex-direction: column;">
                    <q-btn size="md" style="font-size: auto ;min-width: 550px; max-width: 550px;background-color: #5E74F0;" :to="{ name: 'MostrarRatios', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
                        <div>Mostrar Ratios</div>
                    </q-btn>
                </q-item>
                <q-item clickable v-ripple style="display:flex;align-items: center;justify-content:center;flex-direction: column;">
                    <q-btn size="md" style="font-size: auto ;min-width: 550px; max-width: 550px;background-color: #5E74F0;" :to="{ name: 'ReporteBalance', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
                        <div>Reporte de Balance General</div>
                    </q-btn>
                </q-item>
                <q-item clickable v-ripple style="display:flex;align-items: center;justify-content:center;flex-direction: column;">
                    <q-btn size="md" style="font-size: auto ;min-width: 550px; max-width: 550px;background-color: #5E74F0;" :to="{ name: 'ReporteEstadoRes', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
                        <div>Reporte de Estado Resultados</div>
                    </q-btn>
                </q-item>
                <q-item clickable v-ripple style="display:flex;align-items: center;justify-content:center;flex-direction: column;">
                    <q-btn size="md" style="font-size: auto ;min-width: 550px; max-width: 550px;background-color: #5E74F0;" :to="{ name: 'ReporteVerticalBG', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
                        <div>Reporte Vertical de Balance General</div>
                    </q-btn>
                </q-item>
                <q-item clickable v-ripple style="display:flex;align-items: center;justify-content:center;flex-direction: column;">
                    <q-btn size="md" style="font-size: auto ;min-width: 550px; max-width: 550px;background-color: #5E74F0;" :to="{ name: 'ReporteVerticalER', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
                        <div>Reporte Vertical del Estado Resultados</div>
                    </q-btn>
                </q-item>
                <q-item clickable v-ripple style="display:flex;align-items: center;justify-content:center;flex-direction: column;">
                    <q-btn size="md" style="font-size: auto ;min-width: 550px; max-width: 550px;background-color: #5E74F0;" :to="{ name: 'ReporteVerticalBG', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
                        <div>Reporte Horizontal de Balance General</div>
                    </q-btn>
                </q-item>
                <q-item clickable v-ripple style="display:flex;align-items: center;justify-content:center;flex-direction: column;">
                    <q-btn size="md" style="font-size: auto ;min-width: 550px; max-width: 550px;background-color: #5E74F0;" :to="{ name: 'ReporteVerticalER', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
                        <div>Reporte Horizontal del Estado Resultados</div>
                    </q-btn>
                </q-item>
                <q-item clickable v-ripple style="display:flex;align-items: center;justify-content:center;flex-direction: column;">
                    <q-btn size="md" style="font-size: auto ;min-width: 550px; max-width: 550px; background-color: #5E74F0;" :to="{ name: 'ReporteDupont', params: { id: this.id, anioactual: this.$route.params.anioactual}}">
                        <div>Reporte de Rentabilidad con Formula Dupont</div>
                    </q-btn>
                </q-item>

            </q-intersection>
        </div>
        -->
    </div>

</q-page>
</template>

<script>
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
        },
        anteriorPagina() {
            this.$router.go(-1)
        },
    }
}
</script>
