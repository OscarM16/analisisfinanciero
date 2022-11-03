<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="col-12 justify-center">
        <div class="row-12">
          <div class="col-12 justify-center">
            <h3 style="text-align: center; font-weight: bold">
              Crear Nuevo Periodo
            </h3>
          </div>
        </div>
        <q-dialog v-model="dialog" :position="position">
        <q-card style="border-radius: 20px; background-color: #AFF1BC;;width: 350px;max-height: 100px;">
            <q-card-section class="row items-center" style="padding: 2px;">
                <q-avatar icon="check_circle" size="6em" />
                <span class="">{{this.addEstadoFinanciero}}</span>
            </q-card-section>
        </q-card>
    </q-dialog>
        <div class="q-pa-md"  style="margin: 50px;" id="content1" v-show="!this.mostrarFormulario">
          <q-list>
            <q-item >
                <q-item-section>
                  <q-item-label style="font-size: 22px"
                    >Año del Periodo</q-item-label
                  >
                </q-item-section>
                <q-item-section side top>
                  <q-item-label>

                    <div class="q-pa-md">
                      <div class="cursor-pointer">
                        {{ this.anio }}
                        <q-popup-edit v-model="this.anio">
                          <template v-slot="scope">
                            <q-input
                              autofocus
                              dense
                              v-model="scope.value"
                              type="number"
                            >
                              <template v-slot:after>
                                <q-btn
                                  flat
                                  dense
                                  color="negative"
                                  icon="cancel"
                                  @click.stop="scope.cancel"
                                />

                                <q-btn
                                  flat
                                  dense
                                  color="positive"
                                  icon="check_circle"
                                  @click.stop="scope.set"
                                  :disable="
                                    scope.validate(scope.value) === false ||
                                    scope.initialValue === scope.value
                                  "
                                />
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </div>
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>
          </q-list>
        </div>
        <div class="row-12">
        <div class="col-12 justify-center">
        <h4 style="text-align: center; font-weight: bold; text-decoration: underline" v-show="!this.mostrarFormulario">Balance General</h4>
        <h4 style="text-align: center; font-weight: bold; text-decoration: underline" v-show="this.mostrarFormulario">Estado de Resultados</h4>
        </div>
      </div>
        <div class="q-pa-md" style="margin: 50px;" id="content1" v-show="!this.mostrarFormulario">
          <q-list>
            <q-list>
              <q-item style="background-color: #82E082">
                <q-item-section>
                  <q-item-label style="font-weight: bold; font-size: 22px"
                    >Activo</q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label
                    style="font-weight: bold; text-decoration: underline;font-size: 18px;">Corriente</q-item-label
                  >
                </q-item-section>
                <q-item-section side top>
                  <q-item-label
                    style="font-weight: bold; font-size: 16px; color: black"
                  ></q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-show="this.efectivo !== 0 || this.efectivo == 0">
                <q-item-section>
                  <q-item-label style="font-size: 15px"
                    >Efectivo y equivalentes al efectivo</q-item-label
                  >
                </q-item-section>
                <q-item-section side top>
                  <q-item-label>

                    <div class="q-pa-md">
                      <div class="cursor-pointer">
                        {{ this.efectivo }}
                        <q-popup-edit v-model="this.efectivo">
                          <template v-slot="scope">
                            <q-input
                              autofocus
                              dense
                              v-model="scope.value"
                              type="number"
                            >
                              <template v-slot:after>
                                <q-btn
                                  flat
                                  dense
                                  color="negative"
                                  icon="cancel"
                                  @click.stop="scope.cancel"
                                />

                                <q-btn
                                  flat
                                  dense
                                  color="positive"
                                  icon="check_circle"
                                  @click.stop="scope.set"
                                  :disable="
                                    scope.validate(scope.value) === false ||
                                    scope.initialValue === scope.value
                                  "
                                />
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </div>
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-show="this.cuentasPC !== 0 || this.cuentasPC == 0">
                <q-item-section>
                  <q-item-label style="font-size: 15px"
                    >Cuentas por cobrar a partes relacionadas</q-item-label
                  >
                </q-item-section>
                <q-item-section side top>
                  <q-item-label>
                    <div class="q-pa-md">
                      <div class="cursor-pointer">
                        {{ this.cuentasPC }}
                        <q-popup-edit v-model="this.cuentasPC">
                          <template v-slot="scope">
                            <q-input
                              autofocus
                              dense
                              v-model="scope.value"
                              type="number"
                            >
                              <template v-slot:after>
                                <q-btn
                                  flat
                                  dense
                                  color="negative"
                                  icon="cancel"
                                  @click.stop="scope.cancel"
                                />

                                <q-btn
                                  flat
                                  dense
                                  color="positive"
                                  icon="check_circle"
                                  @click.stop="scope.set"
                                  :disable="
                                    scope.validate(scope.value) === false ||
                                    scope.initialValue === scope.value
                                  "
                                />
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </div>
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-show="this.otrasCPC !== 0 || this.otrasCPC == 0">
                <q-item-section>
                  <q-item-label style="font-size: 15px"
                    >Otras cuentas por cobrar</q-item-label
                  >
                </q-item-section>
                <q-item-section side top>
                  <q-item-label>
                    <div class="q-pa-md">
                      <div class="cursor-pointer">
                        {{ this.otrasCPC }}
                        <q-popup-edit v-model="this.otrasCPC">
                          <template v-slot="scope">
                            <q-input
                              autofocus
                              dense
                              v-model="scope.value"
                              type="number"
                            >
                              <template v-slot:after>
                                <q-btn
                                  flat
                                  dense
                                  color="negative"
                                  icon="cancel"
                                  @click.stop="scope.cancel"
                                />

                                <q-btn
                                  flat
                                  dense
                                  color="positive"
                                  icon="check_circle"
                                  @click.stop="scope.set"
                                  :disable="
                                    scope.validate(scope.value) === false ||
                                    scope.initialValue === scope.value
                                  "
                                />
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </div>
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-show="this.depositosCortoP !== 0 || this.depositosCortoP == 0"
              >
                <q-item-section>
                  <q-item-label style="font-size: 15px"
                    >Dépositos a corto plazo</q-item-label
                  >
                </q-item-section>
                <q-item-section side top>
                  <q-item-label>
                    <div class="q-pa-md">
                      <div class="cursor-pointer">
                        {{ this.depositosCortoP }}
                        <q-popup-edit v-model="this.depositosCortoP">
                          <template v-slot="scope">
                            <q-input
                              autofocus
                              dense
                              v-model="scope.value"
                              type="number"
                            >
                              <template v-slot:after>
                                <q-btn
                                  flat
                                  dense
                                  color="negative"
                                  icon="cancel"
                                  @click.stop="scope.cancel"
                                />

                                <q-btn
                                  flat
                                  dense
                                  color="positive"
                                  icon="check_circle"
                                  @click.stop="scope.set"
                                  :disable="
                                    scope.validate(scope.value) === false ||
                                    scope.initialValue === scope.value
                                  "
                                />
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </div>
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-show="this.inventarios !== 0 || this.inventarios == 0">
                <q-item-section>
                  <q-item-label style="font-size: 15px"
                    >Inventarios</q-item-label
                  >
                </q-item-section>
                <q-item-section side top>
                  <q-item-label>
                    <div class="q-pa-md">
                      <div class="cursor-pointer">
                        {{ this.inventarios }}
                        <q-popup-edit v-model="this.inventarios">
                          <template v-slot="scope">
                            <q-input
                              autofocus
                              dense
                              v-model="scope.value"
                              type="number"
                            >
                              <template v-slot:after>
                                <q-btn
                                  flat
                                  dense
                                  color="negative"
                                  icon="cancel"
                                  @click.stop="scope.cancel"
                                />

                                <q-btn
                                  flat
                                  dense
                                  color="positive"
                                  icon="check_circle"
                                  @click.stop="scope.set"
                                  :disable="
                                    scope.validate(scope.value) === false ||
                                    scope.initialValue === scope.value
                                  "
                                />
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </div>
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-show="
                  this.gastosPagadosAnt !== 0 || this.gastosPagadosAnt == 0
                "
              >
                <q-item-section>
                  <q-item-label style="font-size: 15px"
                    >Gastos pagados por anticipado</q-item-label
                  >
                </q-item-section>
                <q-item-section side top>
                  <q-item-label>
                    <div class="q-pa-md">
                      <div class="cursor-pointer">
                        {{ this.gastosPagadosAnt }}
                        <q-popup-edit v-model="this.gastosPagadosAnt">
                          <template v-slot="scope">
                            <q-input
                              autofocus
                              dense
                              v-model="scope.value"
                              type="number"
                            >
                              <template v-slot:after>
                                <q-btn
                                  flat
                                  dense
                                  color="negative"
                                  icon="cancel"
                                  @click.stop="scope.cancel"
                                />

                                <q-btn
                                  flat
                                  dense
                                  color="positive"
                                  icon="check_circle"
                                  @click.stop="scope.set"
                                  :disable="
                                    scope.validate(scope.value) === false ||
                                    scope.initialValue === scope.value
                                  "
                                />
                              </template>
                            </q-input>
                          </template>
                        </q-popup-edit>
                      </div>
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <q-item>
              <q-item-section>
                <q-item-label
                  style="
                    font-weight: bold;
                    text-decoration: underline;
                    font-size: 18px;
                  "
                  >No Corriente</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label
                  style="font-weight: bold; font-size: 16px; color: black"
                ></q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-show="this.propiedad !== 0 || this.propiedad == 0">
              <q-item-section>
                <q-item-label style="font-size: 15px"
                  >Propiedad, planta y equipo (neto)</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.propiedad }}
                      <q-popup-edit v-model="this.propiedad">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-show="
                this.activosIntangibles !== 0 || this.activosIntangibles == 0
              "
            >
              <q-item-section>
                <q-item-label style="font-size: 15px"
                  >Activos intangibles</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.activosIntangibles }}
                      <q-popup-edit v-model="this.activosIntangibles">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-show="
                this.activosBiologicos !== 0 || this.activosBiologicos == 0
              "
            >
              <q-item-section>
                <q-item-label style="font-size: 15px"
                  >Activos Biologicos</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.activosBiologicos }}
                      <q-popup-edit v-model="this.activosBiologicos">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-show="this.inversionFinalLP !== 0 || this.inversionFinalLP == 0"
            >
              <q-item-section>
                <q-item-label style="font-size: 15px"
                  >Inversiones financieras a largo plazo</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.inversionFinalLP }}
                      <q-popup-edit v-model="this.inversionFinalLP">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-list>
            <q-item  style="background-color: #F79C7E">
              <q-item-section>
                <q-item-label style="font-weight: bold; font-size: 22px"
                  >Pasivos</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label
                  style="
                    font-weight: bold;
                    text-decoration: underline;
                    font-size: 18px;
                  "
                  >Corriente</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label
                  style="font-weight: bold; font-size: 16px; color: black"
                ></q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-show="this.cuentasPP !== 0 || this.cuentasPP == 0">
              <q-item-section>
                <q-item-label style="font-size: 15px"
                  >Cuentas por pagar a corto plazo</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.cuentasPP }}
                      <q-popup-edit v-model="this.cuentasPP">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-show="
                this.cuentasPPRelacionadas !== 0 ||
                this.cuentasPPRelacionadas == 0
              "
            >
              <q-item-section>
                <q-item-label style="font-size: 15px"
                  >Cuentas por pagar partes relacionadas a corto
                  plazo</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.cuentasPPRelacionadas }}
                      <q-popup-edit v-model="this.cuentasPPRelacionadas">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-show="this.gastosAcumulados !== 0 || this.gastosAcumulados == 0"
            >
              <q-item-section>
                <q-item-label style="font-size: 15px"
                  >Gastos acumulados y otras cuentas por pagar</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.gastosAcumulados }}
                      <q-popup-edit v-model="this.gastosAcumulados">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-show="this.otrascuentasPP !== 0 || this.otrascuentasPP == 0"
            >
              <q-item-section>
                <q-item-label style="font-size: 15px"
                  >Otras cuentas por pagar a corto plazo</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.otrascuentasPP }}
                      <q-popup-edit v-model="this.otrascuentasPP">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-show="
                this.obligacionesEmple !== 0 || this.obligacionesEmple == 0
              "
            >
              <q-item-section>
                <q-item-label style="font-size: 15px"
                  >Obligaciones a corto plazo por beneficios a
                  empleados</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.obligacionesEmple }}
                      <q-popup-edit v-model="this.obligacionesEmple">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-show="
                this.impuestosSobreRenta !== 0 || this.impuestosSobreRenta == 0
              "
            >
              <q-item-section>
                <q-item-label style="font-size: 15px"
                  >Impuesto sobre la renta por pagar</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.impuestosSobreRenta }}
                      <q-popup-edit v-model="this.impuestosSobreRenta">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-list
            v-show="this.CPPRelacionadasLP !== 0 || this.CPPRelacionadasLP == 0"
          >
            <q-item>
              <q-item-section>
                <q-item-label
                  style="font-weight: bold;
                    text-decoration: underline;
                    font-size: 18px;
                  "
                  >No Corriente</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label
                  style="font-weight: bold; font-size: 16px; color: black"
                ></q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-show="
                this.CPPRelacionadasLP !== 0 || this.CPPRelacionadasLP == 0
              "
            >
              <q-item-section>
                <q-item-label style="font-size: 15px"
                  >Cuentas por pagar partes relacionadas de Largo
                  Plazo</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.CPPRelacionadasLP }}
                      <q-popup-edit v-model="this.CPPRelacionadasLP">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-list>
            <q-item  style="background-color: #A5ADE0">
              <q-item-section>
                <q-item-label style="font-weight: bold; font-size: 22px"
                  >Patrimonio</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item
              v-show="this.capitalSocial !== 0 || this.capitalSocial == 0"
            >
              <q-item-section>
                <q-item-label style="font-size: 15px"
                  >Capital Social</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.capitalSocial }}
                      <q-popup-edit v-model="this.capitalSocial">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-show="this.reservaLegal ==0 || this.reservaLegal !==0">
              <q-item-section>
                <q-item-label style="font-size: 15px"
                  >Reserva Legal</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.reservaLegal }}
                      <q-popup-edit v-model="this.reservaLegal">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-show="this.resultadosAcu !== 0 || this.resultadosAcu == 0"
            >
              <q-item-section>
                <q-item-label style="font-size: 15px" side bottom
                  >Resultados acumulados</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.resultadosAcu }}
                      <q-popup-edit v-model="this.resultadosAcu">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-show="
                this.resultadosPresEjer !== 0 || this.resultadosPresEjer == 0
              "
            >
              <q-item-section>
                <q-item-label style="font-size: 15px"
                  >Resultados del presente ejercicio</q-item-label
                >
              </q-item-section>
              <q-item-section side top style="border-bottom: 5px, black, solid">
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.resultadosPresEjer }}
                      <q-popup-edit v-model="this.resultadosPresEjer">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <!---Estado de Resultados--->
        <div class="q-pa-md" style="margin: 50px;" id="content2" v-show="this.mostrarFormulario">
          <q-list>
            <q-item  style="background-color: #82E082">
              <q-item-section>
                <q-item-label style="font-weight: bold; font-size: 18px"
                  >INGRESOS</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item
              v-show="
                this.ingresosporventas !== 0 || this.ingresosporventas == 0
              "
            >
              <q-item-section>
                <q-item-label style="font-size: 15px"
                  >Ingresos por ventas</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.ingresosporventas }}
                      <q-popup-edit v-model="this.ingresosporventas">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-show="this.costodeventas !== 0 || this.costodeventas == 0"
            >
              <q-item-section>
                <q-item-label style="font-size: 15px"
                  >Costos de ventas</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.costodeventas }}
                      <q-popup-edit v-model="this.costodeventas">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-list>
            <q-item style="background-color: #F79C7E">
              <q-item-section>
                <q-item-label style="font-weight: bold; font-size: 18px"
                  >GASTOS DE OPERACION</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item v-show="this.gastosAdmin !== 0 || this.gastosAdmin == 0">
              <q-item-section>
                <q-item-label style="font-size: 15px"
                  >Gastos de administración</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.gastosAdmin }}
                      <q-popup-edit v-model="this.gastosAdmin">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-show="this.gastosVentas !== 0 || this.gastosVentas == 0">
              <q-item-section>
                <q-item-label style="font-size: 15px"
                  >Gastos de ventas</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.gastosVentas }}
                      <q-popup-edit v-model="this.gastosVentas">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-list>
            <q-item style="background-color: #A5ADE0">
              <q-item-section>
                <q-item-label style="font-weight: bold; font-size: 18px"
                  >OTROS GASTOS</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-show="this.otrosIngresNetos !== 0 || this.otrosIngresNetos == 0"
            >
              <q-item-section>
                <q-item-label style="font-size: 15px"
                  >Otros ingresos Netos</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.otrosIngresNetos }}
                      <q-popup-edit v-model="this.otrosIngresNetos">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-show="this.otrosGasNetos !== 0 || this.otrosGasNetos == 0"
            >
              <q-item-section>
                <q-item-label style="font-size: 15px"
                  >Otros gastos netos</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.otrosGasNetos }}
                      <q-popup-edit v-model="this.otrosGasNetos">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-show="this.gastosFinan !== 0 || this.gastosFinan == 0">
              <q-item-section>
                <q-item-label style="font-size: 15px"
                  >Gastos financieros</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.gastosFinan }}
                      <q-popup-edit v-model="this.gastosFinan">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-show="this.ingresosFinan == 0 || this.ingresosFinan !==0"
            >
              <q-item-section>
                <q-item-label style="font-size: 15px"
                  >Ingresos financieros</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.ingresosFinan }}
                      <q-popup-edit v-model="this.ingresosFinan">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <hr>
          <q-list v-show="this.reservaLegalES !== 0 || this.reservaLegalES == 0">
            <q-item>
              <q-item-section>
                <q-item-label style="font-size: 15px"
                  >Reserva Legal</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.reservaLegalES }}
                      <q-popup-edit v-model="this.reservaLegalES">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-list
            v-show="
              this.impuestosSobreRentaES !== 0 || this.impuestosSobreRenta == 0
            "
          >
            <q-item>
              <q-item-section>
                <q-item-label style="font-size: 15px"
                  >Impuesto sobre la renta Corriente</q-item-label
                >
              </q-item-section>
              <q-item-section side top>
                <q-item-label>
                  <div class="q-pa-md">
                    <div class="cursor-pointer">
                      {{ this.impuestosSobreRentaES }}
                      <q-popup-edit v-model="this.impuestosSobreRentaES">
                        <template v-slot="scope">
                          <q-input
                            autofocus
                            dense
                            v-model="scope.value"
                            type="number"
                          >
                            <template v-slot:after>
                              <q-btn
                                flat
                                dense
                                color="negative"
                                icon="cancel"
                                @click.stop="scope.cancel"
                              />

                              <q-btn
                                flat
                                dense
                                color="positive"
                                icon="check_circle"
                                @click.stop="scope.set"
                                :disable="
                                  scope.validate(scope.value) === false ||
                                  scope.initialValue === scope.value
                                "
                              />
                            </template>
                          </q-input>
                        </template>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-12" style="margin-top: 30px">
          <div class="q-pa-md q-gutter-sm" style="text-align: right">
            <q-form>
              <div>
                <q-btn
                  @click="this.retrocederFormulario"
                  v-show="this.mostrarFormulario"
                  label="Retroceder"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
                <q-btn
                  @click="this.siguiente"
                  label="siguiente"
                  v-show="!this.mostrarFormulario"
                  type="submit"
                  color="primary"
                />
                <q-btn
                  @click="this.guardar"
                  v-show="this.mostrarFormulario"
                  label="guardar"
                  type="submit"
                  color="primary"
                />
                <q-btn
                  @click="this.cancelarFormulario"
                  label="Cancelar"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
              </div>
            </q-form>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </q-page>
