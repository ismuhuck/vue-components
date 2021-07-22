<template>
  <div>
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot :user="user"> {{ user.firstName }} </slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        firstName: '泰植',
        lastName: 'muhuck'
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
