"use server";

import RequestPg from "./RequestPg";

export async function fetchServerPg(
  url: string,
  method: string,
  data?: {
    [key: string]:
      | FormDataEntryValue
      | FormDataEntryValue[]
      | Object
      | number
      | undefined;
  },
  headers?: string
) {
  const result = await RequestPg(url, method, data, headers);

  if (!result.success) {
    // throw new Error(result.error || "Error al obtener data");
  }

  return result.data;
}
