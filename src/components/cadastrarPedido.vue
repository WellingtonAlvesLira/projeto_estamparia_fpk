<template>
    <div class="container">
      <h1 class="mt-4">Cadastrar Pedido</h1>
      <div v-if="msgFeedback" class="alert alert-success" role="alert">
          {{feedBackmsg}}
      </div>
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title mt-4" id="exampleModalLabel">Cadastrar</h5>
        </div>
        <div class="modal-body">
          <div class="row">
            <div col-6>
              <form   @submit.prevent="registrarPedidos(e)" class="m-2">
                <div class="form-group">
                  <label for="exampleFormControlInput1">Nome do Cliente</label>
                  <input
                    v-model="data_pedido.nome"
                    type="text"
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
                    v-model="data_pedido.qtd"
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Qtd"
                  />
                </div>
                <div class="m-4">
                <router-link to="/"> 
                    <button
                    type="button"
                    class="btn btn-danger space-btn"
                    data-dismiss="modal"
                  >
                    Voltar
                  </button>

                </router-link>
                  <button
                    @click="registrarPedidos"
                    type="button"
                    class="btn btn-success"
                  >
                    Salvar
                  </button>
                  <div v-if="msgErro" class="alert alert-danger mt-3" role="alert">
  {{Erromsg}}
</div>
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
    name: "cadastrarPedido",
    mixins: [api],
  
    data() {
      return {

        itens: [],

        msgFeedback: false,
        feedBackmsg: "Pedido Salvo com sucesso !",

        msgErro: false,
        Erromsg: "Você precisa preencher todos os dados !",

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
     this.listarItens()
  
    },
    methods: {
        registrarPedidos(e) {

e.preventDefault();
//Validação de dados
if (this.data_pedido.nome == "" || this.data_pedido.iten == "") {
  this.msgErro = true;
  setTimeout(() => this.msgErro = "", 3000)
} else if (this.data_pedido) {
  //enviando dados para o back.
  this.post("/pedidos/", this.data_pedido).then((resposta) => {
    if (resposta.data) {
      this.msgFeedback = true;
      setTimeout(() => this.$router.push('/'), 4000);
           
    }
  });
}
},

    //Listando dados do backend para a aplicação
    listarItens() {
      this.get("/tipo_iten").then((resposta) => {
        this.itens = resposta.data.itens;
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