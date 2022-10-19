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
            <div class="row-12 q-pa-md" style="padding: 30px; margin: 5%;">
                <div class="col">
                    <q-btn style="float: right;" color="blue" @click="this.generarPDF()">
                        <q-icon left size="3em" name="download" />
                        <div>Descargar PDF</div>
                    </q-btn>
                </div>
            </div>
            <div class="row-12" id="content" style="; ">
                <div class="q-pa-md">
                    <!--PRIMERA FILA-->
                    <div class="row">
                        <div class="col" style="background-color: #3752EB;font-size: 12px; font-weight: bold ; margin-left:15px; margin-right:15px; min-height: 50px; border-radius: 10px; padding: 5px; text-align: center;">
                            Ventas <br> <label style="font-size: 15px;">${{(this.ingresosporventas).toLocaleString('en')}}</label>
                        </div>
                        <div class="col" style=" margin-left:15px; margin-right:15px;">
                            |
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
                    <!--SEPRACION 0-->
                    <div class="row" v-show="this.reservaLegalES !== 0">

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
                    <!--COMIENZA PRIMERA FILA-->
                    <div class="row" v-show="this.reservaLegalES !== 0">
                        <div class="col" style="background-color: #3752EB; font-size: 12px; font-weight: bold ;margin-left:15px; margin-right:15px; min-height: 50px; border-radius: 10px; padding: 5px;text-align: center;">
                            Reserva Legal <br> <label style="font-size: 15px;">${{(this.reservaLegalES).toLocaleString('en')}}</label>
                        </div>
                        <div class="col" style=" margin-left:15px; margin-right:15px;">
                            |
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
                    <!--SEPRACION 0-->
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
                    <!--COMIENZA PRIMERA FILA-->
                    <div class="row" v-show="this.sumaotrosGastos !== 0">
                        <div class="col" style="background-color: #3752EB; font-size: 12px; font-weight: bold ;margin-left:15px; margin-right:15px; min-height: 50px; border-radius: 10px; padding: 5px;text-align: center;">
                            Otros Gastos <br> <label style="font-size: 15px;">${{(this.sumaotrosGastos).toLocaleString('en')}}</label>
                        </div>
                        <div class="col" style=" margin-left:15px; margin-right:15px;">
                            |
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
                    <!--SEPRACION 0-->
                    <div class="row" v-show="this.sumaingresos !== 0">

                        <div class="col" style=" margin-left:15px; margin-right:15px; text-align: center;">
                            Mas
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
                    <!--COMIENZA PRIMERA FILA-->
                    <div class="row" v-show="this.sumaingresos !== 0">
                        <div class="col" style="background-color: #3752EB; font-size: 12px; font-weight: bold ;margin-left:15px; margin-right:15px; min-height: 50px; border-radius: 10px; padding: 5px;text-align: center;">
                            Otros Ingresos <br> <label style="font-size: 15px;">${{(this.sumaingresos).toLocaleString('en')}}</label>
                        </div>
                        <div class="col" style=" margin-left:15px; margin-right:15px;">
                            |
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
                    <!--COMIENZA 1.5 FILA-->
                    <div class="row">
                        <div class="col" style="background-color: #3752EB;font-size: 12px; font-weight: bold ;margin-left:15px; margin-right:15px; min-height: 50px; border-radius: 10px; padding: 5px;text-align: center;">
                            Gastos Financieros <br> <label style="font-size: 15px;">${{(this.sumaGastosF).toLocaleString('en')}}</label>
                        </div>
                        <div class="col" style=" margin-left:15px; margin-right:15px;">
                            |
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

                        <div class="col" style="background-color: #3752EB;font-size: 12px; font-weight: bold ; margin-left:15px; margin-right:15px; border-radius: 10px; padding: 5px;text-align: center;">
                            Gastos Operativos <br> <label style="font-size: 15px;">${{(this.sumaGastosO).toLocaleString('en')}}</label>
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; justify-content: center; align-items: center; display: flex;">
                            <q-img src="../assets/flecha.jpg" ratio="" />
                        </div>
                        <div class="col" style="background-color: #5168EB;font-size: 12px; font-weight: bold ;margin-left:15px; margin-right:15px; border-radius: 10px; padding: 5px;text-align: center;">
                            Utilidad Neta <br> <label style="font-size: 15px;">${{parseFloat((this.utilidadneta)).toLocaleString('en')}}</label>
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; justify-content: center; align-items: center; position: relative; max-height:50px;">
                            <q-img style=" ;position: relative; top: 20px;" src="../assets/felcha1.jpg" ratio="" />
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
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; border-radius: 10px; padding: 5px;">
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
                        <div class="col" style="background-color: #3752EB;font-size: 12px; font-weight: bold ; margin-left:15px; margin-right:15px; border-radius: 10px; padding: 5px;text-align: center;">
                            Costos de ventas<br> <label style="font-size: 15px;">${{(this.costodeventas).toLocaleString('en')}}</label>
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">
                            |
                        </div>
                        <div class="col" style="background-color: #5168EB; font-size: 12px; font-weight: bold ;margin-left:15px; margin-right:15px; min-height: 50px; border-radius: 10px; padding: 5px;text-align: center;">
                            Ventas <br> <label style="font-size: 15px;">${{(this.ingresosporventas).toLocaleString('en')}}</label>
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; justify-content: center; align-items: center; display: flex;">

                        </div>
                        <div class="col" style="background-color: #728BEB ; font-size: 12px; font-weight: bold ;margin-left:15px; margin-right:15px; border-radius: 10px; padding: 5px;text-align: center;">
                            Margen de utilidad <br> <label style="font-size: 15px;">{{parseFloat((this.margenUtilidadN * 100).toFixed(2)).toLocaleString('en')}}%</label>
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
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; justify-content: right; align-items: center; display: flex;">
                            Multiplicado por
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; justify-content: center; align-items: center; display: flex;">
                            <q-img src="../assets/flecha.jpg" ratio="" />
                        </div>
                        <div class="col" style="background-color: #8FF5ED; font-size: 12px; font-weight: bold ;margin-left:15px; margin-right:15px; border-radius: 10px; padding: 5px;text-align: center;">
                            <q-tooltip>
                                Rendimiento sobre los Activos Totales
                            </q-tooltip> RSA
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style=" margin-left:15px; margin-right:15px;">

                        </div>
                    </div>
                    <!--COMIENZA FILA 4-->
                    <div class="row">

                        <div class="col" style="background-color: #27EB2C;font-size: 12px; font-weight: bold ; margin-left:15px; margin-right:15px; min-height: 50px; border-radius: 10px; padding: 5px;text-align: center;">
                            Activos Corrientes <br> <label style="font-size: 15px;">${{parseFloat(this.totalActivoCorriente).toLocaleString('en')}}</label>
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; justify-content: center; align-items: center; display: flex;">
                            <q-img src="../assets/flecha.jpg" ratio="" />
                        </div>
                        <div class="col" style="background-color: #95EB7E; font-size: 12px; font-weight: bold ;margin-left:15px; margin-right:15px; border-radius: 10px; padding: 5px;text-align: center;">
                            Activos Totales
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; justify-content: center; align-items: center; display: flex;">
                            <q-img src="../assets/flecha.jpg" ratio="" />
                        </div>
                        <div class="col" style="background-color: #C2EBA8; font-size: 12px; font-weight: bold ;margin-left:15px; margin-right:15px; border-radius: 10px; padding: 5px;text-align: center;">
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

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; justify-content: center; align-items: center; display: flex;">

                        </div>
                        <div class="col" style=" margin-left:15px; margin-right:15px; position: flex;">

                        </div>
                    </div>
                    <!--COMIENZA FILA 5-->
                    <div class="row">
                        <div class="col" style="background-color: #27EB2C;font-size: 12px; font-weight: bold ; margin-left:15px; margin-right:15px; border-radius: 10px; padding: 5px;text-align: center;">
                            Activos Fijos  <br> <label style="font-size: 15px;">${{parseFloat(this.totalAcrivoNoCorriente).toLocaleString('en')}}</label>
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">
                            |
                        </div>
                        <div class="col" style="background-color: #95EB7E; font-size: 12px; font-weight: bold ;margin-left:15px; margin-right:15px; min-height: 50px; border-radius: 10px; padding: 5px;text-align: center;">
                            Ventas
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">

                        </div>
                        <div class="col" style=" margin-left:15px; margin-right:15px; text-align: center; ustify-content: center; align-items: center; display: flex;text-align: center;">
                            Multiplicado por
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; justify-content: center; align-items: center; display: flex;">
                            <q-img src="../assets/flecha.jpg" ratio="" />
                        </div>
                        <div class="col" style="background-color: #E4F4EC;  font-size: 12px; font-weight: bold ;margin-left:15px; margin-right:15px; border-radius: 10px; padding: 5px;text-align: center;">
                            <q-tooltip>
                                Rendimiento sobre Patrimonio
                            </q-tooltip> RSP
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
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; justify-content: right; align-items: center; display: flex;">
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; justify-content: right; align-items: center; display: flex;">
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px; border-radius: 10px; padding: 5px;">
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">
                        </div>
                        <div class="col" style=" margin-left:15px; margin-right:15px;">
                        </div>
                    </div>
                    <!--COMIENZA FILA 6-->
                    <div class="row">

                        <div class="col" style="background-color: #F54B36;font-size: 12px; font-weight: bold ; margin-left:15px; margin-right:15px; min-height: 50px; border-radius: 10px; padding: 5px;text-align: center;">
                            Pasivos Corrientes
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; justify-content: center; align-items: center; display: flex;">
                            <q-img src="../assets/flecha.jpg" ratio="" />
                        </div>
                        <div class="col" style="background-color: #F5765D;font-size: 12px; font-weight: bold ;margin-left:15px; margin-right:15px; border-radius: 10px; padding: 5px;text-align: center;">
                            Pasivos Totales
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; justify-content: center; align-items: center; display: flex;">
                            <q-img src="../assets/flecha.jpg" ratio="" />
                        </div>
                        <div class="col" style="background-color: #F59A81;font-size: 12px; font-weight: bold ;margin-left:15px; margin-right:15px; border-radius: 10px; padding: 5px;text-align: center;">
                            Activo Total
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px; text-align: center; justify-content: center; align-items: center; display: flex;">
                            <q-img src="../assets/flecha.jpg" ratio="" />
                        </div>
                        <div class="col" style="background-color: #F5B098; font-size: 12px; font-weight: bold ;margin-left:15px; margin-right:15px; border-radius: 10px; padding: 5px;text-align: center;">
                            <div>
                                <q-tooltip>
                                    Multiplicador del Apalancamiento
                                </q-tooltip>MAF
                            </div>
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

                        <div class="col" style="background-color: #F54B36;font-size: 12px; font-weight: bold ; margin-left:15px; margin-right:15px; min-height: 50px; border-radius: 10px; padding: 5px;text-align: center;">
                            Pasivos No Corrientes
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">
                            |
                        </div>
                        <div class="col" style="background-color: #F5765D;font-size: 12px; font-weight: bold ;margin-left:15px; margin-right:15px; border-radius: 10px; padding: 5px;text-align: center;">
                            Patrimonio
                        </div>
                        <div class="col" style="margin-left:15px; margin-right:15px;">
                            |
                        </div>
                        <div class="col" style="background-color: #F59A81;font-size: 12px; font-weight: bold ;margin-left:15px; margin-right:15px; border-radius: 10px; padding: 5px;text-align: center;">
                            Capital Patrimonial
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
    name: 'ReporteDupont',
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
            totalPasivo: 0,
            totalPasivoCorriente: 0,
            totalPasivoNoCorriente:0,
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
            totalPatrimonio:0,
            //
            capitalSocial: 0,
            reservaLegal: 0,
            resultadosAcu: 0,
            resultadosPresEjer: 0,
            // ESTADO DE RESULTADO

            costodeventas: 0,
            gastosAdmin: 0,
            gastosFinan: 0,
            ingresosFinan: 0,
            gastosVentas: 0,
            impuestosSobreRentaES: 0,
            ingresosporventas: 0,
            otrosGasNetos: 0,
            otrosIngresNetos: 0,
            reservaLegalES: 0,
            utilidadbruta: 0,
            utilidadneta: 0,
            utilidadoperativa: 0,
            utilidadantesreserva: 0,
            // Variables a utilizar en dupont
            sumaingresos: 0,
            sumaotrosGastos: 0,
            sumaGastosF: 0,
            sumaGastosO: 0,
            margenUtilidadN : 0,
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
            this.generarOperaciones()
            this.generarOperacionesER()
            this.operacionesDupont()
        }
    },
    methods: {
        cargandoDatoss() {
            this.cargandoDatos = false
            console.log(this.cargandoDatos)
        },
        operacionesDupont() {
            this.sumaingresos = this.otrosIngresNetos + this.ingresosFinan
            this.sumaGastosO = this.gastosAdmin + this.gastosVentas
            this.sumaotrosGastos = this.otrosGasNetos
            this.sumaGastosF = this.impuestosSobreRentaES + this.gastosFinan
            this.utilidadneta = this.utilidadneta + this.ingresosporventas + this.sumaingresos - this.sumaGastosF - this.sumaGastosO - this.sumaotrosGastos - this.costodeventas - this.reservaLegalES
            this.margenUtilidadN = this.utilidadneta / this.ingresosporventas

        },
        generarOperacionesER() {
            this.costodeventas = parseFloat(this.periodo[0].estadoresultados.costodeventas)
            this.gastosAdmin = parseFloat(this.periodo[0].estadoresultados.gastosAdmin)
            this.gastosFinan = parseFloat(this.periodo[0].estadoresultados.gastosFinan)
            this.ingresosFinan = parseFloat(this.periodo[0].estadoresultados.ingresosFinan)
            this.gastosVentas = parseFloat(this.periodo[0].estadoresultados.gastosVentas)
            this.impuestosSobreRentaES = parseFloat(this.periodo[0].estadoresultados.impuestosSobreRentaES)
            this.ingresosporventas = parseFloat(this.periodo[0].estadoresultados.ingresosporventas)
            this.otrosGasNetos = parseFloat(this.periodo[0].estadoresultados.otrosGasNetos)
            this.otrosIngresNetos = parseFloat(this.periodo[0].estadoresultados.otrosIngresNetos)
            this.reservaLegalES = parseFloat(this.periodo[0].estadoresultados.reservaLegalES)
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

            // SUMAS
            this.totalActivoCorriente = parseFloat(this.efectivo) + parseFloat(this.cuentasPC) + parseFloat(this.otrasCPC) + parseFloat(this.inventarios) + parseFloat(this.gastosPagadosAnt) + parseFloat(this.depositosCortoP) 
            this.totalAcrivoNoCorriente = parseFloat(this.propiedad) + parseFloat(this.activosIntangibles) + parseFloat(this.activosBiologicos) + parseFloat(this.inversionFinalLP)
            this.totalActivo = parseFloat(this.totalActivo) + parseFloat(this.totalActivoCorriente) + parseFloat(this.totalAcrivoNoCorriente)

            this.totalPasivoCorriente =  parseFloat(this.totalPasivoCorriente) + parseFloat(this.cuentasPP) + parseFloat(this.cuentasPPRelacionadas) + parseFloat(this.otrascuentasPP) + parseFloat(this.obligacionesEmple) + parseFloat(this.impuestosSobreRenta) + parseFloat(this.gastosAcumulados)
            this.totalPasivoNoCorriente = parseFloat(this.totalPasivoNoCorriente) + parseFloat(this.CPPRelacionadasLP)
            this.totalPasivo = parseFloat(this.totalPasivoCorriente) + parseFloat(this.totalPasivoNoCorriente)

            this.totalPatrimonio = parseFloat(this.totalPatrimonio) + parseFloat(this.capitalSocial) +  parseFloat(this.reservaLegal) +  parseFloat(this.resultadosAcu) +  parseFloat(this.resultadosPresEjer)
            


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
        generarPDF() {
            html2canvas(document.querySelector("#content")).then(canvas => {
                var imgUrl = canvas.toDataURL("image / png"); // Convertir lienzo en flujo img src
                const doc = new jsPDF('l', 'mm', [297, 210]);
                doc.addImage(imgUrl, 0, 0, 297, 210)
                doc.save(this.nombredelPDF); // will save the file in the current working directory
            });
        }
    }
}
</script>
