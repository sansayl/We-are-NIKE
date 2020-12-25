<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <div>
      <!-- <ul>
        <li><router-link to="/about/page1">Go to Foo</router-link></li>
        <li><router-link to="/home/page2">Go to Foo</router-link></闪电>
          <li><router-link to="/home/page3">Go to Foo</router-link></闪电>
          <li><router-link to="/home/page4">Go to Foo</router-link></闪电> -->
      <!-- </ul> -->
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<style lang="stylus" scoped></style>
<script>
export default {
  name: "about",
};
</script>
