<template>
<q-page class="q-pa-md">
    <div class="row" v-show="this.cargandoDatos">
        <div class="col items-center" style="justify-content: center; margin-top: 150px;">
            <div class="row justify-center">
                <q-spinner-clock color="primary" size="25em" />
            </div>
        </div>
    </div>
    <div class="row-12 justify-center">
        <h3 style="text-align: center; font-weight: bold;">Reporte Vertical del Estado de Resultados del Año {{this.$route.params.anioactual}}</h3>
    </div>
    <div class="row" v-show="!this.cargandoDatos" style="padding: 30px; margin: 5%;">
        <div class="col-5">
            <div class="" style="font-size:20px">
                <q-radio v-model="anioActual" :val=anioActual :label=this.$route.params.anioactual />
            </div>
            <div class="" style="font-size:20px">
                El año actual es: <strong>{{ anioActual }}</strong>
            </div>
        </div>
        <div class="col-5">
            <div class="" style="font-size:20px; margin-left: -90px;">
                <strong> Compara el año {{this.anioActual}} con los siguientes años</strong>
            </div>
            <div class="" style="font-size:20px">
                <q-radio v-for="index in aniosArray" :key="index" v-model="eleccion" :val=index :label=index />
            </div>
            <div class="" v-show="eleccion !== 'Ninguna'">
                El año a comparar es: <strong>{{ eleccion }}</strong>
            </div>
        </div>
        <div class="col-2" style="justify-items: right;">
            <div class="">
                <q-btn color="blue" @click="this.generarPDF()">
                    <q-icon left size="3em" name="download" />
                    Descargar PDF
                </q-btn>
            </div>
        </div>
    </div>

    <!--reporte
        <p>{{this.periodoActual[0].estadoresultados}}</p>
        <p>{{this.periodoComparar[0]}}</p>
        -->
    <div class="row-12" v-show="!this.cargandoDatos">
        <div class="row-12" id="content">
            <div class="col-12" style="padding: 30px; margin: 5%;">
                <div class="row-12">
                    <div class="col-12 justify-center">
                        <h6 style="text-align: center; margin-top: 5px; margin-bottom: 8px;">ESTADO DE RESULTADOS</h6>
                        <h6 style="text-align: center; margin-top: 5px; margin-bottom: 8px;">EMPRESA ANONIMA</h6>
                        <h6 v-if="this.anioComparado !== '' " style="text-align: center; margin-top: 5px; margin-bottom: 8px;">Estado de Resultados del año {{this.$route.params.anioactual}} y {{anioComparado}}</h6>
                        <h6 v-if="this.anioComparado === '' " style="text-align: center; margin-top: 5px; margin-bottom: 8px;">Estado de Resultados del año {{this.$route.params.anioactual}}</h6>
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
                                <q-item-section >
                                    <q-item-label>{{this.ingresosporventas.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                                <q-item-section >
                                    <q-item-label>{{this.ingresosporventasporcentaje}}%</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.costodeventas !== 0">
                                <q-item-section>
                                    <q-item-label style="font-size: 15px;">Costos de ventas</q-item-label>
                                </q-item-section>
                                <q-item-section >
                                    <q-item-label>{{this.costodeventas.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                                <q-item-section >
                                    <q-item-label>{{this.costodeventasporcentaje}}%</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; font-size: 18px;">UTILIDAD BRUTA</q-item-label>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; font-size: 18px;  text-decoration: underline; color: black;">{{this.utilidadbruta.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                                <q-item-section >
                                    <q-item-label style="font-weight: bold; font-size: 18px;  text-decoration: underline; color: black;">{{this.utilidadbrutaporcentaje}}%</q-item-label>
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
                                <q-item-section>
                                    <q-item-label>{{this.gastosAdmin.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                                <q-item-section >
                                    <q-item-label>{{this.gastosAdminporcentaje}}%</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.gastosVentas !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Gastos de ventas</q-item-label>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>{{this.gastosVentas.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                                <q-item-section >
                                    <q-item-label>{{this.gastosVentasporcentaje}}%</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.gastosFinan !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Gastos financieros</q-item-label>
                                </q-item-section>
                                <q-item-section >
                                    <q-item-label>{{this.gastosFinan.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                                <q-item-section >
                                    <q-item-label>{{this.gastosFinanporcentaje}}%</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; font-size: 18px;">UTILIDAD DE OPERACION</q-item-label>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; font-size: 18px; text-decoration: underline; color: black;">{{this.utilidadoperativa.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; font-size: 18px; text-decoration: underline; color: black;">{{this.utilidadoperativaporcentaje}}%</q-item-label>
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
                                <q-item-section>
                                    <q-item-label>{{this.otrosIngresNetos.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>{{this.otrosIngresNetosporcentaje}}%</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item v-show="this.otrosGasNetos !== 0">
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Otros gastos netos</q-item-label>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>{{this.otrosGasNetos.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>{{this.otrosGasNetosporcentaje}}%</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                        <hr>
                        <q-list>
                            <q-item>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; font-size: 18px;">UTILIDAD ANTES DE RESERVA LEGAL</q-item-label>
                                </q-item-section>
                                <q-item-section >
                                    <q-item-label style="font-weight: bold; font-size: 18px; text-decoration: underline; color: black;">{{this.utilidadantesreserva.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                                <q-item-section >
                                    <q-item-label style="font-weight: bold; font-size: 18px; text-decoration: underline; color: black;">{{this.utilidadantesreservaporcentaje}}%</q-item-label>
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
                                <q-item-section>
                                    <q-item-label>{{this.reservaLegal.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>{{this.reservaLegalporcentaje}}%</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                        <q-list v-show="this.impuestosSobreRentaES !== 0">
                            <q-item>
                                <q-item-section>
                                    <q-item-label style=" font-size: 15px;">Impuesto sobre la renta corriente</q-item-label>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>{{this.impuestosSobreRentaES.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>{{this.impuestosSobreRentaESporcentaje}}%</q-item-label>
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
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; font-size: 22px; text-decoration: underline; color: black;">{{this.utilidadneta.toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; font-size: 22px; text-decoration: underline; color: black;">{{this.utilidadnetaporcentaje}}%</q-item-label>
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
                    <div class="col" style="margin-right: 40px;  margin-left: 40px;">
                        <div style=" border-bottom: solid; font-size: 30px;"></div>
                        <div class="row justify-center">
                            <p style="text-align: center;">Contador</p>
                        </div>
                    </div>
                    <div class="col" style="margin-right: 40px;  margin-left: 40px;">
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
    name: 'ReporteVerticalER',
    data() {
        return {
            periodoActual: [],
            periodos: [],
            eleccion: 'Ninguna',
            anioActual: "",
            anioComparado: "",
            aniosArray: [],
            periodoComparar: [],
            id: String,
            cargandoDatos: true,
            llaveCargandoDatos: false,

            // Datos a mostrar
            costodeventas: 0,
            costodeventasporcentaje: 0,
            gastosAdmin: 0,
            gastosAdminporcentaje:0,
            gastosFinan: 0,
            gastosFinanporcentaje:0,
            gastosVentas: 0,
            gastosVentasporcentaje:0,
            impuestosSobreRentaES: 0,
            impuestosSobreRentaESporcentaje:0,
            ingresosporventas: 0,
            ingresosporventasporcentaje:0,
            otrosGasNetos: 0,
            otrosGasNetosporcentaje:0,
            otrosIngresNetos: 0,
            otrosIngresNetosporcentaje:0,
            reservaLegal: 0,
            reservaLegalporcentaje:0,
            utilidadbruta: 0,
            utilidadbrutaporcentaje:0,
            utilidadneta: 0,
            utilidadnetaporcentaje:0,
            utilidadoperativa: 0,
            utilidadoperativaporcentaje:0,
            utilidadantesreserva: 0,
            utilidadantesreservaporcentaje:0,

            nombredelPDF: "ReporteVerticalEstadodeResultados",
            nombredelPDFbase: ""
        };
    },
    created() {
        this.id = this.$route.params.id
        this.listarPeriodoActual()
        this.listarPeriodos()
        this.anioActual = this.$route.params.anioactual
        this.nombredelPDF = "ReporteVerticalEstadodeResultados" + this.$route.params.anioactual

    },
    watch: {
        llaveCargandoDatos() {
            console.log("se ocullto")
            this.generarOperaciones()
            this.cargandoDatoss()
        },
        eleccion() {
            console.log("Se a cambiado la eleccion")
            this.obtenerPeriodoComparar()
            console.log(this.periodoComparar[0])
            console.log(this.periodoComparar[0].id)
            console.log(this.periodoComparar[0].informacion)
            console.log(this.periodoComparar[0].informacion.estadoresultados)
        }
    },
    methods: {
        cargandoDatoss() {
            this.cargandoDatos = false
            console.log(this.cargandoDatos)
        },
        obtenerPeriodoComparar() {
            this.periodoComparar = this.periodos.filter((item) => {
                if (item.informacion.anio === this.eleccion) {
                    return true
                }
            })
            this.anioComparado = this.periodoComparar[0].informacion.anio
            console.log("prueba" + this.anioComparado)

            //valoresdelperiodocomparado
        },
        async listarPeriodos() {
            try {
                db.collection('periodos')
                    .orderBy('anio')
                    .get()
                    .then(query => {
                        query.forEach(item => {
                            const periodoDB = {
                                id: item.id,
                                informacion: item.data()
                            }
                            this.periodos.push(periodoDB)
                            if (periodoDB.informacion.anio !== this.$route.params.anioactual) {
                                this.aniosArray.push(periodoDB.informacion.anio)
                            }
                            this.periodoCopia = this.periodos.slice()
                        })
                    })
            } catch (error) {
                console.log(error)
            }
        },
        async listarPeriodoActual() {
            const docRef = doc(db, "periodos", this.$route.params.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                this.periodoActual.push(docSnap.data())
                if (this.periodoActual.length !== 0) {
                    this.llaveCargandoDatos = true
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        },
        generarOperaciones() {
            this.ingresosporventas = parseFloat(this.periodoActual[0].estadoresultados.ingresosporventas)
            this.ingresosporventasporcentaje = (parseFloat(this.ingresosporventas)/parseFloat(this.ingresosporventas))*100
            this.costodeventas = parseFloat(this.periodoActual[0].estadoresultados.costodeventas)*(-1)
            this.costodeventasporcentaje = (parseFloat(this.costodeventas)/parseFloat(this.ingresosporventas))*100
            this.costodeventasporcentaje = this.costodeventasporcentaje.toFixed(2)
            this.utilidadbruta = parseFloat(this.ingresosporventas) + parseFloat(this.costodeventas)
            this.utilidadbrutaporcentaje = (parseFloat(this.utilidadbruta)/parseFloat(this.ingresosporventas))*100
            this.utilidadbrutaporcentaje = this.utilidadbrutaporcentaje.toFixed(2)

            this.gastosAdmin = parseFloat(this.periodoActual[0].estadoresultados.gastosAdmin)*(-1)
            this.gastosAdminporcentaje = (parseFloat(this.gastosAdmin)/parseFloat(this.ingresosporventas))*100
            this.gastosAdminporcentaje = this.gastosAdminporcentaje.toFixed(2)

            this.gastosFinan = parseFloat(this.periodoActual[0].estadoresultados.gastosFinan)*(-1)
            this.gastosFinanporcentaje = (parseFloat(this.gastosFinan)/parseFloat(this.ingresosporventas))*100
            this.gastosFinanporcentaje = this.gastosFinanporcentaje.toFixed(2)

            this.gastosVentas = parseFloat(this.periodoActual[0].estadoresultados.gastosVentas)*(-1)
            this.gastosVentasporcentaje = (parseFloat(this.gastosVentas)/parseFloat(this.ingresosporventas))*100
            this.gastosVentasporcentaje = this.gastosVentasporcentaje.toFixed(2)

            this.utilidadoperativa = parseFloat(this.utilidadbruta) + parseFloat(this.gastosAdmin) + parseFloat(this.gastosVentas) + parseFloat(this.gastosFinan)
            this.utilidadoperativaporcentaje = (parseFloat(this.utilidadoperativa)/parseFloat(this.ingresosporventas))*100
            this.utilidadoperativaporcentaje = this.utilidadoperativaporcentaje.toFixed(2)

            this.otrosGasNetos = parseFloat(this.periodoActual[0].estadoresultados.otrosGasNetos)*(-1)
            this.otrosGasNetosporcentaje = (parseFloat(this.otrosGasNetos)/parseFloat(this.ingresosporventas))*100
            this.otrosGasNetosporcentaje = this.otrosGasNetosporcentaje.toFixed(2)

            this.otrosIngresNetos = parseFloat(this.periodoActual[0].estadoresultados.otrosIngresNetos)
            this.otrosIngresNetosporcentaje = (parseFloat(this.otrosIngresNetos)/parseFloat(this.ingresosporventas))*100
            this.otrosIngresNetosporcentaje = this.otrosIngresNetosporcentaje.toFixed(2)

            this.utilidadantesreserva = parseFloat(this.utilidadoperativa) + parseFloat(this.otrosGasNetos) + parseFloat(this.otrosIngresNetos)
            this.utilidadantesreservaporcentaje = (parseFloat(this.utilidadantesreserva)/parseFloat(this.ingresosporventas))*100
            this.utilidadantesreservaporcentaje = this.utilidadantesreservaporcentaje.toFixed(2)

            this.reservaLegal = parseFloat(this.periodoActual[0].estadoresultados.reservaLegalES)*(-1)
            this.reservaLegalporcentaje = (parseFloat(this.reservaLegal)/parseFloat(this.ingresosporventas))*100
            this.reservaLegalporcentaje = this.reservaLegalporcentaje.toFixed(2)

            this.impuestosSobreRentaES = parseFloat(this.periodoActual[0].estadoresultados.impuestosSobreRentaES)*(-1)
            this.impuestosSobreRentaESporcentaje = (parseFloat(this.impuestosSobreRentaES)/parseFloat(this.ingresosporventas))*100
            this.impuestosSobreRentaESporcentaje = this.impuestosSobreRentaESporcentaje.toFixed(2)

            this.utilidadneta = parseFloat(this.utilidadantesreserva) + parseFloat(this.reservaLegal) + parseFloat(this.impuestosSobreRentaES)
            this.utilidadnetaporcentaje = (parseFloat(this.utilidadantesreserva)/parseFloat(this.ingresosporventas))*100
            this.utilidadnetaporcentaje = this.utilidadnetaporcentaje.toFixed(2)

        },
        generarPDF() {
            html2canvas(document.querySelector("#content")).then(canvas => {
                var imgUrl = canvas.toDataURL("image / png"); // Convertir lienzo en flujo img src
                const doc = new jsPDF('p', 'mm', 'letter');
                doc.addImage(imgUrl, 0, 0, 210, 280)
                if (this.anioComparado === "") {
                    this.nombredelPDF = this.nombredelPDF
                    this.nombredelPDFbase = this.nombredelPDF
                } else {
                    this.nombredelPDF = this.nombredelPDF + "-" + this.anioComparado
                }
                doc.save(this.nombredelPDF); // will save the file in the current working directory
                this.nombredelPDF = this.nombredelPDFbase
            });
        }
    }
}
</script>
