<template>
    <div class="card p-4">
      <h2 class="text-2xl font-bold mb-4">➕ Add New Rule</h2>
  
      <form @submit.prevent="submitForm">
        <div class="p-field mb-4">
          <label for="targetEntity" class="block font-medium mb-2">Target Entity</label>
          <InputText
            id="targetEntity"
            v-model="rule.targetEntity"
            placeholder="e.g., Facility"
            required
          />
        </div>
  
        <div class="p-field mb-4">
          <label for="targetField" class="block font-medium mb-2">Target Field</label>
          <InputText
            id="targetField"
            v-model="rule.targetField"
            placeholder="e.g., total_co2"
            required
          />
        </div>
  
        <div class="p-field mb-4">
          <label for="operation" class="block font-medium mb-2">Operation</label>
          <Dropdown
            id="operation"
            v-model="rule.operation"
            :options="operationOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Select an operation"
            required
          />
        </div>
  
        <div class="p-field mb-4">
          <label class="block font-medium mb-2">Source</label>
          <div class="p-grid p-fluid">
            <div class="p-col-6">
              <InputText
                v-model="rule.source.entity"
                placeholder="Source Entity (e.g., CarbonFootprint)"
                required
              />
            </div>
            <div class="p-col-6">
              <InputText
                v-model="rule.source.field"
                placeholder="Source Field (e.g., co2)"
                required
              />
            </div>
          </div>
        </div>
  
        <div class="p-field mb-4">
          <label class="block font-medium mb-2">Filter</label>
          <div class="p-grid p-fluid">
            <div class="p-col-6">
              <InputText
                v-model="rule.filter.entity"
                placeholder="Filter Entity (e.g., CarbonFootprint)"
                required
              />
            </div>
            <div class="p-col-6">
              <InputText
                v-model="rule.filter.relationship.relatedEntity"
                placeholder="Related Entity (e.g., Facility)"
                required
              />
            </div>
            <div class="p-col-6">
              <InputText
                v-model="rule.filter.relationship.foreignKey"
                placeholder="Foreign Key (e.g., facility_id)"
                required
              />
            </div>
            <div class="p-col-6">
              <InputText
                v-model="rule.filter.relationship.joinField"
                placeholder="Join Field (e.g., id)"
                required
              />
            </div>
          </div>
        </div>
  
        <div class="p-field">
          <Button
            type="submit"
            label="Add Rule"
            icon="pi pi-check"
            class="p-button-success"
            :disabled="loading"
          />
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  import { useToast } from 'primevue/usetoast'
  import Swal from 'sweetalert2'
  
  const toast = useToast()
  
  const rule = ref({
    targetEntity: '',
    targetField: '',
    operation: '',
    source: {
      entity: '',
      field: ''
    },
    filter: {
      entity: '',
      relationship: {
        relatedEntity: '',
        foreignKey: '',
        joinField: ''
      },
      conditions: null
    }
  })
  
  const operationOptions = ref([
    { label: 'Sum', value: 'sum' },
    { label: 'Max', value: 'max' },
    { label: 'Min', value: 'min' }
  ])
  
  const loading = ref(false)
  
  const submitForm = async () => {
    loading.value = true
    try {
      await axios.post('http://localhost:8080/api/rules', rule.value, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
            Swal.fire({
        icon: 'success',
        title: '¡Regla creada!',
        text: 'Rule added successfully!',
        timer: 2000,
        showConfirmButton: false
      })
  
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Rule added successfully!',
        life: 3000
      })
      resetForm()
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add rule. Please try again'
      })
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to add rule. Please try again.',
        life: 3000
      })
      console.error('Error adding rule:', error)
    } finally {
      loading.value = false
    }
  }
  
  const resetForm = () => {
    rule.value = {
      targetEntity: '',
      targetField: '',
      operation: '',
      source: {
        entity: '',
        field: ''
      },
      filter: {
        entity: '',
        relationship: {
          relatedEntity: '',
          foreignKey: '',
          joinField: ''
        },
        conditions: null
      }
    }
  }
  </script>
  
  <style scoped>
  .p-field {
    margin-bottom: 1.5rem;
  }
  
  .p-grid {
    margin-bottom: 1rem;
  }
  </style>
  