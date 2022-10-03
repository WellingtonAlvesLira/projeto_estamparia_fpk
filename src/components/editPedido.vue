<template>
  <div class="container">
    <h1 class="mt-4">Editar Iten <span style="color:red">{{ this.$route.params.id }}</span></h1>
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title mt-4" id="exampleModalLabel">Editar Pedido</h5>
      </div>
      <div class="modal-body">
        <div class="row">
          <div col-6>
            <form class="m-2">
              <div class="form-group">
                <label for="exampleFormControlInput1">Nome do Cliente</label>
                <input
                  v-model="nome"
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Nome"
                />
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect1">Escolher Iten</label>
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  v-model="iten"
                >
                  <option>{{ iten }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1">Quantidade</label>
                <input
                  v-model="qtd"
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Qtd"
                />
              </div>
              <div class="m-4">
                <button
                @click="deletarPedido"
                  type="button"
                  class="btn btn-danger space-btn"
                  data-dismiss="modal"
                >
                  Deletar
                </button>
                <button
                  @click="updatePedido"
                  type="button"
                  class="btn btn-success"
                >
                  Editar Pedido
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api.js";

export default {
  name: "editPedido",
  mixins: [api],

  data() {
    return {
      nome: "",
      iten: "",
      qtd: "",
    };
  },
  created() {
    this.getUser();
    this.listarPedidos();

  },
  methods: {
    getUser() {
      this.get(`/pedidos/${this.$route.params.id}`).then((response) => {
        this.nome = response.data.nome;
        this.iten = response.data.iten;
        this.qtd = response.data.qtd;
        this.statusP = response.data.statusP;
        this.data_atual = response.data.data_atual;

      });
    },

    updatePedido() {
      //Realizando o get dos pedidos atuais , para realizar uma nova atualização.
      var data_pedido = {
        nome: this.nome,
        iten: this.iten,
        qtd: this.qtd,
        statusP:  this.statusP,
        data_atual: this.data_atual
      };
      this.put(`/pedidos/${this.$route.params.id}`, data_pedido).then(
        (response) => {
          alert('Pedido atualizado com sucesso!')
          this.listarPedidos()
          this.$router.push('/');
          console.log(response);
        }
      );
    },

    deletarPedido(){
      var Yes = confirm("Tem certeza ?");
        if(Yes == true){
          this.delete(`/pedidos/${this.$route.params.id}`).then((response)=>{
        console.log(response);

        
      })
          alert('Pedido deletado com sucesso!')
          this.$router.push('/lista')
        }
    },

    
    listarPedidos() {
      this.get("/pedidos").then((resposta) => {
        this.pedidos = resposta.data;
      });
    },
  },
};
</script>

<style>
  .space-btn{
    margin-right: 15px;
  }
</style>