<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { VMInfo } from './types/test';
import HostVmView from "./views/HostVmView.vue";

const data: VMInfo[] = [
  {
    name: 'vm_001',
    creator: 'contrabass',
    container: [
      { name: 'abc' }
    ],
    status: 'stopped'
  },
  {
    name: 'vm_002',
    creator: 'contrabass',
    container: [
      { name: 'abc' }
    ],
    status: 'error'
  },
  {
    name: 'vm_003',
    creator: 'client',
    container: [],
    status: 'active'
  }, 
  {
    name: 'vm_003',
    creator: 'client',
    container: [],
    status: 'active'
  }, 
  {
    name: 'vm_003',
    creator: 'client',
    container: [],
    status: 'active'
  }, 
  {
    name: 'vm_003',
    creator: 'client',
    container: [],
    status: 'active'
  }, 
  {
    name: 'vm_003',
    creator: 'client',
    container: [],
    status: 'active'
  }, 
  {
    name: 'vm_003',
    creator: 'client',
    container: [],
    status: 'active'
  }, 
  {
    name: 'vm_003',
    creator: 'client',
    container: [],
    status: 'active'
  }, 
  // {
  //   name: 'vm_003',
  //   creator: 'client',
  //   container: [],
  //   status: 'active'
  // }, 
  // {
  //   name: 'vm_003',
  //   creator: 'client',
  //   container: [],
  //   status: 'active'
  // }, 
];

const hostVmList = ref<VMInfo[]>([]);

function getHostVmList() {
  const response = data;
  hostVmList.value = response;
}

onMounted(getHostVmList);
</script>

<template>
	<HostVmView :data="data" />
</template>

<style scoped lang="scss">
</style>

