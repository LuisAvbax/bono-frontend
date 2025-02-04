<template>
    <div class="card p-4">
      <Toolbar class="p-mb-4">
        <template #start>
          <h1 class="text-2xl font-bold">📋 Calculation Rules</h1>
        </template>
        <template #end>
          <div class="p-d-flex p-ai-center">
            <Tag
              icon="pi pi-database"
              :value="`Total: ${filteredRules.length}`"
              severity="info"
              class="p-mr-2"
            />
            <Dropdown
              v-model="selectedTargetEntity"
              :options="targetEntityOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Select Target Entity"
              class="p-mr-2"
              style="min-width:200px"
            />
            <Button
              label="Clear Filter"
              icon="pi pi-times"
              class="p-button-text"
              @click="clearDropdownFilter"
            />
          </div>
        </template>
      </Toolbar>
  
      <DataTable
        :value="filteredRules"
        :paginator="true"
        :rows="10"
        :loading="loading"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        class="p-datatable-striped"
      >
        <Column
          field="id"
          header="ID"
          :sortable="true"
          filter
          filterPlaceholder="Buscar ID"
          filterMatchMode="contains"
        />
        <Column
          field="targetEntity"
          header="Target Entity"
          :sortable="true"
          filter
          filterPlaceholder="Buscar Target Entity"
          filterMatchMode="contains"
        >
          <template #body="{ data }">
            <Tag :value="data.targetEntity" severity="success" />
          </template>
        </Column>
        <Column
          field="targetField"
          header="Target Field"
          :sortable="true"
          filter
          filterPlaceholder="Buscar Target Field"
          filterMatchMode="contains"
        />
        <Column
          field="operation"
          header="Operation"
          filter
          filterPlaceholder="Buscar Operation"
          filterMatchMode="contains"
        >
          <template #body="{ data }">
            <Tag :value="data.operation.toUpperCase()" severity="warning" />
          </template>
        </Column>
        <Column
          header="Source"
          filter
          filterPlaceholder="Buscar Source"
          filterMatchMode="contains"
          :filterField="'source.entity'"
        >
          <template #body="{ data }">
            <div v-if="data.source" class="flex flex-column">
              <span><strong>Entity:</strong> {{ data.source.entity }}</span>
              <span><strong>Field:</strong> {{ data.source.field }}</span>
            </div>
            <Tag v-else value="No source" severity="secondary" />
          </template>
        </Column>
        <Column
          header="Filter"
          filter
          filterPlaceholder="Buscar Filter"
          filterMatchMode="contains"
          :filterField="'filter.field'"
        >
          <template #body="{ data }">
            <div v-if="data.filter" class="flex flex-column">
              <span><strong>Field:</strong> {{ data.filter.field }}</span>
              <span><strong>Value:</strong> {{ data.filter.value }}</span>
            </div>
            <Tag v-else value="No filter" severity="secondary" />
          </template>
        </Column>
        <Column header="Actions">
          <template #body="{ data }">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-info p-mr-2"
              @click="onEdit(data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-danger"
              @click="onDelete(data)"
            />
          </template>
        </Column>
        <template #loading>
          <div class="p-d-flex p-jc-center">
            <ProgressSpinner style="width: 50px; height: 50px" />
          </div>
        </template>
      </DataTable>
  
      <Dialog
        header="Edit Rule"
        v-model:visible="showEditDialog"
        :modal="true"
        :closable="false"
        :draggable="false"
        :resizable="false"
      >
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-col-6">
            <label for="editTargetEntity">Target Entity</label>
            <InputText id="editTargetEntity" v-model="editData.targetEntity" />
          </div>
          <div class="p-col-6">
            <label for="editTargetField">Target Field</label>
            <InputText id="editTargetField" v-model="editData.targetField" />
          </div>
  
          <div class="p-col-6">
            <label for="editOperation">Operation</label>
            <Dropdown
              id="editOperation"
              v-model="editData.operation"
              :options="operationOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Select an Operation"
            />
          </div>
  
          <div class="p-col-6">
            <label for="editSourceEntity">Source Entity</label>
            <InputText id="editSourceEntity" v-model="editData.source.entity" />
          </div>
          <div class="p-col-6">
            <label for="editSourceField">Source Field</label>
            <InputText id="editSourceField" v-model="editData.source.field" />
          </div>
          <div class="p-col-6">
            <label for="editFilterEntity">Filter Entity</label>
            <InputText id="editFilterEntity" v-model="editData.filter.entity" />
          </div>
        </div>
        <div class="p-d-flex p-jc-end p-mt-3">
          <Button
            label="Cancel"
            class="p-button-text p-mr-2"
            icon="pi pi-times"
            @click="showEditDialog=false"
          />
          <Button label="Save" icon="pi pi-check" @click="saveEdit" />
        </div>
      </Dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import axios from 'axios'
  import { getRules } from '@/services/ruleService'
  
  import Dialog from 'primevue/dialog'
  import InputText from 'primevue/inputtext'
  import Button from 'primevue/button'
  import Dropdown from 'primevue/dropdown'
  
  const rules = ref([])
  const loading = ref(true)
  const selectedTargetEntity = ref(null)
  const showEditDialog = ref(false)
  const editData = ref({
    id: null,
    targetEntity: '',
    targetField: '',
    operation: '',
    source: { entity: '', field: '' },
    filter: {
      entity: '',
      relationship: { relatedEntity: '', foreignKey: '', joinField: '' },
      conditions: null
    }
  })
  
  const operationOptions = [
    { label: 'Sum', value: 'sum' },
    { label: 'Max', value: 'max' },
    { label: 'Min', value: 'min' }
  ]
  
  onMounted(async () => {
    try {
      const data = await getRules()
      rules.value = data.map(item => ({
        ...item,
        targetEntity: item.targetEntity
          ? item.targetEntity.replace(/\s+/g, '')
          : item.targetEntity
      }))
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  })
  
  const targetEntityOptions = computed(() => {
    const uniqueEntities = Array.from(new Set(rules.value.map(r => r.targetEntity)))
    return uniqueEntities.map(item => ({ label: item, value: item }))
  })
  
  const filteredRules = computed(() => {
    if (!selectedTargetEntity.value) return rules.value
    const filterVal = selectedTargetEntity.value.toString().replace(/\s+/g, '')
    return rules.value.filter(rule => {
      const ruleVal = rule.targetEntity
        ? rule.targetEntity.toString().replace(/\s+/g, '')
        : ''
      return ruleVal === filterVal
    })
  })
  
  const clearDropdownFilter = () => {
    selectedTargetEntity.value = null
  }
  
  const onEdit = (rowData) => {
    editData.value = JSON.parse(JSON.stringify(rowData))
    showEditDialog.value = true
  }
  
  const saveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/rules/${editData.value.id}`,
        editData.value
      )
      const idx = rules.value.findIndex(r => r.id === editData.value.id)
      if (idx !== -1) rules.value[idx] = JSON.parse(JSON.stringify(editData.value))
    } catch (error) {
      console.error(error)
    } finally {
      showEditDialog.value = false
    }
  }
  
  const onDelete = async (rowData) => {
    try {
      await axios.delete(`http://localhost:8080/api/rules/${rowData.id}`)
      rules.value = rules.value.filter(r => r.id !== rowData.id)
    } catch (error) {
      console.error(error)
    }
  }
  </script>
  
  <style scoped>
  .p-column-title {
    min-width: 120px;
  }
  :deep(.p-datatable) .p-datatable-thead > tr > th {
    background-color: #f8f9fa;
    font-weight: 700;
  }
  </style>
  