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
            <div class="col-12 justify-center">
                <h3> Reporte Dupont del Año {{this.$route.params.anioactual}}</h3>
            </div>
            <div>
                <p>{{this.periodo}}</p>
                <div class="q-pa-md">
                    <q-list bordered class="rounded-borders">
                        <q-expansion-item expand-separator icon="perm_identity" v-model="expanded" label="Razones de Liquidez" :caption=opcionLiquidez>
                            <q-item clickable v-ripple style="width:100%" @click="this.razonCirculante()">
                                <q-item-section avatar>
                                    <q-icon name="directions_bus" color="black" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Razon Corriente</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-ripple style="width:100%" @click="this.razonRapida()">
                                <q-item-section avatar>
                                    <q-icon name="directions_bus" color="black" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Razon rapida</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-ripple style="width:100%" @click="this.capitalTrabajo()">
                                <q-item-section avatar>
                                    <q-icon name="directions_bus" color="black" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Capital de trabajo</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-ripple style="width:100%" @click="this.nivelDependencia()">
                                <q-item-section avatar>
                                    <q-icon name="directions_bus" color="black" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Nivel de Dependencia del inventario</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-expansion-item>
                    </q-list>
    
                </div>
                <div class="row-12 q-pa-md justify-center">
                    <div class="col-12">
                        <q-card class="my-card q-pa-md" style="max-width: 500px;">
                            <q-card-section>
                                Formula:
                            </q-card-section>
                        </q-card>
                    </div>
                </div>
                <!--RAZONES DE ACTIVIDAD-->
                <div class="q-pa-md">
                    <q-list bordered class="rounded-borders">
                        <q-expansion-item expand-separator icon="perm_identity" v-model="expandedA" label="Razones de Actividad" :caption=opcionActividad>
                            <q-item clickable v-ripple style="width:100%" @click="this.rotacionInventario()">
                                <q-item-section avatar>
                                    <q-icon name="directions_bus" color="black" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Rotacion de Inventario</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-ripple style="width:100%">
                                <q-item-section avatar>
                                    <q-icon name="directions_bus" color="black" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Periodo Promedio de Cobro</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-ripple style="width:100%">
                                <q-item-section avatar>
                                    <q-icon name="directions_bus" color="black" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Periodo Promedio de Pago</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-ripple style="width:100%">
                                <q-item-section avatar>
                                    <q-icon name="directions_bus" color="black" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Rotacion de los Activos Totales</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-ripple style="width:100%">
                                <q-item-section avatar>
                                    <q-icon name="directions_bus" color="black" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Rotacion de Activo Operacional</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-ripple style="width:100%">
                                <q-item-section avatar>
                                    <q-icon name="directions_bus" color="black" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Rotacion de Cartera</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-ripple style="width:100%">
                                <q-item-section avatar>
                                    <q-icon name="directions_bus" color="black" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Ciclo Operacional</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-expansion-item>
                    </q-list>
                </div>
                <!--RAZONES DE DEUDA-->
                <div class="q-pa-md">
                    <q-list bordered class="rounded-borders">
                        <q-expansion-item expand-separator icon="perm_identity" label="Razones de Deuda" caption="Mas informacion">
                            <q-item clickable v-ripple style="width:100%">
                                <q-item-section avatar>
                                    <q-icon name="directions_bus" color="black" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Indice de Endeudamiento</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-ripple style="width:100%">
                                <q-item-section avatar>
                                    <q-icon name="directions_bus" color="black" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Razon de cargo de interes fijo</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-ripple style="width:100%">
                                <q-item-section avatar>
                                    <q-icon name="directions_bus" color="black" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Indice de cobertura de pagos fijos</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-expansion-item>
                    </q-list>
                </div>
                <!--RAZONES DE RENTABILIDAD-->
                <div class="q-pa-md">
                    <q-list bordered class="rounded-borders">
                        <q-expansion-item expand-separator icon="perm_identity" label="Razones de Rentabilidad" caption="Mas informacion">
                            <q-item clickable v-ripple style="width:100%">
                                <q-item-section avatar>
                                    <q-icon name="directions_bus" color="black" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Margen de Utilidad Bruta</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-ripple style="width:100%">
                                <q-item-section avatar>
                                    <q-icon name="directions_bus" color="black" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Margen de Utilidad Operativa</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-ripple style="width:100%">
                                <q-item-section avatar>
                                    <q-icon name="directions_bus" color="black" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Margen de Utilidad Neta</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-ripple style="width:100%">
                                <q-item-section avatar>
                                    <q-icon name="directions_bus" color="black" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Ganancias por Accion</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-expansion-item>
                    </q-list>
                </div>
                <!--RAZONES DE MERCADO-->
                <div class="q-pa-md">
                    <q-list bordered class="rounded-borders">
                        <q-expansion-item expand-separator icon="perm_identity" label="Razones de Mercado" caption="Mas informacion">
                            <q-item clickable v-ripple style="width:100%">
                                <q-item-section avatar>
                                    <q-icon name="directions_bus" color="black" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Razon Corriente</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-ripple style="width:100%">
                                <q-item-section avatar>
                                    <q-icon name="directions_bus" color="black" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Razon rapida</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-ripple style="width:100%">
                                <q-item-section avatar>
                                    <q-icon name="directions_bus" color="black" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Capital de trabajo</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-ripple style="width:100%">
                                <q-item-section avatar>
                                    <q-icon name="directions_bus" color="black" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Nivel de Dependencia del inventario</q-item-label>
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
                opcionActividad: "Mas informacion"
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
            rotacionInventario() {
                this.expandedA = false
                this.opcionActividad = "Rotacion de Inventario"
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
    