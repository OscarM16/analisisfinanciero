<template>
<q-page class="q-pa-md">
    <div class="row" v-show="this.cargandoDatos">
        <div class="col items-center" style="justify-content: center; margin-top: 150px;">
            <div class="row justify-center">
                <q-spinner-clock color="primary" size="25em" />
            </div>
        </div>
    </div>
    <div class="row" v-show="!this.cargandoDatos">
        <div class="col">
            <div class="row-12">
                <div class="col-12 justify-center">
                    <h3 style="text-align: center; font-weight: bold;">Reporte Dupont del Año {{this.$route.params.anioactual}}</h3>
                </div>
            </div>
            <div class="row-12" style="; ">
                <div class="q-pa-md">
                    <!--COMIENZA PRIMERA FILA-->
                    <div class="row">
                        <div class="col" style="background-color: #3752EB; margin-left:15px; margin-right:15px; min-height: 50px;">
                            Ventas
                        </div>
                        <div class="col" style=" margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style=";margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                    </div>
                    <!--SEPRACION 1-->
                    <div class="row">

                        <div class="col" style=" margin-left:15px; margin-right:15px; text-align: center;">
                            Menos
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>

                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style=" margin-left:15px; margin-right:15px;">

                        </div>
                    </div>
                    <!--COMIENZA SEGUNDA FILA-->
                    <div class="row">

                        <div class="col" style="background-color: #3752EB; margin-left:15px; margin-right:15px; min-height: 50px;">
                            Costo de los bienes vendidos
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; justify-content: center; align-items: center; display: flex;">
                            -----------------------------
                        </div>
                        <div class="col" style="background-color: #5168EB;margin-left:15px; margin-right:15px;">
                            Utilidad Neta
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>

                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style=" margin-left:15px; margin-right:15px;">

                        </div>
                    </div>
                    <!--SEPRACION 2-->
                    <div class="row">

                        <div class="col" style=" margin-left:15px; margin-right:15px; text-align: center;">
                            Menos
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center;">
                            Dividido entre
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>

                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style=" margin-left:15px; margin-right:15px;">

                        </div>
                    </div>
                    <!--COMIENZA FILA 3-->
                    <div class="row">
                        <div class="col" style="background-color: #3752EB; margin-left:15px; margin-right:15px;">
                            Gastos Operativos
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="background-color: #5168EB; margin-left:15px; margin-right:15px; min-height: 50px;">
                            Ventas
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; justify-content: center; align-items: center; display: flex;">
                            -----------------------------
                        </div>
                        <div class="col" style="background-color: #728BEB;margin-left:15px; margin-right:15px;">
                            Margen de utilidad
                        </div>

                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>

                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>

                    </div>
                    <!--SEPARACION-->
                    <div class="row">

                        <div class="col" style=" margin-left:15px; margin-right:15px; min-height: 50px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; justify-content: center; align-items: center; display: flex;">
                            Multiplicado por
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; justify-content: center; align-items: center; display: flex;">
                            -----------------------------
                        </div>
                        <div class="col" style="background-color: #8FF5ED;margin-left:15px; margin-right:15px;">
                            Rendimiento sobre los activos totales
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style=" margin-left:15px; margin-right:15px;">

                        </div>
                    </div>
                    <!--COMIENZA FILA 4-->
                    <div class="row">

                        <div class="col" style="background-color: #27EB2C; margin-left:15px; margin-right:15px; min-height: 50px;">
                            Activos Corrientes
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; justify-content: center; align-items: center; display: flex;">
                            -----------------------------
                        </div>
                        <div class="col" style="background-color: #95EB7E;margin-left:15px; margin-right:15px;">
                            ACtivos Totales
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; justify-content: center; align-items: center; display: flex;">
                            -----------------------------
                        </div>
                        <div class="col" style="background-color: #C2EBA8;margin-left:15px; margin-right:15px;">
                            Rotacion de Activos
                        </div>

                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style=" margin-left:15px; margin-right:15px;">

                        </div>
                    </div>
                    <!--SEPRACION-->
                    <div class="row">

                        <div class="col" style=" margin-left:15px; margin-right:15px; text-align: center;">
                            Mas
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style=" margin-left:15px; margin-right:15px; text-align: center;">
                            Dividido entre
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>

                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style=" margin-left:15px; margin-right:15px; text-align: center;">
                            Multiplicado por
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; justify-content: center; align-items: center; display: flex;">
                            -----------------------------
                        </div>
                        <div class="col" style=" margin-left:15px; margin-right:15px; position: flex;">
                            
                        </div>
                    </div>
                    <!--COMIENZA FILA 5-->
                    <div class="row">
                        <div class="col" style="background-color: #27EB2C; margin-left:15px; margin-right:15px;">
                            Activos Fijos
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="background-color: #95EB7E; margin-left:15px; margin-right:15px; min-height: 50px;">
                            Ventas
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="background-color: #E4F4EC;margin-left:15px; margin-right:15px;">
                            Rendimiento sobre patrimonio
                        </div>

                    </div>
                    <!--SEPRACION-->
                    <div class="row">

                        <div class="col" style=" margin-left:15px; margin-right:15px; text-align: center;">
                           <p></p>
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>

                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style=" margin-left:15px; margin-right:15px;">

                        </div>
                    </div>
                    <!--COMIENZA FILA 6-->
                    <div class="row">

                        <div class="col" style="background-color: #F54B36; margin-left:15px; margin-right:15px; min-height: 50px;">
                            Pasivos Corrientes
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; justify-content: center; align-items: center; display: flex;">
                            -----------------------------
                        </div>
                        <div class="col" style="background-color: #F5765D;margin-left:15px; margin-right:15px;">
                            Pasivos Totales
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; justify-content: center; align-items: center; display: flex;">
                            -----------------------------
                        </div>
                        <div class="col" style="background-color: #F59A81;margin-left:15px; margin-right:15px;">
                            Acctivo Total
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; justify-content: center; align-items: center; display: flex;">
                            -----------------------------
                        </div>
                        <div class="col" style="background-color: #F5B098;margin-left:15px; margin-right:15px;">
                            Multiplicador del Apalancamiento
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>

                        <div class="col" style=" margin-left:15px; margin-right:15px;">

                        </div>
                    </div>
                    <!--SEPRACION-->
                    <div class="row">

                        <div class="col" style=" margin-left:15px; margin-right:15px; text-align: center;">
                            Mas
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">
                            
                        </div>
                        <div class="col" style=" margin-left:15px; margin-right:15px; text-align: center;">
                            Mas
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style=" margin-left:15px; margin-right:15px; text-align: center;">
                            Dividido entre
                        </div>

                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style=" margin-left:15px; margin-right:15px;">

                        </div>
                    </div>
                    <!--COMIENZA FILA 7-->
                    <div class="row">

                        <div class="col" style="background-color: #F54B36; margin-left:15px; margin-right:15px; min-height: 50px;">
                            Pasivos No Corrientes
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="background-color: #F5765D;margin-left:15px; margin-right:15px;">
                            Patrimonio
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="background-color: #F59A81;margin-left:15px; margin-right:15px;">
                            Activo Capital Patrimonial
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>

                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>

                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                    </div>
                </div>
                <!-- FILA 2-->
                <div class="q-pa-md">

                </div>
                <!-- FILA 3-->
                <div class="q-pa-md">

                </div>
                <!-- FILA EN MEDIO-->
                <div class="q-pa-md">

                </div>
                <!-- FILA 4-->
                <div class="q-pa-md">

                </div>
                <!-- FILA 5-->
                <div class="q-pa-md">

                </div>
                <!-- FILA 6-->
                <div class="q-pa-md">

                </div>
                <!-- FILA 7-->
                <div class="q-pa-md">

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
    name: 'ReporteDupont',
    data() {
        return {
            periodo: [],
            id: String,
            cargandoDatos: true,
            llaveCargandoDatos: false,
        };
    },
    created() {
        this.id = this.$route.params.id
        this.lsitartareas()
    },
    watch: {
        llaveCargandoDatos() {
            console.log("se ocullto")
            this.cargandoDatoss()
        }
    },
    methods: {
        cargandoDatoss() {
            this.cargandoDatos = false
            console.log(this.cargandoDatos)
        },
        async lsitartareas() {
            const docRef = doc(db, "periodos", this.$route.params.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                this.periodo.push(docSnap.data())
                if (this.periodo.length !== 0) {
                    this.llaveCargandoDatos = true
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
    }
}
</script>
