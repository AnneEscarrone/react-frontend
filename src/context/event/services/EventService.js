import axios from 'axios'

const URL_DEFAULT = 'http://localhost:8080/api/event'


const EventService = {

    removeById : async (id) => {
        try {
            const response = await axios.get(URL_DEFAULT + '/remove-by-id/'+id)
            const data = response.data
            return data
        } catch (error) {
            console.error('Erro ao remover os dados:', error)
            throw error
        }
    }
}

export default EventService