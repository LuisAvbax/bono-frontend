<!-- App.vue -->
<template>
  <div class="layout">
    <aside class="sidebar">
      <nav>
        <ul>
          <li 
            :class="{ active: activeView === 'table' }" 
            @click="activeView = 'table'">
            📋 Calculation Rules
          </li>
          <li 
            :class="{ active: activeView === 'add' }" 
            @click="activeView = 'add'">
            ➕ Add New Rule
          </li>
          <li
            :class="{ active: activeView === 'customFieldValues' }"
            @click="activeView = 'customFieldValues'">
            📑 Custom Field Values
          </li>
        </ul>
      </nav>
    </aside>
    <main class="content">
      <component :is="activeComponent" />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import RuleTable from './components/RuleTable.vue'
import AddRuleForm from './components/AddRuleForm.vue'
import CustomFieldValueTable from './components/CustomFieldValueTable.vue'

const activeView = ref('table')
const activeComponent = computed(() => {
  if (activeView.value === 'table') return RuleTable
  if (activeView.value === 'add') return AddRuleForm
  if (activeView.value === 'customFields') return CustomFieldTable
  if (activeView.value === 'customFieldValues') return CustomFieldValueTable
  return RuleTable
})
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}
.sidebar {
  width: 250px;
  background-color: #f8f9fa;
  padding: 1rem;
  border-right: 1px solid #ddd;
}
.sidebar nav ul {
  list-style: none;
  padding: 0;
}
.sidebar nav ul li {
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}
.sidebar nav ul li:hover {
  background-color: #e9ecef;
}
.sidebar nav ul li.active {
  background-color: #ced4da;
  font-weight: bold;
}
.content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}
</style>
