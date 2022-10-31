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

        <div class="q-pa-md" id="content1" v-show="!this.mostrarFormulario">
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
        <h4 v-show="!this.mostrarFormulario">Balance General</h4>
        <h4 v-show="this.mostrarFormulario">Estado de Resultados</h4>
        <div class="q-pa-md" id="content1" v-show="!this.mostrarFormulario">
          <q-list>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label style="font-weight: bold; font-size: 22px"
                    >Activo</q-item-label
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
            <q-item>
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
            <q-item>
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
        <div class="q-pa-md" id="content2" v-show="this.mostrarFormulario">
          <q-list>
            <q-item>
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
            <q-item>
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
            <q-item>
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
            <q-form
              @reset="this.cancelarFormulario"
              class="q-gutter-md"
            >
              <div>
                <q-btn
                  @click="this.siguiente"
                  :label="this.estadoForm"
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
      estadoForm: "Siguiente",
      periodo: [],
      id: String,
      cargandoDatos: true,
      llaveCargandoDatos: false,
      verEstado: false,
      link: "inbox",
      //Notificacion
      dialog: false,
      position: "top",
      cambioEstadoFinanciero: "",
      // Datos a mostrar
      anio: 0,
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
    siguiente() {
      if (this.formularioBalanceGeneral === false) {
        // Aca solo entra la primera vez al darle siguieente
        // estando en el Balance General
        this.formularioBalanceGeneral = true;
        this.estadoForm = "Guardar";
        this.mostrarFormulario = !this.mostrarFormulario;
      } else {
        // AQUI vas a enviar todo a firebase
        this.crearBG()
      }
    },
    cancelarFormulario() {
      // Limpiamos todas las variables
      this.mostrarFormulario = false;
      this.formularioBalanceGeneral = false;
      this.estadoForm = "Siguiente";
      this.text = "";
    },
    generarOperaciones() {
      // Activos
      this.efectivo = parseFloat(
        this.periodo[0].balancegeneral.activos.efectivo
      );
      this.cuentasPC = parseFloat(
        this.periodo[0].balancegeneral.activos.cuentasPC
      );
      this.otrasCPC = parseFloat(
        this.periodo[0].balancegeneral.activos.otrasCPC
      );
      this.inventarios = parseFloat(
        this.periodo[0].balancegeneral.activos.inventarios
      );
      this.gastosPagadosAnt = parseFloat(
        this.periodo[0].balancegeneral.activos.gastosPagadosAnt
      );
      this.depositosCortoP = parseFloat(
        this.periodo[0].balancegeneral.activos.depositosCortoP
      );
      // No Corrientes
      this.propiedad = parseFloat(
        this.periodo[0].balancegeneral.activos.propiedad
      );
      this.activosIntangibles = parseFloat(
        this.periodo[0].balancegeneral.activos.activosIntangibles
      );
      this.activosBiologicos = parseFloat(
        this.periodo[0].balancegeneral.activos.activosBiologicos
      );
      this.inversionFinalLP = parseFloat(
        this.periodo[0].balancegeneral.activos.inversionFinalLP
      );
      // PASIVOS
      // Corrientes
      this.cuentasPP = parseFloat(
        this.periodo[0].balancegeneral.pasivos.cuentasPP
      );
      this.cuentasPPRelacionadas = parseFloat(
        this.periodo[0].balancegeneral.pasivos.cuentasPPRelacionadas
      );
      this.otrascuentasPP = parseFloat(
        this.periodo[0].balancegeneral.pasivos.otrascuentasPP
      );
      this.obligacionesEmple = parseFloat(
        this.periodo[0].balancegeneral.pasivos.obligacionesEmple
      );
      this.impuestosSobreRenta = parseFloat(
        this.periodo[0].balancegeneral.pasivos.impuestosSobreRenta
      );
      this.gastosAcumulados = parseFloat(
        this.periodo[0].balancegeneral.pasivos.gastosAcumulados
      );
      // No corrientes
      this.CPPRelacionadasLP = parseFloat(
        this.periodo[0].balancegeneral.pasivos.CPPRelacionadasLP
      );
      // PATRIMONIO
      //
      this.capitalSocial = parseFloat(
        this.periodo[0].balancegeneral.patrimonio.capitalSocial
      );
      this.reservaLegal = parseFloat(
        this.periodo[0].balancegeneral.patrimonio.reservaLegal
      );
      this.resultadosAcu = parseFloat(
        this.periodo[0].balancegeneral.patrimonio.resultadosAcu
      );
      this.resultadosPresEjer = parseFloat(
        this.periodo[0].balancegeneral.patrimonio.resultadosPresEjer
      );
    },
    generarOperacionesER() {
      //
      this.costodeventas = parseFloat(
        this.periodo[0].estadoresultados.costodeventas
      );
      this.gastosAdmin = parseFloat(
        this.periodo[0].estadoresultados.gastosAdmin
      );
      this.gastosFinan = parseFloat(
        this.periodo[0].estadoresultados.gastosFinan
      );
      this.gastosVentas = parseFloat(
        this.periodo[0].estadoresultados.gastosVentas
      );
      this.impuestosSobreRentaES = parseFloat(
        this.periodo[0].estadoresultados.impuestosSobreRentaES
      );
      this.ingresosporventas = parseFloat(
        this.periodo[0].estadoresultados.ingresosporventas
      );
      this.otrosGasNetos = parseFloat(
        this.periodo[0].estadoresultados.otrosGasNetos
      );
      this.otrosIngresNetos = parseFloat(
        this.periodo[0].estadoresultados.otrosIngresNetos
      );
      this.reservaLegalES = parseFloat(
        this.periodo[0].estadoresultados.reservaLegalES
      );
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
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      } else {
        console.log("No esta equilibrado");
        this.noestaequilibrado = true;
      }
    },
  },
};
</script>
