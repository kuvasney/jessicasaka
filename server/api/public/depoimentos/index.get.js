import { DepoimentosModel } from "../../depoimentos/model"

export default defineEventHandler(async (event) => {
  try {
    const depoimentos = await DepoimentosModel.find()

    return {
      ...depoimentos
    }
  } catch (err) {
    return {
      error: 'Não foi possível trazer os depoimentos ' + err.message
    }
  }
})
