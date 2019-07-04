<template>
  <section id="adoptionArea" class="flex align-center justify-center">
    <div class="card">
      <div class="tab-system">
        <div class="tab-system__wrapper flex flex-column">
          <div class="tab-system__header">
            <ul>
              <li class="flex align-center justify-center" :class="{ active: isActiveTab('received')}" @click="switchTab('received')">Recebidas</li>
              <li class="flex align-center justify-center" :class="{ active: isActiveTab('sent')}" @click="switchTab('sent')">Enviadas</li>
            </ul>
          </div>
          <div class="tab-system__tabs flex">
            <div class="tab" v-if="isActiveTab('sent')">
              <div class="tab__title flex align-center justify-center text-pink">Pedidos enviados</div>
              <div class="tab__content flex flex-column justify-center">
                <table class="custom-table">
                  <tr>
                    <th>Animal</th>
                    <th>Responsável</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                  <tr v-for="({ animal, accepted }) in me.adoptionRequests">
                    <td>{{ animal.name }}</td>
                    <td>{{ animal.owner.name }}</td>
                    <td>{{ animal.owner.email }}</td>
                    <td>{{ checkStatus(accepted) }}</td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="tab" v-if="isActiveTab('received')">
              <div class="tab__title flex align-center justify-center text-pink">Pedidos recebidos</div>
              <div class="tab__content flex flex-column justify-center">
                <table class="custom-table">
                  <tr>
                    <th>Animal</th>
                    <th>Solicitante</th>
                    <th>Email</th>
                    <th>Ações</th>
                  </tr>
                  <tr v-for="({ id, animal, sentBy, accepted }) in me.receivedAdoptionRequests">
                    <td>{{ animal.name }}</td>
                    <td>{{ sentBy.name }}</td>
                    <td>{{ sentBy.email }}</td>
                    <td>
                      <button v-if="!accepted" @click="acceptAdoptionRequest(id, sentBy)" class="btn btn-block pink">Aceitar</button>
                      <span v-else>Aceito</span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import Card from '../../Card.vue';
import { GET_ADOPTION_REQUESTS } from '../../../graphql/queries';
import { ACCEPT_ADOPTION_REQUEST } from '../../../graphql/mutations';

export default {
  components: {
    Card,
  },
  data() {
    return {
      targetTab: 'received',
    }
  },
  methods: {
    async acceptAdoptionRequest(id, { name }) {
      const { dismiss } = await this.$swal({
        type: 'question',
        title: 'Uhul!',
        text: `Você tem certeza que deseja aceitar o pedido de adoção feito por ${name}?`,
        confirmButtonText: 'Sim',
        confirmButtonColor: '#EF3176',
        showCancelButton: true,
        showCloseButton: true,
      });

      if(dismiss) return;

      const {
        updateAdoptionRequest: { accept }
      } = await this.$apollo.mutate({
        mutation: ACCEPT_ADOPTION_REQUEST,
        variables: {
          id
        }
      });

      if(accept) {
        this.$apollo.queries.me.refetch();
      }

    },
    switchTab(tab) {
      this.targetTab = tab;
    },
    isActiveTab(value) {
      return this.targetTab === value
    },
    checkStatus(status) {
      return status ? 'Aceito' : 'Pendente'
    },
  },
  computed: {
    ...mapGetters(['user']),
  },
  apollo: {
    me: {
      query: GET_ADOPTION_REQUESTS,
      fetchPolicy: 'network-only'
    },
  },
}
</script>

<style lang="scss">
@import '../../../assets/scss/mixins.scss';

#adoptionArea {
  background-color: #EAEBED;

  .card {
    width: 60vw;
    min-height: 70vh;
    background: #FFF;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  }

  .custom-table {
    width: 90%;
    padding: 0 10px;
    font-size: 14px;
    margin: 0 auto;

    th {
      border: 1px solid #dcdcdc;
    }

    td {
      background: #F1F1F1;
      color: #EF3176;
      border: 1px solid #dcdcdc;
      border-top: none;
      
      button {
        border-radius: 0;
      }
    }
    th, td {
      padding: 10px;
    }
  }
}
</style>