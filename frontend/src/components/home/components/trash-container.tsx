import { useState } from "react";

export default function TrashContainer() {
  const [nivelLlenado, _] = useState(90);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="mb-4">
        <Trash nivelLlenado={nivelLlenado} />
      </div>
      <p className="text-center mt-4 text-gray-700 font-semibold">
        Nivel de llenado: {nivelLlenado}%
      </p>
    </div>
  );
}

function Trash({ nivelLlenado }: { nivelLlenado: number }) {
  return (
    <div className="relative w-36 h-52 mt-6">
      {/* Cuerpo del tacho */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-300 to-gray-400 rounded-lg shadow-lg overflow-hidden">
        {/* Efecto metálico */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50" />

        {/* Contenido del tacho */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-yellow-600 to-yellow-700 transition-all duration-500 ease-in-out"
          style={{ height: `${nivelLlenado}%` }}
        >
          {/* Efecto de textura de basura */}
          <div
            className="absolute inset-0 bg-opacity-20 bg-black"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Borde superior del tacho */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-gray-500 rounded-t-lg" />

        {/* Sombra interna */}
        <div className="absolute inset-0 shadow-inner rounded-lg pointer-events-none" />
      </div>

      {/* Tapa del tacho */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-44 h-8">
        <div className="relative w-full h-full">
          {/* Parte superior de la tapa */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-400 to-gray-500 rounded-md shadow-md" />

          {/* Borde de la tapa */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-600 rounded-b-md" />

          {/* Manija de la tapa */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-4 bg-gray-700 rounded-full shadow-sm" />
        </div>
      </div>

    </div>
  );
}
