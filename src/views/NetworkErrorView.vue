<template>
  <div class="networkError">
    <h1>Uh-Oh!</h1>
    
    <h3>
      It looks like you're experiencing some network issues, please take a breath and
      看起来您遇到了一些网络问题，请先深呼吸一下
      
      <a href="#" @click="$router.go(-1)">click here</a> to try again.
      点击这里 <a href="#" @click="$router.go(-1)">尝试再次</a>。
    </h3>
  </div>
</template>