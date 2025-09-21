import React from "react"

const categories = [
  { name: "Frutas", icon: "🥭" },
  { name: "Vegetales", icon: "🥬" },
  { name: "Huevos", icon: "🥚" },
  { name: "Mariscos", icon: "🐟" },
  { name: "Artesanales", icon: "🍯" },
  { name: "B2B Hoteles", icon: "🏨" },
]

export default function CategoriesQuick() {
  return (
    <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {categories.map((c) => (
            <div
              key={c.name}
              className="flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105 transition"
            >
              <div className="w-16 h-16 flex items-center justify-center text-3xl rounded-full bg-emerald-100 dark:bg-emerald-800/40">
                {c.icon}
              </div>
              <span className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
