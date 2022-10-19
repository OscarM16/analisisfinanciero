<template>
<q-page class="q-pa-md">
    <div class="row" v-show="this.cargandoDatos">
        <div class="col items-center" style="justify-content: center; margin-top: 150px;">
            <div class="row justify-center">
                <q-spinner-clock color="primary" size="25em" />
            </div>
        </div>
    </div>
    <div class="row-12"  v-show="!this.cargandoDatos">
            <div class="col-12 justify-center">
                <q-btn round color="warning" icon="navigate_before" @click="anteriorPagina()" size="25px" style=" color: #3BD85A;position: absolute; top: 50px; left: 30px;"></q-btn>
                <h3 style="text-align: center; font-weight: bold;"> Reporte Horizontal del Balance General del Año {{this.$route.params.anioactual}}</h3>
            </div>
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
    <div class="row-12" v-show="!this.cargandoDatos">

        <div class="row-12" id="content">
            <div class="col-12" style="padding: 30px; margin: 5%;">
                <div class="row-12">
                    <div class="col-12 justify-center">
                        <h6 style="text-align: center; margin-top: 5px; margin-bottom: 8px;">ANÁLISIS HORIZONTAL</h6>
                        <h6 style="text-align: center; margin-top: 5px; margin-bottom: 8px;">EMPRESA ANONIMA</h6>
                        <h6 v-if="this.anioComparado !== '' " style="text-align: center; margin-top: 5px; margin-bottom: 8px;">Balance General del año {{this.$route.params.anioactual}} y {{anioComparado}}</h6>
                        <h6 v-if="this.anioComparado === '' " style="text-align: center; margin-top: 5px; margin-bottom: 8px;">Balance General del año {{this.$route.params.anioactual}}</h6>
                    </div>
                    <div class="col-12 justify-center">

                    </div>
                    <div class="col-12 justify-center">

                    </div>
                </div>
                <div>
                    actual{{this.periodoActual}}
                </div>
                <hr>
                <div>
                    a comparar {{this.periodoComparar}}
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
    name: 'ReporteHorizontalBG',
    data() {
        return {
            cargandoDatos: true,
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
            // nombre del pdf
            nombredelPDF: "ReporteVerticalBalanceGeneral",
            nombredelPDFbase: ""
        };
    },
    created() {
        this.id = this.$route.params.id
        this.listarPeriodoActual()
        this.listarPeriodos()
        this.anioActual = this.$route.params.anioactual
        this.nombredelPDF = "ReporteVerticalBalanceGeneral" + this.$route.params.anioactual
    },
    watch: {
        llaveCargandoDatos() {
            this.cargandoDatoss()
        },
        eleccion() {
            this.obtenerPeriodoComparar()
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
        },
        anteriorPagina() {
            this.$router.go(-1)
        },
    }
}
</script>
