<template>
<q-page class="q-pa-md">
    <div class="row justify-center">
        <div class="col-12 justify-center">
            <h3>Crear Nuevo Periodo</h3>
            <h4 v-show="!this.mostrarFormulario">Balance General</h4>
            <h4 v-show="this.mostrarFormulario">Estado de Resultados</h4>
            <div class="q-pa-md">
                <q-form @submit="this.siguiente" @reset="this.cancelarFormulario" class="q-gutter-md">
                    <q-input filled  label="Your name *" hint="Name and surname" lazy-rules />
                    <q-input filled type="number"  label="Your age *" lazy-rules />
                    <div>
                        <q-btn @click="this.siguiente"  :label="this.estadoForm" type="submit" color="primary" />
                        <q-btn  @click="this.cancelarFormulario"  label="Cancelar" type="reset" color="primary" flat class="q-ml-sm" />
                    </div>
                </q-form>
            </div>
        </div>
        <div>
        </div>
    </div>

</q-page>
</template>

<script>
import {
    ref
} from 'vue'
export default {
    name: "CrearNuevoPeriodo",
    data() {
        return {
            mostrarFormulario: false,
            formularioBalanceGeneral: false,
            text: "",
            ph: ref(''),
            dense: ref(false),
            estadoForm: "Siguiente"
        };
    },
    methods: {
        siguiente() {
            if (this.formularioBalanceGeneral === false) {
                // Aca solo entra la primera vez al darle siguieente
                // estando en el Balance General
                this.formularioBalanceGeneral = true
                this.estadoForm = "Guardar"
                this.mostrarFormulario = !this.mostrarFormulario
            } else {
                // AQUI vas a enviar todo a firebase
            }
        },
        cancelarFormulario() {
            // Limpiamos todas las variables 
            this.mostrarFormulario = false
            this.formularioBalanceGeneral = false
            this.estadoForm = "Siguiente"
            this.text = ""
        }
    }

}
</script>
