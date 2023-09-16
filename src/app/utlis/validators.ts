
export function validator(formData: FormData[], index: number, value: string, type: string) {
  if (!value) return null;

  const key = type === "id" ? "id" : "name";
  const isExists = formData
    .filter((field: any, i: number) => i !== index)
    .some((field: any) => field[key].toString().toLowerCase() === value.toString().toLowerCase());

  return isExists ? { [`${key}Exists`]: true } : null;
}
