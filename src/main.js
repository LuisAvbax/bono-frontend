import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Toolbar from 'primevue/toolbar'
import Tag from 'primevue/tag'
import ProgressSpinner from 'primevue/progressspinner'

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

const app = createApp(App)

app.use(PrimeVue)
app.use(ToastService)

app.component('InputText', InputText)
app.component('Dropdown', Dropdown)
app.component('Button', Button)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Toolbar', Toolbar)
app.component('Tag', Tag)
app.component('ProgressSpinner', ProgressSpinner)

app.mount('#app')
