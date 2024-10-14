import { ObrasModel } from "../../obras/model"

export default defineEventHandler(async (event) => {
  try {
    const obras = await ObrasModel.find()

    return {
      ...obras
    }
  } catch(err) {
    return {
      error: err.message
    }
  }
})
