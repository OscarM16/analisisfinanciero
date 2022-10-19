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
                <h3 style="text-align: center; font-weight: bold;"> Reporte del Estado de Resultado del Año {{this.$route.params.anioactual}}</h3>
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
                        <h6 style="text-align: center; margin-top: 5px; margin-bottom: 8px;">ESTADO DE RESULTADOS</h6>
                        <h6 style="text-align: center; margin-top: 5px; margin-bottom: 8px;">EMPRESA ANONIMA</h6>
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
                            <q-item>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; font-size: 18px;">UTILIDAD BRUTA</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label style="font-weight: bold; font-size: 18px;  text-decoration: underline; color: black;">{{this.utilidadbruta.toLocaleString('en')}}</q-item-label>
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
                            <q-item>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; font-size: 18px;">UTILIDAD DE OPERACION</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label style="font-weight: bold; font-size: 18px; text-decoration: underline; color: black;">{{this.utilidadoperativa.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                        <hr>
                        <!--PASIVOS -->
                        <q-list>
                            <q-item>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; font-size: 18px;">OTROS GASTOS {{this.hayIngresos}}</q-item-label>
                                </q-item-section>
                            </q-item>
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
                            <q-item v-show="this.ingresosFinan !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Ingresos financieros</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label>{{this.ingresosFinan.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <!--AGREGAR ACA EL QUE FALTA-->
                        </q-list>
                        <hr>
                        <q-list>
                            <q-item>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; font-size: 18px;">UTILIDAD ANTES DE RESERVA LEGAL</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label style="font-weight: bold; font-size: 18px; text-decoration: underline; color: black;">{{this.utilidadantesreserva.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                        <hr>
                        <!--PATRIMONIO-->
                        <q-list v-show="this.reservaLegal !== 0">
                            <q-item>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; font-size: 18px;">RESERVA LEGAL</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label style="font-weight: bold; font-size: 18px;  text-decoration: underline; color: black;">{{this.reservaLegal.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                        <q-list v-show="this.impuestosSobreRentaES !== 0">
                            <q-item>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; font-size: 18px;">IMPUESTOS SOBRE LA RENTA CORRIENTE</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label style="font-weight: bold; font-size: 18px;  text-decoration: underline; color: black;">{{this.impuestosSobreRentaES.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                        <!-- Final-->
                        <hr>
                        <q-list>
                            <q-item>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; font-size: 22px;">UTILIDAD NETA</q-item-label>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-item-label style="font-weight: bold; font-size: 22px; text-decoration: underline; color: black;">{{this.utilidadneta.toLocaleString('en')}}</q-item-label>
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
    name: 'ReporteEstadoRes',
    data() {
        return {
            periodo: [],
            id: String,
            cargandoDatos: true,
            llaveCargandoDatos: false,
            hayIngresos: "",
            // Datos a mostrar
            costodeventas: 0,
            gastosAdmin: 0,
            gastosFinan: 0,
            ingresosFinan: 0,
            gastosVentas: 0,
            impuestosSobreRentaES: 0,
            ingresosporventas: 0,
            otrosGasNetos: 0,
            otrosIngresNetos: 0,
            reservaLegal: 0,
            utilidadbruta: 0,
            utilidadneta: 0,
            utilidadoperativa: 0,
            utilidadantesreserva: 0,
            nombrePDF: ""
        };
    },
    computed: {

    },
    created() {
        this.id = this.$route.params.id
        this.lsitartareas()
        console.log(this.cargandoDatos)
        this.nombrePDF = "EstadoDeResultados"+this.$route.params.anioactual
    },
    mounted() {},
    watch: {
        llaveCargandoDatos() {
            console.log("se ocullto")
            this.generarOperaciones()
            this.cargandoDatoss()
        }
    },
    methods: {
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
            // 
            this.costodeventas = parseFloat(this.periodo[0].estadoresultados.costodeventas)
            this.gastosAdmin = parseFloat(this.periodo[0].estadoresultados.gastosAdmin)
            this.gastosFinan = parseFloat(this.periodo[0].estadoresultados.gastosFinan)
            this.ingresosFinan = parseFloat(this.periodo[0].estadoresultados.ingresosFinan)
            this.gastosVentas = parseFloat(this.periodo[0].estadoresultados.gastosVentas)
            this.impuestosSobreRentaES = parseFloat(this.periodo[0].estadoresultados.impuestosSobreRentaES)
            this.ingresosporventas = parseFloat(this.periodo[0].estadoresultados.ingresosporventas)
            this.otrosGasNetos = parseFloat(this.periodo[0].estadoresultados.otrosGasNetos)
            this.otrosIngresNetos = parseFloat(this.periodo[0].estadoresultados.otrosIngresNetos)
            this.reservaLegal = parseFloat(this.periodo[0].estadoresultados.reservaLegalES)

            this.utilidadbruta = parseFloat(this.utilidadbruta) + parseFloat(this.ingresosporventas) - parseFloat(this.costodeventas)
            this.utilidadoperativa = parseFloat(this.utilidadbruta) - parseFloat(this.gastosAdmin) - parseFloat(this.gastosVentas)
            this.utilidadantesreserva = parseFloat(this.utilidadoperativa) - parseFloat(this.otrosGasNetos) - parseFloat(this.gastosFinan) + parseFloat(this.otrosIngresNetos)  + parseFloat(this.ingresosFinan)
            this.utilidadneta = parseFloat(this.utilidadantesreserva) - parseFloat(this.reservaLegal) - parseFloat(this.impuestosSobreRentaES)

            if ((this.ingresosFinan !== 0 || this.otrosIngresNetos !== 0)) {
                this.hayIngresos = "/ INGRESOS"
            }
        },
        cargandoDatoss() {
            this.cargandoDatos = false
            console.log(this.cargandoDatos)
        },
        generarPDF() {
            html2canvas(document.querySelector("#content")).then(canvas => {
                var imgUrl = canvas.toDataURL("image / png"); // Convertir lienzo en flujo img src
                const doc = new jsPDF('p','mm', [297, 210]);
                doc.addImage(imgUrl, 0, 0, 210, 280)
                doc.save(this.nombrePDF); // will save the file in the current working directory
            });
        }
    }
}
</script>
