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
            <div class="col-12 justify-center">
                <h3> Ver Ratios del Año {{this.$route.params.anioactual}}</h3>
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
                <div class="col-3">
                </div>
                <div class="col-6">
                    <q-card>
                        <q-card-section class="row items-center q-pb-none">
                            <div class="text-h6">{{this.opcionLiquidez}}</div>
                            <q-space />
                            <q-btn @click="this.cerrarRazonLiquidez()" icon="close" flat round dense v-close-popup />
                        </q-card-section>
                        <q-separator inset />
                        <!--Razon Circulante-->
                        <q-card-section v-show="opcionLiquidez === 'Razon Circulante'">
                            <q-item class="justify-center">
                                <q-item-section avatar>
                                    <q-item-label>
                                        <div class="text-center">
                                            {{parseFloat((this.totalActivoCorriente).toFixed(2)).toLocaleString('en')}}
                                            <hr>{{((this.totalPasivoCorriente)).toLocaleString('en')}}
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        = {{this.razonCirculanteTotal}}
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Razon Rapida-->
                        <q-card-section v-show="opcionLiquidez === 'Razon Rapida'">
                            <q-item class="justify-center">
                                <q-item-section avatar>
                                    <q-item-label>
                                        <div class="text-center">
                                            {{parseFloat((this.totalActivoCorriente).toFixed(2)).toLocaleString('en')}} - {{parseFloat((this.inventarios).toFixed(2)).toLocaleString('en')}}
                                            <hr>{{parseFloat((this.totalPasivoCorriente).toFixed(2)).toLocaleString('en')}}
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        = {{(this.razonRapidaTotal).toFixed(2)}}
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Capital de Trabajo-->
                        <q-card-section v-show="opcionLiquidez === 'Capital de Trabajo'">
                            <q-item class="justify-center">
                                <q-item-section avatar>
                                    <q-item-label>
                                        <div class="text-center">
                                            {{parseFloat((this.totalActivoCorriente).toFixed(2)).toLocaleString('en')}} - {{parseFloat((this.totalPasivoCorriente).toFixed(2)).toLocaleString('en')}}
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        = {{parseFloat((this.capitalTrabajoTotal).toFixed(2)).toLocaleString('en')}}
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Razon Rapida-->
                        <q-card-section v-show="opcionLiquidez === 'Nivel de dependencia de inventario'">
                            <q-item class="justify-center">
                                <q-item-section avatar>
                                    <q-item-label>
                                        <div class="text-center">
                                            {{parseFloat((this.totalPasivoCorriente).toFixed(2)).toLocaleString('en')}} - {{parseFloat((this.sumatoriaDep).toFixed(2)).toLocaleString('en')}}
                                            <hr>{{parseFloat((this.inventarios).toFixed(2)).toLocaleString('en')}}
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        = {{(this.nivelDependenciaTotal).toFixed(2)}}
                                    </q-item-label>
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
                                        <q-banner class="bg-positive text-black">
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
                                        <q-banner class="bg-positive text-black">
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
                                        <q-banner class="bg-positive text-black">
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
                                        <q-banner class="bg-positive text-black">
                                            <template v-slot:avatar>

                                            </template>
                                            <q-item class="justify-center">
                                                <q-item-section avatar>
                                                    <q-item-label>
                                                        <div class="text-center">
                                                            Pasivos Corrientes - (caja+bancos+cuentas por cobrar + realilzables)
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
                <div class="col-3">
                </div>
                <div class="col-6">
                    <q-card>
                        <q-card-section class="row items-center q-pb-none">
                            <div class="text-h6">{{this.opcionActividad}}</div>
                            <q-space />
                            <q-btn @click="this.cerrarRazonActividad()" icon="close" flat round dense v-close-popup />
                        </q-card-section>
                        <q-separator inset />
                        <!--Razon Rotacion de Inventario-->
                        <q-card-section v-show="opcionActividad === 'Rotacion de Inventario'">
                            <q-item class="justify-center">
                                <q-item-section avatar>
                                    <q-item-label>
                                        <div class="text-center">
                                            {{parseFloat((this.costodeventas).toFixed(2)).toLocaleString('en')}}
                                            <hr>{{((this.inventarios)).toLocaleString('en')}}
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        = {{parseFloat((this.rotacionInventarioTotal).toFixed(2)).toLocaleString('en')}}
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Razon Periodo Promedio de Cobro-->
                        <q-card-section v-show="opcionActividad === 'Periodo Promedio de Cobro'">
                            <q-item class="justify-center">
                                <q-item-section avatar>
                                    <q-item-label>
                                        <div class="text-center">
                                            {{(this.CPCTotal).toLocaleString('en')}} * 365
                                            <hr>{{((this.ingresosporventas)).toLocaleString('en')}}
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        = {{parseFloat((this.PPCTotal).toFixed(2)).toLocaleString('en')}}
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Razon Periodo Promedio de Pago-->
                        <q-card-section v-show="opcionActividad === 'Periodo Promedio de Pago'">
                            <q-item class="justify-center">
                                <q-item-section avatar>
                                    <q-item-label>
                                        <div class="text-center">
                                            {{(this.CPPTotal).toLocaleString('en')}} * 365
                                            <hr>0.7 * {{((this.costodeventas)).toLocaleString('en')}}
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        = {{parseFloat((this.PPPTotal).toFixed(2)).toLocaleString('en')}}
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Razon Periodo Rotacion de los Activos Totales-->
                        <q-card-section v-show="opcionActividad === 'Rotacion de los Activos Totales'">
                            <q-item class="justify-center">
                                <q-item-section avatar>
                                    <q-item-label>
                                        <div class="text-center">
                                            {{parseFloat((this.ingresosporventas).toFixed(2)).toLocaleString('en')}}
                                            <hr>{{parseFloat((this.totalActivo).toFixed(2)).toLocaleString('en')}}
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        = {{parseFloat((this.RATTotal).toFixed(2)).toLocaleString('en')}}
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Razon Periodo Rotacion de Cartera-->
                        <q-card-section v-show="opcionActividad === 'Rotacion de Cartera'">
                            <q-item class="justify-center">
                                <q-item-section avatar>
                                    <q-item-label>
                                        <div class="text-center">
                                            {{parseFloat((this.ingresosporventas).toFixed(2)).toLocaleString('en')}}
                                            <hr>{{parseFloat((this.CPCTotal).toFixed(2)).toLocaleString('en')}}
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        = {{parseFloat((this.rotacionCarteraTotal).toFixed(2)).toLocaleString('en')}} veces
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Razon Periodo Ciclo Operacional-->
                        <q-card-section v-show="opcionActividad === 'Ciclo Operacional'">
                            <q-item class="justify-center">
                                <q-item-section avatar>
                                    <q-item-label>
                                        {{parseFloat((this.nroDiasCartera).toFixed(2)).toLocaleString('en')}} +
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        <div class="text-center">
                                            {{parseFloat((this.inventarios).toFixed(2)).toLocaleString('en')}} * 365
                                            <hr>{{parseFloat((this.costodeventas).toFixed(2)).toLocaleString('en')}}
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        = {{parseInt((this.cicloOperacionalTotal).toFixed(2)).toLocaleString('en')}} dias
                                    </q-item-label>
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
                                        <q-banner class="bg-positive text-black">
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
                                <!--Boton para Periodo Promedio de Cobro-->
                                <q-btn v-show="this.opcionActividad === 'Periodo Promedio de Cobro'" color="primary" text-color="white" label="Formula">
                                    <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                                        <q-banner class="bg-positive text-black">
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
                                        <q-banner class="bg-positive text-black">
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
                                        <q-banner class="bg-positive text-black">
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
                                        <q-banner class="bg-positive text-black">
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
                                        <q-banner class="bg-positive text-black">
                                            <template v-slot:avatar>

                                            </template>
                                            <q-item class="justify-center">
                                                <q-item-section avatar>
                                                    <q-item-label>
                                                        Nro. Dias de Cartera +
                                                    </q-item-label>
                                                </q-item-section>
                                                <q-item-section avatar>
                                                    <q-item-label>
                                                        <div class="text-center">
                                                            Inventario
                                                            <hr>Costo de ventas
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
            <!--RAZONES DE DEUDA-->
            <div class="q-pa-md"> <!-- ESTE ES EL MENU DESPLEGABLE  -->
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
                <div class="col-3">
                </div>
                <div class="col-6">
                    <q-card>
                        <q-card-section class="row items-center q-pb-none">
                            <div class="text-h6">{{this.opcionDeuda}}</div>
                            <q-space />
                            <q-btn @click="this.cerrarRazonDeuda()" icon="close" flat round dense v-close-popup />
                        </q-card-section>
                        <q-separator inset />
                        <!--Indice de Endeudamiento-->
                        <q-card-section v-show="opcionDeuda === 'Indice de Endeudamiento'">
                            <q-item class="justify-center">
                                <q-item-section avatar>
                                    <q-item-label>
                                        <div class="text-center">
                                            {{parseFloat((this.totalPasivo).toFixed(2)).toLocaleString('en')}}
                                            <hr>{{parseFloat((this.totalActivo).toFixed(2)).toLocaleString('en')}}
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        = {{parseFloat((this.indiceEndeudamientoTotal).toFixed(2))}}
                                    </q-item-label>
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
                                        <q-banner class="bg-positive text-black">
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
                    <q-expansion-item expand-separator icon="list" label="Razones de Rentabilidad" caption="Mas informacion">
                        <q-item clickable v-ripple style="width:100%">
                            <q-item-section avatar>
                                <q-icon name="calculate" color="black" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Margen de Utilidad Bruta</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple style="width:100%">
                            <q-item-section avatar>
                                <q-icon name="calculate" color="black" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Margen de Utilidad Operativa</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple style="width:100%">
                            <q-item-section avatar>
                                <q-icon name="calculate" color="black" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Margen de Utilidad Neta</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple style="width:100%">
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
    name: 'Mostrarratios',
    data() {
        return {
            periodo: [],
            id: String,
            cargandoDatos: true,
            llaveCargandoDatos: false,
            expanded: false,
            opcionLiquidez: "Mas informacion",
            expandedA: false,
            opcionActividad: "Mas informacion",
            expandedD: false,
            opcionDeuda: "Mas informacion",
            // Estado de Resultado
            // Datos a mostrar
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
            utilidadantesreserva: 0,
            // Datos del Balance
            // ACTIVOS
            totalActivo: 0,
            totalActivoCorriente: 0,
            totalActivoNoCorriente: 0,
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
            totalPasivoNoCorriente: 0,
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
            totalPatrimonio: 0,
            //
            capitalSocial: 0,
            reservaLegal: 0,
            resultadosAcu: 0,
            resultadosPresEjer: 0,
            pasivoPatrimonio: 0,
            // RESPUESTAS Razon Liquidez
            razonCirculanteTotal: 0,
            razonRapidaTotal: 0,
            capitalTrabajoTotal: 0,
            nivelDependenciaTotal: 0,
            sumatoriaDep: 0, // sumatoria de (caja + bancos + cuentas por cobrar)
            //Rspuestas Razon Actividad
            rotacionInventarioTotal: 0,
            PPCTotal: 0, // Periodo promedio de Cobro Resultado
            CPCTotal: 0, // cuentas por cobrar totales
            PPPTotal: 0, // periodo promedio de pago Resultado
            CPPTotal: 0, // cuentas por pagar totales
            RATTotal: 0, // Rotacion de los activos totales Resultado
            rotacionCarteraTotal: 0,
            nroDiasCartera:0,
            nroDiasInventario:0,
            cicloOperacionalTotal: 0,
            // Resuestas a razon de endeudamiento
            indiceEndeudamientoTotal: 0,


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
            this.generarOperacionesBG()
            this.generarOperacionesER()
        }
    },
    methods: {
        cargandoDatoss() {
            this.cargandoDatos = false
            console.log(this.cargandoDatos)
        },
        cerrarRazonLiquidez() {
            this.opcionLiquidez = "Mas informacion"
        },
        cerrarRazonActividad() {
            this.opcionActividad = "Mas informacion"
        },
        cerrarRazonDeuda() {
            this.opcionDeuda = "Mas informacion"
        },
        razonCirculante() {
            this.expanded = false
            this.opcionLiquidez = "Razon Circulante"
            this.razonCirculanteTotal = (this.totalActivoCorriente) / (this.totalPasivoCorriente)
            this.razonCirculanteTotal = this.razonCirculanteTotal.toFixed(2)
        },
        razonRapida() {
            this.expanded = false
            this.opcionLiquidez = "Razon Rapida"
            this.razonRapidaTotal = (this.totalActivoCorriente - this.inventarios) / (this.totalPasivoCorriente)
        },
        capitalTrabajo() {
            this.expanded = false
            this.opcionLiquidez = "Capital de Trabajo"
            this.capitalTrabajoTotal = this.totalActivoCorriente - this.totalPasivoCorriente
        },
        nivelDependencia() {
            this.expanded = false
            this.opcionLiquidez = "Nivel de dependencia de inventario"
            this.sumatoriaDep = this.efectivo + this.cuentasPC + this.otrasCPC
            this.nivelDependenciaTotal = ((this.totalPasivoCorriente) - (this.sumatoriaDep)) / (this.inventarios)
        },
        // RAZON DE ACTIVIDAD
        rotacionInventario() {
            this.expandedA = false
            this.opcionActividad = "Rotacion de Inventario"
            this.rotacionInventarioTotal = (this.costodeventas) / (this.inventarios)
        },
        PPC() {
            this.expandedA = false
            this.opcionActividad = "Periodo Promedio de Cobro"
            this.CPCTotal = (this.cuentasPC + this.otrasCPC)
            this.PPCTotal = ((this.CPCTotal) * 365) / (this.ingresosporventas)
        },
        PPP() {
            this.expandedA = false
            this.opcionActividad = "Periodo Promedio de Pago"
            this.CPPTotal = (this.cuentasPP + this.cuentasPPRelacionadas + this.otrascuentasPP)
            this.PPPTotal = ((this.CPPTotal) * 365) / (0.7 * this.costodeventas)
        },
        RAT() {
            this.expandedA = false
            this.opcionActividad = "Rotacion de los Activos Totales"
            this.RATTotal = this.ingresosporventas / this.totalActivo
        },
        rotacionCartera() {
            this.expandedA = false
            this.opcionActividad = "Rotacion de Cartera"
            this.CPCTotal = (this.cuentasPC + this.otrasCPC)
            this.rotacionCarteraTotal = this.ingresosporventas / this.CPCTotal
        },
        cicloOperacional() {
            this.expandedA = false
            this.opcionActividad = "Ciclo Operacional"
            this.CPCTotal = (this.cuentasPC + this.otrasCPC)
            this.nroDiasCartera = ((this.CPCTotal) * 365)/this.ingresosporventas
            this.nroDiasInventario = (this.inventarios * 365) / (this.costodeventas)
            this.cicloOperacionalTotal = this.nroDiasCartera + this.nroDiasInventario


        },
        // RAZON DE DEUDA
        indiceEndeudamiento(){
            this.expandedD = false
            this.opcionDeuda = "Indice de Endeudamiento"
            this.indiceEndeudamientoTotal = this.totalPasivo / this.totalActivo
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
        generarOperacionesBG() {
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
            this.totalActivoNoCorriente = parseFloat(this.totalActivoNoCorriente) + parseFloat(this.propiedad) + parseFloat(this.activosIntangibles) + parseFloat(this.activosBiologicos) + parseFloat(this.inversionFinalLP)
            //Total Activo
            this.totalActivo = parseFloat(this.totalActivo) + parseFloat(this.totalActivoCorriente) + parseFloat(this.totalActivoNoCorriente)
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
            // Total Pasivos
            this.totalPasivoCorriente = parseFloat(this.totalPasivoCorriente) + parseFloat(this.cuentasPP) + parseFloat(this.cuentasPPRelacionadas) + parseFloat(this.otrascuentasPP) + parseFloat(this.obligacionesEmple) + parseFloat(this.impuestosSobreRenta) + parseFloat(this.gastosAcumulados)
            this.totalPasivoNoCorriente = parseFloat(this.totalPasivoNoCorriente) + parseFloat(this.CPPRelacionadasLP)
            this.totalPasivo = parseFloat(this.totalPasivoCorriente) + parseFloat(this.totalPasivoNoCorriente)
            // PATRIMONIO
            //
            this.capitalSocial = parseFloat(this.periodo[0].balancegeneral.patrimonio.capitalSocial)
            this.reservaLegal = parseFloat(this.periodo[0].balancegeneral.patrimonio.reservaLegal)
            this.resultadosAcu = parseFloat(this.periodo[0].balancegeneral.patrimonio.resultadosAcu)
            this.resultadosPresEjer = parseFloat(this.periodo[0].balancegeneral.patrimonio.resultadosPresEjer)
            // Total Patrimonio
            this.totalPatrimonio = parseFloat(this.totalPatrimonio) + parseFloat(this.capitalSocial) + parseFloat(this.reservaLegal) + parseFloat(this.resultadosAcu) + parseFloat(this.resultadosPresEjer)
            this.pasivoPatrimonio = parseFloat(this.totalPatrimonio) + parseFloat(this.totalPasivo)
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
            this.reservaLegal = parseFloat(this.periodo[0].estadoresultados.reservaLegalES)

            this.utilidadbruta = parseFloat(this.utilidadbruta) + parseFloat(this.ingresosporventas) - parseFloat(this.costodeventas)
            this.utilidadoperativa = parseFloat(this.utilidadbruta) - parseFloat(this.gastosAdmin) - parseFloat(this.gastosVentas)
            this.utilidadantesreserva = parseFloat(this.utilidadoperativa) - parseFloat(this.otrosGasNetos) - parseFloat(this.gastosFinan) + parseFloat(this.otrosIngresNetos)
            this.utilidadneta = parseFloat(this.utilidadantesreserva) - parseFloat(this.reservaLegal) - parseFloat(this.impuestosSobreRenta)
        }
    }
}
</script>
