<template>
<q-page class="q-pa-md">
    <div class="row" v-show="this.cargandoDatos">
        <div class="col items-center" style="justify-content: center; margin-top: 150px;">
            <div class="row justify-center"> <q-spinner-clock
          color="primary"
          size="25em"
        /></div>
        </div>
    </div>
    <div class="row-12" v-show="!this.cargandoDatos">
        <div class="col-12">
            <h3> Ver Periodo del Año {{this.$route.params.anioactual}}</h3>
        </div>
        <div class="row">
            <div class="col-4"></div>
            <div class="col-4 q-pa-md">
                <q-list bordered padding class="rounded-borders text-primary">
                    <q-item>
                        <div class="col-6">
                            <q-item clickable v-ripple :active="link === 'inbox'" @click="link = 'inbox'; this.verEstado = false" active-class="my-menu-link">
                                <q-item-section style="text-align: center;">Datos del Balance General</q-item-section>
                            </q-item>

                        </div>
                        <div class="col-6">
                            <q-item clickable v-ripple :active="link === 'outbox'" @click="link = 'outbox' ; this.verEstado = true" active-class="my-menu-link">
                                <q-item-section style="text-align: center;">Datos del Estado de Resultados</q-item-section>
                            </q-item>
                        </div>
                    </q-item>

                </q-list>
            </div>
        </div>
        <div class="row-12" id="content" v-show="!this.verEstado">
            <div class="col-12" style="padding: 30px; margin: 5%;">
                <div class="row-12">
                    <div class="col-12 justify-center">
                        <h6 style="text-align: center; margin-top: 5px; margin-bottom: 8px;">INFORMACION DEL BALANCE GENERAL</h6>
                        <h6 style="text-align: center; margin-top: 5px; margin-bottom: 8px;">Del Año {{this.$route.params.anioactual}}</h6>
                    </div>
                    <div class="col-12 justify-center">

                    </div>
                    <div class="col-12 justify-center">

                    </div>
                </div>
                <div class="row-12">
                    <div class="col-12">
                        <q-list>
                            <q-item>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; font-size: 22px;">Activo</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; text-decoration: underline; font-size: 18px;">Corriente</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label style="font-weight: bold; font-size: 16px; color: black;"></q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.efectivo !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Efectivo y equivalentes al efectivo</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.efectivo.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.cuentasPC !== 0">
                                <q-item-section>
                                    <q-item-label style="font-size: 15px;">Cuentas por cobrar a partes relacionadas</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.cuentasPC.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.otrasCPC !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Otras cuentas por cobrar</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.otrasCPC.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.depositosCortoP !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Dépositos a corto plazo</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.depositosCortoP.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.inventarios !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Inventarios</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.inventarios.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.gastosPagadosAnt !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Gastos pagados por anticipado</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.gastosPagadosAnt.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                        <!--  FIN CORRIENTE-->
                        <!--No corriente-->
                        <q-list>

                            <q-item>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; text-decoration: underline; font-size: 18px;">No Corriente</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label style="font-weight: bold; font-size: 16px; color: black;"></q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.propiedad !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Propiedad, planta y equipo (neto)</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.propiedad.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.activosIntangibles !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Activos intangibles</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.activosIntangibles.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.activosBiologicos !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Activos Biologicos</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.activosBiologicos.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.inversionFinalLP !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Inversiones financieras a largo plazo</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.inversionFinalLP.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                        <!-- Activo TOTAL-->
                        <hr>
                        <!--PASIVOS -->
                        <q-list>
                            <q-item>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; font-size: 22px;">Pasivos</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; text-decoration: underline; font-size: 18px;">Corriente</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label style="font-weight: bold; font-size: 16px; color: black;"></q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.cuentasPP !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Cuentas por pagar a corto plazo</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.cuentasPP.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.cuentasPPRelacionadas !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Cuentas por pagar partes relacionadas a corto plazo</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.cuentasPPRelacionadas.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.gastosAcumulados !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Gastos acumulados y otras cuentas por pagar</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.gastosAcumulados.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.otrascuentasPP !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Otras cuentas por pagar a corto plazo</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.otrascuentasPP.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.obligacionesEmple !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Obligaciones a corto plazo por beneficios a empleados</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.obligacionesEmple.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.impuestosSobreRenta !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Impuesto sobre la renta por pagar</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.impuestosSobreRenta.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                        <!--PASIOSVOS NO CORRINETES-->
                        <q-list v-show="this.CPPRelacionadasLP !== 0">
                            <q-item>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; text-decoration: underline; font-size: 18px;">No Corriente</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label style="font-weight: bold; font-size: 16px;  color: black;"></q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.CPPRelacionadasLP !== 0">
                                <q-item-section>
                                    <q-item-label style="font-size: 15px;">Cuentas por pagar partes relacionadas de Largo Plazo</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.CPPRelacionadasLP.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                        <!-- PASIVO TOTAL-->
                        <hr>
                        <!--PATRIMONIO-->
                        <q-list>
                            <q-item>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; font-size: 22px;">Patrimonio</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.capitalSocial !== 0">
                                <q-item-section>
                                    <q-item-label style="font-size: 15px;">Capital Social</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.capitalSocial.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.reservaLegal !== 0">
                                <q-item-section>
                                    <q-item-label style="font-size: 15px;">Reserva Legal</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.reservaLegal.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.resultadosAcu !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;" side bottom>Resultados acumulados</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.resultadosAcu.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.resultadosPresEjer !== 0">
                                <q-item-section>
                                    <q-item-label style="font-size: 15px;">Resultados del presente ejercicio</q-item-label>
                                </q-item-section>
                                <q-item-section side top style="border-bottom:5px,black,  solid;">
                                    <q-item-label>{{this.resultadosPresEjer.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                        <!-- Final-->
                    </div>
                </div>
            </div>
        </div>
        <div class="row-12" id="content2" v-show="this.verEstado">
            <div class="col-12" style="padding: 30px; margin: 5%;">
                <div class="row-12">
                    <div class="col-12 justify-center">
                        <h6 style="text-align: center; margin-top: 5px; margin-bottom: 8px;">INFORMACION DEL ESTADO DE RESULTADOS</h6>
                        <h6 style="text-align: center; margin-top: 5px; margin-bottom: 8px;"> Del año {{this.$route.params.anioactual}}</h6>
                    </div>
                    <div class="col-12 justify-center">

                    </div>
                    <div class="col-12 justify-center">

                    </div>
                </div>
                <div class="row-12">
                    <div class="col-12">
                        <q-list>
                            <q-item>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; font-size: 18px;">INGRESOS</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.ingresosporventas !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Ingresos por ventas</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.ingresosporventas.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.costodeventas !== 0">
                                <q-item-section>
                                    <q-item-label style="font-size: 15px;">Costos de ventas</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.costodeventas.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                        <hr>
                        <!--  FIN CORRIENTE-->
                        <!--No corriente-->
                        <q-list>
                            <q-item>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; font-size: 18px;">GASTOS DE OPERACION</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.gastosAdmin !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Gastos de administración</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.gastosAdmin.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.gastosVentas !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Gastos de ventas</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.gastosVentas.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                        <hr>
                        <!--PASIVOS -->
                        <q-list>
                            <q-item v-show="this.otrosIngresNetos !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Otros ingresos Netos</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.otrosIngresNetos.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.otrosGasNetos !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Otros gastos netos</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.otrosGasNetos.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.gastosFinan !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Gastos financieros</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.gastosFinan.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                        <hr>
                        <!--PATRIMONIO-->
                        <q-list v-show="this.reservaLegal !== 0">
                            <q-item>
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Reserva Legal</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label style="font-size: 15px;  text-decoration: underline; color: black;">{{this.reservaLegal.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                        <q-list v-show="this.impuestosSobreRenta !== 0">
                            <q-item>
                                <q-item-section>
                                    <q-item-label style="font-size: 15px;">Impuesto sobre la renta Corriente</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label style=" font-size: 15px;  text-decoration: underline; color: black;">{{this.impuestosSobreRenta.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                        <!-- Final-->

                    </div>
                </div>
            </div>
        </div>
    </div>

</q-page>
</template>

<script>
import html2canvas from 'html2canvas';
import {
    jsPDF
} from "jspdf";
import {
    db
} from "boot/firebase"
import {
    doc,
    getDoc
} from "firebase/firestore";

export default {
    name: 'VerPeriodo',
    data() {
        return {
            periodo: [],
            id: String,
            cargandoDatos: true,
            llaveCargandoDatos: false,
            verEstado: false,
            link: 'inbox',
            // Datos a mostrar
            // ACTIVOS
            // Corrientes
            efectivo: 0,
            cuentasPC: 0,
            otrasCPC: 0,
            inventarios: 0,
            gastosPagadosAnt: 0,
            depositosCortoP: 0,
            // No Corrientes
            propiedad: 0,
            activosIntangibles: 0,
            activosBiologicos: 0,
            inversionFinalLP: 0,
            // PASIVOS
            // Corrientes
            cuentasPP: 0,
            cuentasPPRelacionadas: 0,
            otrascuentasPP: 0,
            obligacionesEmple: 0,
            impuestosSobreRenta: 0,
            gastosAcumulados: 0,
            // No corrientes
            CPPRelacionadasLP: 0,
            // PATRIMONIO
            //
            capitalSocial: 0,
            reservaLegal: 0,
            resultadosAcu: 0,
            resultadosPresEjer: 0,
            // ESTADO DE RESULTADO

            costodeventas: 0,
            gastosAdmin: 0,
            gastosFinan: 0,
            gastosVentas: 0,
            impuestosSobreRenta: 0,
            ingresosporventas: 0,
            otrosGasNetos: 0,
            otrosIngresNetos: 0,
            reservaLegal: 0,
            utilidadbruta: 0,
            utilidadneta: 0,
            utilidadoperativa: 0,
            utilidadantesreserva: 0

        };
    },
    computed: {

    },
    created() {
        this.id = this.$route.params.id
        this.lsitartareas()
    },
    mounted() {},
    watch: {
        llaveCargandoDatos() {
            console.log("se ocullto")
            this.generarOperaciones()
            this.generarOperacionesER()
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
        },
        generarOperaciones() {
            // Activos
            this.efectivo = parseFloat(this.periodo[0].balancegeneral.activos.efectivo)
            this.cuentasPC = parseFloat(this.periodo[0].balancegeneral.activos.cuentasPC)
            this.otrasCPC = parseFloat(this.periodo[0].balancegeneral.activos.otrasCPC)
            this.inventarios = parseFloat(this.periodo[0].balancegeneral.activos.inventarios)
            this.gastosPagadosAnt = parseFloat(this.periodo[0].balancegeneral.activos.gastosPagadosAnt)
            this.depositosCortoP = parseFloat(this.periodo[0].balancegeneral.activos.depositosCortoP)
            // No Corrientes
            this.propiedad = parseFloat(this.periodo[0].balancegeneral.activos.propiedad)
            this.activosIntangibles = parseFloat(this.periodo[0].balancegeneral.activos.activosIntangibles)
            this.activosBiologicos = parseFloat(this.periodo[0].balancegeneral.activos.activosBiologicos)
            this.inversionFinalLP = parseFloat(this.periodo[0].balancegeneral.activos.inversionFinalLP)
            // PASIVOS
            // Corrientes
            this.cuentasPP = parseFloat(this.periodo[0].balancegeneral.pasivos.cuentasPP)
            this.cuentasPPRelacionadas = parseFloat(this.periodo[0].balancegeneral.pasivos.cuentasPPRelacionadas)
            this.otrascuentasPP = parseFloat(this.periodo[0].balancegeneral.pasivos.otrascuentasPP)
            this.obligacionesEmple = parseFloat(this.periodo[0].balancegeneral.pasivos.obligacionesEmple)
            this.impuestosSobreRenta = parseFloat(this.periodo[0].balancegeneral.pasivos.impuestosSobreRenta)
            this.gastosAcumulados = parseFloat(this.periodo[0].balancegeneral.pasivos.gastosAcumulados)
            // No corrientes
            this.CPPRelacionadasLP = parseFloat(this.periodo[0].balancegeneral.pasivos.CPPRelacionadasLP)
            // PATRIMONIO
            //
            this.capitalSocial = parseFloat(this.periodo[0].balancegeneral.patrimonio.capitalSocial)
            this.reservaLegal = parseFloat(this.periodo[0].balancegeneral.patrimonio.reservaLegal)
            this.resultadosAcu = parseFloat(this.periodo[0].balancegeneral.patrimonio.resultadosAcu)
            this.resultadosPresEjer = parseFloat(this.periodo[0].balancegeneral.patrimonio.resultadosPresEjer)
        },
        generarOperacionesER() {
            // 
            this.costodeventas = parseFloat(this.periodo[0].estadoresultados.costodeventas)
            this.gastosAdmin = parseFloat(this.periodo[0].estadoresultados.gastosAdmin)
            this.gastosFinan = parseFloat(this.periodo[0].estadoresultados.gastosFinan)
            this.gastosVentas = parseFloat(this.periodo[0].estadoresultados.gastosVentas)
            this.impuestosSobreRenta = parseFloat(this.periodo[0].estadoresultados.impuestosSobreRenta)
            this.ingresosporventas = parseFloat(this.periodo[0].estadoresultados.ingresosporventas)
            this.otrosGasNetos = parseFloat(this.periodo[0].estadoresultados.otrosGasNetos)
            this.otrosIngresNetos = parseFloat(this.periodo[0].estadoresultados.otrosIngresNetos)
            this.reservaLegal = parseFloat(this.periodo[0].estadoresultados.reservaLegal)
        },
        generarPDF() {
            html2canvas(document.querySelector("#content")).then(canvas => {
                var imgUrl = canvas.toDataURL("image / png"); // Convertir lienzo en flujo img src
                const doc = new jsPDF('p', 'mm', 'letter');
                doc.addImage(imgUrl, 0, 0, 210, 250)
                doc.save("a4.pdf"); // will save the file in the current working directory
            });
        }
    }
}
</script>


<style lang="sass">
.my-menu-link
  color: white
  background: #3BD85A
</style>
