<!-- CustomFieldValueTable.vue -->
<template>
    <div class="card p-4">
      <Toolbar class="p-mb-4">
        <template #start>
          <h1 class="text-2xl font-bold">📑 Custom Field Values</h1>
        </template>
      </Toolbar>
      <DataTable
        :value="fieldValues"
        :loading="loading"
        :paginator="true"
        :rows="10"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        class="p-datatable-striped"
      >
        <Column field="id" header="ID" :sortable="true" />
        <Column field="entityType" header="Entity Type" :sortable="true" />
        <Column field="entityId" header="Entity ID" :sortable="true" />
        <Column field="fieldName" header="Field Name" :sortable="true" />
        <Column field="fieldValue" header="Field Value" :sortable="true" />
        <template #loading>
          <div class="p-d-flex p-jc-center">
            <ProgressSpinner style="width: 50px; height: 50px" />
          </div>
        </template>
      </DataTable>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const fieldValues = ref([])
  const loading = ref(true)
  
  onMounted(async () => {
    try {
      const resp = await axios.get('http://localhost:8080/api/entity/')
      fieldValues.value = resp.data
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  })
  </script>
  
  <style scoped>
  :deep(.p-datatable) .p-datatable-thead > tr > th {
    background-color: #f8f9fa;
    font-weight: 700;
  }
  </style>
  