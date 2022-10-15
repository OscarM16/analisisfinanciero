<template>
    <q-page class="q-pa-md">
        <div class="row justify-center">
            <div class="col-12 justify-center">
                <h3> Mostrar Ratios del Año {{this.$route.params.anioactual}}</h3>
            </div>
            <div>
                <p>{{this.periodo}}</p>
            </div>
        </div>
    
    </q-page>
    </template>
    
    <script>
    import {db} from "boot/firebase"
    import {
        doc,
        getDoc
    } from "firebase/firestore";
    
    export default {
        name: 'MostrarRatios',
        data() {
            return {
                periodo: [],
                id: String
            };
        },
        created() {
          this.id = this.$route.params.id
          this.lsitartareas()
        },
        methods: {
            async lsitartareas() {
                const docRef = doc(db, "periodos", this.$route.params.id);
                const docSnap = await getDoc(docRef);
    
                if (docSnap.exists()) {
                    this.periodo.push(docSnap.data())
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }
        }
    }
    </script>
    