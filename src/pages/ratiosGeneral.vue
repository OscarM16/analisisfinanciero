<template>
<q-page class="q-pa-md">
    <div class="row" v-show="this.cargandoDatos">
        <div class="col items-center" style="justify-content: center; margin-top: 150px;">
            <div class="row justify-center">
                <q-spinner-clock color="primary" size="25em" />
            </div>
        </div>
    </div>
    <div class="row " v-show="!this.cargandoDatos">
        <div class="col">
            <div class="row-12" style="margin-bottom: 100px;">
                <div class="col-12 justify-center">
                    <q-btn round color="warning" icon="navigate_before" @click="anteriorPagina()" size="25px" style="position: absolute; top: 50px; left: 30px;"></q-btn>
                    <h3 style="text-align: center; font-weight: bold;"> Comparacion de los Ratios por Año</h3>
                </div>
            </div>
            <!--RAZONES DE LIQUIDEZ-->
            <div class="q-pa-md">
                <q-list bordered class="rounded-borders">
                    <q-expansion-item expand-separator icon="list" v-model="expanded" label="Razones de Liquidez" :caption=opcionLiquidez>
                        <q-item clickable v-ripple style="width:100%" @click="this.razonCirculante()">
                            <q-item-section avatar>
                                <q-icon name="calculate" color="black" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Razon Corriente</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple style="width:100%" @click="this.razonRapida()">
                            <q-item-section avatar>
                                <q-icon name="calculate" color="black" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Razon rapida</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple style="width:100%" @click="this.capitalTrabajo()">
                            <q-item-section avatar>
                                <q-icon name="calculate" color="black" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Capital de trabajo</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple style="width:100%" @click="this.nivelDependencia()">
                            <q-item-section avatar>
                                <q-icon name="calculate" color="black" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Nivel de Dependencia del inventario</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-expansion-item>
                </q-list>

            </div>
            <div class="row" v-show="opcionLiquidez !== 'Mas informacion'">
                <div class="col-4">
                </div>
                <div class="col-4">
                    <q-card style="margin-top: 15px; margin-bottom: 80px;">
                        <q-card-section class="row items-center q-pb-none">
                            <div class="text-h6">{{this.opcionLiquidez}}</div>
                            <q-space />
                            <q-btn @click="this.cerrarRazonLiquidez()" icon="close" flat round dense v-close-popup />
                        </q-card-section>
                        <q-card-section style="margin-top: -5px;padding-top: 1px;  margin-bottom: -10px;">
                            <q-space />
                            <div class=""><label style="font-size: 11px;">{{this.expresado}}</label></div>
                        </q-card-section>
                        <q-separator inset />
                        <!--Razon Circulante-->
                        <q-card-section v-show="opcionLiquidez === 'Razon Circulante'">
                            <q-item v-for=" (item, index) of periodoCopia" :key="index">
                                <q-item-section style=" margin-left:5px; margin-right:5px;padding: 5px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;">Año {{item.informacion.anio}}</q-item-label>
                                </q-item-section>
                                <q-item-section side center style="background-color: #7be38f; text-align: center;  margin-left:5px; margin-right:5px;padding: 5px; border-radius: 8px;  min-width: 60px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;  text-decoration: underline; color: black;">{{(parseFloat(this.razonCorrienteT[index])).toFixed(2)}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Razon Rapida-->
                        <q-card-section v-show="opcionLiquidez === 'Razon Rapida'">
                            <q-item v-for=" (item, index) of periodoCopia" :key="index">
                                <q-item-section style=" margin-left:5px; margin-right:5px;padding: 5px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;">Año {{item.informacion.anio}}</q-item-label>
                                </q-item-section>
                                <q-item-section side center style="background-color: #7be38f; text-align: center;  margin-left:5px; margin-right:5px;padding: 5px; border-radius: 8px;  min-width: 60px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;  text-decoration: underline; color: black;">{{(parseFloat(this.razonRapidaT[index])).toFixed(2)}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Capital de Trabajo-->
                        <q-card-section v-show="opcionLiquidez === 'Capital de Trabajo'">
                            <q-item v-for=" (item, index) of periodoCopia" :key="index">
                                <q-item-section style=" margin-left:5px; margin-right:5px;padding: 5px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;">Año {{item.informacion.anio}}</q-item-label>
                                </q-item-section>
                                <q-item-section side center style="background-color: #7be38f; justify-content: center; text-align: center;  margin-left:5px; margin-right:5px;padding: 5px; border-radius: 8px;min-width: 140px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;  color: black;">{{parseFloat((parseFloat(this.capitalTrabajoT[index])).toFixed(2)).toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Razon Rapida-->
                        <q-card-section v-show="opcionLiquidez === 'Nivel de dependencia de inventario'">
                            <q-item v-for=" (item, index) of periodoCopia" :key="index">
                                <q-item-section style=" margin-left:5px; margin-right:5px;padding: 5px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;">Año {{item.informacion.anio}}</q-item-label>
                                </q-item-section>
                                <q-item-section side center style="background-color: #7be38f; text-align: center;  margin-left:5px; margin-right:5px;padding: 5px; border-radius: 8px; min-width: 60px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;  color: black;">{{parseFloat((parseFloat(this.nivelDependenciaT[index])).toFixed(2)).toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <q-separator inset></q-separator>
                        <!-------------------------BOTONES DE FORMULA-------------------->
                        <q-card-section>
                            <div class="q-pa-md q-gutter-md" style="font-size: 36px">
                                <!--Boton para Razon Circulante-->
                                <q-btn v-show="this.opcionLiquidez === 'Razon Circulante'" color="primary" text-color="white" label="Formula">
                                    <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                                        <q-banner class="text-black" style="background-color: #7be38f;">
                                            <template v-slot:avatar>

                                            </template>
                                            <q-item class="justify-center">
                                                <q-item-section avatar>
                                                    <q-item-label>
                                                        <div class="text-center">
                                                            Activo Corriente
                                                            <hr style="border-color: black;">Pasivo Corriente
                                                        </div>
                                                    </q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-banner>
                                    </q-popup-proxy>
                                </q-btn>
                                <!--Boton para Razon Rapida-->
                                <q-btn v-show="this.opcionLiquidez === 'Razon Rapida'" color="primary" text-color="white" label="Formula">
                                    <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                                        <q-banner class="text-black" style="background-color: #7be38f;">
                                            <template v-slot:avatar>

                                            </template>
                                            <q-item class="justify-center">
                                                <q-item-section avatar>
                                                    <q-item-label>
                                                        <div class="text-center">
                                                            Activo Corriente - Inventario
                                                            <hr style="border-color: black;">Pasivo Corriente
                                                        </div>
                                                    </q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-banner>
                                    </q-popup-proxy>
                                </q-btn>
                                <!--Boton para Capital Trabajo-->
                                <q-btn v-show="this.opcionLiquidez === 'Capital de Trabajo'" color="primary" text-color="white" label="Formula">
                                    <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                                        <q-banner class="text-black" style="background-color: #7be38f;">
                                            <template v-slot:avatar>

                                            </template>
                                            <q-item class="justify-center">
                                                <q-item-section avatar>
                                                    <q-item-label>
                                                        <div class="text-center">
                                                            Activo Corriente - Pasivo Corriente
                                                        </div>
                                                    </q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-banner>
                                    </q-popup-proxy>
                                </q-btn>
                                <!--Boton para Nivel de dependencia de inventario-->
                                <q-btn v-show="this.opcionLiquidez === 'Nivel de dependencia de inventario'" color="primary" text-color="white" label="Formula">
                                    <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                                        <q-banner class="text-black" style="background-color: #7be38f;">
                                            <template v-slot:avatar>

                                            </template>
                                            <q-item class="justify-center">
                                                <q-item-section avatar>
                                                    <q-item-label>
                                                        <div class="text-center">
                                                            Pasivos Corrientes - (caja+bancos+cuentas por cobrar + realizables)
                                                            <hr style="border-color: black;"> Inventario
                                                        </div>
                                                    </q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-banner>
                                    </q-popup-proxy>
                                </q-btn>
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
            <!--RAZONES DE ACTIVIDAD-->
            <div class="q-pa-md">
                <q-list bordered class="rounded-borders">
                    <q-expansion-item expand-separator icon="list" v-model="expandedA" label="Razones de Actividad" :caption=opcionActividad>
                        <q-item clickable v-ripple style="width:100%" @click="this.rotacionInventario()">
                            <q-item-section avatar>
                                <q-icon name="calculate" color="black" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Rotacion de Inventario</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple style="width:100%" @click="this.NDI()">
                            <q-item-section avatar>
                                <q-icon name="calculate" color="black" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Nro dias de Inventario</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple style="width:100%" @click="this.PPC()">
                            <q-item-section avatar>
                                <q-icon name="calculate" color="black" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Periodo Promedio de Cobro</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple style="width:100%" @click="this.PPP()">
                            <q-item-section avatar>
                                <q-icon name="calculate" color="black" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Periodo Promedio de Pago</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple style="width:100%" @click="this.RAT()">
                            <q-item-section avatar>
                                <q-icon name="calculate" color="black" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Rotacion de los Activos Totales</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple style="width:100%" @click="this.rotacionCartera()">
                            <q-item-section avatar>
                                <q-icon name="calculate" color="black" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Rotacion de Cartera</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple style="width:100%" @click="this.NDC()">
                            <q-item-section avatar>
                                <q-icon name="calculate" color="black" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Nro de dias de Cartera</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple style="width:100%" @click="this.cicloOperacional()">
                            <q-item-section avatar>
                                <q-icon name="calculate" color="black" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Ciclo Operacional</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-expansion-item>
                </q-list>
            </div>
            <!-- MOSTRAR CARD DE RAZONES DE ACTIVIDAD-->
            <div class="row" v-show="opcionActividad !== 'Mas informacion'">
                <div class="col-4">
                </div>
                <div class="col-4">
                    <q-card style="margin-top: 15px; margin-bottom: 80px;">
                        <q-card-section class="row items-center q-pb-none">
                            <div class="text-h6">{{this.opcionActividad}}</div>
                            <q-space />
                            <q-btn  @click="this.cerrarRazonActividad()" icon="close" flat round dense v-close-popup />
                        </q-card-section>
                        <q-card-section style="margin-top: -5px;padding-top: 1px; margin-bottom: -10px;">
                            <q-space />
                            <div class=""><label style="font-size: 11px;">{{this.expresadoA}}</label></div>
                        </q-card-section>
                        <q-separator inset />
                        <!--Razon Rotacion de Inventario -->
                        <q-card-section v-show="opcionActividad === 'Rotacion de Inventario'">
                            <q-item v-for=" (item, index) of periodoCopia" :key="index">
                                <q-item-section style=" margin-left:5px; margin-right:5px;padding: 5px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;">Año {{item.informacion.anio}}</q-item-label>
                                </q-item-section>
                                <q-item-section side center style="background-color: #7be38f; text-align: center;  margin-left:5px; margin-right:5px;padding: 5px; border-radius: 8px; min-width: 60px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;  color: black;">{{parseFloat((parseFloat(this.rotacionInventarioT[index])).toFixed(2)).toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Razon Nro dias de Inventario -->
                        <q-card-section v-show="opcionActividad === 'Nro de dias de Inventario'">
                            <q-item v-for=" (item, index) of periodoCopia" :key="index">
                                <q-item-section style=" margin-left:5px; margin-right:5px;padding: 5px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;">Año {{item.informacion.anio}}</q-item-label>
                                </q-item-section>
                                <q-item-section side center style="background-color: #7be38f; text-align: center;  margin-left:5px; margin-right:5px;padding: 5px; border-radius: 8px; min-width: 60px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;  color: black;">{{Math.round(parseFloat((parseFloat(this.NDIT[index])).toFixed(2))).toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Razon Periodo Promedio de Cobro-->
                        <q-card-section v-show="opcionActividad === 'Periodo Promedio de Cobro'">
                            <q-item v-for=" (item, index) of periodoCopia" :key="index">
                                <q-item-section style=" margin-left:5px; margin-right:5px;padding: 5px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;">Año {{item.informacion.anio}}</q-item-label>
                                </q-item-section>
                                <q-item-section side center style="background-color: #7be38f; text-align: center;  margin-left:5px; margin-right:5px;padding: 5px; border-radius: 8px; min-width: 80px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;  color: black;">{{Math.round(parseFloat((parseFloat(this.PPCT[index])).toFixed(2))).toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Razon Periodo Promedio de Pago-->
                        <q-card-section v-show="opcionActividad === 'Periodo Promedio de Pago'">
                            <q-item v-for=" (item, index) of periodoCopia" :key="index">
                                <q-item-section style=" margin-left:5px; margin-right:5px;padding: 5px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;">Año {{item.informacion.anio}}</q-item-label>
                                </q-item-section>
                                <q-item-section side center style="background-color: #7be38f; text-align: center;  margin-left:5px; margin-right:5px;padding: 5px; border-radius: 8px; min-width: 80px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;  color: black;">{{Math.round(parseFloat((parseFloat(this.PPPT[index])).toFixed(2))).toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Razon Periodo Rotacion de los Activos Totales-->
                        <q-card-section v-show="opcionActividad === 'Rotacion de los Activos Totales'">
                            <q-item v-for=" (item, index) of periodoCopia" :key="index">
                                <q-item-section style=" margin-left:5px; margin-right:5px;padding: 5px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;">Año {{item.informacion.anio}}</q-item-label>
                                </q-item-section>
                                <q-item-section side center style="background-color: #7be38f; text-align: center;  margin-left:5px; margin-right:5px;padding: 5px; border-radius: 8px; min-width: 80px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;  color: black;">{{parseFloat((parseFloat(this.RATT[index])).toFixed(2)).toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Razon Periodo Rotacion de Cartera-->
                        <q-card-section v-show="opcionActividad === 'Rotacion de Cartera'">
                            <q-item v-for=" (item, index) of periodoCopia" :key="index">
                                <q-item-section style=" margin-left:5px; margin-right:5px;padding: 5px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;">Año {{item.informacion.anio}}</q-item-label>
                                </q-item-section>
                                <q-item-section side center style="background-color: #7be38f; text-align: center;  margin-left:5px; margin-right:5px;padding: 5px; border-radius: 8px; min-width: 80px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;  color: black;">{{parseFloat((parseFloat(this.rotacionCarteraT[index])).toFixed(2)).toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Razon Nro dias de Cartera -->
                        <q-card-section v-show="opcionActividad === 'Nro de dias de Cartera'">
                            <q-item v-for=" (item, index) of periodoCopia" :key="index">
                                <q-item-section style=" margin-left:5px; margin-right:5px;padding: 5px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;">Año {{item.informacion.anio}}</q-item-label>
                                </q-item-section>
                                <q-item-section side center style="background-color: #7be38f; text-align: center;  margin-left:5px; margin-right:5px;padding: 5px; border-radius: 8px; min-width: 60px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;  color: black;">{{Math.round(parseFloat((parseFloat(this.NDCT[index])).toFixed(2))).toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Razon Periodo Ciclo Operacional-->
                        <q-card-section v-show="opcionActividad === 'Ciclo Operacional'">
                            <q-item v-for=" (item, index) of periodoCopia" :key="index">
                                <q-item-section style=" margin-left:5px; margin-right:5px;padding: 5px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;">Año {{item.informacion.anio}}</q-item-label>
                                </q-item-section>
                                <q-item-section side center style="background-color: #7be38f; text-align: center;  margin-left:5px; margin-right:5px;padding: 5px; border-radius: 8px; min-width: 60px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;  color: black;">{{Math.round(parseFloat((parseFloat(this.cicloOperacionalT[index])).toFixed(2))).toLocaleString('en')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <q-separator inset></q-separator>
                        <!-------------------------BOTONES DE FORMULA-------------------->
                        <q-card-section>
                            <div class="q-pa-md q-gutter-md" style="font-size: 36px">
                                <!--Boton para Rotacion de Inventario-->
                                <q-btn v-show="this.opcionActividad === 'Rotacion de Inventario'" color="primary" text-color="white" label="Formula">
                                    <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                                        <q-banner class="text-black" style="background-color: #7be38f;">
                                            <template v-slot:avatar>

                                            </template>
                                            <q-item class="justify-center">
                                                <q-item-section avatar>
                                                    <q-item-label>
                                                        <div class="text-center">
                                                            Costo de ventas
                                                            <hr style="border-color: black;">Inventario
                                                        </div>
                                                    </q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-banner>
                                    </q-popup-proxy>
                                </q-btn>
                                <!--Boton Nro de dias de Inventario-->
                                <q-btn v-show="this.opcionActividad === 'Nro de dias de Inventario'" color="primary" text-color="white" label="Formula">
                                    <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                                        <q-banner class="text-black" style="background-color: #7be38f;">
                                            <template v-slot:avatar>

                                            </template>
                                            <q-item class="justify-center">
                                                <q-item-section avatar>
                                                    <q-item-label>
                                                        <div class="text-center">
                                                            Inventario * 365
                                                            <hr style="border-color: black;">Costo de Ventas
                                                        </div>
                                                    </q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-banner>
                                    </q-popup-proxy>
                                </q-btn>
                                <!--Boton Nro de dias de Cartera-->
                                <q-btn v-show="this.opcionActividad === 'Nro de dias de Cartera'" color="primary" text-color="white" label="Formula">
                                    <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                                        <q-banner class="text-black" style="background-color: #7be38f;">
                                            <template v-slot:avatar>

                                            </template>
                                            <q-item class="justify-center">
                                                <q-item-section avatar>
                                                    <q-item-label>
                                                        <div class="text-center">
                                                            Cuentas por Cobrar * 365
                                                            <hr style="border-color: black;">Total de Ventas
                                                        </div>
                                                    </q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-banner>
                                    </q-popup-proxy>
                                </q-btn>
                                <!--Boton para Periodo Promedio de Cobro-->
                                <q-btn v-show="this.opcionActividad === 'Periodo Promedio de Cobro'" color="primary" text-color="white" label="Formula">
                                    <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                                        <q-banner class="text-black" style="background-color: #7be38f;">
                                            <template v-slot:avatar>

                                            </template>
                                            <q-item class="justify-center">
                                                <q-item-section avatar>
                                                    <q-item-label>
                                                        <div class="text-center">
                                                            Cuentas por cobrar * 365
                                                            <hr style="border-color: black;"> Ventas totales
                                                        </div>
                                                    </q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-banner>
                                    </q-popup-proxy>
                                </q-btn>
                                <!--Boton para Periodo Promedio de PAGO-->
                                <q-btn v-show="this.opcionActividad === 'Periodo Promedio de Pago'" color="primary" text-color="white" label="Formula">
                                    <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                                        <q-banner class="text-black" style="background-color: #7be38f;">
                                            <template v-slot:avatar>

                                            </template>
                                            <q-item class="justify-center">
                                                <q-item-section avatar>
                                                    <q-item-label>
                                                        <div class="text-center">
                                                            Cuentas por pagar * 365
                                                            <hr style="border-color: black;"> 0.7 * Costo de los bienes vendidos
                                                        </div>
                                                    </q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-banner>
                                    </q-popup-proxy>
                                </q-btn>
                                <!--Boton para Rotacion de los Activos Totales-->
                                <q-btn v-show="this.opcionActividad === 'Rotacion de los Activos Totales'" color="primary" text-color="white" label="Formula">
                                    <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                                        <q-banner class="text-black" style="background-color: #7be38f;">
                                            <template v-slot:avatar>

                                            </template>
                                            <q-item class="justify-center">
                                                <q-item-section avatar>
                                                    <q-item-label>
                                                        <div class="text-center">
                                                            Ventas Totales
                                                            <hr style="border-color: black;"> Activos Totales
                                                        </div>
                                                    </q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-banner>
                                    </q-popup-proxy>
                                </q-btn>
                                <!--Boton para Rotacion de Cartera-->
                                <q-btn v-show="this.opcionActividad === 'Rotacion de Cartera'" color="primary" text-color="white" label="Formula">
                                    <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                                        <q-banner class="text-black" style="background-color: #7be38f;">
                                            <template v-slot:avatar>

                                            </template>
                                            <q-item class="justify-center">
                                                <q-item-section avatar>
                                                    <q-item-label>
                                                        <div class="text-center">
                                                            Ventas netas
                                                            <hr style="border-color: black;"> Cuentas por cobrar
                                                        </div>
                                                    </q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-banner>
                                    </q-popup-proxy>
                                </q-btn>
                                <!--Boton para Ciclo Operacional-->
                                <q-btn v-show="this.opcionActividad === 'Ciclo Operacional'" color="primary" text-color="white" label="Formula">
                                    <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                                        <q-banner class="text-black" style="background-color: #7be38f;">
                                            <template v-slot:avatar>

                                            </template>
                                            <q-item class="justify-center">
                                                <q-item-section avatar>
                                                    <q-item-label>
                                                        Nro. Dias de Cartera + Nro. Dias de Inventario
                                                    </q-item-label>
                                                </q-item-section>
                                                
                                            </q-item>
                                        </q-banner>
                                    </q-popup-proxy>
                                </q-btn>
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
            <!--RAZONES DE DEUDA-->
            <div class="q-pa-md">
                <!-- ESTE ES EL MENU DESPLEGABLE  -->
                <q-list bordered class="rounded-borders">
                    <q-expansion-item expand-separator icon="list" v-model="expandedD" label="Razones de Deuda" :caption=opcionDeuda>
                        <q-item clickable v-ripple style="width:100%" @click="this.indiceEndeudamiento()">
                            <q-item-section avatar>
                                <q-icon name="calculate" color="black" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Indice de Endeudamiento</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-expansion-item>
                </q-list>
            </div>
            <!--CARDS de DEUDA INCLUYE Boton-->
            <div class="row" v-show="opcionDeuda !== 'Mas informacion'">
                <div class="col-4">
                </div>
                <div class="col-4">
                    <q-card style="margin-top: 15px; margin-bottom: 80px;">
                        <q-card-section class="row items-center q-pb-none">
                            <div class="text-h6">{{this.opcionDeuda}}</div>
                            <q-space />
                            <q-btn @click="this.cerrarRazonDeuda()" icon="close" flat round dense v-close-popup />
                        </q-card-section>
                        <q-card-section style="margin-top: -5px;padding-top: 1px; margin-bottom: -10px;">
                            <q-space />
                            <div class=""><label style="font-size: 11px;">Expresado en porcentaje (%)</label></div>
                        </q-card-section>
                        <q-card-section style="margin-top: -5px;padding-top: 1px; margin-bottom: -10px;">
                            <q-space />
                            <div class=""><label style="font-size: 11px;">{{this.expresadoD}}</label></div>
                        </q-card-section>
                        <q-separator inset />
                        <!--Indice de Endeudamiento-->
                        <q-card-section v-show="opcionDeuda === 'Indice de Endeudamiento'">
                            <q-item v-for=" (item, index) of periodoCopia" :key="index">
                                <q-item-section style=" margin-left:5px; margin-right:5px;padding: 5px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;">Año {{item.informacion.anio}}</q-item-label>
                                </q-item-section>
                                <q-item-section side center style="background-color: #7be38f; text-align: center;  margin-left:5px; margin-right:5px;padding: 5px; border-radius: 8px; min-width: 80px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;  color: black;">{{(parseFloat((parseFloat(this.indiceEndeudamientoT[index] * 100)).toFixed(2)))}} %</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <q-separator inset></q-separator>
                        <!-------------------------BOTONES DE FORMULA-------------------->
                        <q-card-section>
                            <div class="q-pa-md q-gutter-md" style="font-size: 36px">
                                <!--Boton para Indice de Endeudamiento-->
                                <q-btn v-show="this.opcionDeuda === 'Indice de Endeudamiento'" color="primary" text-color="white" label="Formula">
                                    <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                                        <q-banner class="text-black" style="background-color: #7be38f;">
                                            <template v-slot:avatar>

                                            </template>
                                            <q-item class="justify-center">
                                                <q-item-section avatar>
                                                    <q-item-label>
                                                        <div class="text-center">
                                                            Pasivos Totales
                                                            <hr style="border-color: black;">Activos Totales
                                                        </div>
                                                    </q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-banner>
                                    </q-popup-proxy>
                                </q-btn>
                                <!--FIN de boton de Indice de Endeudamiento-->
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
            <!--RAZONES DE RENTABILIDAD-->
            <div class="q-pa-md">
                <q-list bordered class="rounded-borders">
                    <q-expansion-item expand-separator icon="list" v-model="expandedR" label="Razones de Rentabilidad" :caption=opcionRentabilidad>
                        <q-item clickable v-ripple style="width:100%" @click="this.margenUtilidadB()">
                            <q-item-section avatar>
                                <q-icon name="calculate" color="black" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Margen de Utilidad Bruta</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple style="width:100%" @click="this.margenUtilidadO()">
                            <q-item-section avatar>
                                <q-icon name="calculate" color="black" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Margen de Utilidad Operativa</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple style="width:100%" @click="this.margenUtilidadN()">
                            <q-item-section avatar>
                                <q-icon name="calculate" color="black" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Margen de Utilidad Neta</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple style="width:100%" @click="this.rendimientoActivoTotal()">
                            <q-item-section avatar>
                                <q-icon name="calculate" color="black" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Rendimiento sobre activos totales</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-expansion-item>
                </q-list>
            </div>
            <!--CARDS de Rentabilidad INCLUYE Boton-->
            <div class="row" v-show="opcionRentabilidad !== 'Mas informacion'">
                <div class="col-4">
                </div>
                <div class="col-4">
                    <q-card style="margin-top: 15px; margin-bottom: 80px;">
                        <q-card-section class="row items-center q-pb-none">
                            <div class="text-h6">{{this.opcionRentabilidad}}</div>
                            <q-space />
                            <q-btn @click="this.cerrarRazonRentabilidad()" icon="close" flat round dense v-close-popup />
                        </q-card-section>
                        <q-card-section style="margin-top: -5px;padding-top: 1px; margin-bottom: -10px;">
                            <q-space />
                            <div class=""><label style="font-size: 11px;">{{this.expresadoR}}</label></div>
                        </q-card-section>
                        <q-separator inset />
                        <!--Indice de Margen de Utilidad Bruta-->
                        <q-card-section v-show="opcionRentabilidad === 'Margen de Utilidad Bruta'">
                            <q-item v-for=" (item, index) of periodoCopia" :key="index">
                                <q-item-section style=" margin-left:5px; margin-right:5px;padding: 5px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;">Año {{item.informacion.anio}}</q-item-label>
                                </q-item-section>
                                <q-item-section side center style="background-color: #7be38f; text-align: center;  margin-left:5px; margin-right:5px;padding: 5px; border-radius: 8px; min-width: 80px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;  color: black;">{{(parseFloat((parseFloat(this.margenUtilidadBT[index] *100)).toFixed(2)))}} %</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Indice de Margen de Utilidad Operativa-->
                        <q-card-section v-show="opcionRentabilidad === 'Margen de Utilidad Operativa'">
                            <q-item v-for=" (item, index) of periodoCopia" :key="index">
                                <q-item-section style=" margin-left:5px; margin-right:5px;padding: 5px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;">Año {{item.informacion.anio}}</q-item-label>
                                </q-item-section>
                                <q-item-section side center style="background-color: #7be38f; text-align: center;  margin-left:5px; margin-right:5px;padding: 5px; border-radius: 8px; min-width: 80px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;  color: black;">{{(parseFloat((parseFloat(this.margenUtilidadOT[index] *100)).toFixed(2)))}} %</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Indice de Margen de Utilidad Neta-->
                        <q-card-section v-show="opcionRentabilidad === 'Margen de Utilidad Neta'">
                            <q-item v-for=" (item, index) of periodoCopia" :key="index">
                                <q-item-section style=" margin-left:5px; margin-right:5px;padding: 5px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;">Año {{item.informacion.anio}}</q-item-label>
                                </q-item-section>
                                <q-item-section side center style="background-color: #7be38f; text-align: center;  margin-left:5px; margin-right:5px;padding: 5px; border-radius: 8px; min-width: 80px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;  color: black;">{{(parseFloat((parseFloat(this.margenUtilidadNT[index] *100)).toFixed(2)))}} %</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Indice de Rendimiento sobre Activo Total-->
                        <q-card-section v-show="opcionRentabilidad === 'Rendimiento sobre Activo Total'">
                            <q-item v-for=" (item, index) of periodoCopia" :key="index">
                                <q-item-section style=" margin-left:5px; margin-right:5px;padding: 5px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;">Año {{item.informacion.anio}}</q-item-label>
                                </q-item-section>
                                <q-item-section side center style="background-color: #7be38f; text-align: center;  margin-left:5px; margin-right:5px;padding: 5px; border-radius: 8px; min-width: 80px;">
                                    <q-item-label style="font-weight: bold; font-size: 18px;  color: black;">{{(parseFloat((parseFloat(this.rendimientoActivoTotalT[index] *100)).toFixed(2)))}} %</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <q-separator inset></q-separator>
                        <!-------------------------BOTONES DE FORMULA-------------------->
                        <q-card-section>
                            <div class="q-pa-md q-gutter-md" style="font-size: 36px">
                                <!--Boton para Margen de Utilidad Bruta-->
                                <q-btn v-show="this.opcionRentabilidad === 'Margen de Utilidad Bruta'" color="primary" text-color="white" label="Formula">
                                    <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                                        <q-banner class="text-black" style="background-color: #7be38f;">
                                            <template v-slot:avatar>

                                            </template>
                                            <q-item class="justify-center">
                                                <q-item-section avatar>
                                                    <q-item-label>
                                                        <div class="text-center">
                                                            Utilidad Bruta
                                                            <hr style="border-color: black;">Ventas
                                                        </div>
                                                    </q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-banner>
                                    </q-popup-proxy>
                                </q-btn>
                                <!--FIN de boton de Margen de Utilidad Bruta-->
                                <!--Boton para Margen de Utilidad Operativa-->
                                <q-btn v-show="this.opcionRentabilidad === 'Margen de Utilidad Operativa'" color="primary" text-color="white" label="Formula">
                                    <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                                        <q-banner class="text-black" style="background-color: #7be38f;">
                                            <template v-slot:avatar>

                                            </template>
                                            <q-item class="justify-center">
                                                <q-item-section avatar>
                                                    <q-item-label>
                                                        <div class="text-center">
                                                            Utilidad Operativa
                                                            <hr style="border-color: black;">Ventas
                                                        </div>
                                                    </q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-banner>
                                    </q-popup-proxy>
                                </q-btn>
                                <!--FIN de boton de Margen de Utilidad Operativa-->
                                <!--Boton para Margen de Utilidad Neta-->
                                <q-btn v-show="this.opcionRentabilidad === 'Margen de Utilidad Neta'" color="primary" text-color="white" label="Formula">
                                    <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                                        <q-banner class="text-black" style="background-color: #7be38f;">
                                            <template v-slot:avatar>

                                            </template>
                                            <q-item class="justify-center">
                                                <q-item-section avatar>
                                                    <q-item-label>
                                                        <div class="text-center">
                                                            Utilidad Neta
                                                            <hr style="border-color: black;">Ventas
                                                        </div>
                                                    </q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-banner>
                                    </q-popup-proxy>
                                </q-btn>
                                <!--FIN de boton de Margen de Utilidad Neta-->
                                <!--Boton para Rendimiento sobre Activo Total-->
                                <q-btn v-show="this.opcionRentabilidad === 'Rendimiento sobre Activo Total'" color="primary" text-color="white" label="Formula">
                                    <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                                        <q-banner class="text-black" style="background-color: #7be38f;">
                                            <template v-slot:avatar>

                                            </template>
                                            <q-item class="justify-center">
                                                <q-item-section avatar>
                                                    <q-item-label>
                                                        <div class="text-center">
                                                            Utilidad Neta
                                                            <hr style="border-color: black;">Activos Totales
                                                        </div>
                                                    </q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-banner>
                                    </q-popup-proxy>
                                </q-btn>
                                <!--FIN de boton de Rendimiento sobre Activo Total-->
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
            <div style="margin-top: 100px;">
                <p></p>
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
    name: 'ratiosGeneral',
    data() {
        return {
            periodoCopia: [{
                id: "0",
                informacion: {
                    anio: "0",
                    balancegeneral: {
                        activos: {
                            activosBiologicos: "0",
                            activosIntangibles: "0",
                            cuentasPC: "0",
                            depositosCortoP: "0",
                            efectivo: "0",
                            gastosPagadosAnt: "0",
                            inventarios: "0",
                            inversionFinalLP: "0",
                            otrasCPC: "0",
                            propiedad: "0",
                        },
                        pasivos: {
                            CPPRelacionadasLP: "0",
                            cuentasPP: "0",
                            cuentasPPRelacionadas: "0",
                            gastosAcumulados: "0",
                            impuestosSobreRenta: "0",
                            obligacionesEmple: "0",
                            otrascuentasPP: "0",
                        },
                        patrimonio: {
                            capitalSocial: "0",
                            reservaLegal: "0",
                            resultadosAcu: "0",
                            resultadosPresEjer: "0",
                        }
                    },
                    estadoresultados: {
                        costodeventas: "0",
                        gastosAdmin: "0",
                        gastosFinan: "0",
                        ingresosFinan: "0",
                        gastosVentas: "0",
                        impuestosSobreRentaES: "0",
                        ingresosporventas: "0",
                        otrosGasNetos: "0",
                        otrosIngresNetos: "0",
                        reservaLegalES: "0",
                    }
                }

            }],
            periodos: [],
            id: String,
            cargandoDatos: true,
            llaveCargandoDatos: false,
            expanded: false,
            opcionLiquidez: "Mas informacion",
            expandedA: false,
            opcionActividad: "Mas informacion",
            expandedD: false,
            opcionDeuda: "Mas informacion",
            expandedR: false,
            opcionRentabilidad: "Mas informacion",
            expresado: "",
            expresadoA: "",
            expresadoD: "",
            expresadoR: "",
            // Variables para Razones de liquidez
            razonCorrienteT: [],
            razonRapidaT: [],
            capitalTrabajoT: [],
            nivelDependenciaT: [],
            // Variables para Razones de Actividad
            rotacionInventarioT: [],
            NDIT: [],
            PPCT: [],
            PPPT: [],
            RATT: [],
            rotacionCarteraT: [],
            NDCT:[],
            cicloOperacionalT: [],
            // Variables para Razones de Deuda 
            indiceEndeudamientoT: [],
            // Variables para Razones de rentabilidad 
            margenUtilidadBT: [],
            margenUtilidadOT: [],
            margenUtilidadNT: [],
            rendimientoActivoTotalT: []

        };
    },
    created() {
        this.id = this.$route.params.id
        this.lsitartareas()

    },
    watch: {
        llaveCargandoDatos() {
            this.cargandoDatoss()
            this.generarOperacionesBG()
        }
    },
    methods: {
        cargandoDatoss() {
            this.cargandoDatos = false
        },
        cerrarRazonLiquidez() {
            this.opcionLiquidez = "Mas informacion"
            this.expresado = ""
        },
        cerrarRazonActividad() {
            this.opcionActividad = "Mas informacion"
            this.expresadoA = ""


        },
        cerrarRazonDeuda() {
            this.opcionDeuda = "Mas informacion"
            this.expresadoD = ""
        },
        cerrarRazonRentabilidad() {
            this.opcionRentabilidad = "Mas informacion"
            this.expresadoR = ""
        },
        razonCirculante() {
            this.expanded = false
            this.opcionLiquidez = "Razon Circulante"
            this.expresado = ""
        },
        razonRapida() {
            this.expanded = false
            this.opcionLiquidez = "Razon Rapida"
            this.expresado = ""

        },
        capitalTrabajo() {
            this.expanded = false
            this.opcionLiquidez = "Capital de Trabajo"
            this.expresado = " (Expresado en US$)"

        },
        nivelDependencia() {
            this.expanded = false
            this.opcionLiquidez = "Nivel de dependencia de inventario"
            this.expresado = ""
        },
        // RAZON DE ACTIVIDAD
        rotacionInventario() {
            this.expandedA = false
            this.opcionActividad = "Rotacion de Inventario"
            this.expresadoA = " (Expresado en veces por año)"
        },
        NDI() {
            this.expandedA = false
            this.opcionActividad = "Nro de dias de Inventario"
            this.expresadoA = " (Expresado en dias)"
        },
        NDC() {
            this.expandedA = false
            this.opcionActividad = "Nro de dias de Cartera"
            this.expresadoA = " (Expresado en dias)"
        },
        PPC() {
            this.expandedA = false
            this.opcionActividad = "Periodo Promedio de Cobro"
            this.expresadoA = " (Expresado en dias)"
        },
        PPP() {
            this.expandedA = false
            this.opcionActividad = "Periodo Promedio de Pago"
            this.expresadoA = " (Expresado en dias)"
        },
        RAT() {
            this.expandedA = false
            this.opcionActividad = "Rotacion de los Activos Totales"
            this.expresadoA = " (Expresado en veces por año)"
        },
        rotacionCartera() {
            this.expandedA = false
            this.opcionActividad = "Rotacion de Cartera"
            this.expresadoA = ""
            this.expresadoA = " (Expresado en veces)"
        },
        cicloOperacional() {
            this.expandedA = false
            this.opcionActividad = "Ciclo Operacional"
            this.expresadoA = " (Expresado en dias)"
        },
        // RAZON DE DEUDA
        indiceEndeudamiento() {
            this.expandedD = false
            this.opcionDeuda = "Indice de Endeudamiento"
            this.expresadoD= ""
        },
        // RAZON RENTABILIDAD
        margenUtilidadB() {
            this.expandedR = false
            this.opcionRentabilidad = "Margen de Utilidad Bruta"
            this.expresadoR= ""
        },
        margenUtilidadO() {
            this.expandedR = false
            this.opcionRentabilidad = "Margen de Utilidad Operativa"
            this.expresadoR= ""
        },
        margenUtilidadN() {
            this.expandedR = false
            this.opcionRentabilidad = "Margen de Utilidad Neta"
            this.expresadoR= ""
        },
        rendimientoActivoTotal() {
            this.expandedR = false
            this.opcionRentabilidad = "Rendimiento sobre Activo Total"
            this.expresadoR= ""
        },
        async lsitartareas() {
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
                            this.periodoCopia = this.periodos.slice()
                            if (this.periodos.length !== 0) {
                                this.llaveCargandoDatos = true
                            }
                        })
                    })
            } catch (error) {
                console.log(error)
            }
        },
        generarOperacionesBG() {
            // Total Activo Corriente
            this.periodoCopia.forEach(item => {
                // Activos
                let efectivo = parseFloat(item.informacion.balancegeneral.activos.efectivo)
                let cuentasPC = parseFloat(item.informacion.balancegeneral.activos.cuentasPC)
                let otrasCPC = parseFloat(item.informacion.balancegeneral.activos.otrasCPC)
                let inventarios = parseFloat(item.informacion.balancegeneral.activos.inventarios)
                let gastosPagadosAnt = parseFloat(item.informacion.balancegeneral.activos.gastosPagadosAnt)
                let depositosCortoP = parseFloat(item.informacion.balancegeneral.activos.depositosCortoP)
                // Total Activo Corriente 
                let totalActivoCorriente = parseFloat(efectivo) + parseFloat(cuentasPC) + parseFloat(otrasCPC) + parseFloat(inventarios) + parseFloat(gastosPagadosAnt) + parseFloat(depositosCortoP)
                // No Corrientes
                let propiedad = parseFloat(item.informacion.balancegeneral.activos.propiedad)
                let activosIntangibles = parseFloat(item.informacion.balancegeneral.activos.activosIntangibles)
                let activosBiologicos = parseFloat(item.informacion.balancegeneral.activos.activosBiologicos)
                let inversionFinalLP = parseFloat(item.informacion.balancegeneral.activos.inversionFinalLP)
                // Total Activo No corriente
                let totalActivoNoCorriente = parseFloat(propiedad) + parseFloat(activosIntangibles) + parseFloat(activosBiologicos) + parseFloat(inversionFinalLP)
                //TOTAL ACTIVO
                let totalActivo = parseFloat(totalActivoCorriente) + parseFloat(totalActivoNoCorriente)
                // PASIVOS
                // Corrientes
                let cuentasPP = parseFloat(item.informacion.balancegeneral.pasivos.cuentasPP)
                let cuentasPPRelacionadas = parseFloat(item.informacion.balancegeneral.pasivos.cuentasPPRelacionadas)
                let otrascuentasPP = parseFloat(item.informacion.balancegeneral.pasivos.otrascuentasPP)
                let obligacionesEmple = parseFloat(item.informacion.balancegeneral.pasivos.obligacionesEmple)
                let impuestosSobreRenta = parseFloat(item.informacion.balancegeneral.pasivos.impuestosSobreRenta)
                let gastosAcumulados = parseFloat(item.informacion.balancegeneral.pasivos.gastosAcumulados)
                // Total Pasivos Corriente
                let totalPasivoCorriente = parseFloat(cuentasPP) + parseFloat(cuentasPPRelacionadas) + parseFloat(otrascuentasPP) + parseFloat(obligacionesEmple) + parseFloat(impuestosSobreRenta) + parseFloat(gastosAcumulados)
                // No corrientes
                let CPPRelacionadasLP = parseFloat(item.informacion.balancegeneral.pasivos.CPPRelacionadasLP)
                // Total Pasivos
                let totalPasivoNoCorriente = parseFloat(CPPRelacionadasLP)
                // TOTAL PASIVO
                let totalPasivo = parseFloat(totalPasivoCorriente) + parseFloat(totalPasivoNoCorriente)
                // PATRIMONIO
                let capitalSocial = parseFloat(item.informacion.balancegeneral.patrimonio.capitalSocial)
                let reservaLegal = parseFloat(item.informacion.balancegeneral.patrimonio.reservaLegal)
                let resultadosAcu = parseFloat(item.informacion.balancegeneral.patrimonio.resultadosAcu)
                let resultadosPresEjer = parseFloat(item.informacion.balancegeneral.patrimonio.resultadosPresEjer)
                // TOTAL PATRIMONIO
                let totalPatrimonio = parseFloat(capitalSocial) + parseFloat(reservaLegal) + parseFloat(resultadosAcu) + parseFloat(resultadosPresEjer)
                //
                //
                //
                // ESTADO DE RESULTADOS
                let costodeventas = parseFloat(item.informacion.estadoresultados.costodeventas)
                let gastosAdmin = parseFloat(item.informacion.estadoresultados.gastosAdmin)
                let gastosFinan = parseFloat(item.informacion.estadoresultados.gastosFinan)
                let ingresosFinan = parseFloat(item.informacion.estadoresultados.ingresosFinan)
                let gastosVentas = parseFloat(item.informacion.estadoresultados.gastosVentas)
                let impuestosSobreRentaES = parseFloat(item.informacion.estadoresultados.impuestosSobreRentaES)
                let ingresosporventas = parseFloat(item.informacion.estadoresultados.ingresosporventas)
                let otrosGasNetos = parseFloat(item.informacion.estadoresultados.otrosGasNetos)
                let otrosIngresNetos = parseFloat(item.informacion.estadoresultados.otrosIngresNetos)
                let reservaLegalES = parseFloat(item.informacion.estadoresultados.reservaLegalES)

                let utilidadbruta = parseFloat(ingresosporventas) - parseFloat(costodeventas)
                let utilidadoperativa = parseFloat(utilidadbruta) - parseFloat(gastosAdmin) - parseFloat(gastosVentas)
                let utilidadantesreserva = parseFloat(utilidadoperativa) - parseFloat(otrosGasNetos) - parseFloat(gastosFinan) + parseFloat(otrosIngresNetos) + parseFloat(ingresosFinan)
                let utilidadneta = parseFloat(utilidadantesreserva) - parseFloat(reservaLegalES) - parseFloat(impuestosSobreRentaES)
                //
                //
                // RESULTADOS DE RAZONES DE LIQUIDEZ

                //Resultado Razon Corriente
                let totalRazonCorriente = totalActivoCorriente / totalPasivoCorriente
                this.razonCorrienteT.push(totalRazonCorriente)

                // Resultado Razon Rapida
                let totalRazonRapida = (totalActivoCorriente - inventarios) / (totalPasivoCorriente)
                this.razonRapidaT.push(totalRazonRapida)

                // Capital de Trabajo
                let totalcapitalTrabajo = totalActivoCorriente - (totalPasivoCorriente)
                this.capitalTrabajoT.push(totalcapitalTrabajo)

                // Nivel de dependencia de Inventario
                let sumatoriaDep = efectivo + cuentasPC + otrasCPC
                let nivelDependenciaTotal = ((totalPasivoCorriente) - (sumatoriaDep)) / (inventarios)
                this.nivelDependenciaT.push(nivelDependenciaTotal)

                // RESULTADOS DE RAZONES DE ACTIVIDAD

                // Rotacion de inventario
                let rotacionInventarioTotal = (costodeventas) / (inventarios)
                this.rotacionInventarioT.push(rotacionInventarioTotal)

                // Periodo Promedio de Cobro
                let CPCTotal = (cuentasPC + otrasCPC)
                let PPCTotal = ((CPCTotal) * 365) / (ingresosporventas)
                this.PPCT.push(PPCTotal)

                // Periodo Promedio De Pago
                let CPPTotal = (cuentasPP + cuentasPPRelacionadas + otrascuentasPP)
                let PPPTotal = ((CPPTotal) * 365) / (0.7 * costodeventas)
                this.PPPT.push(PPPTotal)

                // Rotacion de los activos Totales
                let RATTotal = ingresosporventas / totalActivo
                this.RATT.push(RATTotal)

                // Rotacion de cartera
                let rotacionCarteraTotal = ingresosporventas / CPCTotal
                this.rotacionCarteraT.push(rotacionCarteraTotal)

                // Ciclo Operacional
                let nroDiasCartera = ((CPCTotal) * 365) / ingresosporventas
                this.NDCT.push(nroDiasCartera)
                let nroDiasInventario = (inventarios * 365) / (costodeventas)
                this.NDIT.push(nroDiasInventario)
                let cicloOperacionalTotal = nroDiasCartera + nroDiasInventario
                this.cicloOperacionalT.push(cicloOperacionalTotal)


                // Variables para Razon de Endeudamiento

                let indiceEndeudamientoTotal = totalPasivo / totalActivo
                this.indiceEndeudamientoT.push(indiceEndeudamientoTotal)

                // Razon de utilidad Bruta
                let margenUB = (utilidadbruta)/ ingresosporventas
                this.margenUtilidadBT.push(margenUB)

                // Razon de Utilidad Operativa
                let margenUO = utilidadoperativa/ingresosporventas
                this.margenUtilidadOT.push(margenUO)

                // Razon de Utilidad Neta
                let margenUN = utilidadneta/ingresosporventas
                this.margenUtilidadNT.push(margenUN)

                // Rendimiento sobre Activo Total ROA
                let ROA = utilidadneta/ totalActivo
                this.rendimientoActivoTotalT.push(ROA)
            })
        },
        anteriorPagina() {
            this.$router.go(-1)
        },
    }
}
</script>
