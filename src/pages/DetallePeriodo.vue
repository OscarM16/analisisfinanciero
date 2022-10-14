<template>
    <div class="container-fluid">
      <h1>DETALLE PERiODO AÑO: {{this.anios[this.$route.params.id - 1].ani}} </h1>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DetallePeriodo',
    data() {
      return {
        anios: [
      {
        id: 1,
        ani: "2017"
      },
      {
        id: 2,
        ani: "2018"
      },
      {
        id: 3,
        ani: "2019"
      },
      {
        id: 4,
        ani: "2020"
      },
      {
        id: 5,
        ani: "2021"
      }
    ]
      };
    },
    created () {
      this.anio = (this.$route.params.anioss)
    }
  }
  </script>
  