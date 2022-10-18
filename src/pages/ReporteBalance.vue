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
        <div class="row-12">
            <div class="col-12 justify-center">
                <h3 style="text-align: center; font-weight: bold;"> Reporte del Balance General del Año {{this.$route.params.anioactual}}</h3>
            </div>
        </div>
        <div class="row-12 q-pa-md" style="padding: 30px; margin: 5%;">
            <div class="col">
                <q-btn style="float: right;" color="blue" @click="this.generarPDF()">
                <q-icon left size="3em" name="download" />
                <div>Descargar PDF</div>
            </q-btn>
            </div>
        </div>
        <div class="row-12" id="content">
            <div class="col-12" style="padding: 30px; margin: 5%;">
                <div class="row-12">
                    <div class="col-12 justify-center">
                        <h6 style="text-align: center; margin-top: 5px; margin-bottom: 8px;" >BALANCE GENERAL</h6>
                        <h6 style="text-align: center; margin-top: 5px; margin-bottom: 8px;">EMPRESA ANONIMA</h6>
                        <h6 style="text-align: center; margin-top: 5px; margin-bottom: 8px;">Balance General del año {{this.$route.params.anioactual}}</h6>
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
                                        <q-item-label style="font-weight: bold; font-size: 16px; color: black;">{{this.totalActivoCorriente}}</q-item-label>
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
                            <q-list v-show="this.totalAcrivoNoCorriente !== '0'"> 
                                
                                <q-item>
                                    <q-item-section>
                                        <q-item-label style="font-weight: bold; text-decoration: underline; font-size: 18px;">No Corriente</q-item-label>
                                    </q-item-section>
                                    <q-item-section side top>
                                        <q-item-label style="font-weight: bold; font-size: 16px; color: black;">{{this.totalAcrivoNoCorriente}}</q-item-label>
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
                                        <q-item-label style=" font-size: 15px;">ACtivos intangibles</q-item-label>
                                    </q-item-section>
                                    <q-item-section side top>
                                        <q-item-label>{{this.activosIntangibles.toLocaleString('en')}}</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item  v-show="this.activosBiologicos !== 0">
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
                            <q-list>
                                <q-item>
                                    <q-item-section>
                                        <q-item-label style="font-weight: bold; font-size: 18px;">Activo Total</q-item-label>
                                    </q-item-section>
                                    <q-item-section side top>
                                        <q-item-label style="font-weight: bold; font-size: 18px; text-decoration: underline; color: black;">{{this.totalActivo}}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
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
                                        <q-item-label style="font-weight: bold; font-size: 16px; color: black;">{{this.totalPasivoCorriente}}</q-item-label>
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
                            <q-list v-show="this.totalPasivoNoCorriente !== '0'">
                                <q-item>
                                    <q-item-section>
                                        <q-item-label style="font-weight: bold; text-decoration: underline; font-size: 18px;">No Corriente</q-item-label>
                                    </q-item-section>
                                    <q-item-section side top>
                                        <q-item-label style="font-weight: bold; font-size: 16px;  color: black;">{{this.totalPasivoNoCorriente}}</q-item-label>
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
                            <q-list>
                                <q-item>
                                    <q-item-section>
                                        <q-item-label style="font-weight: bold; font-size: 18px;">Pasivo Total</q-item-label>
                                    </q-item-section>
                                    <q-item-section side top>
                                        <q-item-label style="font-weight: bold; font-size: 18px; text-decoration: underline; color: black;">{{this.totalPasivo}}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
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
                                        <q-item-label style=" font-size: 15px;" side bottom >Resultados acumulados</q-item-label>
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
                                <q-item>
                                    <q-item-section>
                                        <q-item-label style="font-weight: bold; font-size: 18px;">Patrimonio Total</q-item-label>
                                    </q-item-section>
                                    <q-item-section side top>
                                        <q-item-label style="font-weight: bold; font-size: 18px; text-decoration: underline; color: black;">{{this.totalPatrimonio}}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                            <!-- Final-->
                            <hr>
                            <q-list>
                                <q-item>
                                    <q-item-section>
                                        <q-item-label style="font-weight: bold; font-size: 18px;">Total Pasivo y Patrimonio Total</q-item-label>
                                    </q-item-section>
                                    <q-item-section side top>
                                        <q-item-label style="font-weight: bold; font-size: 18px; text-decoration: underline; color: black;">{{this.pasivoPatrimonio}}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                    </div>
                </div>
                <div class="row justify-center" style="margin-top: 200px;">
                <div class="col" style="margin-right: 40px; margin-left: 40px;">
                    <div style=" border-bottom: solid; font-size: 30px;"></div>
                    <div class="row justify-center">
                        <p style="text-align: center;">Representante legal</p>
                    </div>
                </div>
                <div class="col"  style="margin-right: 40px;  margin-left: 40px;">
                    <div style=" border-bottom: solid; font-size: 30px;"></div>
                    <div class="row justify-center">
                        <p style="text-align: center;">Contador</p>
                    </div>
                </div>
                <div class="col"  style="margin-right: 40px;  margin-left: 40px;">
                    <div style=" border-bottom: solid; font-size: 30px;"></div>
                    <div class="row justify-center">
                        <p style="text-align: center;">Auditor</p>
                    </div>
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
    name: 'ReporteBalance',
    data() {
        return {
            periodo: [],
            id: String,
            cargandoDatos: true,
            llaveCargandoDatos: false,
            // Datos a mostrar
            // ACTIVOS
            totalActivo: 0,
            totalActivoCorriente: 0,
            totalAcrivoNoCorriente:0,
            // Corrientes
            efectivo: 0,
            cuentasPC:0,
            otrasCPC:0,
            inventarios:0,
            gastosPagadosAnt:0,
            depositosCortoP:0,
            // No Corrientes
            propiedad:0,
            activosIntangibles: 0,
            activosBiologicos: 0,
            inversionFinalLP:0,
            // PASIVOS
            totalPasivo: 0,
            totalPasivoCorriente: 0,
            totalPasivoNoCorriente:0,
            // Corrientes
            cuentasPP:0,
            cuentasPPRelacionadas:0,
            otrascuentasPP:0,
            obligacionesEmple:0,
            impuestosSobreRenta:0,
            gastosAcumulados:0,
            // No corrientes
            CPPRelacionadasLP:0,
            // PATRIMONIO
            totalPatrimonio:0,
            //
            capitalSocial:0,
            reservaLegal:0,
            resultadosAcu:0,
            resultadosPresEjer:0,
            // FIn
            pasivoPatrimonio: 0,
            // nombre del pdf
            nombredelPDF: "BalanceGeneral"
            
        };
    },
    computed: {

    },
    created() {
        this.id = this.$route.params.id
        this.lsitartareas()
        this.nombredelPDF = "Balancegeneral"+this.$route.params.anioactual
    },
    mounted() {},
    watch: {
        llaveCargandoDatos () {
            console.log("se ocullto")
            this.generarOperaciones()
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
        generarOperaciones () {
            // Activos
            this.efectivo = parseFloat(this.periodo[0].balancegeneral.activos.efectivo)
            this.cuentasPC = parseFloat(this.periodo[0].balancegeneral.activos.cuentasPC)
            this.otrasCPC = parseFloat(this.periodo[0].balancegeneral.activos.otrasCPC)
            this.inventarios = parseFloat(this.periodo[0].balancegeneral.activos.inventarios)
            this.gastosPagadosAnt = parseFloat(this.periodo[0].balancegeneral.activos.gastosPagadosAnt)
            this.depositosCortoP = parseFloat(this.periodo[0].balancegeneral.activos.depositosCortoP)
            // Total Activo Corriente 
            this.totalActivoCorriente = parseFloat(this.totalActivoCorriente) + parseFloat(this.efectivo) + parseFloat(this.cuentasPC) + parseFloat(this.otrasCPC) + parseFloat(this.inventarios) + parseFloat(this.gastosPagadosAnt) + parseFloat(this.depositosCortoP) 
            // No Corrientes
            this.propiedad = parseFloat(this.periodo[0].balancegeneral.activos.propiedad)
            this.activosIntangibles = parseFloat(this.periodo[0].balancegeneral.activos.activosIntangibles)
            this.activosBiologicos = parseFloat(this.periodo[0].balancegeneral.activos.activosBiologicos)
            this.inversionFinalLP = parseFloat(this.periodo[0].balancegeneral.activos.inversionFinalLP)
            // ACTIVOS
            this.totalAcrivoNoCorriente = parseFloat(this.totalAcrivoNoCorriente) + parseFloat(this.propiedad) + parseFloat(this.activosIntangibles) + parseFloat(this.activosBiologicos) + parseFloat(this.inversionFinalLP)
            //Total Activo
            this.totalActivo = parseFloat(this.totalActivo) + parseFloat(this.totalActivoCorriente) + parseFloat(this.totalAcrivoNoCorriente)
            this.totalActivo = this.totalActivo.toLocaleString('en');
            this.totalActivoCorriente = this.totalActivoCorriente.toLocaleString('en');
            this.totalAcrivoNoCorriente = this.totalAcrivoNoCorriente.toLocaleString('en');
            // PASIVOS
            // Corrientes
            this.cuentasPP = parseFloat(this.periodo[0].balancegeneral.pasivos.cuentasPP)
            this.cuentasPPRelacionadas = parseFloat(this.periodo[0].balancegeneral.pasivos.cuentasPPRelacionadas)
            this.otrascuentasPP  = parseFloat(this.periodo[0].balancegeneral.pasivos.otrascuentasPP)
            this.obligacionesEmple = parseFloat(this.periodo[0].balancegeneral.pasivos.obligacionesEmple)
            this.impuestosSobreRenta = parseFloat(this.periodo[0].balancegeneral.pasivos.impuestosSobreRenta)
            this.gastosAcumulados = parseFloat(this.periodo[0].balancegeneral.pasivos.gastosAcumulados)
            // No corrientes
            this.CPPRelacionadasLP = parseFloat(this.periodo[0].balancegeneral.pasivos.CPPRelacionadasLP)
            // Total Pasivos
            this.totalPasivoCorriente =  parseFloat(this.totalPasivoCorriente) + parseFloat(this.cuentasPP) + parseFloat(this.cuentasPPRelacionadas) + parseFloat(this.otrascuentasPP) + parseFloat(this.obligacionesEmple) + parseFloat(this.impuestosSobreRenta) + parseFloat(this.gastosAcumulados)
            this.totalPasivoNoCorriente = parseFloat(this.totalPasivoNoCorriente) + parseFloat(this.CPPRelacionadasLP)
            this.totalPasivo = parseFloat(this.totalPasivoCorriente) + parseFloat(this.totalPasivoNoCorriente)
            this.totalPasivoCorriente = this.totalPasivoCorriente.toLocaleString('en');
            this.totalPasivoNoCorriente = this.totalPasivoNoCorriente.toLocaleString('en');
            // PATRIMONIO
            //
            this.capitalSocial = parseFloat(this.periodo[0].balancegeneral.patrimonio.capitalSocial)
            this.reservaLegal = parseFloat(this.periodo[0].balancegeneral.patrimonio.reservaLegal)
            this.resultadosAcu = parseFloat(this.periodo[0].balancegeneral.patrimonio.resultadosAcu)
            this.resultadosPresEjer = parseFloat(this.periodo[0].balancegeneral.patrimonio.resultadosPresEjer)
            // Total Patrimonio
            this.totalPatrimonio = parseFloat(this.totalPatrimonio) + parseFloat(this.capitalSocial) +  parseFloat(this.reservaLegal) +  parseFloat(this.resultadosAcu) +  parseFloat(this.resultadosPresEjer)
            this.pasivoPatrimonio = parseFloat(this.totalPatrimonio) +  parseFloat(this.totalPasivo)
            this.totalPatrimonio = this.totalPatrimonio.toLocaleString('en');
            this.totalPasivo = this.totalPasivo.toLocaleString('en');
            this.pasivoPatrimonio = this.pasivoPatrimonio.toLocaleString('en');
        },
        generarPDF() {
            html2canvas(document.querySelector("#content")).then(canvas => {
                var imgUrl = canvas.toDataURL("image / png"); // Convertir lienzo en flujo img src
                const doc = new jsPDF('p','mm', [297, 210]);
                doc.addImage(imgUrl, 0, 0, 210, 297)
                doc.save(this.nombredelPDF); // will save the file in the current working directory
            });
        }
    }
}
</script>
