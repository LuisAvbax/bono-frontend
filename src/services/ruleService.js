import axios from 'axios'

export async function getRules() {
  try {
    const response = await axios.get('http://localhost:8080/api/rules')
    console.log('Datos recibidos desde API:', response.data)  
    return response.data
  } catch (error) {
    console.error('Error en getRules:', error)
    return [] 
  }
}
