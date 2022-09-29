<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Cadastrar Novo Pedido</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div col-6>
                <form @submit.prevent="registrarPedidos(e)">
                  <div class="form-group">
                    <label for="exampleFormControlInput1"
                      >Nome do Cliente</label
                    >
                    <input
                      type="text"
                      v-model="data_pedido.nome"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Nome"
                    />
                  </div>
                  <div class="form-group">
                    <label for="pao" id="text-opc">Escolher Iten</label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      v-model="data_pedido.iten"
                    >
                      <option v-for="(it, i) in itens" :key="i">
                        {{ it.tipo }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlInput1">Quantidade</label>
                    <input
                      type="text"
                      v-model="data_pedido.qtd"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Qtd"
                    />
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-danger"
                      data-dismiss="modal"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      @click="registrarPedidos"
                      class="btn btn-success"
                    >
                      Salvar Pedido
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--FIM MODAL CADASTRAR PEDIDO-->

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
    <button
      type="button"
      class="btn btn-primary mt-4"
      data-toggle="modal"
      data-target="#exampleModal"
    >
      Registrar Pedidos
    </button>
  </div>
</template>

<script>
import api from "@/api/api.js";
export default {
  name: "listPedido",
  mixins: [api],

  data() {
    return {
      itens: [],
      status: [],
      pedidos: [],

      statusPut: "",
      

      data_pedido: {
        nome: "",
        iten: "",
        qtd: "",
        data_atual: new Date(),
        statusP: "Realizado",
       
      },
    };
  },

  created() {
    //listando pedidos que foram realizados pelo usuário.
    this.listarItens();
    this.listarStatus();
    this.listarPedidos();
  },
  

  methods: {
    registrarPedidos(e) {

      e.preventDefault();
      //Validação de dados
      if (this.data_pedido.nome == "" || this.data_pedido.iten == "") {
        alert("Você precisa preencher os dados!");
      } else if (this.data_pedido) {
        //enviando dados para o back.
        this.post("/pedidos/", this.data_pedido).then((resposta) => {
          if (resposta.data) {
            alert('Pedido salvo com sucesso');
            //limpar form
            this.data_pedido = "";
            this.listarPedidos();           
          }
        });
      }
    },
    
    atualizarStatus(){
      console.log('Primeira oportunidade que tive de trabalhar com dados assim.')
    },
    //Listando dados do backend para a aplicação
    listarItens() {
      this.get("/tipo_iten").then((resposta) => {
        this.itens = resposta.data.itens;
      });
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