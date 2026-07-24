import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import FatalError from './FatalError.vue'
import { composer } from "./composables/useComposer.ts"

const status = await composer.init();
if(status){
	createApp(App).mount('#app')
}
else{
	createApp(FatalError).mount('#app')
}