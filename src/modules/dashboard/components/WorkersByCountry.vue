<template>
  <div class="card border-0 h-md-100">
    <div class="card-body">
      <div v-if="dashboardStore.userStats.data" class="d-flex justify-content-around mb-4">
        <div class="text-center">
          <h5 class="fw-bold">Total de Usuarios</h5>
          <p class="fs-4 text-primary">{{ dashboardStore.userStats.data.totalUsers }}</p>
        </div>
        <div class="text-center">
          <h5 class="fw-bold">Usuarios Trabajadores</h5>
          <p class="fs-4 text-success">{{ dashboardStore.userStats.data.totalWorkers }}</p>
        </div>
      </div>

      <div v-if="dashboardStore.userStats.loading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando estadísticas...</p>
      </div>
      <div v-else-if="dashboardStore.userStats.error" class="alert alert-danger" role="alert">
        {{ dashboardStore.userStats.error }}
      </div>
      <div v-else-if="!dashboardStore.userStats.data" class="alert alert-info" role="alert">
        No hay datos para mostrar.
      </div>

      <div v-else class="h-400px d-flex justify-content-center">
        <Pie
          id="user-stats-chart"
          :options="chartOptions"
          :data="chartData"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useDashboardStore } from "../stores/index.js";
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const dashboardStore = useDashboardStore();

onMounted(() => {
  dashboardStore.fetchUserStats();
});

const chartData = computed(() => {
  if (!dashboardStore.userStats.data) {
    return {
      labels: [],
      datasets: [{ data: [] }]
    };
  }

  // Paleta de colores más amplia para evitar repeticiones
  const backgroundColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#E7E9ED',
    '#A177C2', '#C25D93', '#F2716E', '#F29C35', '#F2C94C', '#A1CC79', '#4E987B',
    '#5469A3', '#5D798B', '#7A8C99', '#A3B4BF', '#C4D5E0', '#B9A1E0'
  ];

  return {
    labels: dashboardStore.userStats.data.labels,
    datasets: [
      {
        backgroundColor: backgroundColors.slice(0, dashboardStore.userStats.data.labels.length),
        data: dashboardStore.userStats.data.data
      }
    ]
  };
});

const chartOptions = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    // Aquí es donde mejoramos el diseño
    plugins: {
      legend: {
        // Posicionamos la leyenda en la parte inferior para que no se superponga
        position: 'bottom',
        labels: {
          // Aumentamos el tamaño de la fuente de la leyenda para que sea más legible
          font: {
            size: 11
          },
          // Reducimos el tamaño de la caja de color
          boxWidth: 15,
          // Añadimos padding para que no se amontonen
          padding: 10
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('es-ES').format(context.parsed) + ' (' + context.dataset.data[context.dataIndex] + ')';
            }
            return label;
          }
        }
      }
    },
    // Añadimos un pequeño "recorte" para crear un efecto de dona
    cutout: '10%'
  };
});
</script>

<style scoped>
.h-400px {
  height: 400px;
}
</style>