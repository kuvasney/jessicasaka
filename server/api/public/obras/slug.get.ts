import { ObrasModel } from '../../obras/model'

export default defineEventHandler(async (event) => {
  // Capturar o valor do query parameter "slug"
  const query = getQuery(event);
  const slug = query.slug as string;

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug não fornecido',
    });
  }

  try {
    // Buscar a obra pelo slug
    const obra = await ObrasModel.findOne({ slug });

    if (!obra) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Obra não encontrada',
      });
    }

    return obra; // Retornar a obra encontrada
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao buscar a obra',
    });
  }
});