</template>

<script>
import { db } from "boot/firebase";
import { ref } from "vue";
export default {
  name: "CrearNuevoPeriodo",
  data() {
    return {
      mostrarFormulario: false,
      formularioBalanceGeneral: false,
      text: "",
      ph: ref(""),
      dense: ref(false),
      periodo: [],
      id: String,
      cargandoDatos: true,
      llaveCargandoDatos: false,
      verEstado: false,
      link: "inbox",
      //Notificacion
      dialog: false,
      position: "top",
      addEstadoFinanciero: "",
      // Datos a mostrar
      anio: 0,
      anioValido: false,
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
      impuestosSobreRentaES: 0,
      ingresosporventas: 0,
      ingresosFinan: 0,
      otrosGasNetos: 0,
      otrosIngresNetos: 0,
      reservaLegalES: 0,
      utilidadbruta: 0,
      utilidadneta: 0,
      utilidadoperativa: 0,
      utilidadantesreserva: 0,
    };
  },
  methods: {
    open(position) {
            this.position = position
            this.dialog = true
        },
        ocultarDialogo() {
            this.dialog = false
          },
    siguiente() {
        this.mostrarFormulario = !this.mostrarFormulario;

    },
    guardar(){
      this.crearBG()
    },
    retrocederFormulario() {
      // Limpiamos todas las variables
      this.mostrarFormulario = false;
    },
    cancelarFormulario(){
      this.mostrarFormulario = false;
      this.estadoForm = "Siguiente";
      this.addEstadoFinanciero = "Periodo Cancelado";
      this.text = "";
      this.open('top')
      this.icon = '';
      //activos
      this.efectivo= parseFloat(0);
      this.activosBiologicos = parseFloat(0);
      this.activosIntangibles = parseFloat(0);
      this.cuentasPC = parseFloat(0);
      this.depositosCortoP = parseFloat(0);
      this.gastosPagadosAnt = parseFloat(0);
      this.inventarios = parseFloat(0);
      this.inversionFinalLP = parseFloat(0);
      this.otrasCPC = parseFloat(0);
      this.propiedad = parseFloat(0);
      //pasivos
      this.CPPRelacionadasLP = parseFloat(0);
      this.cuentasPP = parseFloat(0);
      this.cuentasPPRelacionadas = parseFloat(0);
      this.gastosAcumulados = parseFloat(0);
      this.impuestosSobreRenta = parseFloat(0);
      this.obligacionesEmple = parseFloat(0);
      this.otrascuentasPP = parseFloat(0);
      //patrimonio
      this.capitalSocial = parseFloat(0);
      this.reservaLegal = parseFloat(0);
      this.resultadosAcu = parseFloat(0);
      this.resultadosPresEjer = parseFloat(0);
      //estado de resultados
      this.costodeventas = parseFloat(0);
      this.gastosAdmin = parseFloat(0);
      this.gastosFinan = parseFloat(0);
      this.gastosVentas = parseFloat(0);
      this.impuestosSobreRentaES = parseFloat(0);
      this.ingresosFinan = parseFloat(0);
      this.ingresosporventas = parseFloat(0);
      this.otrosGasNetos = parseFloat(0);
      this.otrosIngresNetos = parseFloat(0);
      this.reservaLegalES = parseFloat(0);

    },
    verificarAnio(){
      this.anio = parseFloat(this.periodo[0].anio)
    },
    verificarBalanceFinal() {
      const activoTotal =
        parseFloat(this.activosBiologicos) +
        parseFloat(this.activosIntangibles) +
        parseFloat(this.cuentasPC) +
        parseFloat(this.depositosCortoP) +
        parseFloat(this.efectivo) +
        parseFloat(this.gastosPagadosAnt) +
        parseFloat(this.inventarios) +
        parseFloat(this.inversionFinalLP) +
        parseFloat(this.otrasCPC) +
        parseFloat(this.propiedad);
      const patrimonio =
        parseFloat(this.capitalSocial) +
        parseFloat(this.capitalSocial) * 0.2 +
        parseFloat(this.resultadosAcu) +
        parseFloat(this.resultadosPresEjer) +
        parseFloat(this.impuestosSobreRenta) +
        parseFloat(this.obligacionesEmple) +
        parseFloat(this.otrascuentasPP);
      const pasivo =
        parseFloat(this.cuentasPP) +
        parseFloat(this.cuentasPPRelacionadas) +
        parseFloat(this.gastosAcumulados) +
        parseFloat(this.CPPRelacionadasLP);
      this.activoFinal = activoTotal.toFixed(2);
      this.pasivoPatriFinal = (patrimonio + pasivo).toFixed(2);
      this.reservaLegal = this.capitalSocial * 0.2;
      if (this.activoFinal > this.pasivoPatriFinal) {
        console.log(this.activoTotalCopia);
        console.log(this.activoFinal);
        this.sumres = "Diferencia:";
        this.lugarsumres = "";
        this.diferencia = (activoTotal - pasivo - patrimonio).toFixed(2);
      } else {
        this.sumres = "Diferencia:";
        this.lugarsumres = "";
        this.diferencia =
          (pasivo * 1000 + patrimonio * 1000 - activoTotal * 1000) / 1000;
      }
    },
    crearBG() {
      const activoTotal =
        parseFloat(this.activosBiologicos) +
        parseFloat(this.activosIntangibles) +
        parseFloat(this.cuentasPC) +
        parseFloat(this.depositosCortoP) +
        parseFloat(this.efectivo) +
        parseFloat(this.gastosPagadosAnt) +
        parseFloat(this.inventarios) +
        parseFloat(this.inversionFinalLP) +
        parseFloat(this.otrasCPC) +
        parseFloat(this.propiedad);
      const patrimonio =
        parseFloat(this.capitalSocial) +
        parseFloat(this.capitalSocial) * 0.2 +
        parseFloat(this.resultadosAcu) +
        parseFloat(this.resultadosPresEjer) +
        parseFloat(this.impuestosSobreRenta) +
        parseFloat(this.obligacionesEmple) +
        parseFloat(this.otrascuentasPP);
      const pasivo =
        parseFloat(this.cuentasPP) +
        parseFloat(this.cuentasPPRelacionadas) +
        parseFloat(this.gastosAcumulados) +
        parseFloat(this.CPPRelacionadasLP);
      const paspat = patrimonio + pasivo;
      this.verificarBalanceFinal();
      if (activoTotal === paspat) {
        this.reservaLegal = this.capitalSocial * 0.2;
        db.collection("periodos").add({
            anio: this.anio.toString(),
            balancegeneral: {
              activos: {
                activosBiologicos: this.activosBiologicos.toString(),
                activosIntangibles: this.activosIntangibles.toString(),
                cuentasPC: this.cuentasPC.toString(),
                depositosCortoP: this.depositosCortoP.toString(),
                efectivo: this.efectivo.toString(),
                gastosPagadosAnt: this.gastosPagadosAnt.toString(),
                inventarios: this.inventarios.toString(),
                inversionFinalLP: this.inversionFinalLP.toString(),
                otrasCPC: this.otrasCPC.toString(),
                propiedad: this.propiedad.toString(),
              },
              pasivos: {
                CPPRelacionadasLP: this.CPPRelacionadasLP.toString(),
                cuentasPP: this.cuentasPP.toString(),
                cuentasPPRelacionadas: this.cuentasPPRelacionadas.toString(),
                gastosAcumulados: this.gastosAcumulados.toString(),
                impuestosSobreRenta: this.impuestosSobreRenta.toString(),
                obligacionesEmple: this.obligacionesEmple.toString(),
                otrascuentasPP: this.otrascuentasPP.toString(),
              },
              patrimonio: {
                capitalSocial: this.capitalSocial.toString(),
                reservaLegal: this.reservaLegal.toString(),
                resultadosAcu: this.resultadosAcu.toString(),
                resultadosPresEjer: this.resultadosPresEjer.toString(),
              },
            },
            estadoresultados: {
              costodeventas: this.costodeventas.toString(),
              gastosAdmin: this.gastosAdmin.toString(),
              gastosFinan: this.gastosFinan.toString(),
              ingresosFinan: this.ingresosFinan.toString(),
              gastosVentas: this.gastosVentas.toString(),
              impuestosSobreRentaES: this.impuestosSobreRentaES.toString(),
              ingresosporventas: this.ingresosporventas.toString(),
              otrosGasNetos: this.otrosGasNetos.toString(),
              otrosIngresNetos: this.otrosIngresNetos.toString(),
              reservaLegalES: this.reservaLegalES.toString(),
          },
          })
          .then(() => {
            console.log("Document successfully updated!");
            this.addEstadoFinanciero = "Periodo Agregado";
            this.open('top');
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      } else {
        console.log("No esta equilibrado");
        this.addEstadoFinanciero = "El balance no esta equilibrado";
        this.open('top');
      }
    },
  },
};
</script>
