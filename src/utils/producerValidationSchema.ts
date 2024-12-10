import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  cpf_cnpj: Yup.string().required('CPF ou CNPJ é obrigatório').matches(/^\d{11}|\d{14}$/, 'CPF ou CNPJ inválido'),
  name: Yup.string().required('Nome é obrigatório'),
  farm_name: Yup.string().required('Nome da fazenda é obrigatório'),
  city: Yup.string().required('Cidade é obrigatória'),
  state: Yup.string().required('Estado é obrigatório'),
  total_area: Yup.number().required('Área total é obrigatória').positive('A área deve ser um valor positivo'),
  cultivable_area: Yup.number().required('Área cultivável é obrigatória').positive('A área deve ser um valor positivo'),
  vegetation_area: Yup.number().required('Área de vegetação é obrigatória').positive('A área deve ser um valor positivo'),
  crops: Yup.string().required('Culturas são obrigatórias'),
});
