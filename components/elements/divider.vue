<template>
  <div class="divider w-full my-6 min-h-8">
    <svg
      version="1.1"
      class="sLogo size-10 absolute -bottom-1 left-1/2 -ml-5 opacity-20 fill-[#0a1d37] "
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      style="enable-background: new 0 0 512 512;"
    >
      <path d="M252.4,84.3c21.7,0,25.2,17.5,25.2,42.4v68.7c0,2,1.6,3.7,3.7,3.7h21.4c2,0,3.7-1.6,3.7-3.7V125 C306.3,98,288.2,84.3,252.4,84.3" />
      <path d="M219.8,56.3c-15.8,60.3-4.3,118.1,39.3,164c4.4,4.6,9.5,9.7,13.6,14.5c3.2,3.7,6.7,7.8,9.6,11.7 c25.7,33.1,44,74.8,41.5,117.4c-2,42.1-28.5,80.4-70.7,91.2c65.1-50.6,45-126.5,2-184.4c-6.9-9.5-14.8-18.6-22.7-27.4 c-1.8-2.1-4.4-5.3-6.1-7.5c-27.9-35.6-40.6-82.2-30.6-126.4C200.2,90.3,207.6,71.8,219.8,56.3" />
      <path d="M260.9,415.5c-21.7,0-25.2-17.5-25.2-42.4v-71.5c0-2-1.6-3.7-3.7-3.7h-21.4c-2,0-3.7,1.6-3.7,3.7v73.2 C207,401.8,225.1,415.5,260.9,415.5" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'divider',
}
</script>

<style lang="scss" scoped>
.divider {
  &::after {
    content: '';
    width: 100%;
    height: 1px;
    background: var(--blue-1);
    position: absolute;
    bottom: 50%;
    opacity: 0.1;
    left: 0;
  }

  .sLogo {
    animation: rotating 10s infinite;
  }

  @keyframes rotating {
    0% {
      transform: rotateY(0deg);
    }
    93% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(360deg);
    }
  }
}
</style>
