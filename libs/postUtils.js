  
  const url = process.env.NEXT_PUBLIC_SITE_URL
  
  export const updateAboutData = async(locale, body) => {        
   
    try{
      const response = await fetch(`${url}/api/getAbout?lang=${locale}`, {
          method: 'PATCH',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body)

      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error updating about data:', err);
      return { data: [] }
    }                 
  }

  
  export const createAboutData = async(locale, body) => {        
   
    try{
      const response = await fetch(`${url}/api/getAbout?lang=${locale}`, {
          method: 'POST',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body)

      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error creating about data:', err);
      return { data: [] }
    }                 
  }  

  export const deleteAboutData = async(locale, body) => {        
   
    try{
      const response = await fetch(`${url}/api/getAbout?lang=${locale}`, {
          method: 'DELETE',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body)

      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error creating about data:', err);
      return { data: [] }
    }                 
  } 
  
  export const updateFaq = async(locale, body) => {        
   
    try{
      const response = await fetch(`${url}/api/getFaq?lang=${locale}`, {
          method: 'PATCH',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body)

      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error updating faq data:', err);
      return { data: [] }
    }                 
  }
  
  export const createFaq = async(locale, body) => {        
   
    try{
      const response = await fetch(`${url}/api/getFaq?lang=${locale}`, {
          method: 'POST',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body)

      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error creating faq data:', err);
      return { data: [] }
    }                 
  }  

  export const deleteFaq = async(locale, body) => {        
   
    try{
      const response = await fetch(`${url}/api/getFaq?lang=${locale}`, {
          method: 'DELETE',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body)

      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error deleting faq data:', err);
      return { data: [] }
    }                 
  }    

  export const updateLogos = async(locale, body) => {        
   
    try{
      const response = await fetch(`${url}/api/getLogos?lang=${locale}`, {
          method: 'PATCH',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body)

      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error updating faq data:', err);
      return { data: [] }
    }                 
  }
  
  export const createLogos = async(locale, body) => {        
   
    try{
      const response = await fetch(`${url}/api/getLogos?lang=${locale}`, {
          method: 'POST',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body)

      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error creating faq data:', err);
      return { data: [] }
    }                 
  }  

  export const deleteLogos = async(locale, body) => {        
   
    try{
      const response = await fetch(`${url}/api/getLogos?lang=${locale}`, {
          method: 'DELETE',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body)

      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error deleting logos data:', err);
      return { data: [] }
    }                 
  }  
  
  export const updateServices = async(service, body) => {        
   
    try{
      const response = await fetch(`${url}/api/getService/${service}`, {
          method: 'PATCH',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body)

      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error updating service data:', err);
      return { data: [] }
    }                 
  }
  
  export const createServices = async(service, body) => {        
   
    try{
      const response = await fetch(`${url}/api/getService/${service}`, {
          method: 'POST',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body)

      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error creating service data:', err);
      return { data: [] }
    }                 
  }  

  export const deleteServices = async(service, body) => {        
   
    try{
      const response = await fetch(`${url}/api/getService/${service}`, {
          method: 'DELETE',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body)

      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error deleting services data:', err);
      return { data: [] }
    }                 
  }  

  export const updatePage = async(body) => {        
   
    try{
      const response = await fetch(`${url}/api/getPage`, {
          method: 'PATCH',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body)

      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error updating page data:', err);
      return { data: [] }
    }                 
  }
  
  export const createPage = async(body) => {        
   
    try{
      const response = await fetch(`${url}/api/getPage`, {
          method: 'POST',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body)

      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error creating page data:', err);
      return { data: [] }
    }                 
  }  

  export const deletePage = async(body) => {        
   
    try{
      const response = await fetch(`${url}/api/getPage`, {
          method: 'DELETE',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body)

      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error deleting page data:', err);
      return { data: [] }
    }                 
  } 
  
  export const updateBlog = async(body, slug) => {        
    try{
      const response = await fetch(`${url}/api/getBlogs/${slug}`, {
          method: 'PATCH',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body)

      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error updating blog data:', err);
      return { data: [] }
    }                 
  }
  
  export const createBlog = async(body) => {        
   
    try{
      const response = await fetch(`${url}/api/getBlogs`, {
          method: 'POST',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body)

      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error creating blog data:', err);
      return { data: [] }
    }                 
  }  

  export const deleteBlog = async(body) => {        
   
    try{
      const response = await fetch(`${url}/api/getBlogs`, {
          method: 'DELETE',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body)

      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error deleting blog data:', err);
      return { data: [] }
    }                 
  } 
  
  export const createProject = async(body) => {        
   
    try{
      const response = await fetch(`${url}/api/getProjects`, {
          method: 'POST',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body)

      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error creating project data:', err);
      return { data: [] }
    }                 
  }  

  export const deleteProject = async(body) => {        
   
    try{
      const response = await fetch(`${url}/api/getProjects`, {
          method: 'DELETE',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body)

      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error deleting project data:', err);
      return { data: [] }
    }                 
  }    


  export const updateProject = async(body) => {        
    try{
      const response = await fetch(`${url}/api/getProjects`, {
          method: 'PATCH',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body)

      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error updating project data:', err);
      return { data: [] }
    }                 
  }  

  export const createSeo = async(body) => {        

    try{
      const response = await fetch(`${url}/api/getSeo`, {
          method: 'POST',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body)

      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error creating seo data:', err);
      return { data: [] }
    }                 
  }  

  export const deleteSeo = async(body) => {        
   
    try{
      const response = await fetch(`${url}/api/getSeo`, {
          method: 'DELETE',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body)

      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error deleting seo data:', err);
      return { data: [] }
    }                 
  }    


  export const updateSeo = async(body) => {        
    try{
      const response = await fetch(`${url}/api/getSeo`, {
          method: 'PATCH',
          credentials:'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(body)

      })        
      return await response.json();        
    }
    catch(err){
      console.error('Error updating seo data:', err);
      return { data: [] }
    }                 
  }    