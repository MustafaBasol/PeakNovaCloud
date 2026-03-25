async function loadMongoModel(modelPath) {
  const [{ default: connectDB }, { default: model }] = await Promise.all([
    import('@/libs/dbConnect'),
    import(modelPath),
  ])

  await connectDB()
  return model
}

export function loadAboutModel() {
  return loadMongoModel('@/models/About')
}

export function loadBlogModel() {
  return loadMongoModel('@/models/Blog')
}

export function loadFaqModel() {
  return loadMongoModel('@/models/Faq')
}

export function loadLogosModel() {
  return loadMongoModel('@/models/Logos')
}

export function loadPageModel() {
  return loadMongoModel('@/models/Page')
}

export function loadProjectModel() {
  return loadMongoModel('@/models/Project')
}

export function loadSeoModel() {
  return loadMongoModel('@/models/Seo')
}

export function loadServiceModel() {
  return loadMongoModel('@/models/Service')
}