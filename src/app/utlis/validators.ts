
export function idValidator(formData: any,index:number, value:any){

    if (!value) {
      return null;
    }

    const otherIds = formData
      .filter((item: any, i: number) => i !== index)
      .map((category: any) => category.id);

    const isExists = otherIds.includes(value);

    return isExists ? { idExists: true } : null;
}


export function nameValidator(formData: any,index:number, value:any){

  if (!value) {
    return null;
  }

  const otherCategories = formData.filter(
    (item: any, i: number) => i !== index
  );

  const isExists = otherCategories.some(
    (category: any) => category.name.toLowerCase() === value.toLowerCase()
  );

  return isExists ? { nameExists: true } : null;
}

