interface IItem {
  entry : string
}

export const getApiResponse = async( resource:string, query?:string|null ) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`
      );
    const result = await response.json();
    return result
}

export const getNestedApiResponse = async( resource:string, objectProperty:keyof IItem) => {
    const response = await getApiResponse(resource);
    const result = response.data.flatMap((item:IItem) => item[objectProperty])  
    return result
}

export const getRandomDataSlice = (data:Array<object> , gap:number) => {
  const random: number = Math.floor(Math.random() * (data.length + 1));
  const result = {data: data.slice(random-gap, random)}
  return result
}