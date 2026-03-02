import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

export const pessoaService = {
  update: (id, data) => api.put(`/pessoas/${id}`, data),
  delete: (id) => api.delete(`/pessoas/${id}`),

  getAll: () => api.get('/pessoas'),
  create: (data) => api.post('/pessoas', data),
};