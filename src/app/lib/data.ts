

export const getCategories = async () => {
  try {
   const res = await fetch("http://localhost:1337/api/categorias?populate[sub_categorias]=sub_categorias")
   const data = await res.json();
   
   return data;
    
  } catch (error) {
    console.error(error);
  }

}