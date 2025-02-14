"use client"

interface ZoneData {
  title?: string
  description?: string
  image?: string
}

interface InfoModalProps {
  zone: ZoneData
  onClose: () => void
}

export default function InfoModal({ zone, onClose }: InfoModalProps) {
  if (!zone) return null

  return (
    <div className=" infoModal fixed inset-0 flex justify-center items-center z-50">
    <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-md"></div>
    <div className="relative bg-white bg-opacity-80 p-8 rounded-2xl shadow-2xl max-w-md w-11/12 max-h-[90vh] overflow-y-auto z-50 border border-white border-opacity-40">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">{zone.title || "Information"}</h2>
      <p className="text-gray-700 mb-6 leading-relaxed">{zone.description}</p>
      {zone.image && (
        <img
          src={zone.image}
          alt={zone.title || "Image"}
          className="w-full h-48 object-cover rounded-lg mb-6 shadow-md"
        />
      )}
      <button
        onClick={onClose}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Fermer
      </button>
    </div>
  </div>
  
  
  )
}
