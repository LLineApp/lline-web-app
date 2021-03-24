<template>
  <div>
    <b-table hover :items="items"></b-table>
  </div>
</template>

<script>
export default {
  name: "portfolio",
  data() {
    return {

         fields: [
          {
            key: 'fullname',
            label: "Nome",
            sortable: true
          },
          {
            key: 'email',
            label: "E-mail",
            sortable: true
          },
          {
            key: 'preferredContact',
            label: 'Telefone',
            sortable: true
          }
        ],
      items: [{
        fullname: "",
        email: "",
        preferredContact: "",
      }],
    };
  },
};
</script>

<style></style>
