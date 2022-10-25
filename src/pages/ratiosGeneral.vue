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
        <p>{{this.periodos}}</p>
        <div class="col">
            <div class="row-12" style="margin-bottom: 100px;">
                <div class="col-12 justify-center">
                    <q-btn round color="warning" icon="navigate_before" @click="anteriorPagina()" size="25px" style="position: absolute; top: 50px; left: 30px;"></q-btn>
                    <h3 style="text-align: center; font-weight: bold;"> Mostrar Ratios del Año {{this.$route.params.anioactual}}</h3>
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
                <div class="col-1">
                </div>
                <div class="col-10">
                    <q-card>
                        <q-card-section class="row items-center q-pb-none">
                            <div class="text-h6">{{this.opcionLiquidez}}</div>
                            <q-space />
                            <q-btn @click="this.cerrarRazonLiquidez()" icon="close" flat round dense v-close-popup />
                        </q-card-section>
                        <q-separator inset />
                        <!--Razon Circulante-->
                        <q-card-section v-show="opcionLiquidez === 'Razon Circulante'">
                                <p>{{this.periodos[0].informacion}}</p>
                        </q-card-section>
                        <!--Razon Rapida-->
                        <q-card-section v-show="opcionLiquidez === 'Razon Rapida'">
                            <q-item class="justify-center">
                                <q-item-section avatar>
                                    <q-item-label>
                                        <div class="text-center">
                                            <hr>
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        =
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

                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        =
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
                                            <hr>
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        =
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
                                            <hr>
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        =
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

                                            <hr>
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        =
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

                                            <hr>
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        =
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

                                            <hr>
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        =
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

                                            <hr>
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        =
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Razon Periodo Ciclo Operacional-->
                        <q-card-section v-show="opcionActividad === 'Ciclo Operacional'">
                            <q-item class="justify-center">
                                <q-item-section avatar>
                                    <q-item-label>

                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        <div class="text-center">

                                            <hr>
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        =
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

                                            <hr>
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        =
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
                <div class="col-3">
                </div>
                <div class="col-6">
                    <q-card>
                        <q-card-section class="row items-center q-pb-none">
                            <div class="text-h6">{{this.opcionRentabilidad}}</div>
                            <q-space />
                            <q-btn @click="this.cerrarRazonRentabilidad()" icon="close" flat round dense v-close-popup />
                        </q-card-section>
                        <q-separator inset />
                        <!--Indice de Margen de Utilidad Bruta-->
                        <q-card-section v-show="opcionRentabilidad === 'Margen de Utilidad Bruta'">
                            <q-item class="justify-center">
                                <q-item-section avatar>
                                    <q-item-label>
                                        <div class="text-center">

                                            <hr>
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        =
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Indice de Margen de Utilidad Operativa-->
                        <q-card-section v-show="opcionRentabilidad === 'Margen de Utilidad Operativa'">
                            <q-item class="justify-center">
                                <q-item-section avatar>
                                    <q-item-label>
                                        <div class="text-center">

                                            <hr>
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        =
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Indice de Margen de Utilidad Neta-->
                        <q-card-section v-show="opcionRentabilidad === 'Margen de Utilidad Neta'">
                            <q-item class="justify-center">
                                <q-item-section avatar>
                                    <q-item-label>
                                        <div class="text-center">

                                            <hr>
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        =
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                        <!--Indice de Rendimiento sobre Activo Total-->
                        <q-card-section v-show="opcionRentabilidad === 'Rendimiento sobre Activo Total'">
                            <q-item class="justify-center">
                                <q-item-section avatar>
                                    <q-item-label>
                                        <div class="text-center">

                                            <hr>
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section avatar>
                                    <q-item-label>
                                        =
                                    </q-item-label>
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
            periodos: [],
            periodoCopia: [],
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
            this.generarOperacionesER()
        }
    },
    methods: {
        cargandoDatoss() {
            this.cargandoDatos = false
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
        cerrarRazonRentabilidad() {
            this.opcionRentabilidad = "Mas informacion"
        },
        razonCirculante() {
            this.expanded = false
            this.opcionLiquidez = "Razon Circulante"

        },
        razonRapida() {
            this.expanded = false
            this.opcionLiquidez = "Razon Rapida"

        },
        capitalTrabajo() {
            this.expanded = false
            this.opcionLiquidez = "Capital de Trabajo"

        },
        nivelDependencia() {
            this.expanded = false
            this.opcionLiquidez = "Nivel de dependencia de inventario"
        },
        // RAZON DE ACTIVIDAD
        rotacionInventario() {
            this.expandedA = false
            this.opcionActividad = "Rotacion de Inventario"
        },
        PPC() {
            this.expandedA = false
            this.opcionActividad = "Periodo Promedio de Cobro"
        },
        PPP() {
            this.expandedA = false
            this.opcionActividad = "Periodo Promedio de Pago"
        },
        RAT() {
            this.expandedA = false
            this.opcionActividad = "Rotacion de los Activos Totales"
        },
        rotacionCartera() {
            this.expandedA = false
            this.opcionActividad = "Rotacion de Cartera"
        },
        cicloOperacional() {
            this.expandedA = false
            this.opcionActividad = "Ciclo Operacional"

        },
        // RAZON DE DEUDA
        indiceEndeudamiento() {
            this.expandedD = false
            this.opcionDeuda = "Indice de Endeudamiento"
        },
        // RAZON RENTABILIDAD
        margenUtilidadB() {
            this.expandedR = false
            this.opcionRentabilidad = "Margen de Utilidad Bruta"
        },
        margenUtilidadO() {
            this.expandedR = false
            this.opcionRentabilidad = "Margen de Utilidad Operativa"
        },
        margenUtilidadN() {
            this.expandedR = false
            this.opcionRentabilidad = "Margen de Utilidad Neta"
        },
        rendimientoActivoTotal() {
            this.expandedR = false
            this.opcionRentabilidad = "Rendimiento sobre Activo Total"
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
        generarOperacionesBG() {},
        generarOperacionesER() {},
        anteriorPagina() {
            this.$router.go(-1)
        },
    }
}
</script>
