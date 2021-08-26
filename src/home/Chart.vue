<template>
  <div id="main">
    <div id="chart">
      <apexchart
        type="area"
        height="350"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { mapGetters } from "vuex";
import { formatNumericField } from "../_helpers/formaters";

export default {
  name: "chart",
  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          zoom: {
            enabled: false,
          },
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          labels: {
            formatter: function(val) {
              return formatNumericField(val);
            },
          },
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Product Trends by Month",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
    };
  },
  components: {
    apexchart: VueApexCharts,
  },
  created() {
    this.series.push({
      name: "Projeção",
      data: this.profileData.lifeLine.masterLine.amount,
    });
    this.chartOptions.xaxis.categories.push(
      ...this.profileData.lifeLine.masterLine.periods
    );
  },
  computed: {
    ...mapGetters("profileData", ["profileData"]),
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");

#chart {
  margin: 5%;
}
</style>
