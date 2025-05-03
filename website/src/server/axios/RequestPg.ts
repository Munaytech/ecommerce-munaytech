import axios, { all } from "axios";

const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api/v01", // URL base
  baseURL:
    (process.env.NEXT_PUBLIC_BACKEND_URL || "") +
      (process.env.NEXT_PUBLIC_PREFIX_URL || "") || "", // URL base
  timeout: 5000, // Tiempo máximo para la solicitud
  headers: {
    "Content-Type": "application/json",
    // "Content-Type": "multipart/form-data",
  },
});

// Función global para manejar solicitudes
const RequestPg = async (
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
) => {
  try {
    const response = await api({
      method, // Método HTTP: GET, POST, PUT, DELETE
      url, // URL relativa: "/api/endpoint"
      data, // Datos para POST o PUT
      headers: {
        "Content-Type": headers != undefined ? headers : "application/json",
      }, // Encabezados personalizados
    });

    // Si todo está bien, devuelve los datos
    return {
      success: true,
      all: response.data,
      data: response.data.data,
    };
  } catch (error: any) {
    // Manejo de errores
    return {
      success: false,
      error:
        error.response?.data?.message || error.message || "Error desconocido",
    };
  }
};

export default RequestPg;
