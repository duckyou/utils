<script setup lang="ts">
import { ref, watch } from 'vue';
import { onMounted } from 'vue';

import Button from 'primevue/button';
import Knob from 'primevue/knob';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import {bpmToMs, bpmToHz} from './logic/tempo';

type ColumnItem = {
  [key: string]: string;
  type: string;
};

const RATIOS = [2, 4, 8, 16, 32, 64, 128, 256];
const RHYTHMS = ['common', 'dotted', 'triplet'];
const COLUMNS = [
  {field: '1/2', header: '1/2'},
  {field: '1/4', header: '1/4'},
  {field: '1/8', header: '1/8'},
  {field: '1/16', header: '1/16'},
  {field: '1/32', header: '1/32'},
  {field: '1/64', header: '1/64'},
  {field: '1/128', header: '1/128'},
  {field: '1/256', header: '1/256'},
];
const bpm = ref(120);
const msItems = ref([] as ColumnItem[]);
const hzItems = ref([] as ColumnItem[]);

function updateTables(bpm: number) {
  msItems.value = [];
  hzItems.value = [];
  
  for (const rhythm of RHYTHMS) {
    const msObj: ColumnItem = {
      type: rhythm,
    };
    const hzObj: ColumnItem = {
      type: rhythm,
    };

    for (const ratio of RATIOS) {
      msObj[`1/${ratio}`] = bpmToMs(bpm, 1/ratio, rhythm);
      hzObj[`1/${ratio}`] = bpmToHz(bpm, 1/ratio, rhythm);
    }
    
    msItems.value.push(msObj);
    hzItems.value.push(hzObj);
  }
};

// Watchers
watch(bpm, async (newBPM, oldBPM) => {
  updateTables(newBPM);
});

// Lifecycles
onMounted(() => {
  updateTables(bpm.value);
});
</script>

<template>
  <div class="grid">
    <div class="col">
      <div class="m-auto max-w-min">
        <div class="flex justify-content-center">
          <div class="flex align-items-center gap-2">
            <Button icon="pi pi-minus" @click="bpm--" :disabled="bpm <= 0"  size="small" rounded />
            <Knob v-model="bpm" :min="0" :max="360"/>
            <Button icon="pi pi-plus" @click="bpm++" :disabled="bpm >= 360" size="small" rounded />
          </div>
        </div>
        <div>
          <DataTable :value="msItems" class="w-full">
            <template #header>
                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <span class="text-xl text-900 font-bold">Milliseconds</span>
                </div>
            </template>
            <Column field="type" header="Type"></Column>
            <Column v-for="col of COLUMNS" :key="col.field" :field="col.field" :header="col.header"></Column>
          </DataTable>
        </div>
        <div>
          <DataTable :value="hzItems" class="w-full">
            <template #header>
                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <span class="text-xl text-900 font-bold">Hertz</span>
                </div>
            </template>
            <Column field="type" header="Type"></Column>
            <Column v-for="col of COLUMNS" :key="col.field" :field="col.field" :header="col.header"></Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>
