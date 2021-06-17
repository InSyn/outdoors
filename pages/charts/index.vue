<template>
  <div class="d-flex flex-column align-start">
    <div class="d-flex align-center">
      <v-radio-group v-model="selected_header" row>
        <v-radio
          v-for="header in users_headers"
          v-show="header.value !== 'phone_number'"
          :key="header.value"
          :label="header.text"
          :value="header.value"
          @click="changeCategories()"
        ></v-radio>
      </v-radio-group>
    </div>
    <div
      class="d-flex flex-column"
      style="border: 2px solid #c2c2c6;background: #cccccd; width: 100% "
    >
      <div class="d-flex flex-wrap">
        <apexchart
          v-if="categories"
          :key="selected_header"
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
        <v-spacer></v-spacer>
        <div class="pa-2">
          <div class="d-flex flex-column">
            <div
              v-for="category in users_headers"
              :key="category.value"
              class="pa-1 d-flex align-center"
            >
              <div style="width: 8rem">{{ category.text }}</div>
              <select
                v-model="filtered[category.value]"
                class="pa-1"
                style="border: 1px solid #363636; border-radius: 2px;outline: none; width: 10rem"
              >
                <option
                  v-for="val in users_list
                    .map((user) => {
                      return user[category.value]
                    })
                    .filter(
                      (value, index, self) => self.indexOf(value) === index
                    )"
                  :key="val"
                  :label="val"
                  :value="val"
                ></option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      filter: this.users_headers ? this.users_headers[0].value : null,
      filtered: {},
      selected_header: null,
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
          categories: [],
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
          text: 'Опрос населения 2021',
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
      return this.users_list.filter((respToFilter) => {
        for (const key in this.filtered) {
          if (
            respToFilter[key] === undefined ||
            respToFilter[key] !== this.filtered[key]
          )
            return false
        }
        return true
      })
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
    test(word) {
      this.$axios
        .get(`http://ciss.ga/lev.php?word=${word}`)
        .then((response) => {
          console.log(response)
        })
    },
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
