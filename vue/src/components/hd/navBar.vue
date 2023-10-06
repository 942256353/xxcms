<template>
  <main class="bg-white border-t-4 border-orange-600 py-5 shadow-sm">
    <div class="2xl:w-page m-auto flex justify-between px-3">
      <router-link to="/" class="flex items-center gap-2 text-2xl opacity-90 text-[#e74c3c]">
        <icon-code-download theme="outline" size="24" />
        <span>xxcms.com</span>
      </router-link>
      <div class="flex gap-3 opacity-90 items-center">
        <div class="hidden md:flex gap-3">
          <a href="https://gitee.com/xiao-xie_1/xxcms">gitee</a>
          <a href="https://github.com/942256353/xxcms">github</a>
          <a href="https://xiaoxietuandui.coding.net/p/project/d/xxcms/git">coding</a>
        </div>
        <HdUserAvatarMenu />
      </div>
    </div>
  </main>
</template>
<script lang='ts' setup>
</script>
<style scoped>
</style>
