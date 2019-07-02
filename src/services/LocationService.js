import axios from 'axios';

export const FetchStates = async () => {
  const { data } = await axios('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  
  return data
    .map(({ id, sigla }) => ({ id, sigla }))
      .sort((a, b) => a.sigla > b.sigla ? 1 : -1);
  };

export const FetchCities = async id => {
  if (!id) throw new Error('Por favor, passar o id da unidade federativa (UF)');
  const { data } = await axios(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`);
  
  return data.map(({ nome }) => nome);
};