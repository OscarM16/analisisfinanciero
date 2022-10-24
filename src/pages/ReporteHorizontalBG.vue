<template>
  <q-page class="q-pa-md">
      <div class="row" v-show="this.cargandoDatos">
          <div class="col items-center" style="justify-content: center; margin-top: 150px;">
              <div class="row justify-center">
                  <q-spinner-clock color="primary" size="25em" />
              </div>
          </div>
      </div>
      <div class="row-12 justify-center" v-show="!this.cargandoDatos">
        <q-btn round color="warning" icon="navigate_before" @click="anteriorPagina()" size="25px" style="position: absolute; top: 50px; left: 30px;"></q-btn>
        <h3 style="text-align: center; font-weight: bold;">Reporte Horizontal del Balance General </h3>
        <h3 style="text-align: center; font-weight: bold;">del Año {{this.$route.params.anioactual}}</h3>

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
                          <h6 v-if="this.anioComparado !== '' " style="text-align: center; margin-top: 5px; margin-bottom: 8px;">Análisis Horizontal del Balance General del año {{this.$route.params.anioactual}} y {{anioComparado}}</h6>
                          <h6 v-if="this.anioComparado === '' " style="text-align: center; margin-top: 5px; margin-bottom: 8px;">Análisis Horizontal del Balance General del año {{this.$route.params.anioactual}}</h6>
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
                                      <q-item-label style="font-weight: bold; font-size: 22px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; font-size: 22px; padding-left: 120px;">{{this.$route.params.anioactual}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; font-size: 22px; padding-left: 120px;">{{anioComparado}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-show="this.anioComparado !== ''" style="font-weight: bold; font-size: 22px; padding-left: 120px;">Variación Absoluto</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-show="this.anioComparado !== ''" style="font-weight: bold; font-size: 22px; padding-left: 120px;">Variación relativa</q-item-label>
                                  </q-item-section>
                              </q-item>
                              <hr>
                              <q-item style="background-color: #82E082">
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; font-size: 22px;">Activo</q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item>
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; text-decoration: underline; font-size: 18px;">Corriente</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; font-size: 16px; color: black; padding-left: 120px;">{{this.totalActivoCorriente}}</q-item-label>
                                  </q-item-section>
                                   <q-item-section>
                                      <q-item-label v-show="this.anioComparado !== ''" style="font-weight: bold; font-size: 16px; padding-left: 120px;">{{this.CtotalActivoCorriente}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-show="this.anioComparado !== ''" style="font-weight: bold; font-size: 16px; color: black; padding-left: 120px;">{{this.VAtotalactivocorriente.toLocaleString("en")}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-show="this.anioComparado !== ''"  style="font-weight: bold; font-size: 16px; padding-left: 120px;">{{this.VAtotalactivocorrienteporcentaje.toLocaleString("en")}}%</q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="((this.efectivo !== 0) || (this.Cefectivo !== 0))">
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Efectivo y equivalentes al efectivo</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 120px;">{{this.efectivo.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.Cefectivo !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.Cefectivo.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style=" padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.Cefectivo !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAefectivo.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style=" padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.Cefectivo !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAefectivoporcentaje.toLocaleString("en")}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style=" padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="((this.cuentasPC !== 0) || (this.CcuentasPC !== 0))">
                                  <q-item-section>
                                      <q-item-label style="font-size: 15px;">Cuentas por cobrar a partes relacionadas</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 120px;">{{this.cuentasPC.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CcuentasPC !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.CcuentasPC.toLocaleString("en")}}</q-item-label>
                                    <q-item-label v-if="this.anioComparado == ''" style=" padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CcuentasPC !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAcuentasPC.toLocaleString("en")}}</q-item-label>
                                    <q-item-label v-if="this.anioComparado == ''" style="padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CcuentasPC !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAcuentasPCporcentaje}}%</q-item-label>
                                    <q-item-label v-if="this.anioComparado == ''" style=" padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="((this.otrasCPC !== 0) || (this.CotrasCPC !== 0))">
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Otras cuentas por cobrar</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 120px;">{{this.otrasCPC.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CotrasCPC !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.CotrasCPC.toLocaleString("en")}}</q-item-label>
                                    <q-item-label v-if="this.anioComparado == ''" style=" padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CotrasCPC !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAotrasCPC.toLocaleString("en")}}</q-item-label>
                                    <q-item-label v-if="this.anioComparado == ''" style=" padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CotrasCPC !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAotrasCPCporcentaje}}%</q-item-label>
                                    <q-item-label v-if="this.anioComparado == ''" style=" padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="((this.depositosCortoP !== 0) || (this.CdepositosCortoP !==0))">
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Dépositos a corto plazo</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 120px;">{{this.depositosCortoP.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CdepositosCortoP !== 0 || this.anioComparado !== ''" style=" padding-left: 120px;">{{this.CdepositosCortoP.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style=" padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CdepositosCortoP !== 0 || this.anioComparado !== ''" style=" padding-left: 120px;">{{this.VAdepositosCortoP.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style=" padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CdepositosCortoP !== 0 || this.anioComparado !== ''" style=" padding-left: 120px;">{{this.VAdepositosCortoPporcentaje}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style=" padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="((this.inventarios !== 0) || (this.Cinventarios !== 0))">
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Inventarios</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 120px;">{{this.inventarios.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.Cinventarios !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.Cinventarios.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style=" padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.Cinventarios !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAinventarios.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style=" padding-left: 200px;"></q-item-label>
                                    </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.Cinventarios !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAinventariosporcentaje}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style=" padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="((this.gastosPagadosAnt !== 0) || (this.CgastosPagadosAnt !== 0))">
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Gastos pagados por anticipado</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 120px;">{{this.gastosPagadosAnt.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CgastosPagadosAnt !== 0 || this.anioComparado !== ''" style=" padding-left: 120px;">{{this.CgastosPagadosAnt.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style=" padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CgastosPagadosAnt !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAgastosPagadosAnt.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style=" padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CgastosPagadosAnt !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAgastosPagadosAntporcentaje}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style=" padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                          </q-list>
                          <!--  FIN CORRIENTE-->
                          <!--No corriente-->
                          <q-list v-show="this.totalAcrivoNoCorriente !== '0'">
                              <q-item>
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; text-decoration: underline; font-size: 18px;">No Corriente</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; font-size: 16px; color: black; padding-left: 120px;">{{this.totalAcrivoNoCorriente}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-show="this.anioComparado !== ''" style="font-weight: bold; font-size: 16px; padding-left: 120px;">{{this.CtotalAcrivoNoCorriente}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-show="this.anioComparado !== ''" style="font-weight: bold; font-size: 16px; padding-left: 120px;">{{this.VAtotalAcrivoNoCorriente.toLocaleString("en")}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-show="this.anioComparado !== ''"  style="font-weight: bold; font-size: 16px; padding-left: 120px;">{{this.VAtotalAcrivoNoCorrienteporcentaje.toLocaleString("en")}}%</q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="((this.propiedad !== 0) || (this.Cpropiedad !== 0))">
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Propiedad, planta y equipo (neto)</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 120px;">{{this.propiedad.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.Cpropiedad !== 0 || this.anioComparado !== ''" style=" padding-left: 120px;">{{this.Cpropiedad.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style=" padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.Cpropiedad !== 0 || this.anioComparado !== ''" style=" padding-left: 120px;">{{this.VApropiedad.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style=" padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.Cpropiedad !== 0 || this.anioComparado !== ''" style=" padding-left: 120px;">{{this.VApropiedadporcentaje}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style=" padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="((this.activosIntangibles !== 0) || (this.CactivosIntangibles !== 0))">
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Activos intangibles</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 120px;">{{this.activosIntangibles.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CactivosIntangibles !== 0 || this.anioComparado !== ''" style=" padding-left: 120px;">{{this.CactivosIntangibles.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style=" padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CactivosIntangibles !== 0 || this.anioComparado !== ''" style=" padding-left: 120px;">{{this.VAactivosIntangibles.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style=" padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CactivosIntangibles !== 0 || this.anioComparado !== ''" style=" padding-left: 120px;">{{this.VAactivosIntangiblesporcentaje}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style=" padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="((this.activosBiologicos !== 0)|| (this.CactivosBiologicos !== 0))">
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Activos Biologicos</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 120px;">{{this.activosBiologicos.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CactivosBiologicos !== 0 || this.anioComparado !== ''" style=" padding-left: 120px;">{{this.CactivosBiologicos.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CactivosBiologicos !== 0 || this.anioComparado !== ''" style=" padding-left: 120px;">{{this.VAactivosBiologicos.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CactivosBiologicos !== 0 || this.anioComparado !== ''" style=" padding-left: 120px;">{{this.VAactivosBiologicosporcentaje.toLocaleString('en')}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="((this.inversionFinalLP !== 0) || (this.CinversionFinalLP !== 0))">
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Inversiones financieras a largo plazo</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 120px;">{{this.inversionFinalLP.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CinversionFinalLP !== 0 || this.anioComparado !== ''" style=" padding-left: 120px;">{{this.CinversionFinalLP.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style=" padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CinversionFinalLP !== 0 || this.anioComparado !== ''" style=" padding-left: 120px;">{{this.VAinversionFinalLP.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CinversionFinalLP !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAinversionFinalLPporcentaje}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                          </q-list>
                          <!-- Activo TOTAL-->
                          <q-list>
                              <q-item>
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; font-size: 18px;">Activo Total</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; font-size: 18px; text-decoration: underline; color: black;padding-left: 120px;">{{this.totalActivo}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-show="this.anioComparado !== ''" style="font-weight: bold; font-size: 18px;  text-decoration: underline; color: black; padding-left: 120px;">{{this.CtotalActivo}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-show="this.anioComparado !== ''" style="font-weight: bold; font-size: 18px;  text-decoration: underline; color: black; padding-left: 120px;">{{this.VAtotalActivo.toLocaleString("en")}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-show="this.anioComparado !== ''" style="font-weight: bold; font-size: 18px;  text-decoration: underline; color: black; padding-left: 120px;">{{this.VAtotalActivoporcentaje.toLocaleString("en")}}%</q-item-label>
                                  </q-item-section>
                              </q-item>
                          </q-list>
                          <hr>
                          <!--PASIVOS -->
                          <q-list>
                              <q-item style="background-color: #F79C7E">
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; font-size: 22px;">Pasivos</q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item>
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; text-decoration: underline; font-size: 18px;">Corriente</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; font-size: 16px; color: black; padding-left: 120px;">{{this.totalPasivoCorriente}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-show="this.anioComparado !==''" style="font-weight: bold; font-size: 16px; color: black; padding-left: 120px;">{{this.CtotalPasivoCorriente}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-show="this.anioComparado !==''" style="font-weight: bold; font-size: 16px; color: black; padding-left: 120px;">{{this.VAtotalPasivoCorriente.toLocaleString("en")}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-show="this.anioComparado !==''" style="font-weight: bold; font-size: 16px; color: black; padding-left: 120px;">{{this.VAtotalPasivoCorrienteporcentaje.toLocaleString("en")}}%</q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="this.cuentasPP !== 0 || this.CcuentasPP !== 0">
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Cuentas por pagar a corto plazo</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 120px;">{{this.cuentasPP.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CcuentasPP !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.CcuentasPP.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CcuentasPP !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAcuentasPP.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CcuentasPP !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAcuentasPPporcentaje}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="this.cuentasPPRelacionadas !== 0 || this.CcuentasPPRelacionadas !== 0">
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Cuentas por pagar partes relacionadas a corto plazo</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 120px;">{{this.cuentasPPRelacionadas.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CcuentasPPRelacionadas !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.CcuentasPPRelacionadas.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CcuentasPPRelacionadas !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAcuentasPPRelacionadas.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CcuentasPPRelacionadas !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAcuentasPPRelacionadasporcentaje}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="this.gastosAcumulados !== 0 || this.CgastosAcumulados !== 0">
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Gastos acumulados</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 120px;">{{this.gastosAcumulados.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CgastosAcumulados !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.CgastosAcumulados.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CgastosAcumulados !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAgastosAcumulados.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CgastosAcumulados !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAgastosAcumuladosporcentaje}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="this.otrascuentasPP !== 0 || this.CotrascuentasPP !== 0">
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Otras cuentas por pagar a corto plazo</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 120px;">{{this.otrascuentasPP.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CotrascuentasPP !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.CotrascuentasPP.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CotrascuentasPP !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAotrascuentasPP.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CotrascuentasPP !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAotrascuentasPPporcentaje}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="this.obligacionesEmple !== 0 || this.CobligacionesEmple !== 0">
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Obligaciones a corto plazo por beneficios a empleados</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 120px;">{{this.obligacionesEmple.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CobligacionesEmple !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.CobligacionesEmple.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CobligacionesEmple !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAobligacionesEmple.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CobligacionesEmple !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAobligacionesEmpleporcentaje}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="this.impuestosSobreRenta !== 0 || this.CimpuestosSobreRenta !== 0">
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Impuesto sobre la renta por pagar</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 120px;">{{this.impuestosSobreRenta.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CimpuestosSobreRenta !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.CimpuestosSobreRenta.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CimpuestosSobreRenta !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAimpuestosSobreRenta.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CimpuestosSobreRenta !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAimpuestosSobreRentaporcentaje}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                          </q-list>
                          <!--PASIOSVOS NO CORRINETES-->
                          <q-list v-show="this.totalPasivoNoCorriente !== '0'">
                              <q-item>
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; text-decoration: underline; font-size: 18px;">No Corriente</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; font-size: 16px;  color: black; padding-left: 120px;">{{this.totalPasivoNoCorriente}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CtotalPasivoNoCorriente !== 0 || this.anioComparado !== ''" style=" font-weight: bold; font-size: 16px; color: black;  padding-left: 120px;">{{this.CtotalPasivoNoCorriente.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style=" font-weight: bold; font-size: 16px; color: black ; padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CtotalPasivoNoCorriente !== 0 || this.anioComparado !== ''" style=" font-weight: bold; font-size: 16px; color: black;  padding-left: 120px;">{{this.VAtotalPasivoNoCorriente.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style=" font-weight: bold; font-size: 16px; color: black ; padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CtotalPasivoNoCorriente !== 0 || this.anioComparado !== ''" style=" font-weight: bold; font-size: 16px; color: black; padding-left: 120px;">{{this.VAtotalPasivoNoCorrienteporcentaje}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style=" font-weight: bold; font-size: 16px; color: black; padding-left: 120px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="this.CPPRelacionadasLP !== 0 || this.CCPPRelacionadasLP !== 0">
                                  <q-item-section>
                                      <q-item-label style="font-size: 15px;">Cuentas por pagar partes relacionadas de Largo Plazo</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 120px;">{{this.CPPRelacionadasLP.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CCPPRelacionadasLP !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.CCPPRelacionadasLP.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CCPPRelacionadasLP !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VACPPRelacionadasLP.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CCPPRelacionadasLP !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VACPPRelacionadasLPporcentaje}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                          </q-list>
                          <!-- PASIVO TOTAL-->
                          <q-list>
                              <q-item>
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; font-size: 18px;">Pasivo Total</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; font-size: 18px; text-decoration: underline; color: black; padding-left: 120px;">{{this.totalPasivo}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.anioComparado !== ''" style="font-weight: bold; font-size: 18px; text-decoration: underline; color: black; padding-left: 120px;">{{this.CtotalPasivo.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.anioComparado !== ''" style="font-weight: bold; font-size: 18px; text-decoration: underline; color: black; padding-left: 120px;">{{this.VAtotalPasivo.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.anioComparado !== ''" style="font-weight: bold; font-size: 18px; text-decoration: underline; color: black; padding-left: 120px;">{{this.VAtotalPasivoporcentaje}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                          </q-list>
                          <hr>
                          <!--PATRIMONIO-->
                          <q-list>
                              <q-item style="background-color: #A5ADE0">
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; font-size: 22px;">Patrimonio</q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="this.capitalSocial !== 0 || this.CcapitalSocial !== 0">
                                  <q-item-section>
                                      <q-item-label style="font-size: 15px;">Capital Social</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 120px;">{{this.capitalSocial.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CcapitalSocial !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.CcapitalSocial.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CcapitalSocial !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAcapitalSocial.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CcapitalSocial !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAcapitalSocialporcentaje}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="this.reservaLegal !== 0 || this.CreservaLegal !== 0">
                                  <q-item-section>
                                      <q-item-label style="font-size: 15px;">Reserva Legal</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 120px;">{{this.reservaLegal.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CreservaLegal !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.CreservaLegal.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CreservaLegal !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAreservaLegal.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CreservaLegal !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAreservaLegalporcentaje}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="this.resultadosAcu !== 0 || this.CresultadosAcu !== 0">
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;" side bottom>Resultados acumulados</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 120px;">{{this.resultadosAcu.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CresultadosAcu !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.CresultadosAcu.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CresultadosAcu !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAresultadosAcu.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CresultadosAcu !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAresultadosAcuporcentaje}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="this.resultadosPresEjer !== 0 || this.CresultadosPresEjer !== 0">
                                  <q-item-section>
                                      <q-item-label style="font-size: 15px;">Resultados del presente ejercicio</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 120px;">{{this.resultadosPresEjer.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CresultadosPresEjer !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.CresultadosPresEjer.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CresultadosPresEjer !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAresultadosPresEjer.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CresultadosPresEjer !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAresultadosPresEjerporcentaje}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item>
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; font-size: 18px;">Patrimonio Total</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; font-size: 18px; text-decoration: underline; color: black; padding-left: 120px;">{{this.totalPatrimonio}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CtotalPatrimonio !== 0 || this.anioComparado !== ''" style=" font-weight: bold; font-size: 18px; text-decoration: underline; color: black; padding-left: 120px;">{{this.CtotalPatrimonio.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CtotalPatrimonio !== 0 || this.anioComparado !== ''" style=" font-weight: bold; font-size: 18px; text-decoration: underline; color: black; padding-left: 120px;">{{this.VAtotalPatrimonio.toLocaleString("en")}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CtotalPatrimonio !== 0 || this.anioComparado !== ''" style="font-weight: bold; font-size: 18px; text-decoration: underline; color: black; padding-left: 120px;">{{this.VAtotalPatrimonioporcentaje}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 200px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                          </q-list>
                          <!-- Final-->
                          <hr>
                          <q-list>
                              <q-item>
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; font-size: 18px;">Total Pasivo y Patrimonio Total</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; font-size: 18px; text-decoration: underline; color: black; padding-left: 120px;">{{this.pasivoPatrimonio}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-show="this.anioComparado!==''"  style="font-weight: bold; font-size: 18px; text-decoration: underline; color: black; padding-left: 120px;">{{this.CpasivoPatrimonio}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-show="this.anioComparado!==''"  style="font-weight: bold; font-size: 18px; text-decoration: underline; color: black; padding-left: 120px;">{{this.VApasivoPatrimonio.toLocaleString("en")}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-show="this.anioComparado!==''" style="font-weight: bold; font-size: 22px;padding-left: 120px;">{{this.VApasivoPatrimonioporcentaje.toLocaleString("en")}}%</q-item-label>
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

              // Datos a mostrar del año comparado
              // ACTIVOS
              CtotalActivo: 0,
              CtotalActivoparapor: 0,
              CtotalActivoporcentaje: 0,

              CtotalActivoCorriente: 0,
              CtotalActivoCorrienteparapor: 0,
              CtotalActivoCorrienteporcentaje: 0,

              CtotalAcrivoNoCorriente: 0,
              CtotalAcrivoNoCorrienteparapor:0,
              CtotalAcrivoNoCorrienteporcentaje:0,
              // Corrientes
              Cefectivo: 0,
              Cefectivoporcentaje:0,
              CcuentasPC: 0,
              CcuentasPCporcentaje:0,
              CotrasCPC: 0,
              CotrasCPCporcentaje:0,
              Cinventarios: 0,
              Cinventariosporcentaje:0,
              CgastosPagadosAnt: 0,
              CgastosPagadosAntporcentaje:0,
              CdepositosCortoP: 0,
              CdepositosCortoPporcentaje:0,
              // No Corrientes
              Cpropiedad: 0,
              Cpropiedadporcentaje:0,
              CactivosIntangibles: 0,
              CactivosIntangiblesporcentaje: 0,
              CactivosBiologicos: 0,
              CactivosBiologicosporcentaje:0,
              CinversionFinalLP: 0,
              CinversionFinalLPporcentaje:0,
              // PASIVOS
              CtotalPasivo: 0,
              CtotalPasivoparaver:0,
              CtotalPasivoporcentaje:0,

              CtotalPasivoCorriente: 0,
              CtotalPasivoCorrienteparaver:0,
              CtotalPasivoCorrienteporcentaje:0,

              CtotalPasivoNoCorriente: 0,
              CtotalPasivoNoCorrienteparaver:0,
              CtotalPasivoNoCorrienteporcentaje:0,
              // Corrientes
              CcuentasPP: 0,
              CcuentasPPporcentaje:0,
              CcuentasPPRelacionadas: 0,
              CcuentasPPRelacionadasporcentaje:0,
              CotrascuentasPP: 0,
              CotrascuentasPPporcentaje:0,
              CobligacionesEmple: 0,
              CobligacionesEmpleporcentaje:0,
              CimpuestosSobreRenta: 0,
              CimpuestosSobreRentaporcentaje:0,
              CgastosAcumulados: 0,
              CgastosAcumuladosporcentaje:0,
              // No corrientes
              CCPPRelacionadasLP: 0,
              CCPPRelacionadasLPporcentaje:0,
              // PATRIMONIO
              CtotalPatrimonio: 0,
              CtotalPatrimonioparapor:0,
              CtotalPatrimonioporcentaje:0,
              //
              CcapitalSocial: 0,
              CcapitalSocialporcentaje:0,
              CreservaLegal: 0,
              CreservaLegalporcentaje:0,
              CresultadosAcu: 0,
              CresultadosAcuporcentaje:0,
              CresultadosPresEjer: 0,
              CresultadosPresEjerporcentaje:0,
              // FIn
              CpasivoPatrimonio: 0,
              // FIN DE DATOS DEL COMPARADO

              // Datos a mostrar actuales
              // ACTIVOS
              totalActivo: 0,
              totalActivoparapor: 0,
              totalActivoporcentaje: 0,

              totalActivoCorriente: 0,
              totalActivoCorrienteparapor: 0,
              totalActivoCorrienteporcentaje: 0,

              totalAcrivoNoCorriente: 0,
              totalAcrivoNoCorrienteparapor:0,
              totalAcrivoNoCorrienteporcentaje:0,
              // Corrientes
              efectivo: 0,
              efectivoporcentaje:0,
              cuentasPC: 0,
              cuentasPCporcentaje:0,
              otrasCPC: 0,
              otrasCPCporcentaje:0,
              inventarios: 0,
              inventariosporcentaje:0,
              gastosPagadosAnt: 0,
              gastosPagadosAntporcentaje:0,
              depositosCortoP: 0,
              depositosCortoPporcentaje:0,
              // No Corrientes
              propiedad: 0,
              propiedadporcentaje:0,
              activosIntangibles: 0,
              activosIntangiblesporcentaje: 0,
              activosBiologicos: 0,
              activosBiologicosporcentaje:0,
              inversionFinalLP: 0,
              inversionFinalLPporcentaje:0,
              // PASIVOS
              totalPasivo: 0,
              totalPasivoparapor: 0,
              totalPasivoporcentaje: 0,

              totalPasivoCorriente: 0,
              totalPasivoCorrienteparapor: 0,
              totalPasivoCorrienteporcentaje: 0,

              totalPasivoNoCorriente: 0,
              totalPasivoNoCorrienteparapor: 0,
              totalPasivoNoCorrienteporcentaje: 0,
              // Corrientes
              cuentasPP: 0,
              cuentasPPporcentaje: 0,
              cuentasPPRelacionadas: 0,
              cuentasPPRelacionadasporcentaje:0,
              otrascuentasPP: 0,
              otrascuentasPPporcentaje:0,
              obligacionesEmple: 0,
              obligacionesEmpleporcentaje:0,
              impuestosSobreRenta: 0,
              impuestosSobreRentaporcentaje: 0,
              gastosAcumulados: 0,
              gastosAcumuladosporcentaje:0,
              // No corrientes
              CPPRelacionadasLP: 0,
              CPPRelacionadasLPporcentaje:0,
              // PATRIMONIO
              totalPatrimonio: 0,
              totalPatrimonioparapor: 0,
              totalPatrimonioporcentaje:0,
              //
              capitalSocial: 0,
              capitalSocialporcentaje:0,
              reservaLegal: 0,
              reservaLegalporcentaje:0,
              resultadosAcu: 0,
              resultadosAcuporcentaje:0,
              resultadosPresEjer: 0,
              resultadosPresEjerporcentaje:0,
              // FIn
              pasivoPatrimonio: 0,

              // VALORES ABSOLUTOS
              VAtotalactivocorriente: 0,
              VAtotalactivocorrienteporcentaje: 0,

              VAefectivo:0,
              VAefectivoporcentaje:0,

              VAcuentasPC:0,
              VAcuentasPCporcentaje:0,

              VAotrasCPC:0,
              VAotrasCPCporcentaje:0,

              VAinventarios:0,
              VAinventariosporcentaje:0,

              VAgastosPagadosAnt:0,
              VAgastosPagadosAntporcentaje:0,

              VAdepositosCortoP:0,
              VAdepositosCortoPporcentaje:0,

              VAtotalAcrivoNoCorriente:0,
              VAtotalAcrivoNoCorrienteporcentaje:0,

              VApropiedad: 0,
              VApropiedadporcentaje:0,

              VAactivosIntangibles:0,
              VAactivosIntangiblesporcentaje:0,

              VAactivosBiologicos:0,
              VAactivosBiologicosporcentaje:0,

              VAinversionFinalLP:0,
              VAinversionFinalLPporcentaje:0,

              VAtotalActivo:0,
              VAtotalActivoporcentaje:0,

              VAtotalPasivoCorriente:0,
              VAtotalPasivoCorrienteporcentaje:0,

              VAcuentasPP:0,
              VAcuentasPPporcentaje:0,

              VAcuentasPPRelacionadas:0,
              VAcuentasPPRelacionadasporcentaje:0,

              VAgastosAcumulados:0,
              VAgastosAcumuladosporcentaje:0,

              VAotrascuentasPP:0,
              VAotrascuentasPPporcentaje:0,

              VAobligacionesEmple:0,
              VAobligacionesEmpleporcentaje:0,

              VAimpuestosSobreRenta:0,
              VAimpuestosSobreRentaporcentaje:0,

              VAtotalPasivoNoCorriente:0,
              VAtotalPasivoNoCorrienteporcentaje:0,

              VACPPRelacionadasLP:0,
              VACPPRelacionadasLP:0,

              VAtotalPasivo: 0,
              VAtotalPasivoporcentaje:0,

              VAcapitalSocial:0,
              VAcapitalSocialporcentaje:0,

              VAreservaLegal:0,
              VAreservaLegalporcentaje:0,

              VAresultadosAcu:0,
              VAresultadosAcuporcentaje:0,

              VAresultadosPresEjer:0,
              VAresultadosPresEjerporcentaje:0,

              VAtotalPatrimonio:0,
              VAtotalPatrimonioporcentaje:0,

              VApasivoPatrimonio:0,
              VApasivoPatrimonioporcentaje:0,
              // nombre del pdf

              nombredelPDF: "ReporteHorizontalBalanceGeneral",
              nombredelPDFbase: ""
          };
      },
      created() {
          this.id = this.$route.params.id
          this.listarPeriodoActual()
          this.listarPeriodos()
          this.anioActual = this.$route.params.anioactual
          this.nombredelPDF = "ReporteHorizontalBalanceGeneral" + this.$route.params.anioactual
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
              console.log(this.periodoComparar[0].informacion.balancegeneral)
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

              this.Cefectivo = 0
              this.Cefectivo = parseFloat(this.periodoComparar[0].informacion.balancegeneral.activos.efectivo)
              this.CcuentasPC = 0
              this.CcuentasPC = parseFloat(this.periodoComparar[0].informacion.balancegeneral.activos.cuentasPC)
              this.CotrasCPC= 0
              this.CotrasCPC = parseFloat(this.periodoComparar[0].informacion.balancegeneral.activos.otrasCPC)
              this.Cinventarios = 0
              this.Cinventarios = parseFloat(this.periodoComparar[0].informacion.balancegeneral.activos.inventarios)
              this.CgastosPagadosAnt = 0
              this.CgastosPagadosAnt = parseFloat(this.periodoComparar[0].informacion.balancegeneral.activos.gastosPagadosAnt)
              this.CdepositosCortoP = 0
              this.CdepositosCortoP = parseFloat(this.periodoComparar[0].informacion.balancegeneral.activos.depositosCortoP)

              this.CtotalActivoCorriente = 0
              this.CtotalActivoCorriente =  parseFloat(this.Cefectivo) + parseFloat(this.CcuentasPC) + parseFloat(this.CotrasCPC) + parseFloat(this.Cinventarios) + parseFloat(this.CgastosPagadosAnt) + parseFloat(this.CdepositosCortoP)

              this.Cpropiedad = 0
              this.Cpropiedad = parseFloat(this.periodoComparar[0].informacion.balancegeneral.activos.propiedad)
              this.CactivosIntangibles = 0
              this.CactivosIntangibles = parseFloat(this.periodoComparar[0].informacion.balancegeneral.activos.activosIntangibles)
              this.CactivosBiologicos = 0
              this.CactivosBiologicos = parseFloat(this.periodoComparar[0].informacion.balancegeneral.activos.activosBiologicos)
              this.CinversionFinalLP = 0
              this.CinversionFinalLP = parseFloat(this.periodoComparar[0].informacion.balancegeneral.activos.inversionFinalLP)

              this.CtotalActivoNoCorriente = 0
              this.CtotalAcrivoNoCorriente =  parseFloat(this.Cpropiedad) + parseFloat(this.CactivosIntangibles) + parseFloat(this.CactivosBiologicos) + parseFloat(this.CinversionFinalLP)

              this.CtotalActivo = 0
              this.CtotalActivo = parseFloat(this.CtotalActivoCorriente) + parseFloat(this.CtotalAcrivoNoCorriente)
              this.CtotalActivoparapor = 0
              this.CtotalActivoparapor =this.CtotalActivo
              this.CtotalActivo = this.CtotalActivo.toLocaleString('en');

              this.CtotalAcrivoNoCorrienteparapor = 0
              this.CtotalAcrivoNoCorrienteparapor =this.CtotalAcrivoNoCorriente
              this.CtotalAcrivoNoCorriente = this.CtotalAcrivoNoCorriente.toLocaleString('en');

              this.CtotalActivoCorrienteparapor = 0
              this.CtotalActivoCorrienteparapor =this.CtotalActivoCorriente
              this.CtotalActivoCorriente = this.CtotalActivoCorriente.toLocaleString('en');

              // Porcentajes activos
              //corriente
              this.CtotalActivoCorrienteporcentaje = (parseFloat(this.CtotalActivoCorrienteparapor)/parseFloat(this.CtotalActivoparapor))*100
              this.CtotalActivoCorrienteporcentaje = this.CtotalActivoCorrienteporcentaje.toFixed(2)
              this.Cefectivoporcentaje = (parseFloat(this.Cefectivo)/parseFloat(this.CtotalActivoparapor))*100
              this.Cefectivoporcentaje = this.Cefectivoporcentaje.toFixed(2)
              this.CcuentasPCporcentaje = (parseFloat(this.CcuentasPC)/parseFloat(this.CtotalActivoparapor))*100
              this.CcuentasPCporcentaje = this.CcuentasPCporcentaje.toFixed(2)
              this.CotrasCPCporcentaje = (parseFloat(this.CotrasCPC)/parseFloat(this.CtotalActivoparapor))*100
              this.CotrasCPCporcentaje = this.CotrasCPCporcentaje.toFixed(2)
              this.Cinventariosporcentaje = (parseFloat(this.Cinventarios)/parseFloat(this.CtotalActivoparapor))*100
              this.Cinventariosporcentaje = this.Cinventariosporcentaje.toFixed(2)
              this.CgastosPagadosAntporcentaje = (parseFloat(this.CgastosPagadosAnt)/parseFloat(this.CtotalActivoparapor))*100
              this.CgastosPagadosAntporcentaje = this.CgastosPagadosAntporcentaje.toFixed(2)
              this.CdepositosCortoPporcentaje = (parseFloat(this.CdepositosCortoP)/parseFloat(this.CtotalActivoparapor))*100
              this.CdepositosCortoPporcentaje = this.CdepositosCortoPporcentaje.toFixed(2)
              //no corriente
              this.CtotalAcrivoNoCorrienteporcentaje = (parseFloat(this.CtotalAcrivoNoCorrienteparapor)/parseFloat(this.CtotalActivoparapor))*100
              this.CtotalAcrivoNoCorrienteporcentaje = this.CtotalAcrivoNoCorrienteporcentaje.toFixed(2)
              this.Cpropiedadporcentaje = (parseFloat(this.Cpropiedad)/parseFloat(this.CtotalActivoparapor))*100
              this.Cpropiedadporcentaje = this.Cpropiedadporcentaje.toFixed(2)
              this.CactivosIntangiblesporcentaje = (parseFloat(this.CactivosIntangibles)/parseFloat(this.CtotalActivoparapor))*100
              this.CactivosIntangiblesporcentaje = this.CactivosIntangiblesporcentaje.toFixed(2)
              this.CactivosBiologicosporcentaje = (parseFloat(this.CactivosBiologicos)/parseFloat(this.CtotalActivoparapor))*100
              this.CactivosBiologicosporcentaje = this.CactivosBiologicosporcentaje.toFixed(2)
              this.CinversionFinalLPporcentaje = (parseFloat(this.CinversionFinalLP)/parseFloat(this.CtotalActivoparapor))*100
              this.CinversionFinalLPporcentaje = this.CinversionFinalLPporcentaje.toFixed(2)
              // porcentaje total final
              this.CtotalActivoporcentaje = parseFloat(this.CtotalAcrivoNoCorrienteporcentaje) + parseFloat(this.CtotalActivoCorrienteporcentaje)
              this.CtotalActivoporcentaje = this.CtotalActivoporcentaje.toFixed(0)
              // FIN DE ACTIVOS PORCENTAJES COMPARADOS

               // PASIVOS
              // Corrientes
              this.CcuentasPP = parseFloat(this.periodoComparar[0].informacion.balancegeneral.pasivos.cuentasPP)
              this.CcuentasPPRelacionadas = parseFloat(this.periodoComparar[0].informacion.balancegeneral.pasivos.cuentasPPRelacionadas)
              this.CotrascuentasPP = parseFloat(this.periodoComparar[0].informacion.balancegeneral.pasivos.otrascuentasPP)
              this.CobligacionesEmple = parseFloat(this.periodoComparar[0].informacion.balancegeneral.pasivos.obligacionesEmple)
              this.CimpuestosSobreRenta = parseFloat(this.periodoComparar[0].informacion.balancegeneral.pasivos.impuestosSobreRenta)
              this.CgastosAcumulados = parseFloat(this.periodoComparar[0].informacion.balancegeneral.pasivos.gastosAcumulados)
              // No corrientes
              this.CCPPRelacionadasLP = parseFloat(this.periodoComparar[0].informacion.balancegeneral.pasivos.CPPRelacionadasLP)
              // Total Pasivos
              this.CtotalPasivoCorriente = parseFloat(this.CcuentasPP) + parseFloat(this.CcuentasPPRelacionadas) + parseFloat(this.CotrascuentasPP) + parseFloat(this.CobligacionesEmple) + parseFloat(this.CimpuestosSobreRenta) + parseFloat(this.CgastosAcumulados)
              this.CtotalPasivoNoCorriente =  parseFloat(this.CCPPRelacionadasLP)
              this.CtotalPasivo = parseFloat(this.CtotalPasivoCorriente) + parseFloat(this.CtotalPasivoNoCorriente)
              this.CtotalPasivoparapor = this.CtotalPasivo
              this.CtotalPasivo = this.CtotalPasivo.toLocaleString("en")
              this.CtotalPasivoCorrienteparapor = this.CtotalPasivoCorriente
              this.CtotalPasivoCorriente = this.CtotalPasivoCorriente.toLocaleString('en');
              this.CtotalPasivoNoCorrienteparapor = this.CtotalPasivoNoCorriente
              this.CtotalPasivoNoCorriente = this.CtotalPasivoNoCorriente.toLocaleString('en');
              // PATRIMONIO
              //
              this.CcapitalSocial = parseFloat(this.periodoComparar[0].informacion.balancegeneral.patrimonio.capitalSocial)
              this.CreservaLegal = parseFloat(this.periodoComparar[0].informacion.balancegeneral.patrimonio.reservaLegal)
              this.CresultadosAcu = parseFloat(this.periodoComparar[0].informacion.balancegeneral.patrimonio.resultadosAcu)
              this.CresultadosPresEjer = parseFloat(this.periodoComparar[0].informacion.balancegeneral.patrimonio.resultadosPresEjer)
              // Total Patrimonio
              this.CtotalPatrimonio = parseFloat(this.CcapitalSocial) + parseFloat(this.CreservaLegal) + parseFloat(this.CresultadosAcu) + parseFloat(this.CresultadosPresEjer)
              this.CtotalPatrimonioparapor = this.CtotalPatrimonio
              this.CpasivoPatrimonio = parseFloat(this.CtotalPatrimonioparapor) + parseFloat(this.CtotalPasivoparapor)
              this.CpasivoPatrimonioparapor = this.CpasivoPatrimonio
              this.CtotalPatrimonio = this.CtotalPatrimonio.toLocaleString('en');
              this.CpasivoPatrimonio = this.CpasivoPatrimonio.toLocaleString('en');

              //Porcentajes pasivos COMPARADOS
              //corrientes
              this.CtotalPasivoCorrienteporcentaje = (parseFloat(this.CtotalPasivoCorrienteparapor)/parseFloat(this.CtotalPasivoparapor))*100
              this.CtotalPasivoCorrienteporcentaje = this.CtotalPasivoCorrienteporcentaje.toFixed(2)
              this.CcuentasPPporcentaje = (parseFloat(this.CcuentasPP)/parseFloat(this.CtotalPasivoparapor))*100
              this.CcuentasPPporcentaje = this.CcuentasPPporcentaje.toFixed(2)
              this.CcuentasPPRelacionadasporcentaje = (parseFloat(this.CcuentasPPRelacionadas)/parseFloat(this.CtotalPasivoparapor))*100
              this.CcuentasPPRelacionadasporcentaje = this.CcuentasPPRelacionadasporcentaje.toFixed(2)
              this.CotrascuentasPPporcentaje = (parseFloat(this.CotrascuentasPP)/parseFloat(this.CtotalPasivoparapor))*100
              this.CotrascuentasPPporcentaje = this.CotrascuentasPPporcentaje.toFixed(2)
              this.CobligacionesEmpleporcentaje = (parseFloat(this.CobligacionesEmple)/parseFloat(this.CtotalPasivoparapor))*100
              this.CobligacionesEmpleporcentaje = this.CobligacionesEmpleporcentaje.toFixed(2)
              this.CimpuestosSobreRentaporcentaje = (parseFloat(this.CimpuestosSobreRenta)/parseFloat(this.CtotalPasivoparapor))*100
              this.CimpuestosSobreRentaporcentaje = this.CimpuestosSobreRentaporcentaje.toFixed(2)
              this.CgastosAcumuladosporcentaje = (parseFloat(this.CgastosAcumulados)/parseFloat(this.CtotalPasivoparapor))*100
              this.CgastosAcumuladosporcentaje = this.CgastosAcumuladosporcentaje.toFixed(2)

              //no corrientes
              this.CtotalPasivoNoCorrienteporcentaje = (parseFloat(this.CtotalPasivoNoCorrienteparapor)/parseFloat(this.CtotalPasivoparapor))*100
              this.CtotalPasivoNoCorrienteporcentaje = this.CtotalPasivoNoCorrienteporcentaje.toFixed(2)
              this.CCPPRelacionadasLPporcentaje = (parseFloat(this.CCPPRelacionadasLP)/parseFloat(this.CtotalPasivoparapor))*100
              this.CCPPRelacionadasLPporcentaje = this.CCPPRelacionadasLPporcentaje.toFixed(2)

              //total pasivo
              this.CtotalPasivoporcentaje = parseFloat(this.CtotalPasivoCorrienteporcentaje) + parseFloat(this.CtotalPasivoNoCorrienteporcentaje)
              this.CtotalPasivoporcentaje = this.CtotalPasivoporcentaje.toFixed(0)
              //FIN DE PASIVOS PORCENTAJES ACTUAL

              //porcentajes patrimonio
              this.CcapitalSocialporcentaje = (parseFloat(this.CcapitalSocial)/parseFloat(this.CtotalPatrimonioparapor))*100
              this.CcapitalSocialporcentaje = this.CcapitalSocialporcentaje.toFixed(2)
              this.CreservaLegalporcentaje = (parseFloat(this.CreservaLegal)/parseFloat(this.CtotalPatrimonioparapor))*100
              this.CreservaLegalporcentaje = this.CreservaLegalporcentaje.toFixed(2)
              this.CresultadosAcuporcentaje = (parseFloat(this.CresultadosAcu)/parseFloat(this.CtotalPatrimonioparapor))*100
              this.CresultadosAcuporcentaje = this.CresultadosAcuporcentaje.toFixed(2)
              this.CresultadosPresEjerporcentaje = (parseFloat(this.CresultadosPresEjer)/parseFloat(this.CtotalPatrimonioparapor))*100
              this.CresultadosPresEjerporcentaje = this.CresultadosPresEjerporcentaje.toFixed(2)

              //porcentaje patrimonio total
              this.CtotalPatrimonioporcentaje = parseFloat(this.CcapitalSocialporcentaje) + parseFloat(this.CreservaLegalporcentaje) + parseFloat(this.CresultadosAcuporcentaje) + parseFloat(this.CresultadosPresEjerporcentaje)
              this.CtotalPatrimonioporcentaje = this.CtotalPatrimonioporcentaje.toFixed(0)
              //FIN DE PATRIMONIO PORCENTAJES COMPARABLES

              this.VAtotalactivocorriente = parseFloat(this.CtotalActivoCorrienteparapor) - parseFloat(this.totalActivoCorrienteparapor)
              this.VAtotalactivocorrienteporcentaje = (parseFloat(this.VAtotalactivocorriente)/parseFloat(this.totalActivoCorrienteparapor))*100
              this.VAtotalactivocorrienteporcentaje = this.VAtotalactivocorrienteporcentaje.toFixed(2)

              this.VAefectivo = parseFloat(this.Cefectivo) - parseFloat(this.efectivo)
              if (this.efectivo !== 0) {
                this.VAefectivoporcentaje = (parseFloat(this.VAefectivo)/parseFloat(this.efectivo))*100
                this.VAefectivoporcentaje = this.VAefectivoporcentaje.toFixed(2)
              } else {
                this.VAefectivoporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAcuentasPC = parseFloat(this.CcuentasPC) - parseFloat(this.cuentasPC)
              if (this.cuentasPC !== 0) {
                this.VAcuentasPCporcentaje = (parseFloat(this.VAcuentasPC)/parseFloat(this.cuentasPC))*100
                this.VAcuentasPCporcentaje = this.VAcuentasPCporcentaje.toFixed(2)
              } else {
                this.VAcuentasPCporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAotrasCPC = parseFloat(this.CotrasCPC) - parseFloat(this.otrasCPC)
              if (this.otrasCPC !== 0) {
                this.VAotrasCPCporcentaje = (parseFloat(this.VAotrasCPC)/parseFloat(this.otrasCPC))*100
                this.VAotrasCPCporcentaje = this.VAotrasCPCporcentaje.toFixed(2)
              } else {
                this.VAotrasCPCporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAdepositosCortoP = parseFloat(this.CdepositosCortoP) - parseFloat(this.depositosCortoP)
              if (this.depositosCortoP !== 0) {
                this.VAdepositosCortoPporcentaje = (parseFloat(this.VAdepositosCortoP)/parseFloat(this.depositosCortoP))*100
                this.VAdepositosCortoPporcentaje = this.VAdepositosCortoPporcentaje.toFixed(2)
              } else {
                this.VAdepositosCortoPporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAinventarios = parseFloat(this.Cinventarios) - parseFloat(this.inventarios)
              if (this.inventarios !== 0) {
                this.VAinventariosporcentaje = (parseFloat(this.VAinventarios)/parseFloat(this.inventarios))*100
                this.VAinventariosporcentaje = this.VAinventariosporcentaje.toFixed(2)
              } else {
                this.VAinventariosporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAgastosPagadosAnt = parseFloat(this.CgastosPagadosAnt) - parseFloat(this.gastosPagadosAnt)
              if (this.gastosPagadosAnt !== 0) {
                this.VAgastosPagadosAntporcentaje = (parseFloat(this.VAgastosPagadosAnt)/parseFloat(this.gastosPagadosAnt))*100
                this.VAgastosPagadosAntporcentaje = this.VAgastosPagadosAntporcentaje.toFixed(2)
              } else {
                this.VAgastosPagadosAntporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAtotalAcrivoNoCorriente = parseFloat(this.CtotalAcrivoNoCorrienteparapor) - parseFloat(this.totalAcrivoNoCorrienteparapor)
              this.VAtotalAcrivoNoCorrienteporcentaje = (parseFloat(this.VAtotalAcrivoNoCorriente)/parseFloat(this.totalAcrivoNoCorrienteparapor))*100
              this.VAtotalAcrivoNoCorrienteporcentaje = this.VAtotalAcrivoNoCorrienteporcentaje.toFixed(2)

              this.VApropiedad= parseFloat(this.Cpropiedad) - parseFloat(this.propiedad)
              if (this.propiedad !== 0) {
                this.VApropiedadporcentaje = (parseFloat(this.VApropiedad)/parseFloat(this.propiedad))*100
                this.VApropiedadporcentaje = this.VApropiedadporcentaje.toFixed(2)
              } else {
                this.VApropiedadporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAactivosBiologicos= parseFloat(this.CactivosBiologicos) - parseFloat(this.activosBiologicos)
              if (this.activosBiologicos !== 0) {
                this.VAactivosBiologicosporcentaje = (parseFloat(this.VAactivosBiologicos)/parseFloat(this.activosBiologicos))*100
                this.VAactivosBiologicosporcentaje = this.VAactivosBiologicosporcentaje.toFixed(2)
              } else {
                this.VAactivosBiologicosporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAactivosIntangibles= parseFloat(this.CactivosIntangibles) - parseFloat(this.activosIntangibles)
              if (this.activosIntangibles !== 0) {
                this.VAactivosIntangiblesporcentaje = (parseFloat(this.VAactivosIntangibles)/parseFloat(this.activosIntangibles))*100
                this.VAactivosIntangiblesporcentaje = this.VAactivosIntangiblesporcentaje.toFixed(2)
              } else {
                this.VAactivosIntangiblesporcentaje = parseFloat(100).toFixed(2)

              }

              this.VAinversionFinalLP= parseFloat(this.CinversionFinalLP) - parseFloat(this.inversionFinalLP)
              if ( this.inversionFinalLP !== 0) {
                this.VAinversionFinalLPporcentaje = (parseFloat(this.VAinversionFinalLP)/parseFloat(this.inversionFinalLP))*100
              this.VAinversionFinalLPporcentaje = this.VAinversionFinalLPporcentaje.toFixed(2)
              } else {
                this.VAinversionFinalLPporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAtotalActivo = parseFloat(this.CtotalActivoparapor) - parseFloat(this.totalActivoparapor)
              this.VAtotalActivoporcentaje = (parseFloat(this.VAtotalActivo)/parseFloat(this.totalActivoparapor))*100
              this.VAtotalActivoporcentaje = this.VAtotalActivoporcentaje.toFixed(2)

              this.VAtotalPasivoCorriente = parseFloat(this.CtotalPasivoCorrienteparapor) - parseFloat(this.totalPasivoCorrienteparapor)
              this.VAtotalPasivoCorrienteporcentaje = (parseFloat(this.VAtotalPasivoCorriente)/parseFloat(this.totalPasivoCorrienteparapor))*100
              this.VAtotalPasivoCorrienteporcentaje = this.VAtotalPasivoCorrienteporcentaje.toFixed(2)

              this.VAcuentasPP = parseFloat(this.CcuentasPP) - parseFloat(this.cuentasPP)
              if (this.cuentasPP !== 0) {
                this.VAcuentasPPporcentaje = (parseFloat(this.VAcuentasPP)/parseFloat(this.cuentasPP))*100
                this.VAcuentasPPporcentaje = this.VAcuentasPPporcentaje.toFixed(2)
              } else {
                this.VAcuentasPPporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAcuentasPPRelacionadas = parseFloat(this.CcuentasPPRelacionadas) - parseFloat(this.cuentasPPRelacionadas)
              if (this.cuentasPPRelacionadas !== 0) {
                this.VAcuentasPPRelacionadasporcentaje = (parseFloat(this.VAcuentasPPRelacionadas)/parseFloat(this.cuentasPPRelacionadas))*100
                this.VAcuentasPPRelacionadasporcentaje = this.VAcuentasPPRelacionadasporcentaje.toFixed(2)
              } else {
                this.VAcuentasPPRelacionadasporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAgastosAcumulados = parseFloat(this.CgastosAcumulados) - parseFloat(this.gastosAcumulados)
              if (this.gastosAcumulados !== 0) {
                this.VAgastosAcumuladosporcentaje = (parseFloat(this.VAgastosAcumulados)/parseFloat(this.gastosAcumulados))*100
                this.VAgastosAcumuladosporcentaje = this.VAgastosAcumuladosporcentaje.toFixed(2)
              } else {
                this.VAgastosAcumuladosporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAotrascuentasPP = parseFloat(this.CotrascuentasPP) - parseFloat(this.otrascuentasPP)
              if (this.otrascuentasPP !== 0) {
                this.VAotrascuentasPPporcentaje = (parseFloat(this.VAotrascuentasPP)/parseFloat(this.otrascuentasPP))*100
                this.VAotrascuentasPPporcentaje = this.VAotrascuentasPPporcentaje.toFixed(2)
              } else {
                this.VAotrascuentasPPporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAobligacionesEmple = parseFloat(this.CobligacionesEmple) - parseFloat(this.obligacionesEmple)
              if (this.obligacionesEmple !== 0) {
                this.VAobligacionesEmpleporcentaje = (parseFloat(this.VAobligacionesEmple)/parseFloat(this.obligacionesEmple))*100
                this.VAobligacionesEmpleporcentaje = this.VAobligacionesEmpleporcentaje.toFixed(2)
              } else {
                this.VAobligacionesEmpleporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAimpuestosSobreRenta = parseFloat(this.CimpuestosSobreRenta) - parseFloat(this.impuestosSobreRenta)
              if (this.impuestosSobreRenta !== 0) {
                this.VAimpuestosSobreRentaporcentaje = (parseFloat(this.VAimpuestosSobreRenta)/parseFloat(this.impuestosSobreRenta))*100
                this.VAimpuestosSobreRentaporcentaje = this.VAimpuestosSobreRentaporcentaje.toFixed(2)
              } else {
                this.VAimpuestosSobreRentaporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAimpuestosSobreRenta = parseFloat(this.CimpuestosSobreRenta) - parseFloat(this.impuestosSobreRenta)
              if (this.impuestosSobreRenta !== 0) {
                this.VAimpuestosSobreRentaporcentaje = (parseFloat(this.VAimpuestosSobreRenta)/parseFloat(this.impuestosSobreRenta))*100
                this.VAimpuestosSobreRentaporcentaje = this.VAimpuestosSobreRentaporcentaje.toFixed(2)
              } else {
                this.VAimpuestosSobreRentaporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAtotalPasivoNoCorriente = parseFloat(this.CtotalPasivoNoCorrienteparapor) - parseFloat(this.totalPasivoNoCorrienteparapor)
              this.VAtotalPasivoNoCorrienteporcentaje = (parseFloat(this.VAtotalPasivoNoCorriente)/parseFloat(this.totalPasivoNoCorrienteparapor))*100
              this.VAtotalPasivoNoCorrienteporcentaje = this.VAtotalPasivoNoCorrienteporcentaje.toFixed(2)

              this.VACPPRelacionadasLP = parseFloat(this.CCPPRelacionadasLP) - parseFloat(this.CPPRelacionadasLP)
              if (this.CPPRelacionadasLP !== 0) {
                this.VACPPRelacionadasLPporcentaje = (parseFloat(this.VACPPRelacionadasLP)/parseFloat(this.CPPRelacionadasLP))*100
                this.VACPPRelacionadasLPporcentaje = this.VACPPRelacionadasLPporcentaje.toFixed(2)
              } else {
                this.VACPPRelacionadasLPporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAtotalPasivo = parseFloat(this.CtotalPasivoparapor) - parseFloat(this.totalPasivoparapor)
              this.VAtotalPasivoporcentaje = (parseFloat(this.VAtotalPasivo)/parseFloat(this.totalPasivoparapor))*100
              this.VAtotalPasivoporcentaje = this.VAtotalPasivoporcentaje.toFixed(2)

              this.VAcapitalSocial = parseFloat(this.CcapitalSocial) - parseFloat(this.capitalSocial)
              if (this.capitalSocial !== 0) {
                this.VAcapitalSocialporcentaje = (parseFloat(this.VAcapitalSocial)/parseFloat(this.capitalSocial))*100
                this.VAcapitalSocialporcentaje = this.VAcapitalSocialporcentaje.toFixed(2)
              } else {
                this.VAcapitalSocialporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAreservaLegal = parseFloat(this.CreservaLegal) - parseFloat(this.reservaLegal)
              if (this.reservaLegal !== 0) {
                this.VAreservaLegalporcentaje = (parseFloat(this.VAreservaLegal)/parseFloat(this.reservaLegal))*100
                this.VAreservaLegalporcentaje = this.VAreservaLegalporcentaje.toFixed(2)
              } else {
                this.VAreservaLegalporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAresultadosAcu = parseFloat(this.CresultadosAcu) - parseFloat(this.resultadosAcu)
              if (this.resultadosAcu !== 0) {
                this.VAresultadosAcuporcentaje = (parseFloat(this.VAresultadosAcu)/parseFloat(this.resultadosAcu))*100
                this.VAresultadosAcuporcentaje = this.VAresultadosAcuporcentaje.toFixed(2)
              } else {
                this.VAresultadosAcuporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAresultadosPresEjer = parseFloat(this.CresultadosPresEjer) - parseFloat(this.resultadosPresEjer)
              if (this.resultadosPresEjer !== 0) {
                this.VAresultadosPresEjerporcentaje = (parseFloat(this.VAresultadosPresEjer)/parseFloat(this.resultadosPresEjer))*100
                this.VAresultadosPresEjerporcentaje = this.VAresultadosPresEjerporcentaje.toFixed(2)
              } else {
                this.VAresultadosPresEjerporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAtotalPatrimonio = parseFloat(this.CtotalPatrimonioparapor) - parseFloat(this.totalPatrimonioparapor)
              this.VAtotalPatrimonioporcentaje = (parseFloat(this.VAtotalPatrimonio)/parseFloat(this.totalPatrimonioparapor))*100
              this.VAtotalPatrimonioporcentaje = this.VAtotalPatrimonioporcentaje.toFixed(2)

              this.VApasivoPatrimonio = parseFloat(this.CpasivoPatrimonioparapor) - parseFloat(this.pasivoPatrimonioparapor)
              this.VApasivoPatrimonioporcentaje = (parseFloat(this.VApasivoPatrimonio)/parseFloat(this.pasivoPatrimonioparapor))*100
              this.VApasivoPatrimonioporcentaje = this.VApasivoPatrimonioporcentaje.toFixed(2)

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
                                if (((parseFloat(periodoDB.informacion.anio)) === (parseFloat(this.$route.params.anioactual)+1)) || ((parseFloat(periodoDB.informacion.anio)) === (parseFloat(this.$route.params.anioactual)-1))) {
                                  this.aniosArray.push(periodoDB.informacion.anio)
                                }
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
              // Activos
              this.efectivo = parseFloat(this.periodoActual[0].balancegeneral.activos.efectivo)
              this.cuentasPC = parseFloat(this.periodoActual[0].balancegeneral.activos.cuentasPC)
              this.otrasCPC = parseFloat(this.periodoActual[0].balancegeneral.activos.otrasCPC)
              this.inventarios = parseFloat(this.periodoActual[0].balancegeneral.activos.inventarios)
              this.gastosPagadosAnt = parseFloat(this.periodoActual[0].balancegeneral.activos.gastosPagadosAnt)
              this.depositosCortoP = parseFloat(this.periodoActual[0].balancegeneral.activos.depositosCortoP)
              // Total Activo Corriente
              this.totalActivoCorriente = parseFloat(this.totalActivoCorriente) + parseFloat(this.efectivo) + parseFloat(this.cuentasPC) + parseFloat(this.otrasCPC) + parseFloat(this.inventarios) + parseFloat(this.gastosPagadosAnt) + parseFloat(this.depositosCortoP)
              // No Corrientes
              this.propiedad = parseFloat(this.periodoActual[0].balancegeneral.activos.propiedad)
              this.activosIntangibles = parseFloat(this.periodoActual[0].balancegeneral.activos.activosIntangibles)
              this.activosBiologicos = parseFloat(this.periodoActual[0].balancegeneral.activos.activosBiologicos)
              this.inversionFinalLP = parseFloat(this.periodoActual[0].balancegeneral.activos.inversionFinalLP)
              // ACTIVOS
              this.totalAcrivoNoCorriente = parseFloat(this.totalAcrivoNoCorriente) + parseFloat(this.propiedad) + parseFloat(this.activosIntangibles) + parseFloat(this.activosBiologicos) + parseFloat(this.inversionFinalLP)
              //Total Activo
              this.totalActivo = parseFloat(this.totalActivo) + parseFloat(this.totalActivoCorriente) + parseFloat(this.totalAcrivoNoCorriente)
              this.totalActivoparapor =this.totalActivo
              this.totalActivo = this.totalActivo.toLocaleString('en');
              this.totalActivoCorrienteparapor =this.totalActivoCorriente
              this.totalActivoCorriente = this.totalActivoCorriente.toLocaleString('en');
              this.totalAcrivoNoCorrienteparapor =this.totalAcrivoNoCorriente
              this.totalAcrivoNoCorriente = this.totalAcrivoNoCorriente.toLocaleString('en');
              // PASIVOS
              // Corrientes
              this.cuentasPP = parseFloat(this.periodoActual[0].balancegeneral.pasivos.cuentasPP)
              this.cuentasPPRelacionadas = parseFloat(this.periodoActual[0].balancegeneral.pasivos.cuentasPPRelacionadas)
              this.otrascuentasPP = parseFloat(this.periodoActual[0].balancegeneral.pasivos.otrascuentasPP)
              this.obligacionesEmple = parseFloat(this.periodoActual[0].balancegeneral.pasivos.obligacionesEmple)
              this.impuestosSobreRenta = parseFloat(this.periodoActual[0].balancegeneral.pasivos.impuestosSobreRenta)
              this.gastosAcumulados = parseFloat(this.periodoActual[0].balancegeneral.pasivos.gastosAcumulados)
              // No corrientes
              this.CPPRelacionadasLP = parseFloat(this.periodoActual[0].balancegeneral.pasivos.CPPRelacionadasLP)
              // Total Pasivos
              this.totalPasivoCorriente = parseFloat(this.totalPasivoCorriente) + parseFloat(this.cuentasPP) + parseFloat(this.cuentasPPRelacionadas) + parseFloat(this.otrascuentasPP) + parseFloat(this.obligacionesEmple) + parseFloat(this.impuestosSobreRenta) + parseFloat(this.gastosAcumulados)
              this.totalPasivoNoCorriente = parseFloat(this.totalPasivoNoCorriente) + parseFloat(this.CPPRelacionadasLP)
              this.totalPasivo = parseFloat(this.totalPasivoCorriente) + parseFloat(this.totalPasivoNoCorriente)
              this.totalPasivoparapor = this.totalPasivo
              this.totalPasivo = this.totalPasivo.toLocaleString("en")
              this.totalPasivoCorrienteparapor = this.totalPasivoCorriente
              this.totalPasivoCorriente = this.totalPasivoCorriente.toLocaleString('en');
              this.totalPasivoNoCorrienteparapor = this.totalPasivoNoCorriente
              this.totalPasivoNoCorriente = this.totalPasivoNoCorriente.toLocaleString('en');
              // PATRIMONIO
              //
              this.capitalSocial = parseFloat(this.periodoActual[0].balancegeneral.patrimonio.capitalSocial)
              this.reservaLegal = parseFloat(this.periodoActual[0].balancegeneral.patrimonio.reservaLegal)
              this.resultadosAcu = parseFloat(this.periodoActual[0].balancegeneral.patrimonio.resultadosAcu)
              this.resultadosPresEjer = parseFloat(this.periodoActual[0].balancegeneral.patrimonio.resultadosPresEjer)
              // Total Patrimonio
              this.totalPatrimonio = parseFloat(this.totalPatrimonio) + parseFloat(this.capitalSocial) + parseFloat(this.reservaLegal) + parseFloat(this.resultadosAcu) + parseFloat(this.resultadosPresEjer)
              this.totalPatrimonioparapor = this.totalPatrimonio
              this.pasivoPatrimonio = parseFloat(this.totalPatrimonioparapor) + parseFloat(this.totalPasivoparapor)
              this.pasivoPatrimonioparapor = this.pasivoPatrimonio
              this.totalPatrimonio = this.totalPatrimonio.toLocaleString('en');
              this.pasivoPatrimonio = this.pasivoPatrimonio.toLocaleString('en');

              // Porcentajes activos
              //corriente
              this.totalActivoCorrienteporcentaje = (parseFloat(this.totalActivoCorrienteparapor)/parseFloat(this.totalActivoparapor))*100
              this.totalActivoCorrienteporcentaje = this.totalActivoCorrienteporcentaje.toFixed(2)
              this.efectivoporcentaje = (parseFloat(this.efectivo)/parseFloat(this.totalActivoparapor))*100
              this.efectivoporcentaje = this.efectivoporcentaje.toFixed(2)
              this.cuentasPCporcentaje = (parseFloat(this.cuentasPC)/parseFloat(this.totalActivoparapor))*100
              this.cuentasPCporcentaje = this.cuentasPCporcentaje.toFixed(2)
              this.otrasCPCporcentaje = (parseFloat(this.otrasCPC)/parseFloat(this.totalActivoparapor))*100
              this.otrasCPCporcentaje = this.otrasCPCporcentaje.toFixed(2)
              this.inventariosporcentaje = (parseFloat(this.inventarios)/parseFloat(this.totalActivoparapor))*100
              this.inventariosporcentaje = this.inventariosporcentaje.toFixed(2)
              this.gastosPagadosAntporcentaje = (parseFloat(this.gastosPagadosAnt)/parseFloat(this.totalActivoparapor))*100
              this.gastosPagadosAntporcentaje = this.gastosPagadosAntporcentaje.toFixed(2)
              this.depositosCortoPporcentaje = (parseFloat(this.depositosCortoP)/parseFloat(this.totalActivoparapor))*100
              this.depositosCortoPporcentaje = this.depositosCortoPporcentaje.toFixed(2)
              //no corriente
              this.totalAcrivoNoCorrienteporcentaje = (parseFloat(this.totalAcrivoNoCorrienteparapor)/parseFloat(this.totalActivoparapor))*100
              this.totalAcrivoNoCorrienteporcentaje = this.totalAcrivoNoCorrienteporcentaje.toFixed(2)
              this.propiedadporcentaje = (parseFloat(this.propiedad)/parseFloat(this.totalActivoparapor))*100
              this.propiedadporcentaje = this.propiedadporcentaje.toFixed(2)
              this.activosIntangiblesporcentaje = (parseFloat(this.activosIntangibles)/parseFloat(this.totalActivoparapor))*100
              this.activosIntangiblesporcentaje = this.activosIntangiblesporcentaje.toFixed(2)
              this.activosBiologicosporcentaje = (parseFloat(this.activosBiologicos)/parseFloat(this.totalActivoparapor))*100
              this.activosBiologicosporcentaje = this.activosBiologicosporcentaje.toFixed(2)
              this.inversionFinalLPporcentaje = (parseFloat(this.inversionFinalLP)/parseFloat(this.totalActivoparapor))*100
              this.inversionFinalLPporcentaje = this.inversionFinalLPporcentaje.toFixed(2)
              // porcentaje total final
              this.totalActivoporcentaje = parseFloat(this.totalAcrivoNoCorrienteporcentaje) + parseFloat(this.totalActivoCorrienteporcentaje)
              this.totalActivoporcentaje = this.totalActivoporcentaje.toFixed(0)
              // FIN DE ACTIVOS PORCENTAJES ACTUAL

              //Porcentajes pasivos
              //corrientes
              this.totalPasivoCorrienteporcentaje = (parseFloat(this.totalPasivoCorrienteparapor)/parseFloat(this.totalPasivoparapor))*100
              this.totalPasivoCorrienteporcentaje = this.totalPasivoCorrienteporcentaje.toFixed(2)
              this.cuentasPPporcentaje = (parseFloat(this.cuentasPP)/parseFloat(this.totalPasivoparapor))*100
              this.cuentasPPporcentaje = this.cuentasPPporcentaje.toFixed(2)
              this.cuentasPPRelacionadasporcentaje = (parseFloat(this.cuentasPPRelacionadas)/parseFloat(this.totalPasivoparapor))*100
              this.cuentasPPRelacionadasporcentaje = this.cuentasPPRelacionadasporcentaje.toFixed(2)
              this.otrascuentasPPporcentaje = (parseFloat(this.otrascuentasPP)/parseFloat(this.totalPasivoparapor))*100
              this.otrascuentasPPporcentaje = this.otrascuentasPPporcentaje.toFixed(2)
              this.obligacionesEmpleporcentaje = (parseFloat(this.obligacionesEmple)/parseFloat(this.totalPasivoparapor))*100
              this.obligacionesEmpleporcentaje = this.obligacionesEmpleporcentaje.toFixed(2)
              this.impuestosSobreRentaporcentaje = (parseFloat(this.impuestosSobreRenta)/parseFloat(this.totalPasivoparapor))*100
              this.impuestosSobreRentaporcentaje = this.impuestosSobreRentaporcentaje.toFixed(2)
              this.gastosAcumuladosporcentaje = (parseFloat(this.gastosAcumulados)/parseFloat(this.totalPasivoparapor))*100
              this.gastosAcumuladosporcentaje = this.gastosAcumuladosporcentaje.toFixed(2)

              //no corrientes
              this.totalPasivoNoCorrienteporcentaje = (parseFloat(this.totalPasivoNoCorrienteparapor)/parseFloat(this.totalPasivoparapor))*100
              this.totalPasivoNoCorrienteporcentaje = this.totalPasivoNoCorrienteporcentaje.toFixed(2)
              this.CPPRelacionadasLPporcentaje = (parseFloat(this.CPPRelacionadasLP)/parseFloat(this.totalPasivoparapor))*100
              this.CPPRelacionadasLPporcentaje = this.CPPRelacionadasLPporcentaje.toFixed(2)

              //total pasivo
              this.totalPasivoporcentaje = parseFloat(this.totalPasivoCorrienteporcentaje) + parseFloat(this.totalPasivoNoCorrienteporcentaje)
              this.totalPasivoporcentaje = this.totalPasivoporcentaje.toFixed(0)
              //FIN DE PASIVOS PORCENTAJES ACTUAL

              //porcentajes patrimonio
              this.capitalSocialporcentaje = (parseFloat(this.capitalSocial)/parseFloat(this.totalPatrimonioparapor))*100
              this.capitalSocialporcentaje = this.capitalSocialporcentaje.toFixed(2)
              this.reservaLegalporcentaje = (parseFloat(this.reservaLegal)/parseFloat(this.totalPatrimonioparapor))*100
              this.reservaLegalporcentaje = this.reservaLegalporcentaje.toFixed(2)
              this.resultadosAcuporcentaje = (parseFloat(this.resultadosAcu)/parseFloat(this.totalPatrimonioparapor))*100
              this.resultadosAcuporcentaje = this.resultadosAcuporcentaje.toFixed(2)
              this.resultadosPresEjerporcentaje = (parseFloat(this.resultadosPresEjer)/parseFloat(this.totalPatrimonioparapor))*100
              this.resultadosPresEjerporcentaje = this.resultadosPresEjerporcentaje.toFixed(2)

              //porcentaje patrimonio total
              this.totalPatrimonioporcentaje = parseFloat(this.totalPatrimonioporcentaje) + parseFloat(this.capitalSocialporcentaje) + parseFloat(this.reservaLegalporcentaje) + parseFloat(this.resultadosAcuporcentaje) + parseFloat(this.resultadosPresEjerporcentaje)
              this.totalPatrimonioporcentaje = this.totalPatrimonioporcentaje.toFixed(0)
              //FIN DE PATRIMONIO PORCENTAJES ACTUAL

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
                    this.nombredelPDF = this.nombredelPDF+"-"+this.anioComparado
                  }
                  doc.save(this.nombredelPDF); // will save the file in the current working directory
                  this.nombredelPDF = this.nombredelPDFbase
              });
          },
          anteriorPagina() {
              this.$router.go(-1)
          }
      }
  }
  </script>
