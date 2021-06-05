<template>
  <div class="d-flex flex-column align-start">
    <div class="d-flex align-center">
      <v-radio-group v-model="selected_header" row>
        <v-radio
          @click="changeCategories()"
          v-for="header in users_headers"
          :label="header.text"
          :key="header.value"
          :value="header.value"
        ></v-radio>
      </v-radio-group>
    </div>
    <apexchart
      :key="selected_header"
      v-if="categories"
      type="bar"
      width="600"
      height="350"
      :options="chartOptions"
      :series="[
        {
          name: selected_header,
          data: Object.values(counter)
        }
      ]"
    ></apexchart>
    <div v-html="categories"></div>
    <div v-html="counter"></div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { mapGetters } from 'vuex'
export default {
  name: 'index',
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      selected_header: 'messenger',
      series: [
        {
          name: 'Inflation',
          data: [12, 43, 12, 42]
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'bar'
        },
        colors: ['#2E93fA', '#66DA26', '#546E7A'],
        plotOptions: {
          bar: {
            borderRadius: 0,
            dataLabels: {
              position: 'top'
            }
          }
        },
        dataLabels: {
          enabled: true,
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#304758']
          }
        },

        xaxis: {
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          position: 'top',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5
              }
            }
          },
          tooltip: {
            enabled: true
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: false
          }
        },
        title: {
          text: 'Monthly Inflation in Argentina, 2002',
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#444'
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      users_list: 'users_list/users_list',
      users_headers: 'users_list/users_headers',
      loading: 'users_list/loadingState'
    }),
    respondents() {
      return this.$store.getters['users_list/users_list']
    },
    categories() {
      return this.respondents
        .map((item) => item[this.selected_header])
        .filter((value, index, self) => self.indexOf(value) === index)
    },
    counter() {
      return this.respondents
        .map((resp) => resp[this.selected_header])
        .reduce((acc, rec, index) => {
          return typeof acc[rec] !== 'undefined'
            ? { ...acc, [rec]: acc[rec] + 1 }
            : { ...acc, [rec]: 1 }
        }, {})
    }
  },
  methods: {
    changeCategories() {
      this.chartOptions = {
        xaxis: {
          categories: this.categories,
          position: 'top',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5
              }
            }
          },
          tooltip: {
            enabled: true
          }
        }
      }
    }
  },
  beforeRouteEnter(from, to, next) {
    next((vm) => {
      if (localStorage.getItem('token') !== 'authorized') {
        vm.$router.push('/login')
      }
      if (
        vm.users_list.length === 0 &&
        localStorage.getItem('token') === 'authorized'
      )
        vm.$store.dispatch('users_list/set_list')
    })
  }
}
</script>

<style scoped></style>
