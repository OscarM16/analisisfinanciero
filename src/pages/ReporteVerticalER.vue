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
        <h3 style="text-align: center; font-weight: bold;">Reporte Vertical del Estado de Resultados </h3>
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
                          <h6 style="text-align: center; margin-top: 5px; margin-bottom: 8px;">ANÁLISIS VERTICAL DEL ESTADO DE RESULTADOS</h6>
                          <h6 style="text-align: center; margin-top: 5px; margin-bottom: 8px;">EMPRESA RED FOX LAS MERCEDES S.A. DE C.V.</h6>
                          <h6 v-if="this.anioComparado !== '' " style="text-align: center; margin-top: 5px; margin-bottom: 8px;">Al 31 de diciembre de {{this.$route.params.anioactual}} y {{anioComparado}}</h6>
                          <h6 v-if="this.anioComparado === '' " style="text-align: center; margin-top: 5px; margin-bottom: 8px;">Al 31 de diciembre de {{this.$route.params.anioactual}}</h6>
                      </div>
                      <div class="col-12 justify-center">

                      </div>
                      <div class="col-12 justify-center">

                      </div>
                  </div>
                  <div class="row-12">
                      <div class="col-12">
                          <q-list>
                            <q-item >
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; font-size: 22px;"></q-item-label>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; font-size: 22px; padding-left: 150px;">{{this.$route.params.anioactual}}</q-item-label>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; font-size: 22px; padding-left: 150px;">%</q-item-label>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label style="font-weight: bold; font-size: 22px; padding-left: 150px;">{{anioComparado}}</q-item-label>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label v-show="this.anioComparado !== ''" style="font-weight: bold; font-size: 22px; padding-left: 150px;">%</q-item-label>
                                </q-item-section>
                            </q-item>
                            <hr>
                              <q-item style="background-color: #82E082">
                                  <q-item-section>
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
                                      <q-item-label style="padding-left: 150px;">{{this.ingresosporventasporcentaje}}%</q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                      <q-item-label v-if="this.Cingresosporventas !== 0 || this.anioComparado !== ''" style="padding-left: 150px;">{{this.Cingresosporventas.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                    <q-item-label v-if="this.Cingresosporventasporcentaje !== 0 || this.anioComparado !== ''" style="padding-left: 150px;">{{this.Cingresosporventasporcentaje.toLocaleString('en')}}%</q-item-label>
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
                                      <q-item-label style="padding-left: 150px;">{{this.costodeventasporcentaje}}%</q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                      <q-item-label v-if="this.Ccostodeventas !== 0 || this.anioComparado !== ''" style="padding-left: 150px;">{{this.Ccostodeventas.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                      <q-item-label v-if="this.Ccostodeventasporcentaje !== 0 || this.anioComparado !== ''" style="padding-left: 150px;">{{this.Ccostodeventasporcentaje.toLocaleString('en')}}%</q-item-label>
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
                                  <q-item-section >
                                      <q-item-label style="padding-left: 150px; font-weight: bold; font-size: 18px;  text-decoration: underline; color: black;">{{this.utilidadbrutaporcentaje}}%</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.Ccostodeventas !== 0 || this.anioComparado !== ''" style="padding-left: 150px; font-weight: bold; font-size: 18px;  text-decoration: underline; color: black;">{{this.Cutilidadbruta.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 150px; font-weight: bold; font-size: 18px;  text-decoration: underline; color: black;"></q-item-label>
                                    </q-item-section>
                                  <q-item-section >
                                    <q-item-label v-if="this.Ccostodeventas !== 0 || this.anioComparado !== ''" style="padding-left: 150px; font-weight: bold; font-size: 18px;  text-decoration: underline; color: black;">{{this.Cutilidadbrutaporcentaje.toLocaleString('en')}}%</q-item-label>
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
                                  <q-item-section >
                                      <q-item-label style="padding-left: 150px;">{{this.gastosAdminporcentaje}}%</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CgastosAdmin !== 0 || this.anioComparado !== '' " style="padding-left: 150px;">{{this.CgastosAdmin.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == '' " style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                    <q-item-label v-if="this.CgastosAdmin !== 0 || this.anioComparado !== '' " style="padding-left: 150px;">{{this.CgastosAdminporcentaje.toLocaleString('en')}}%</q-item-label>
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
                                  <q-item-section >
                                      <q-item-label style="padding-left: 150px;">{{this.gastosVentasporcentaje}}%</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CgastosVentas !== 0 || this.anioComparado !== '' " style="padding-left: 150px;">{{this.CgastosVentas.toLocaleString('en')}}</q-item-label>
                                    <q-item-label v-if="this.anioComparado == '' " style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                    <q-item-label v-if="this.CgastosVentas !== 0 || this.anioComparado !== '' " style="padding-left: 150px;">{{this.CgastosVentasporcentaje.toLocaleString('en')}}%</q-item-label>
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
                                      <q-item-label style="padding-left: 150px; font-weight: bold; font-size: 18px; text-decoration: underline; color: black;">{{this.utilidadoperativaporcentaje}}%</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.Cutilidadoperativa !== 0 || this.anioComparado !== ''" style="padding-left: 150px; font-weight: bold; font-size: 18px; text-decoration: underline; color: black;">{{this.Cutilidadoperativa.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado == ''" style="padding-left: 150px; font-weight: bold; font-size: 18px; text-decoration: underline; color: black;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.Cutilidadoperativa !== 0 || this.anioComparado !== ''" style="padding-left: 150px; font-weight: bold; font-size: 18px; text-decoration: underline; color: black;">{{this.Cutilidadoperativaporcentaje.toLocaleString('en')}}%</q-item-label>
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
                                      <q-item-label style="padding-left: 150px;">{{this.otrosIngresNetosporcentaje}}%</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-if="this.CotrosIngresNetos !== 0 || this.anioComparado!==''" style="padding-left: 150px;">{{this.CotrosIngresNetos.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CotrosIngresNetos !== 0 || this.anioComparado!==''" style="padding-left: 150px;">{{this.CotrosIngresNetosporcentaje.toLocaleString('en')}}%</q-item-label>
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
                                      <q-item-label style="padding-left: 150px;">{{this.otrosGasNetosporcentaje}}%</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CotrosGasNetos !== 0 || this.anioComparado!==''" style="padding-left: 150px;">{{this.CotrosGasNetos.toLocaleString('en')}}</q-item-label>
                                    <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CotrosIngresNetos !== 0 || this.anioComparado!==''" style="padding-left: 150px;">{{this.CotrosGasNetosporcentaje.toLocaleString('en')}}%</q-item-label>
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
                                      <q-item-label style="padding-left: 150px;">{{this.gastosFinanporcentaje}}%</q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                    <q-item-label v-if="this.CgastosFinan !== 0 || this.anioComparado!==''" style="padding-left: 150px;">{{this.CgastosFinan.toLocaleString('en')}}</q-item-label>
                                    <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                    <q-item-label v-if="this.CgastosFinan !== 0 || this.anioComparado!==''" style="padding-left: 150px;">{{this.CgastosFinanporcentaje.toLocaleString('en')}}%</q-item-label>
                                    <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                              </q-item>
                              <q-item v-show="this.ingresosFinan !== 0 || this.CingresosFinan !== 0">
                                  <q-item-section>
                                      <q-item-label style=" font-size: 15px;">Ingresos financieros netos</q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                      <q-item-label style="padding-left: 150px;">{{this.ingresosFinan.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                    <q-item-label v-if="this.CingresosFinan !== 0 || this.anioComparado!==''" style="padding-left: 150px;">{{this.CingresosFinan.toLocaleString('en')}}</q-item-label>
                                    <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                    <q-item-label v-if="this.CingresosFinan !== 0 || this.anioComparado!==''" style="padding-left: 150px;">{{this.CingresosFinanporcentaje.toLocaleString('en')}}%</q-item-label>
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
                                      <q-item-label style="padding-left: 150px; font-weight: bold; font-size: 18px; text-decoration: underline; color: black;">{{this.utilidadantesreservaporcentaje}}%</q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                      <q-item-label v-if="this.Cutilidadantesreserva!==0 || this.anioComparado !== ''" style="padding-left: 150px; font-weight: bold; font-size: 18px; text-decoration: underline; color: black;">{{this.Cutilidadantesreserva.toLocaleString('en')}}</q-item-label>
                                      <q-item-label v-if=" this.anioComparado == ''" style="padding-left: 150px; font-weight: bold; font-size: 18px; text-decoration: underline; color: black;"></q-item-label>
                                    </q-item-section>
                                  <q-item-section >
                                    <q-item-label v-if="this.Cutilidadantesreserva!==0 || this.anioComparado !== ''" style="padding-left: 150px; font-weight: bold; font-size: 18px; text-decoration: underline; color: black;">{{this.Cutilidadantesreservaporcentaje.toLocaleString('en')}}%</q-item-label>
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
                                      <q-item-label style="padding-left: 150px;">{{this.reservaLegalporcentaje}}%</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CreservaLegal !== 0 || this.anioComparado!==''" style="padding-left: 150px;">{{this.CreservaLegal.toLocaleString('en')}}</q-item-label>
                                    <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                    <q-item-label v-if="this.CreservaLegal !== 0 || this.anioComparado!==''" style="padding-left: 150px;">{{this.CreservaLegalporcentaje.toLocaleString('en')}}%</q-item-label>
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
                                      <q-item-label style="padding-left: 150px;">{{this.impuestosSobreRentaESporcentaje}}%</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label v-if="this.CimpuestosSobreRentaES !== 0 || this.anioComparado!==''" style="padding-left: 150px;">{{this.CimpuestosSobreRentaES.toLocaleString('en')}}</q-item-label>
                                    <q-item-label v-if="this.anioComparado==''" style="padding-left: 150px;"></q-item-label>
                                  </q-item-section>
                                  <q-item-section >
                                    <q-item-label v-if="this.CimpuestosSobreRentaES !== 0 || this.anioComparado!==''" style="padding-left: 150px;">{{this.CimpuestosSobreRentaESporcentaje.toLocaleString('en')}}%</q-item-label>
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
                                      <q-item-label style="padding-left: 150px; font-weight: bold; font-size: 22px; text-decoration: underline; color: black;">{{this.utilidadnetaporcentaje}}%</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-show="this.anioComparado !== ''" style=" padding-left: 150px; font-weight: bold; font-size: 22px; text-decoration: underline; color: black;">{{this.Cutilidadneta.toLocaleString('en')}}</q-item-label>
                                  </q-item-section>
                                  <q-item-section>
                                      <q-item-label v-show="this.anioComparado !== ''" style="padding-left: 150px; font-weight: bold; font-size: 22px; text-decoration: underline; color: black;">{{this.Cutilidadnetaporcentaje}}%</q-item-label>
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


              nombredelPDF: "ReporteVerticalEstadodeResultados",
              nombredelPDFbase: ""
          };
      },
      created() {
          this.id = this.$route.params.id
          this.listarPeriodoActual()
          this.listarPeriodos()
          this.anioActual = this.$route.params.anioactual
          this.nombredelPDF = "ReporteVerticalEstadodeResultados" + this.$route.params.anioactual

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
              this.Cingresosporventasporcentaje = (parseFloat(this.Cingresosporventas)/parseFloat(this.Cingresosporventas))*100
              this.Ccostodeventas = parseFloat(this.periodoComparar[0].informacion.estadoresultados.costodeventas)*(-1)
              this.Ccostodeventasporcentaje = (parseFloat(this.Ccostodeventas)/parseFloat(this.Cingresosporventas))*100
              this.Ccostodeventasporcentaje = this.Ccostodeventasporcentaje.toFixed(2)
              this.Cutilidadbruta = parseFloat(this.Cingresosporventas) + parseFloat(this.Ccostodeventas)
              this.Cutilidadbrutaporcentaje = (parseFloat(this.Cutilidadbruta)/parseFloat(this.Cingresosporventas))*100
              this.Cutilidadbrutaporcentaje = this.Cutilidadbrutaporcentaje.toFixed(2)

              this.CgastosAdmin = parseFloat(this.periodoComparar[0].informacion.estadoresultados.gastosAdmin)*(-1)
              this.CgastosAdminporcentaje = (parseFloat(this.CgastosAdmin)/parseFloat(this.Cingresosporventas))*100
              this.CgastosAdminporcentaje = this.CgastosAdminporcentaje.toFixed(2)

              this.CgastosVentas = parseFloat(this.periodoComparar[0].informacion.estadoresultados.gastosVentas)*(-1)
              this.CgastosVentasporcentaje = (parseFloat(this.CgastosVentas)/parseFloat(this.Cingresosporventas))*100
              this.CgastosVentasporcentaje = this.CgastosVentasporcentaje.toFixed(2)

              this.Cutilidadoperativa = parseFloat(this.Cutilidadbruta) + parseFloat(this.CgastosAdmin) + parseFloat(this.CgastosVentas)
              this.Cutilidadoperativaporcentaje = (parseFloat(this.Cutilidadoperativa)/parseFloat(this.Cingresosporventas))*100
              this.Cutilidadoperativaporcentaje = this.Cutilidadoperativaporcentaje.toFixed(2)

              this.CgastosFinan = parseFloat(this.periodoComparar[0].informacion.estadoresultados.gastosFinan)*(-1)
              this.CgastosFinanporcentaje = (parseFloat(this.CgastosFinan)/parseFloat(this.Cingresosporventas))*100
              this.CgastosFinanporcentaje = this.CgastosFinanporcentaje.toFixed(2)

              this.CingresosFinan = parseFloat(this.periodoComparar[0].informacion.estadoresultados.ingresosFinan)
              this.CingresosFinanporcentaje = (parseFloat(this.CingresosFinan)/parseFloat(this.Cingresosporventas))*100
              this.CingresosFinanporcentaje = this.CingresosFinanporcentaje.toFixed(2)

              this.CotrosGasNetos = parseFloat(this.periodoComparar[0].informacion.estadoresultados.otrosGasNetos)*(-1)
              this.CotrosGasNetosporcentaje = (parseFloat(this.CotrosGasNetos)/parseFloat(this.Cingresosporventas))*100
              this.CotrosGasNetosporcentaje = this.CotrosGasNetosporcentaje.toFixed(2)

              this.CotrosIngresNetos = parseFloat(this.periodoComparar[0].informacion.estadoresultados.otrosIngresNetos)
              this.CotrosIngresNetosporcentaje = (parseFloat(this.CotrosIngresNetos)/parseFloat(this.Cingresosporventas))*100
              this.CotrosIngresNetosporcentaje = this.CotrosIngresNetosporcentaje.toFixed(2)

              this.Cutilidadantesreserva = parseFloat(this.Cutilidadoperativa) + parseFloat(this.CotrosGasNetos) + parseFloat(this.CotrosIngresNetos) + parseFloat(this.CgastosFinan) + parseFloat(this.CingresosFinan)
              this.Cutilidadantesreservaporcentaje = (parseFloat(this.Cutilidadantesreserva)/parseFloat(this.Cingresosporventas))*100
              this.Cutilidadantesreservaporcentaje = this.Cutilidadantesreservaporcentaje.toFixed(2)

              this.CreservaLegal = parseFloat(this.periodoComparar[0].informacion.estadoresultados.reservaLegalES)*(-1)
              this.CreservaLegalporcentaje = (parseFloat(this.CreservaLegal)/parseFloat(this.Cingresosporventas))*100
              this.CreservaLegalporcentaje = this.CreservaLegalporcentaje.toFixed(2)

              this.CimpuestosSobreRentaES = parseFloat(this.periodoComparar[0].informacion.estadoresultados.impuestosSobreRentaES)*(-1)
              this.CimpuestosSobreRentaESporcentaje = (parseFloat(this.CimpuestosSobreRentaES)/parseFloat(this.Cingresosporventas))*100
              this.CimpuestosSobreRentaESporcentaje = this.CimpuestosSobreRentaESporcentaje.toFixed(3)

              this.Cutilidadneta = parseFloat(this.Cutilidadantesreserva) + parseFloat(this.CreservaLegal) + parseFloat(this.CimpuestosSobreRentaES)
              this.Cutilidadnetaporcentaje = parseFloat(this.Cutilidadantesreservaporcentaje) + parseFloat(this.CreservaLegalporcentaje) + parseFloat(this.CimpuestosSobreRentaESporcentaje)
              this.Cutilidadnetaporcentaje = this.Cutilidadnetaporcentaje.toFixed(2)
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
              this.costodeventas = parseFloat(this.periodoActual[0].estadoresultados.costodeventas)*(-1)
              this.costodeventasporcentaje = (parseFloat(this.costodeventas)/parseFloat(this.ingresosporventas))*100
              this.costodeventasporcentaje = this.costodeventasporcentaje.toFixed(2)
              this.utilidadbruta = parseFloat(this.ingresosporventas) + parseFloat(this.costodeventas)
              this.utilidadbrutaporcentaje = (parseFloat(this.utilidadbruta)/parseFloat(this.ingresosporventas))*100
              this.utilidadbrutaporcentaje = this.utilidadbrutaporcentaje.toFixed(2)

              this.gastosAdmin = parseFloat(this.periodoActual[0].estadoresultados.gastosAdmin)*(-1)
              this.gastosAdminporcentaje = (parseFloat(this.gastosAdmin)/parseFloat(this.ingresosporventas))*100
              this.gastosAdminporcentaje = this.gastosAdminporcentaje.toFixed(2)

              this.gastosVentas = parseFloat(this.periodoActual[0].estadoresultados.gastosVentas)*(-1)
              this.gastosVentasporcentaje = (parseFloat(this.gastosVentas)/parseFloat(this.ingresosporventas))*100
              this.gastosVentasporcentaje = this.gastosVentasporcentaje.toFixed(2)

              this.utilidadoperativa = parseFloat(this.utilidadbruta) + parseFloat(this.gastosAdmin) + parseFloat(this.gastosVentas)
              this.utilidadoperativaporcentaje = (parseFloat(this.utilidadoperativa)/parseFloat(this.ingresosporventas))*100
              this.utilidadoperativaporcentaje = this.utilidadoperativaporcentaje.toFixed(2)

              this.gastosFinan = parseFloat(this.periodoActual[0].estadoresultados.gastosFinan)*(-1)
              this.gastosFinanporcentaje = (parseFloat(this.gastosFinan)/parseFloat(this.ingresosporventas))*100
              this.gastosFinanporcentaje = this.gastosFinanporcentaje.toFixed(2)

              this.ingresosFinan = parseFloat(this.periodoActual[0].estadoresultados.ingresosFinan)
              this.ingresosFinanporcentaje = (parseFloat(this.ingresosFinan)/parseFloat(this.ingresosporventas))*100
              this.ingresosFinanporcentaje = this.ingresosFinanporcentaje.toFixed(2)

              this.otrosGasNetos = parseFloat(this.periodoActual[0].estadoresultados.otrosGasNetos)*(-1)
              this.otrosGasNetosporcentaje = (parseFloat(this.otrosGasNetos)/parseFloat(this.ingresosporventas))*100
              this.otrosGasNetosporcentaje = this.otrosGasNetosporcentaje.toFixed(2)

              this.otrosIngresNetos = parseFloat(this.periodoActual[0].estadoresultados.otrosIngresNetos)
              this.otrosIngresNetosporcentaje = (parseFloat(this.otrosIngresNetos)/parseFloat(this.ingresosporventas))*100
              this.otrosIngresNetosporcentaje = this.otrosIngresNetosporcentaje.toFixed(2)

              this.utilidadantesreserva = parseFloat(this.utilidadoperativa) + parseFloat(this.otrosGasNetos) + parseFloat(this.otrosIngresNetos) + parseFloat(this.gastosFinan) + parseFloat(this.ingresosFinan)
              this.utilidadantesreservaporcentaje = (parseFloat(this.utilidadantesreserva)/parseFloat(this.ingresosporventas))*100
              this.utilidadantesreservaporcentaje = this.utilidadantesreservaporcentaje.toFixed(2)

              this.reservaLegal = parseFloat(this.periodoActual[0].estadoresultados.reservaLegalES)*(-1)
              this.reservaLegalporcentaje = (parseFloat(this.reservaLegal)/parseFloat(this.ingresosporventas))*100
              this.reservaLegalporcentaje = this.reservaLegalporcentaje.toFixed(2)

              this.impuestosSobreRentaES = parseFloat(this.periodoActual[0].estadoresultados.impuestosSobreRentaES)*(-1)
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
