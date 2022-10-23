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
        <h3 style="text-align: center; font-weight: bold;">Reporte Horizontal del Estado de Resultados </h3>
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
              <div class="" style="font-size:20px; margin-left: -120px;">
                  <strong v-show="this.aniosArray.length !== 1"> Compara el año {{this.anioActual}} con los siguientes años</strong>
                  <strong v-show="this.aniosArray.length == 1"> Compara el año {{this.anioActual}} con el siguiente año</strong>
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
                          <h6 v-if="this.anioComparado !== '' " style="text-align: center; margin-top: 5px; margin-bottom: 8px;">Análisis Horizontal del Estado de Resultados del año {{this.$route.params.anioactual}} y {{anioComparado}}</h6>
                          <h6 v-if="this.anioComparado === '' " style="text-align: center; margin-top: 5px; margin-bottom: 8px;">Análisis Horizontal del Estado de Resultados del año {{this.$route.params.anioactual}}</h6>
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
                                    <q-item-label style="font-weight: bold; font-size: 22px; padding-left: 150px;">{{this.$route.params.anioactual}}</q-item-label>
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
                                  <q-item-section >
                                      <q-item-label style="font-weight: bold; font-size: 18px;">INGRESOS</q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="this.ingresosporventas !== 0 || this.Cingresosporventas !== 0">
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Ingresos por ventas</q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                      <q-item-label style="padding-left: 150px;">{{this.ingresosporventas.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                      <q-item-label v-if="this.Cingresosporventas !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.Cingresosporventas.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                      <q-item-label v-if="this.Cingresosporventas !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAingresosporventas.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                      <q-item-label v-if="this.Cingresosporventas !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAingresosporventasporcentaje.toLocaleString('en')}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="this.costodeventas !== 0 || this.Ccostodeventas !== 0">
                                  <q-item-section>
                                      <q-item-label style="font-size: 15px;">Costos de ventas</q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                      <q-item-label style="padding-left: 150px;">{{this.costodeventas.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                      <q-item-label v-if="this.Ccostodeventas !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.Ccostodeventas.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                      <q-item-label v-if="this.Ccostodeventas !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAcostodeventas.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                      <q-item-label v-if="this.Ccostodeventas !== 0 || this.anioComparado !== ''" style="padding-left: 120px;">{{this.VAcostodeventasporcentaje.toLocaleString('en')}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item>
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; font-size: 18px;">UTILIDAD BRUTA</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style=" padding-left: 150px; font-weight: bold; font-size: 18px;  text-decoration: underline; color: black;">{{this.utilidadbruta.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.Ccostodeventas !== 0 || this.anioComparado !== ''" style="padding-left: 120px; font-weight: bold; font-size: 18px;  text-decoration: underline; color: black;">{{this.Cutilidadbruta.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 150px; font-weight: bold; font-size: 18px;  text-decoration: underline; color: black;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.Ccostodeventas !== 0 || this.anioComparado !== ''" style="padding-left: 120px; font-weight: bold; font-size: 18px;  text-decoration: underline; color: black;">{{this.VAutilidadbruta.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 150px; font-weight: bold; font-size: 18px;  text-decoration: underline; color: black;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.Ccostodeventas !== 0 || this.anioComparado !== ''" style="padding-left: 120px; font-weight: bold; font-size: 18px;  text-decoration: underline; color: black;">{{this.VAutilidadbrutaporcentaje.toLocaleString('en')}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 150px; font-weight: bold; font-size: 18px;  text-decoration: underline; color: black;"></q-item-label>
                                  </q-item-section>

                              </q-item>
                          </q-list>
                          <hr>
                          <!--  FIN CORRIENTE-->
                          <!--No corriente-->
                          <q-list>
                              <q-item style="background-color: #F79C7E">
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; font-size: 18px;">GASTOS DE OPERACION</q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="this.gastosAdmin !== 0 || this.CgastosAdmin !== 0">
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Gastos de administración</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 150px;">{{this.gastosAdmin.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CgastosAdmin !== 0 || this.anioComparado !== '' " style="padding-left: 120px;">{{this.CgastosAdmin.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == '' " style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CgastosAdmin !== 0 || this.anioComparado !== '' " style="padding-left: 120px;">{{this.VAgastosAdmin.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == '' " style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CgastosAdmin !== 0 || this.anioComparado !== '' " style="padding-left: 120px;">{{this.VAgastosAdminporcentaje.toLocaleString('en')}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == '' " style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="this.gastosVentas !== 0 || this.CgastosVentas !== 0">
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Gastos de ventas</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 150px;">{{this.gastosVentas.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CgastosVentas !== 0 || this.anioComparado !== '' " style="padding-left: 120px;">{{this.CgastosVentas.toLocaleString('en')}}</q-item-label>
                                    <q-item-label v-if="this.anioComparado == '' " style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CgastosVentas !== 0 || this.anioComparado !== '' " style="padding-left: 120px;">{{this.VAgastosVentas.toLocaleString('en')}}</q-item-label>
                                    <q-item-label v-if="this.anioComparado == '' " style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CgastosVentas !== 0 || this.anioComparado !== '' " style="padding-left: 120px;">{{this.VAgastosVentasporcentaje.toLocaleString('en')}}%</q-item-label>
                                    <q-item-label v-if="this.anioComparado == '' " style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item>
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; font-size: 18px;">UTILIDAD DE OPERACION</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style=" padding-left: 150px; font-weight: bold; font-size: 18px; text-decoration: underline; color: black;">{{this.utilidadoperativa.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.Cutilidadoperativa !== 0 || this.anioComparado !== ''" style="padding-left: 120px; font-weight: bold; font-size: 18px; text-decoration: underline; color: black;">{{this.Cutilidadoperativa.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 150px; font-weight: bold; font-size: 18px; text-decoration: underline; color: black;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.Cutilidadoperativa !== 0 || this.anioComparado !== ''" style="padding-left: 120px; font-weight: bold; font-size: 18px; text-decoration: underline; color: black;">{{this.VAutilidadoperativa.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 150px; font-weight: bold; font-size: 18px; text-decoration: underline; color: black;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.Cutilidadoperativa !== 0 || this.anioComparado !== ''" style="padding-left: 120px; font-weight: bold; font-size: 18px; text-decoration: underline; color: black;">{{this.VAutilidadoperativaporcentaje.toLocaleString('en')}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 150px; font-weight: bold; font-size: 18px; text-decoration: underline; color: black;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                          </q-list>
                          <hr>
                          <!--PASIVOS -->
                          <q-list>
                            <q-item style="background-color: #A5ADE0">
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; font-size: 18px;">OTRAS OPERACIONES</q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="this.otrosIngresNetos !== 0 || this.CotrosIngresNetos !== 0">
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Otros ingresos Netos</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 150px;">{{this.otrosIngresNetos.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CotrosIngresNetos !== 0 || this.anioComparado!==''" style="padding-left: 120px;">{{this.CotrosIngresNetos.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CotrosIngresNetos !== 0 || this.anioComparado!==''" style="padding-left: 120px;">{{this.VAotrosIngresNetos.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CotrosIngresNetos !== 0 || this.anioComparado!==''" style="padding-left: 120px;">{{this.VAotrosIngresNetosporcentaje.toLocaleString('en')}}%</q-item-label>
                                      <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="this.otrosGasNetos !== 0 || this.CotrosGasNetos !== 0">
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Otros gastos netos</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 150px;">{{this.otrosGasNetos.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CotrosGasNetos !== 0 || this.anioComparado!==''" style="padding-left: 120px;">{{this.CotrosGasNetos.toLocaleString('en')}}</q-item-label>
                                    <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CotrosGasNetos !== 0 || this.anioComparado!==''" style="padding-left: 120px;">{{this.VAotrosGasNetos.toLocaleString('en')}}</q-item-label>
                                    <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CotrosGasNetos !== 0 || this.anioComparado!==''" style="padding-left: 120px;">{{this.VAotrosGasNetosporcentaje.toLocaleString('en')}}%</q-item-label>
                                    <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="this.gastosFinan !== 0 || this.CgastosFinan !== 0">
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Gastos financieros netos</q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                      <q-item-label style="padding-left: 150px;">{{this.gastosFinan.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                    <q-item-label v-if="this.CgastosFinan !== 0 || this.anioComparado!==''" style="padding-left: 120px;">{{this.CgastosFinan.toLocaleString('en')}}</q-item-label>
                                    <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                    <q-item-label v-if="this.CgastosFinan !== 0 || this.anioComparado!==''" style="padding-left: 120px;">{{this.VAgastosFinan.toLocaleString('en')}}</q-item-label>
                                    <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                    <q-item-label v-if="this.CgastosFinan !== 0 || this.anioComparado!==''" style="padding-left: 120px;">{{this.VAgastosFinanporcentaje.toLocaleString('en')}}%</q-item-label>
                                    <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="this.ingresosFinan !== 0 || this.CingresosFinan !== 0">
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Ingresos financieros netos</q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                    <q-item-label v-if="this.CingresosFinan !== 0 || this.anioComparado!==''" style="padding-left: 120px;">{{this.CingresosFinan.toLocaleString('en')}}</q-item-label>
                                    <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                    <q-item-label v-if="this.CingresosFinan !== 0 || this.anioComparado!==''" style="padding-left: 120px;">{{this.VAingresosFinan.toLocaleString('en')}}</q-item-label>
                                    <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                    <q-item-label v-if="this.CingresosFinan !== 0 || this.anioComparado!==''" style="padding-left: 120px;">{{this.VAingresosFinanporcentaje.toLocaleString('en')}}%</q-item-label>
                                    <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                          </q-list>
                          <q-list>
                              <q-item>
                                  <q-item-section>
                                      <q-item-label style="font-weight: bold; font-size: 18px;">UTILIDAD ANTES DE RESERVA LEGAL</q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                      <q-item-label style="padding-left: 150px; font-weight: bold; font-size: 18px; text-decoration: underline; color: black;">{{this.utilidadantesreserva.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                      <q-item-label v-if="this.Cutilidadantesreserva!==0 || this.anioComparado !== ''" style="padding-left: 120px; font-weight: bold; font-size: 18px; text-decoration: underline; color: black;">{{this.Cutilidadantesreserva.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if=" this.anioComparado == ''" style="padding-left: 150px; font-weight: bold; font-size: 18px; text-decoration: underline; color: black;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                      <q-item-label v-if="this.Cutilidadantesreserva!==0 || this.anioComparado !== ''" style="padding-left: 120px; font-weight: bold; font-size: 18px; text-decoration: underline; color: black;">{{this.VAutilidadantesreserva.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if=" this.anioComparado == ''" style="padding-left: 150px; font-weight: bold; font-size: 18px; text-decoration: underline; color: black;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                      <q-item-label v-if="this.Cutilidadantesreserva!==0 || this.anioComparado !== ''" style="padding-left: 120px; font-weight: bold; font-size: 18px; text-decoration: underline; color: black;">{{this.VAutilidadantesreservaporcentaje.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if=" this.anioComparado == ''" style="padding-left: 150px; font-weight: bold; font-size: 18px; text-decoration: underline; color: black;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                          </q-list>

                          <!--PATRIMONIO-->
                          <q-list v-show="this.reservaLegal !== 0 || this.CreservaLegal !== 0">
                              <q-item>
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Reserva Legal</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 150px;">{{this.reservaLegal.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CreservaLegal !== 0 || this.anioComparado!==''" style="padding-left: 120px;">{{this.CreservaLegal.toLocaleString('en')}}</q-item-label>
                                    <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CreservaLegal !== 0 || this.anioComparado!==''" style="padding-left: 120px;">{{this.VAreservaLegal.toLocaleString('en')}}</q-item-label>
                                    <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CreservaLegal !== 0 || this.anioComparado!==''" style="padding-left: 120px;">{{this.VAreservaLegalporcentaje.toLocaleString('en')}}%</q-item-label>
                                    <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                          </q-list>
                          <q-list v-show="this.impuestosSobreRentaES !== 0 || this.CimpuestosSobreRentaES !== 0">
                              <q-item>
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Impuesto sobre la renta corriente</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style="padding-left: 150px;">{{this.impuestosSobreRentaES.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CimpuestosSobreRentaES !== 0 || this.anioComparado!==''" style="padding-left: 120px;">{{this.CimpuestosSobreRentaES.toLocaleString('en')}}</q-item-label>
                                    <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CimpuestosSobreRentaES !== 0 || this.anioComparado!==''" style="padding-left: 120px;">{{this.VAimpuestosSobreRentaES.toLocaleString('en')}}</q-item-label>
                                    <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CimpuestosSobreRentaES !== 0 || this.anioComparado!==''" style="padding-left: 120px;">{{this.VAimpuestosSobreRentaESporcentaje.toLocaleString('en')}}%</q-item-label>
                                    <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>

                              </q-item>
                          </q-list>
                          <!-- Final-->
                          <hr>
                          <q-list>
                              <q-item>
                                  <q-item-section>
                                      <q-item-label style=" font-weight: bold; font-size: 22px;">UTILIDAD NETA</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label style=" padding-left: 150px; font-weight: bold; font-size: 22px; text-decoration: underline; color: black;">{{this.utilidadneta.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-show="this.anioComparado !== ''" style=" padding-left: 120px; font-weight: bold; font-size: 22px; text-decoration: underline; color: black;">{{this.Cutilidadneta.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-show="this.anioComparado !== ''" style=" padding-left: 120px; font-weight: bold; font-size: 22px; text-decoration: underline; color: black;">{{this.VAutilidadneta.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-show="this.anioComparado !== ''" style=" padding-left: 120px; font-weight: bold; font-size: 22px; text-decoration: underline; color: black;">{{this.VAutilidadnetaporcentaje.toLocaleString('en')}}%</q-item-label>
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
              ingresosFinan:0,
              ingresosFinanporcentaje:0,
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

              // Datos a mostrar del comparado
              Ccostodeventas: 0,
              Ccostodeventasporcentaje: 0,
              CgastosAdmin: 0,
              CgastosAdminporcentaje:0,
              CgastosFinan: 0,
              CgastosFinanporcentaje:0,
              CgastosVentas: 0,
              CgastosVentasporcentaje:0,
              CimpuestosSobreRentaES: 0,
              CimpuestosSobreRentaESporcentaje:0,
              CingresosFinan:0,
              CingresosFinanporcentaje:0,
              Cingresosporventas: 0,
              Cingresosporventasporcentaje:0,
              CotrosGasNetos: 0,
              CotrosGasNetosporcentaje:0,
              CotrosIngresNetos: 0,
              CotrosIngresNetosporcentaje:0,
              CreservaLegal: 0,
              CreservaLegalporcentaje:0,
              Cutilidadbruta: 0,
              Cutilidadbrutaporcentaje:0,
              Cutilidadneta: 0,
              Cutilidadnetaporcentaje:0,
              Cutilidadoperativa: 0,
              Cutilidadoperativaporcentaje:0,
              Cutilidadantesreserva: 0,
              Cutilidadantesreservaporcentaje:0,

              VAingresosporventas:0,
              VAingresosporventasporcentaje:0,

              VAcostodeventas:0,
              VAcostodeventasporcentaje:0,

              VAutilidadbruta:0,
              VAutilidadbrutaporcentaje:0,

              VAgastosAdmin:0,
              VAgastosAdminporcentaje:0,

              VAgastosVentas:0,
              VAgastosVentas:0,

              VAutilidadoperativa:0,
              VAutilidadoperativaporcentaje:0,

              VAotrosGasNetos:0,
              VAotrosGasNetosporcentaje:0,

              VAotrosIngresNetos:0,
              VAotrosIngresNetosporcentaje:0,

              VAingresosFinan:0,
              VAingresosFinanporcentaje:0,

              VAgastosFinan:0,
              VAgastosFinanporcentaje:0,

              VAutilidadantesreserva:0,
              VAutilidadantesreservaporcentaje:0,

              VAreservaLegal:0,
              VAreservaLegalporcentaje:0,

              VAimpuestosSobreRentaES:0,
              VAimpuestosSobreRentaESporcentaje:0,

              VAutilidadneta:0,
              VAutilidadnetaporcentaje:0,

              nombredelPDF: "ReporteHorizontalEstadodeResultados",
              nombredelPDFbase: ""
          };
      },
      created() {
          this.id = this.$route.params.id
          this.listarPeriodoActual()
          this.listarPeriodos()
          this.anioActual = this.$route.params.anioactual
          this.nombredelPDF = "ReporteHorizontalEstadodeResultados" + this.$route.params.anioactual

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
              var elec = this.eleccion
              this.periodoComparar = this.periodos.filter((item) => {
                  if (item.informacion.anio === elec) {
                      return true
                  }
              })
              this.anioComparado = this.periodoComparar[0].informacion.anio
              console.log("prueba" + this.anioComparado)

              //valoresdelperiodocomparado
              this.Cingresosporventas = parseFloat(this.periodoComparar[0].informacion.estadoresultados.ingresosporventas)
              this.Ccostodeventas = parseFloat(this.periodoComparar[0].informacion.estadoresultados.costodeventas)
              this.Cutilidadbruta = parseFloat(this.Cingresosporventas) - parseFloat(this.Ccostodeventas)

              this.CgastosAdmin = parseFloat(this.periodoComparar[0].informacion.estadoresultados.gastosAdmin)

              this.CgastosVentas = parseFloat(this.periodoComparar[0].informacion.estadoresultados.gastosVentas)

              this.Cutilidadoperativa = parseFloat(this.Cutilidadbruta) - parseFloat(this.CgastosAdmin) - parseFloat(this.CgastosVentas)

              this.CgastosFinan = parseFloat(this.periodoComparar[0].informacion.estadoresultados.gastosFinan)

              this.CingresosFinan = parseFloat(this.periodoComparar[0].informacion.estadoresultados.ingresosFinan)

              this.CotrosGasNetos = parseFloat(this.periodoComparar[0].informacion.estadoresultados.otrosGasNetos)

              this.CotrosIngresNetos = parseFloat(this.periodoComparar[0].informacion.estadoresultados.otrosIngresNetos)

              this.Cutilidadantesreserva = parseFloat(this.Cutilidadoperativa) - parseFloat(this.CotrosGasNetos) + parseFloat(this.CotrosIngresNetos) - parseFloat(this.CgastosFinan) + parseFloat(this.CingresosFinan)

              this.CreservaLegal = parseFloat(this.periodoComparar[0].informacion.estadoresultados.reservaLegalES)

              this.CimpuestosSobreRentaES = parseFloat(this.periodoComparar[0].informacion.estadoresultados.impuestosSobreRentaES)

              this.Cutilidadneta = parseFloat(this.Cutilidadantesreserva) - parseFloat(this.CreservaLegal) - parseFloat(this.CimpuestosSobreRentaES)

              this.VAingresosporventas = parseFloat(this.Cingresosporventas) - parseFloat(this.ingresosporventas)

              this.VAingresosporventasporcentaje = (parseFloat(this.VAingresosporventas)/parseFloat(this.ingresosporventas))*100
              this.VAingresosporventasporcentaje = this.VAingresosporventasporcentaje.toFixed(2)

              this.VAcostodeventas = parseFloat(this.Ccostodeventas) - parseFloat(this.costodeventas)

              this.VAcostodeventasporcentaje = (parseFloat(this.VAcostodeventas)/parseFloat(this.costodeventas))*100
              this.VAcostodeventasporcentaje = this.VAcostodeventasporcentaje.toFixed(2)

              this.VAutilidadbruta = parseFloat(this.Cutilidadbruta) - parseFloat(this.utilidadbruta)

              this.VAutilidadbrutaporcentaje = (parseFloat(this.VAutilidadbruta)/parseFloat(this.utilidadbruta))*100
              this.VAutilidadbrutaporcentaje = this.VAutilidadbrutaporcentaje.toFixed(2)

              this.VAgastosAdmin = parseFloat(this.CgastosAdmin) - parseFloat(this.gastosAdmin)
              if (this.gastosAdmin !==0) {
                this.VAgastosAdminporcentaje = (parseFloat(this.VAgastosAdmin)/parseFloat(this.gastosAdmin))*100
                this.VAgastosAdminporcentaje = this.VAgastosAdminporcentaje.toFixed(2)
              } else {
                this.VAgastosAdminporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAgastosVentas = parseFloat(this.CgastosVentas) - parseFloat(this.gastosVentas)

              if (this.gastosVentas !==0) {
                this.VAgastosVentasporcentaje = (parseFloat(this.VAgastosVentas)/parseFloat(this.gastosVentas))*100
                this.VAgastosVentasporcentaje = this.VAgastosVentasporcentaje.toFixed(2)
              } else {
                this.VAgastosVentasporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAutilidadoperativa = parseFloat(this.Cutilidadoperativa) - parseFloat(this.utilidadoperativa)

              this.VAutilidadoperativaporcentaje = (parseFloat(this.VAutilidadoperativa)/parseFloat(this.utilidadoperativa))*100
              this.VAutilidadoperativaporcentaje = this.VAutilidadoperativaporcentaje.toFixed(2)

              this.VAotrosGasNetos = parseFloat(this.CotrosGasNetos) - parseFloat(this.otrosGasNetos)
              if (this.otrosGasNetos !==0) {
                this.VAotrosGasNetosporcentaje = (parseFloat(this.VAotrosGasNetos)/parseFloat(this.otrosGasNetos))*100
                this.VAotrosGasNetosporcentaje = this.VAotrosGasNetosporcentaje.toFixed(2)
              } else {
                this.VAotrosGasNetosporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAotrosIngresNetos = parseFloat(this.CotrosIngresNetos) - parseFloat(this.otrosIngresNetos)
              if (this.otrosIngresNetos !==0) {
                this.VAotrosIngresNetosporcentaje = (parseFloat(this.VAotrosIngresNetos)/parseFloat(this.otrosIngresNetos))*100
                this.VAotrosIngresNetosporcentaje = this.VAotrosIngresNetosporcentaje.toFixed(2)
              } else {
                this.VAotrosIngresNetosporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAingresosFinan = parseFloat(this.CingresosFinan) - parseFloat(this.ingresosFinan)
              if (this.ingresosFinan !==0) {
                this.VAingresosFinanporcentaje = (parseFloat(this.VAingresosFinan)/parseFloat(this.ingresosFinan))*100
                this.VAingresosFinanporcentaje = this.VAingresosFinanporcentaje.toFixed(2)
              } else {
                this.VAingresosFinanporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAgastosFinan = parseFloat(this.CgastosFinan) - parseFloat(this.gastosFinan)
              if (this.gastosFinan !==0) {
                this.VAgastosFinanporcentaje = (parseFloat(this.VAgastosFinan)/parseFloat(this.gastosFinan))*100
                this.VAgastosFinanporcentaje = this.VAgastosFinanporcentaje.toFixed(2)
              } else {
                this.VAgastosFinanporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAutilidadantesreserva = parseFloat(this.Cutilidadantesreserva) - parseFloat(this.utilidadantesreserva)

              this.VAutilidadantesreservaporcentaje = (parseFloat(this.VAutilidadantesreserva)/parseFloat(this.utilidadantesreserva))*100
              this.VAutilidadantesreservaporcentaje = this.VAutilidadantesreservaporcentaje.toFixed(2)

              this.VAreservaLegal = parseFloat(this.CreservaLegal) - parseFloat(this.reservaLegal)
              if (this.reservaLegal !==0) {
                this.VAreservaLegalporcentaje = (parseFloat(this.VAreservaLegal)/parseFloat(this.reservaLegal))*100
                this.VAreservaLegalporcentaje = this.VAreservaLegalporcentaje.toFixed(2)
              } else {
                this.VAreservaLegalporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAimpuestosSobreRentaES = parseFloat(this.CimpuestosSobreRentaES) - parseFloat(this.impuestosSobreRentaES)
              if (this.impuestosSobreRentaES !==0) {
                this.VAimpuestosSobreRentaESporcentaje = (parseFloat(this.VAimpuestosSobreRentaES)/parseFloat(this.impuestosSobreRentaES))*100
                this.VAimpuestosSobreRentaESporcentaje = this.VAimpuestosSobreRentaESporcentaje.toFixed(2)
              } else {
                this.VAimpuestosSobreRentaESporcentaje = parseFloat(100).toFixed(2)
              }

              this.VAutilidadneta = parseFloat(this.Cutilidadneta) - parseFloat(this.utilidadneta)

              this.VAutilidadnetaporcentaje = (parseFloat(this.VAutilidadneta)/parseFloat(this.utilidadneta))*100
              this.VAutilidadnetaporcentaje = this.VAutilidadnetaporcentaje.toFixed(2)

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
              this.ingresosporventas = parseFloat(this.periodoActual[0].estadoresultados.ingresosporventas)
              this.ingresosporventasporcentaje = (parseFloat(this.ingresosporventas)/parseFloat(this.ingresosporventas))*100
              this.costodeventas = parseFloat(this.periodoActual[0].estadoresultados.costodeventas)
              this.costodeventasporcentaje = (parseFloat(this.costodeventas)/parseFloat(this.ingresosporventas))*100
              this.costodeventasporcentaje = this.costodeventasporcentaje.toFixed(2)
              this.utilidadbruta = parseFloat(this.ingresosporventas) - parseFloat(this.costodeventas)
              this.utilidadbrutaporcentaje = (parseFloat(this.utilidadbruta)/parseFloat(this.ingresosporventas))*100
              this.utilidadbrutaporcentaje = this.utilidadbrutaporcentaje.toFixed(2)

              this.gastosAdmin = parseFloat(this.periodoActual[0].estadoresultados.gastosAdmin)
              this.gastosAdminporcentaje = (parseFloat(this.gastosAdmin)/parseFloat(this.ingresosporventas))*100
              this.gastosAdminporcentaje = this.gastosAdminporcentaje.toFixed(2)

              this.gastosVentas = parseFloat(this.periodoActual[0].estadoresultados.gastosVentas)
              this.gastosVentasporcentaje = (parseFloat(this.gastosVentas)/parseFloat(this.ingresosporventas))*100
              this.gastosVentasporcentaje = this.gastosVentasporcentaje.toFixed(2)

              this.utilidadoperativa = parseFloat(this.utilidadbruta) - parseFloat(this.gastosAdmin) - parseFloat(this.gastosVentas)
              this.utilidadoperativaporcentaje = (parseFloat(this.utilidadoperativa)/parseFloat(this.ingresosporventas))*100
              this.utilidadoperativaporcentaje = this.utilidadoperativaporcentaje.toFixed(2)

              this.gastosFinan = parseFloat(this.periodoActual[0].estadoresultados.gastosFinan)
              this.gastosFinanporcentaje = (parseFloat(this.gastosFinan)/parseFloat(this.ingresosporventas))*100
              this.gastosFinanporcentaje = this.gastosFinanporcentaje.toFixed(2)

              this.ingresosFinan = parseFloat(this.periodoActual[0].estadoresultados.ingresosFinan)
              this.ingresosFinanporcentaje = (parseFloat(this.ingresosFinan)/parseFloat(this.ingresosporventas))*100
              this.ingresosFinanporcentaje = this.ingresosFinanporcentaje.toFixed(2)

              this.otrosGasNetos = parseFloat(this.periodoActual[0].estadoresultados.otrosGasNetos)
              this.otrosGasNetosporcentaje = (parseFloat(this.otrosGasNetos)/parseFloat(this.ingresosporventas))*100
              this.otrosGasNetosporcentaje = this.otrosGasNetosporcentaje.toFixed(2)

              this.otrosIngresNetos = parseFloat(this.periodoActual[0].estadoresultados.otrosIngresNetos)
              this.otrosIngresNetosporcentaje = (parseFloat(this.otrosIngresNetos)/parseFloat(this.ingresosporventas))*100
              this.otrosIngresNetosporcentaje = this.otrosIngresNetosporcentaje.toFixed(2)

              this.utilidadantesreserva = parseFloat(this.utilidadoperativa) + parseFloat(this.otrosGasNetos) + parseFloat(this.otrosIngresNetos) + parseFloat(this.gastosFinan) + parseFloat(this.ingresosFinan)
              this.utilidadantesreservaporcentaje = (parseFloat(this.utilidadantesreserva)/parseFloat(this.ingresosporventas))*100
              this.utilidadantesreservaporcentaje = this.utilidadantesreservaporcentaje.toFixed(2)

              this.reservaLegal = parseFloat(this.periodoActual[0].estadoresultados.reservaLegalES)
              this.reservaLegalporcentaje = (parseFloat(this.reservaLegal)/parseFloat(this.ingresosporventas))*100
              this.reservaLegalporcentaje = this.reservaLegalporcentaje.toFixed(2)

              this.impuestosSobreRentaES = parseFloat(this.periodoActual[0].estadoresultados.impuestosSobreRentaES)
              this.impuestosSobreRentaESporcentaje = (parseFloat(this.impuestosSobreRentaES)/parseFloat(this.ingresosporventas))*100
              this.impuestosSobreRentaESporcentaje = this.impuestosSobreRentaESporcentaje.toFixed(3)

              this.utilidadneta = parseFloat(this.utilidadantesreserva) + parseFloat(this.reservaLegal) + parseFloat(this.impuestosSobreRentaES)
              this.utilidadnetaporcentaje = parseFloat(this.utilidadantesreservaporcentaje) + parseFloat(this.reservaLegalporcentaje) + parseFloat(this.impuestosSobreRentaESporcentaje)
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
          },
          anteriorPagina() {
            this.$router.go(-1)
          }
      }
  }
  </script>
