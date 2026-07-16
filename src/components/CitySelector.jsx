import { useState } from 'react'
import { Search, X } from 'lucide-react'

function CitySelector({ selectedCities, onCityToggle, multiSelect = true, label }) {
  const [searchQuery, setSearchQuery] = useState('')

  const commonCities = ['Casablanca', 'Rabat', 'Tanger', 'Marrakech', 'Fès', 'Agadir', 'Meknès', 'Oujda', 'Kénitra', 'Tétouan']
  const allMoroccanCities = [
    'Casablanca', 'Rabat', 'Tanger', 'Marrakech', 'Fès', 'Agadir', 'Meknès', 'Oujda', 'Kénitra', 'Tétouan',
    'Safi', 'El Jadida', 'Beni Mellal', 'Nador', 'Al Hoceima', 'Taza', 'Khouribga', 'Settat', 'Mohammedia',
    'Larache', 'Ksar El Kebir', 'Taza', 'Berkane', 'Taourirt', 'Guercif', 'Errachidia', 'Ouarzazate', 'Zagora',
    'Tantan', 'Laayoune', 'Dakhla', 'Guelmim', 'Sidi Ifni', 'Tiznit', 'Taroudant', 'Essaouira', 'Azemmour',
    'Jorf Lasfar', 'El Jadida', 'Sidi Bennour', 'Youssoufia', 'Béni Mellal', 'Khouribga', 'Boulemane', 'Missour',
    'Midelt', 'Azilal', 'Demnate', 'Imouzzer', 'Chefchaouen', 'Tetouan', 'Larache', 'Ksar El Kebir', 'Ouazzane'
  ]

  const filteredCities = allMoroccanCities.filter(city =>
    city.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedCities.includes(city)
  )

  const handleCityClick = (city) => {
    if (multiSelect) {
      onCityToggle(city)
    } else {
      // Single select: clear previous and select new
      onCityToggle(city, true)
    }
  }

  const handleAddCity = (city) => {
    if (multiSelect) {
      onCityToggle(city)
    } else {
      onCityToggle(city, true)
    }
    setSearchQuery('')
  }

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() && !selectedCities.includes(searchQuery.trim())) {
      handleAddCity(searchQuery.trim())
    }
  }

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-3">
          {label}
        </label>
      )}

      {/* Search Bar */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cream-white" aria-hidden="true" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          placeholder="Rechercher une ville..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-cream-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
        />
      </div>

      {/* Search Results Dropdown */}
      {searchQuery && filteredCities.length > 0 && (
        <div className="mb-3 p-2 bg-cream-white border border-cream-white rounded-xl shadow-lg max-h-40 overflow-y-auto">
          {filteredCities.slice(0, 5).map(city => (
            <button
              key={city}
              onClick={() => handleAddCity(city)}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-cream text-sm text-slate-700 transition-colors"
            >
              {city}
            </button>
          ))}
        </div>
      )}

      {/* Common Cities Chips */}
      <div className="flex flex-wrap gap-2 mb-3">
        {commonCities.map(city => {
          const isSelected = selectedCities.includes(city)
          return (
            <button
              key={city}
              onClick={() => handleCityClick(city)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isSelected
                  ? 'bg-brand-primary text-white'
                  : 'bg-cream-white text-slate-700 hover:bg-cream-white'
              }`}
            >
              {city}
            </button>
          )
        })}
      </div>

      {/* Selected Cities */}
      {selectedCities.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedCities.map(city => (
            <span
              key={city}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm"
            >
              {city}
              <button
                onClick={() => onCityToggle(city)}
                className="hover:text-brand-primary-dark"
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default CitySelector
