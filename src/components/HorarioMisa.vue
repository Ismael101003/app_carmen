<template>
  <div class="container mt-5">
    <h2 class="text-center">Horarios de Misa y Confesión</h2>

    <div class="card mt-4">
      <div class="card-header bg-primary text-center">Horarios de Misa</div>
      <div class="card-body">
        <ul>
          <li><strong>Lunes a Viernes:</strong> 8:00 AM</li>
          <li>
            <strong>Domingos:</strong> 7:30 AM, 9:00 AM, 10:30 AM, 12:00 PM y
            6:00 PM
          </li>
        </ul>
      </div>
    </div>

    <div class="card mt-4">
      <div class="card-header bg-primary text-center">
        Horarios de Confesión
      </div>
      <div class="card-body">
        <ul>
          <li><strong>Lunes a Viernes:</strong>9:00 AM</li>
          <li>
            Recuerda que los
            <strong>martes </strong>
            es dia descanso en la parroquia
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HorarioMisa",
};
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí */
</style>
