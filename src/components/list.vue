<template>
  <div>

    <h2 class="mt-4 ">Lista de Pedidos</h2>
    <table class="table t_list_pedidos mt-3">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">CLIENTE</th>
          <th scope="col">ITEN</th>
          <th scope="col">QUANTIDADE</th>
          <th scope="col">STATUS</th>
          <th scope="col">DATA PEDIDO</th>
          <th scope="col">DATA ENTREGA</th>
          <th scope="col">AÇÕES</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, i) in pedidos" :key="i">
          <td>{{ p.id }}</td>
          <td>{{ p.nome }}</td>
          <td>{{ p.iten }}</td>
          <td>{{ p.qtd }}</td>
          <td>{{ p.statusP }}</td>
          <td>{{p.data_atual}}</td>
          <td>{{p.data_prevista}}</td>
          <td>
            <router-link :to="{ name: 'editar', params: { id: p.id } }">
              <button
                type="button"
                class="btn btn-primary"
                :disabled="statusPut === 'Confirmado'"
              >
                Editar
              </button>
            </router-link>
            <label style="margin: 10px; " for="status" id="text-opc">Status</label>
            <select @click="atualizarStatus" v-model="statusPut">
              <option v-for="(s, i) in status" :key="i">
                {{ s.tipo }}
              </option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Button trigger modal -->
    
    <router-link to="/cadastrar">
      <button
      type="button"
      class="btn btn-primary mt-4"
      data-toggle="modal"
      data-target="#exampleModal"
    >
      Registrar Pedidos
    </button>
    </router-link>

  </div>
</template>

<script>
import api from "@/api/api.js";

export default {
  name: "listPedido",
  mixins: [api],
  components:{

  },
  data() {
    return {
      status: [],
      pedidos: [],

      statusPut: "",
      
    };
  },

  created() {
    //listando pedidos que foram realizados pelo usuário.
    this.listarStatus();
    this.listarPedidos();
  },
  

  methods: {
    
    atualizarStatus(){
      console.log('Primeira oportunidade que tive de trabalhar com dados assim.')
    },

    listarStatus() {
      this.get("/status").then((resposta) => {
        this.status = resposta.data;
      });
    },

    listarPedidos() {
      this.get("/pedidos").then((resposta) => {
        this.pedidos = resposta.data;
      });
    },
  },
};
</script>

<style scoped>
.t_list_pedidos{
  width: 80%;
  margin: auto;
}
</style>