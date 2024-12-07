  const url = process.env.NEXT_PUBLIC_SITE_URL
  
  export const getAboutData = async(locale) => {        
   
    try{
      const response = await fetch(`${url}/api/getAbout?lang=${locale}`, {
          method: 'GET',
      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error fetching about data:', err);
      return { data: [] }
    }                 
  }

  export const getProjects = async(locale) => {
    try{
      const response = await fetch(`${url}/api/getProjects?lang=${locale}`, {
        method:"GET",
      })  
      return await response.json()
    }
    catch(err){
      console.error('Error fetching projects:', err)
      return { data: [] }
    }  
  }
 

  export const getFaq = async(locale) => {
    try{
      const response = await fetch(`${url}/api/getFaq?lang=${locale}`, {
        method:"GET",
        headers:{
           "Content-Type": "application/json",
        }
      })
        return await response.json();                
    }
    catch(err){
      console.error('Error fetching FAQ:', err);
      return { data: [] }
    }    
  }  

  export const getProject = async(id) => {        
    try{
      const response = await fetch(`${url}/api/getProjects/${id}`, {
          method: 'GET',
      })     
        return await response.json();       
    }
    catch(err){
      console.error('Error fetching projects:', err)
      return { data: [] }
    }                    
    }
       
  export const getService = async(servicename, locale) => {    
    try{
      const response = await fetch(`${url}/api/getService/${servicename}/?lang=${locale}`, {
        method:"GET",
      })
      return await response.json()
    }
    catch(err){
      console.error('Error fetching services:', err)
      return { data: [] }
    }
  }

  export const getServices = async(locale) => {    
    try{
      const response = await fetch(`${url}/api/getService/?lang=${locale}`, {
        method:"GET",
      })
      return await response.json()
    }
    catch(err){
      console.error('Error fetching services:', err)
      return { data: [] }
    }
  }  

  export const getLogos = async(locale) => {
    try{
      const response = await fetch(`${url}/api/getLogos?lang=${locale}`, {
          method:'GET',
      })
      return await response.json();
    }
    catch(err){
      console.error('Error fetching logos:', err)
      return { data: [] }
    }
  } 
  
  export const getPage = async(locale, page) => {
    try{
      const response = await fetch(`${url}/api/getPage?lang=${locale}&page=${page}`, {
          method:'GET',
      })
      return await response.json();
    }
    catch(err){
      console.error('Error fetching pages:', err)
      return { data: [] }
    }
  } 

  export const getBlogs = async(locale) => {
    try{
      const response = await fetch(`${url}/api/getBlogs?lang=${locale}`, {
          method:'GET',
      })
      return await response.json();
    }
    catch(err){
      console.error('Error fetching blogs:', err)
      return { data: [] }
    }
  }    
  
  export const getBlog = async(locale, slug) => {
    try{
      const response = await fetch(`${url}/api/getBlogs/${slug}?lang=${locale}`, {
          method:'GET',
      })
      return await response.json();
    }
    catch(err){
      console.error('Error fetching blog:', err)
      return { data: [] }
    }
  }     
  export const login = async(body) => {
    try{
      const response = await fetch(`/api/auth`, {
          method:'POST',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body),
          credentials:'include'
      },
    )
      return response;
    }
    catch(err){
      console.error('Error login:', err)
      return { data: [] }
    }
  }
  
  export const getSeo = async(locale, page) => {
    try{
      const response = await fetch(`${url}/api/getSeo?lang=${locale}&page=${page}`, {
          method:'GET',
      })
      return await response.json();
    }
    catch(err){
      console.error('Error fetching seo:', err)
      return { data: [] }
    }
  }  
  export const getSeos = async(locale) => {
    try{
      const response = await fetch(`${url}/api/getSeos?lang=${locale}`, {
          method:'GET',
      })
      return await response.json();
    }
    catch(err){
      console.error('Error fetching seo:', err)
      return { data: [] }
    }
  }    
