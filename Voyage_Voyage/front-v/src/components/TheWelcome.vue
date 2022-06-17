<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDestination.vue'
import ToolingIcon from './icons/IconTravels.vue'
import EcosystemIcon from './icons/IconActivity.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconLiked.vue'
import CountryFilter from './Filters/CountryFilter.vue'
</script>

<template>
<div>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading > <a href="/countries">COUNTRIES</a></template>
  </WelcomeItem><br/>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading><a href="/AllTravels">TRAVELS</a></template>
  </WelcomeItem><br/>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading> <a href="/AllActivities">ACTIVITIES </a> </template>
  </WelcomeItem>
  <br/>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading> <a href="/Blog">BLOG </a></template>
  </WelcomeItem><br/>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading> <a href="/MostLikedAct"> MOST LIKED ACTIVITIES </a></template>

  </WelcomeItem>
  </div>
</template>

<style scoped>

a{
  color:black !important;
}
</style>
