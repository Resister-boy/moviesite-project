<template>
  <div class="container">
    <h1>
      검색된 영화가 없습니다  <br />
      영화를 검색해주세요
    </h1>
    <RouterLink
      to="/"
      class="btn">
      검색
    </RouterLink>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
@import "../scss/main.scss";
  .container {
    height: 438px;
    margin: 0 auto;
    text-align: center;
    h1 {
      font-size: 30px;
      margin-top: 50px;
    }
    .btn {  
      margin: 30px 0;
      color: #fff;
      font-size: 17px;
      font-weight: 600;
      width: 120px;
      height: 50px;
      line-height: 40px;
      background-color: $primary;
      border: 1px solid #fff;
      transition: all .2s;
      &:hover {
        border: 1px solid $primary;
        background-color: #fff;
        color: $primary;
      }
    }
  }
</style>