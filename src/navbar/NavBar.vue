<template>
  <div v-if="canShow">
    <b-navbar toggleable="lg" fixed="top">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ userFirstName }}</em>
            </template>
            <b-dropdown-item href="profile">Perfil</b-dropdown-item>
            <b-dropdown-item to="/login">Sair</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userFirstName: '',
      canShow: true,
    };
  },
  computed: {},
  mounted() {
    this.userFirstName = 'Usuário';
    this.canShow = localStorage.getItem('user');
  },
  created() {
  },
  methods: {},
};
</script>