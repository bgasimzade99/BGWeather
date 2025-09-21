import { useState, useEffect, useRef } from "react";

export default function SearchBar({ 
  onSearch, 
  placeholder = "Search city...", 
  buttonText = "Search",
  suggestions = [],
  showSuggestions = false,
  onInputChange,
  onSuggestionClick,
  onCloseSuggestions
}) {
  const [city, setCity] = useState("");
  const dropdownRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      onSearch(city);
      setCity("");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);
    if (onInputChange) {
      onInputChange(value);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion.name);
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (onCloseSuggestions) {
          onCloseSuggestions();
        }
      }
    };

    if (showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSuggestions, onCloseSuggestions]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white/20 backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/30 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105"
      >
        <div className="flex items-center px-4 sm:px-6 py-3 sm:py-4">
          <svg 
            className="w-5 h-5 sm:w-6 sm:h-6 text-white/90 mr-3 sm:mr-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="bg-transparent text-white placeholder-white/80 focus:outline-none w-full min-w-0 text-base sm:text-lg font-medium"
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 font-bold text-base sm:text-lg transition-all duration-300 hover:scale-110 shadow-xl"
        >
          {buttonText}
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/20 backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/30 shadow-2xl z-[9999999] max-h-60 overflow-y-auto transform translate-y-0 isolate">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-between group"
            >
              <div>
                <div className="font-medium text-base sm:text-lg">{suggestion.name}</div>
                <div className="text-white/70 text-xs sm:text-sm">
                  {suggestion.country} {suggestion.admin1 && `• ${suggestion.admin1}`}
                </div>
              </div>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/50 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}