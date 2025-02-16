import axios from 'axios'

const URL_DEFAULT = 'http://localhost:8080/api/institution'

const InstitutionService = {

    getFindAll : async () => {
        try {
            const response = await axios.get(URL_DEFAULT + '/find-all')
            return response.data
        } catch (error) {
            console.error('Erro ao buscar os dados:', error)
            throw error
        }
    },

    getFindById : async (id) => {
        try {
            const response = await axios.get(URL_DEFAULT + '/find-by-id/'+id)
            const eventsBuild = response.data.events.map(event => ({ ...event, institution: { id: response.data.id}}))
            response.data.events = eventsBuild
            return response.data
        } catch (error) {
            console.error('Erro ao buscar os dados:', error)
            throw error
        }
    },

    removeById : async (id) => {
        try {
            const response = await axios.get(URL_DEFAULT + '/remove-by-id/'+id)
            const data = response.data
            return data
        } catch (error) {
            console.error('Erro ao remover os dados:', error)
            throw error
        }
    },
    save : async (institution) => {
        try {
            const response = await axios.post(URL_DEFAULT + '/save', institution)
            const data = response.data
            return data
        } catch (error) {
            console.error('Erro ao salvar os dados:', error)
            throw error
        }
    },
    update : async (institution) => {
        try {
            const response = await axios.post(URL_DEFAULT + '/update', institution)
            const data = response.data
            return data
        } catch (error) {
            console.error('Erro ao atualizar os dados:', error)
            throw error
        }
    }

}

export default InstitutionService