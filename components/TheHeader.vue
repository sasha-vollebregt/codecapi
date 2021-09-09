<template>
    <main>
         <b-navbar variant="faded" type="light">
            <b-navbar-nav>
              <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item v-for="(item, index) in menu" :key="index" :href="item.to">
                    {{ item.label }}
                    </b-nav-item>
                </b-navbar-nav>
                </b-collapse>
            </b-navbar-nav>
        </b-navbar>
    </main>
</template>


<script>
export default {
  data() {
    return {
      menu: [
        { to: "/", label: "Home" },
        { to: "quiz", label: "Quiz" },
        { to: "ranking", label: "Ranking" }
      ]
    };
  }
};
</script>