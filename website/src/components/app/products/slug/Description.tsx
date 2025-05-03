import React from "react";
import { Info } from "lucide-react"; // opcional, usa cualquier ícono que tengas

export const Description = ({ description = "" }: { description: string }) => {
  const hasContent = description?.trim() !== "" && description !== null;

  return (
    <div className="p-4">
      {hasContent ? (
        <div
          className="description text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center text-gray-500 py-10 border rounded-lg shadow-sm bg-gray-50">
          <Info className="w-10 h-10 mb-2 text-primary" />
          <p className="text-lg font-medium">
            Este producto aún no tiene descripción
          </p>
          <p className="text-sm text-gray-400">
            Consulta los detalles con el vendedor
          </p>
        </div>
      )}
    </div>
  );
};
