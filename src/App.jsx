import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [language, setLanguage] = useState('en');
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState('hourly'); // 'hourly' or 'daily'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const BASE_URL = "https://api.open-meteo.com/v1";

  const translations = {
    en: {
      title: "BGWeather",
      subtitle: "Professional Weather Service",
      searchPlaceholder: "Search city... (e.g. Riga, Istanbul)",
      searchButton: "Search",
      loading: "Loading weather data...",
      locationDenied: "Location access denied. Please search for a city manually.",
      geolocationNotSupported: "Geolocation is not supported by this browser.",
      weatherDataError: "No data yet, please allow location or search a city.",
      cityNotFound: "City not found!",
      currentLocation: "Current Location",
      fiveDayForecast: "5-Day Forecast",
      sunMoon: "Sun & Moon",
      sunrise: "Sunrise",
      sunset: "Sunset",
      wind: "Wind",
      speed: "Speed",
      direction: "Direction",
      visibility: "Visibility",
      distance: "Distance",
      uvIndex: "UV Index",
      humidity: "Humidity",
      pressure: "Pressure",
      realFeel: "RealFeel®",
      today: "Today",
      discoverWeather: "Discover Weather",
      welcomeMessage: "Get accurate weather forecasts for any city worldwide. Search for your location or allow access to your current position.",
      getStarted: "Get Started",
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      // Weather conditions
      clearSky: "Clear Sky",
      mainlyClear: "Mainly Clear",
      partlyCloudy: "Partly Cloudy",
      overcast: "Overcast",
      fog: "Fog",
      lightRain: "Light Rain",
      moderateRain: "Moderate Rain",
      heavyRain: "Heavy Rain",
      lightSnow: "Light Snow",
      moderateSnow: "Moderate Snow",
      heavySnow: "Heavy Snow",
      thunderstorm: "Thunderstorm",
      // Footer
      copyright: "All rights reserved.",
      madeWith: "Made with",
      inAzerbaijan: "in Azerbaijan by",
      bgDev: "BGDev",
      // Favorites
      favorites: "Favorites",
      addToFavorites: "Add to Favorites",
      removeFromFavorites: "Remove from Favorites",
      favoriteCities: "Favorite Cities",
      noFavorites: "No favorite cities yet",
    // Dark Mode
    darkMode: "Dark Mode",
    lightMode: "Light Mode"
    },
    tr: {
      title: "BGWeather",
      subtitle: "Profesyonel Hava Durumu Servisi",
      searchPlaceholder: "Şehir ara... (örn. Riga, İstanbul)",
      searchButton: "Ara",
      loading: "Hava durumu verileri yükleniyor...",
      locationDenied: "Konum erişimi reddedildi. Lütfen manuel olarak bir şehir arayın.",
      geolocationNotSupported: "Bu tarayıcı konum hizmetlerini desteklemiyor.",
      weatherDataError: "Henüz veri yok, lütfen konum izni verin veya şehir arayın.",
      cityNotFound: "Şehir bulunamadı!",
      currentLocation: "Mevcut Konum",
      fiveDayForecast: "5 Günlük Tahmin",
      sunMoon: "Güneş ve Ay",
      sunrise: "Gün Doğumu",
      sunset: "Gün Batımı",
      wind: "Rüzgar",
      speed: "Hız",
      direction: "Yön",
      visibility: "Görüş",
      distance: "Mesafe",
      uvIndex: "UV İndeksi",
      humidity: "Nem",
      pressure: "Basınç",
      realFeel: "Hissedilen Sıcaklık",
      today: "Bugün",
      discoverWeather: "Hava Durumunu Keşfet",
      welcomeMessage: "Dünya çapında herhangi bir şehir için doğru hava durumu tahminleri alın. Konumunuzu arayın veya mevcut konumunuza erişim izni verin.",
      getStarted: "Başlayın",
      months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
      // Weather conditions
      clearSky: "Açık Gökyüzü",
      mainlyClear: "Çoğunlukla Açık",
      partlyCloudy: "Parçalı Bulutlu",
      overcast: "Kapalı",
      fog: "Sis",
      lightRain: "Hafif Yağmur",
      moderateRain: "Orta Şiddette Yağmur",
      heavyRain: "Şiddetli Yağmur",
      lightSnow: "Hafif Kar",
      moderateSnow: "Orta Şiddette Kar",
      heavySnow: "Şiddetli Kar",
      thunderstorm: "Gök Gürültülü Fırtına",
      // Footer
      copyright: "Tüm hakları saklıdır.",
      madeWith: "Sevgiyle yapıldı",
      inAzerbaijan: "Azerbaycan'da",
      bgDev: "BGDev",
      // Favorites
      favorites: "Favoriler",
      addToFavorites: "Favorilere Ekle",
      removeFromFavorites: "Favorilerden Çıkar",
      favoriteCities: "Favori Şehirler",
      noFavorites: "Henüz favori şehir yok",
    // Dark Mode
    darkMode: "Karanlık Mod",
    lightMode: "Aydınlık Mod"
    },
    az: {
      title: "BGWeather",
      subtitle: "Peşəkar Hava Durumu Xidməti",
      searchPlaceholder: "Şəhər axtar... (məs. Riga, İstanbul)",
      searchButton: "Axtar",
      loading: "Hava durumu məlumatları yüklənir...",
      locationDenied: "Məkan girişi rədd edildi. Zəhmət olmasa əl ilə şəhər axtarın.",
      geolocationNotSupported: "Bu brauzer məkan xidmətlərini dəstəkləmir.",
      weatherDataError: "Hələ məlumat yoxdur, zəhmət olmasa məkan icazəsi verin və ya şəhər axtarın.",
      cityNotFound: "Şəhər tapılmadı!",
      currentLocation: "Mövcud Məkan",
      fiveDayForecast: "5 Günlük Proqnoz",
      sunMoon: "Günəş və Ay",
      sunrise: "Günəş Doğuşu",
      sunset: "Günəş Batması",
      wind: "Külək",
      speed: "Sürət",
      direction: "İstiqamət",
      visibility: "Görüş",
      distance: "Məsafə",
      uvIndex: "UV İndeksi",
      humidity: "Rütubət",
      pressure: "Təzyiq",
      realFeel: "Hiss Edilən Temperatur",
      today: "Bu Gün",
      discoverWeather: "Hava Durumunu Kəşf Et",
      welcomeMessage: "Dünya üzrə istənilən şəhər üçün dəqiq hava durumu proqnozları alın. Məkanınızı axtarın və ya mövcud məkanınıza giriş icazəsi verin.",
      getStarted: "Başla",
      months: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun", "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"],
      // Weather conditions
      clearSky: "Açıq Səma",
      mainlyClear: "Əsasən Açıq",
      partlyCloudy: "Qismən Buludlu",
      overcast: "Buludlu",
      fog: "Duman",
      lightRain: "Yüngül Yağış",
      moderateRain: "Orta Yağış",
      heavyRain: "Güclü Yağış",
      lightSnow: "Yüngül Qar",
      moderateSnow: "Orta Qar",
      heavySnow: "Güclü Qar",
      thunderstorm: "Göy Gürültülü Fırtına",
      // Footer
      copyright: "Bütün hüquqlar qorunur.",
      madeWith: "Sevgi ilə hazırlanıb",
      inAzerbaijan: "Azərbaycanda",
      bgDev: "BGDev",
      // Favorites
      favorites: "Seçilmişlər",
      addToFavorites: "Seçilmişlərə Əlavə Et",
      removeFromFavorites: "Seçilmişlərdən Çıxar",
      favoriteCities: "Seçilmiş Şəhərlər",
      noFavorites: "Hələ seçilmiş şəhər yoxdur",
    // Dark Mode
    darkMode: "Qaranlıq Rejim",
    lightMode: "İşıqlı Rejim"
    },
    ru: {
      title: "BGWeather",
      subtitle: "Профессиональная Служба Погоды",
      searchPlaceholder: "Поиск города... (напр. Рига, Стамбул)",
      searchButton: "Поиск",
      loading: "Загрузка данных о погоде...",
      locationDenied: "Доступ к местоположению запрещен. Пожалуйста, найдите город вручную.",
      geolocationNotSupported: "Этот браузер не поддерживает службы геолокации.",
      weatherDataError: "Пока нет данных, пожалуйста, разрешите местоположение или найдите город.",
      cityNotFound: "Город не найден!",
      currentLocation: "Текущее Местоположение",
      fiveDayForecast: "5-дневный Прогноз",
      sunMoon: "Солнце и Луна",
      sunrise: "Восход Солнца",
      sunset: "Закат Солнца",
      wind: "Ветер",
      speed: "Скорость",
      direction: "Направление",
      visibility: "Видимость",
      distance: "Расстояние",
      uvIndex: "УФ Индекс",
      humidity: "Влажность",
      pressure: "Давление",
      realFeel: "Ощущаемая Температура",
      today: "Сегодня",
      discoverWeather: "Откройте Погоду",
      welcomeMessage: "Получайте точные прогнозы погоды для любого города мира. Найдите свое местоположение или разрешите доступ к текущей позиции.",
      getStarted: "Начать",
      months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      // Weather conditions
      clearSky: "Ясное Небо",
      mainlyClear: "В основном Ясно",
      partlyCloudy: "Переменная Облачность",
      overcast: "Пасмурно",
      fog: "Туман",
      lightRain: "Легкий Дождь",
      moderateRain: "Умеренный Дождь",
      heavyRain: "Сильный Дождь",
      lightSnow: "Легкий Снег",
      moderateSnow: "Умеренный Снег",
      heavySnow: "Сильный Снег",
      thunderstorm: "Гроза",
      // Footer
      copyright: "Все права защищены.",
      madeWith: "Сделано с любовью",
      inAzerbaijan: "в Азербайджане",
      bgDev: "BGDev",
      // Favorites
      favorites: "Избранное",
      addToFavorites: "Добавить в избранное",
      removeFromFavorites: "Удалить из избранного",
      favoriteCities: "Избранные города",
      noFavorites: "Пока нет избранных городов",
    // Dark Mode
    darkMode: "Темный режим",
    lightMode: "Светлый режим"
    }
  };

  const t = translations[language];
  
  // Tab translations
  const tabTranslations = {
    en: {
      hourlyForecast: "Hourly Forecast",
      dailyForecast: "7-Day Forecast"
    },
    tr: {
      hourlyForecast: "Saatlik Tahmin",
      dailyForecast: "7 Günlük Tahmin"
    },
    az: {
      hourlyForecast: "Saatlıq Proqnoz",
      dailyForecast: "7 Günlük Proqnoz"
    },
    ru: {
      hourlyForecast: "Почасовой Прогноз",
      dailyForecast: "7-Дневный Прогноз"
    }
  };
  
  const tabT = tabTranslations[language];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setError(t.locationDenied);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    } else {
      setError(t.geolocationNotSupported);
    }
  }, []);

  useEffect(() => {
    if (currentLocation) {
      handleLocationWeather(currentLocation.lat, currentLocation.lon);
    }
  }, [currentLocation]);

  const handleLocationWeather = async (lat, lon) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,weather_code&timezone=auto`
      );

      if (!response.ok) {
        throw new Error(t.weatherDataError);
      }

      const data = await response.json();
      
      // Transform Open-Meteo data to our format
        const weatherData = {
          location: {
            name: t.currentLocation
          },
        current: {
          temp_c: Math.round(data.current.temperature_2m),
          condition: {
            text: getWeatherDescription(data.current.weather_code),
            icon: getWeatherIcon(data.current.weather_code)
          },
          humidity: data.current.relative_humidity_2m,
          wind_kph: Math.round(data.current.wind_speed_10m * 3.6),
          wind_degree: 0, // Open-Meteo doesn't provide wind direction in basic plan
          pressure_mb: 1013, // Default value
          vis_km: 10, // Default value
          uv: 0, // Default value
          feelslike_c: Math.round(data.current.temperature_2m)
        }
      };

      const forecastData = {
        forecast: {
          forecastday: data.daily.time.map((date, index) => ({
            date: date,
            day: {
              condition: {
                text: getWeatherDescription(data.daily.weather_code[index]),
                icon: getWeatherIcon(data.daily.weather_code[index])
              },
              maxtemp_c: data.daily.temperature_2m_max[index],
              mintemp_c: data.daily.temperature_2m_min[index],
              avgtemp_c: data.daily.temperature_2m_mean ? data.daily.temperature_2m_mean[index] : (data.daily.temperature_2m_max[index] + data.daily.temperature_2m_min[index]) / 2
            },
            hour: data.hourly.time.slice(0, 24).map((time, hourIndex) => ({
              time: time,
              temp_c: data.hourly.temperature_2m[hourIndex],
              condition: {
                text: getWeatherDescription(data.hourly.weather_code[hourIndex]),
                icon: getWeatherIcon(data.hourly.weather_code[hourIndex])
              },
              feelslike_c: data.hourly.temperature_2m[hourIndex],
              chance_of_rain: Math.round(data.hourly.relative_humidity_2m[hourIndex] * 0.8)
            }))
          }))
        }
      };
      
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleSearch = async (city) => {
    setLoading(true);
    setError("");
    setWeather(null);
    setForecast(null);
    try {
      // First get coordinates for the city
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
      );
      
      if (!geoResponse.ok) {
        throw new Error(t.cityNotFound);
      }
      
      const geoData = await geoResponse.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error(t.cityNotFound);
      }
      
      const { latitude, longitude, name, country } = geoData.results[0];
      
      // Now get weather data
      const response = await fetch(
        `${BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,weather_code&timezone=auto`
      );

      if (!response.ok) {
        throw new Error(t.weatherDataError);
      }

      const data = await response.json();
      
      // Transform Open-Meteo data to our format
      const weatherData = {
        location: {
          name: `${name}, ${country}`
        },
        current: {
          temp_c: Math.round(data.current.temperature_2m),
          condition: {
            text: getWeatherDescription(data.current.weather_code),
            icon: getWeatherIcon(data.current.weather_code)
          },
          humidity: data.current.relative_humidity_2m,
          wind_kph: Math.round(data.current.wind_speed_10m * 3.6),
          wind_degree: 0,
          pressure_mb: 1013,
          vis_km: 10,
          uv: 0,
          feelslike_c: Math.round(data.current.temperature_2m)
        }
      };

      const forecastData = {
        forecast: {
          forecastday: data.daily.time.map((date, index) => ({
            date: date,
            day: {
              condition: {
                text: getWeatherDescription(data.daily.weather_code[index]),
                icon: getWeatherIcon(data.daily.weather_code[index])
              },
              maxtemp_c: data.daily.temperature_2m_max[index],
              mintemp_c: data.daily.temperature_2m_min[index],
              avgtemp_c: data.daily.temperature_2m_mean ? data.daily.temperature_2m_mean[index] : (data.daily.temperature_2m_max[index] + data.daily.temperature_2m_min[index]) / 2
            },
            hour: data.hourly.time.slice(0, 24).map((time, hourIndex) => ({
              time: time,
              temp_c: data.hourly.temperature_2m[hourIndex],
              condition: {
                text: getWeatherDescription(data.hourly.weather_code[hourIndex]),
                icon: getWeatherIcon(data.hourly.weather_code[hourIndex])
              },
              feelslike_c: data.hourly.temperature_2m[hourIndex],
              chance_of_rain: Math.round(data.hourly.relative_humidity_2m[hourIndex] * 0.8)
            }))
          }))
        }
      };
      
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const getBackgroundStyle = () => {
    if (!weather) return "bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 animate-gradient";
    
    const condition = getWeatherDescription(weather.current.condition.code).toLowerCase();
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 18;
    
    if (condition.includes('sunny') || condition.includes('clear')) {
      return isNight ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 animate-gradient" : "bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 animate-gradient";
    } else if (condition.includes('cloud')) {
      return "bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700 animate-gradient";
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
      return "bg-gradient-to-br from-gray-600 via-blue-700 to-blue-800 animate-gradient";
    } else if (condition.includes('snow')) {
      return "bg-gradient-to-br from-gray-300 via-blue-300 to-blue-400 animate-gradient";
    } else if (condition.includes('thunder') || condition.includes('storm')) {
      return "bg-gradient-to-br from-purple-800 via-indigo-900 to-black animate-gradient";
    } else {
      return "bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 animate-gradient";
    }
  };

  const getDailyForecast = (forecast) => {
    if (!forecast) return [];
    
    return forecast.forecast.forecastday.map(day => ({
      date: day.date,
      weather: day.day.condition,
      minTemp: Math.round(day.day.mintemp_c),
      maxTemp: Math.round(day.day.maxtemp_c),
      avgTemp: Math.round(day.day.avgtemp_c)
    }));
  };

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    const days = {
      en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      tr: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
      az: ['Bazar', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə'],
      ru: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
    };
    return days[language][date.getDay()];
  };

  // Favorite Cities Functions
  const addToFavorites = (cityName) => {
    if (!favorites.includes(cityName)) {
      const newFavorites = [...favorites, cityName];
      setFavorites(newFavorites);
      localStorage.setItem('bgweather-favorites', JSON.stringify(newFavorites));
    }
  };

  const removeFromFavorites = (cityName) => {
    const newFavorites = favorites.filter(city => city !== cityName);
    setFavorites(newFavorites);
    localStorage.setItem('bgweather-favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (cityName) => {
    return favorites.includes(cityName);
  };

  const loadFavorites = () => {
    const saved = localStorage.getItem('bgweather-favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  };

  // Search suggestions function
  const getSearchSuggestions = async (query) => {
    if (query.length < 2) {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      // Add a small delay to avoid too many API calls
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=${language}&format=json`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setSearchSuggestions(data.results);
          setShowSuggestions(true);
        } else {
          setSearchSuggestions([]);
          setShowSuggestions(false);
        }
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Load favorites on component mount
  useEffect(() => {
    loadFavorites();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = t.months[date.getMonth()];
    const year = date.getFullYear();
    const dayName = getDayName(dateString);
    
    return {
      en: `${day} ${month} ${year}`,
      tr: `${day} ${month} ${year}`,
      az: `${day} ${month} ${year}`,
      ru: `${day} ${month} ${year}`
    }[language];
  };

  const getWeatherDescription = (code) => {
    const weatherCodes = {
      0: t.clearSky,
      1: t.mainlyClear,
      2: t.partlyCloudy,
      3: t.overcast,
      45: t.fog,
      48: t.fog,
      51: t.lightRain,
      53: t.lightRain,
      55: t.lightRain,
      61: t.lightRain,
      63: t.moderateRain,
      65: t.heavyRain,
      71: t.lightSnow,
      73: t.moderateSnow,
      75: t.heavySnow,
      77: t.lightSnow,
      80: t.lightRain,
      81: t.moderateRain,
      82: t.heavyRain,
      85: t.lightSnow,
      86: t.heavySnow,
      95: t.thunderstorm,
      96: t.thunderstorm,
      99: t.thunderstorm
    };
    return weatherCodes[code] || t.clearSky;
  };

  const getWeatherIcon = (code) => {
    const iconCodes = {
      0: "//cdn.weatherapi.com/weather/64x64/day/113.png",
      1: "//cdn.weatherapi.com/weather/64x64/day/113.png",
      2: "//cdn.weatherapi.com/weather/64x64/day/116.png",
      3: "//cdn.weatherapi.com/weather/64x64/day/119.png",
      45: "//cdn.weatherapi.com/weather/64x64/day/248.png",
      48: "//cdn.weatherapi.com/weather/64x64/day/248.png",
      51: "//cdn.weatherapi.com/weather/64x64/day/296.png",
      53: "//cdn.weatherapi.com/weather/64x64/day/302.png",
      55: "//cdn.weatherapi.com/weather/64x64/day/308.png",
      61: "//cdn.weatherapi.com/weather/64x64/day/296.png",
      63: "//cdn.weatherapi.com/weather/64x64/day/302.png",
      65: "//cdn.weatherapi.com/weather/64x64/day/308.png",
      71: "//cdn.weatherapi.com/weather/64x64/day/338.png",
      73: "//cdn.weatherapi.com/weather/64x64/day/338.png",
      75: "//cdn.weatherapi.com/weather/64x64/day/338.png",
      77: "//cdn.weatherapi.com/weather/64x64/day/338.png",
      80: "//cdn.weatherapi.com/weather/64x64/day/176.png",
      81: "//cdn.weatherapi.com/weather/64x64/day/176.png",
      82: "//cdn.weatherapi.com/weather/64x64/day/176.png",
      85: "//cdn.weatherapi.com/weather/64x64/day/338.png",
      86: "//cdn.weatherapi.com/weather/64x64/day/338.png",
      95: "//cdn.weatherapi.com/weather/64x64/day/389.png",
      96: "//cdn.weatherapi.com/weather/64x64/day/389.png",
      99: "//cdn.weatherapi.com/weather/64x64/day/389.png"
    };
    return iconCodes[code] || "//cdn.weatherapi.com/weather/64x64/day/113.png";
  };

  return (
    <div className={`min-h-screen ${getBackgroundStyle()} transition-all duration-1000 relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-ping"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-bounce"></div>
      </div>
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-xl border-b border-white/20 shadow-2xl relative z-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Row - Logo & Controls */}
        <div className="flex items-center justify-between mb-6">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="relative">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-ping"></div>
                  <div className="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-300 rounded-full"></div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-30 -z-10"></div>
            </div>
            
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {t.title}
        </h1>
              <p className="text-white/80 text-xs sm:text-sm font-medium hidden sm:block">{t.subtitle}</p>
            </div>
          </div>

          {/* Desktop Control Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Favorites Button */}
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-4 py-2 rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-105 shadow-xl flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>{t.favorites}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl ${
                darkMode 
                  ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-yellow-400' 
                  : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800'
              }`}
              title={darkMode ? t.lightMode : t.darkMode}
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                </svg>
              )}
            </button>

            {/* Language Selector */}
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-2 shadow-lg border border-white/30">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-white text-sm font-medium border-none outline-none cursor-pointer"
              >
                <option value="en" className="bg-gray-800 text-white">🇺🇸 EN</option>
                <option value="tr" className="bg-gray-800 text-white">🇹🇷 TR</option>
                <option value="az" className="bg-gray-800 text-white">🇦🇿 AZ</option>
                <option value="ru" className="bg-gray-800 text-white">🇷🇺 RU</option>
              </select>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 rounded-2xl bg-white/20 backdrop-blur-xl text-white hover:bg-white/30 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/20 backdrop-blur-2xl rounded-2xl p-6 mb-6 shadow-2xl border border-white/30">
            <div className="space-y-4">
              {/* Favorites Button */}
              <button
                onClick={() => {
                  setShowFavorites(!showFavorites);
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-105 shadow-xl flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span>{t.favorites}</span>
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-full p-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl flex items-center justify-center space-x-2 ${
                  darkMode 
                    ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-yellow-400' 
                    : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800'
                }`}
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                  </svg>
                )}
                <span>{darkMode ? t.lightMode : t.darkMode}</span>
              </button>

              {/* Language Selector */}
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-3 shadow-lg border border-white/30">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-transparent text-white text-sm font-medium border-none outline-none cursor-pointer"
                >
                  <option value="en" className="bg-gray-800 text-white">🇺🇸 English</option>
                  <option value="tr" className="bg-gray-800 text-white">🇹🇷 Türkçe</option>
                  <option value="az" className="bg-gray-800 text-white">🇦🇿 Azərbaycan</option>
                  <option value="ru" className="bg-gray-800 text-white">🇷🇺 Русский</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Row - Search & Location */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-center lg:justify-start">
          <div className="w-full max-w-md lg:max-w-lg relative z-[100]">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder={t.searchPlaceholder} 
              buttonText={t.searchButton}
              suggestions={searchSuggestions}
              showSuggestions={showSuggestions}
              onInputChange={getSearchSuggestions}
              onSuggestionClick={(suggestion) => {
                handleSearch(suggestion.name);
                setShowSuggestions(false);
              }}
              onCloseSuggestions={() => setShowSuggestions(false)}
            />
          </div>
          
          {/* Geolocation Button */}
          <button
            onClick={() => {
              if (navigator.geolocation) {
                setLoading(true);
                setError("");
                
                navigator.geolocation.getCurrentPosition(
                  async (position) => {
                    try {
                      const lat = position.coords.latitude;
                      const lon = position.coords.longitude;
                      setCurrentLocation({ lat, lon });
                      await handleLocationWeather(lat, lon);
                    } catch (error) {
                      console.error("Weather fetch error:", error);
                      setError(t.weatherDataError);
                      setLoading(false);
                    }
                  },
                  (error) => {
                    console.error("Geolocation error:", error);
                    setError(t.locationDenied);
                    setLoading(false);
                  },
                  {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 300000
                  }
                );
              } else {
                setError(t.geolocationNotSupported);
              }
            }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl flex items-center space-x-2 whitespace-nowrap"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Use My Location</span>
          </button>
        </div>
        </div>
      </div>

      {/* Favorites Dropdown */}
      {showFavorites && (
        <div className="bg-white/20 backdrop-blur-2xl rounded-3xl p-6 mx-4 mb-6 shadow-2xl border border-white/30 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-white">{t.favoriteCities}</h3>
            <button
              onClick={() => setShowFavorites(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {favorites.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">⭐</div>
              <p className="text-white/70 text-lg">{t.noFavorites}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((city, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleSearch(city);
                    setShowFavorites(false);
                  }}
                  className="bg-white/10 hover:bg-white/20 rounded-2xl p-4 text-left transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-bold text-lg">{city}</h4>
                      <p className="text-white/70 text-sm">Click to view weather</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromFavorites(city);
                      }}
                      className="text-red-400 hover:text-red-300 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/30">
              {/* Premium Loading Animation */}
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-white/20 border-t-blue-400 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-400 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                </div>
                <span className="text-white text-xl font-semibold animate-pulse">{t.loading}</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/30 backdrop-blur-xl border border-red-400/50 rounded-2xl p-6 mb-8 shadow-2xl">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-200 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-100 font-semibold text-lg">{error}</p>
            </div>
          </div>
        )}

        {weather && (
          <div className="space-y-8">
            {/* Main Weather Card */}
            <div className="bg-white/15 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/30 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-3xl transform hover:-translate-y-2">
              <div className="flex flex-col lg:flex-row items-center justify-between mb-6 sm:mb-10">
                <div className="text-center lg:text-left mb-6 sm:mb-8 lg:mb-0">
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-4 mb-3">
                    <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white text-center sm:text-left">
                      {weather.location.name === "Current Location" ? t.currentLocation : weather.location.name}
                    </h2>
                    {/* Favorite Button */}
                    <button
                      onClick={() => isFavorite(weather.location.name) ? removeFromFavorites(weather.location.name) : addToFavorites(weather.location.name)}
                      className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-110 ${
                        isFavorite(weather.location.name) 
                          ? 'bg-yellow-500 text-white shadow-lg' 
                          : 'bg-white/20 text-white/70 hover:bg-yellow-500 hover:text-white'
                      }`}
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill={isFavorite(weather.location.name) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-white/90 text-lg sm:text-2xl mb-3 font-medium">
                    {formatDate(new Date().toISOString().split('T')[0])}
                  </p>
                  <p className="text-white/80 text-lg sm:text-xl capitalize font-medium">
                    {getWeatherDescription(weather.current.condition.code)}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 lg:space-x-12">
                  <div className="text-center">
                    <div className="text-6xl sm:text-8xl lg:text-9xl font-light text-white mb-2 sm:mb-4">
                      {Math.round(weather.current.temp_c)}°
                    </div>
                    <div className="flex items-center justify-center space-x-4 sm:space-x-6 text-white/90 text-lg sm:text-2xl">
                      <span className="font-semibold">↑ {Math.round(weather.current.temp_c + 5)}°</span>
                      <span className="font-semibold">↓ {Math.round(weather.current.temp_c - 5)}°</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <img
                      src={`https:${weather.current.condition.icon}`}
                      alt={getWeatherDescription(weather.current.condition.code)}
                      className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>

              {/* Weather Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pt-6 sm:pt-8 border-t border-white/30">
                <div className="text-center bg-white/15 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300">
                  <div className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">
                    {Math.round(weather.current.feelslike_c)}°
                  </div>
                  <p className="text-white/80 text-xs sm:text-sm font-semibold">{t.realFeel}</p>
                </div>
                <div className="text-center bg-white/15 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300">
                  <div className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">
                    {weather.current.humidity}%
                  </div>
                  <p className="text-white/80 text-xs sm:text-sm font-semibold">{t.humidity}</p>
                </div>
                <div className="text-center bg-white/15 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300">
                  <div className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">
                    {weather.current.wind_kph}
                  </div>
                  <p className="text-white/80 text-xs sm:text-sm font-semibold">{t.wind} (km/h)</p>
                </div>
                <div className="text-center bg-white/15 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-300">
                  <div className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">
                    {weather.current.pressure_mb}
                  </div>
                  <p className="text-white/80 text-xs sm:text-sm font-semibold">{t.pressure} (mb)</p>
                </div>
              </div>
            </div>

            {/* Forecast Tabs */}
            {forecast && (
              <div className="bg-white/15 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-3xl">
                {/* Tab Headers */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
                  <button
                    onClick={() => setActiveTab('hourly')}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg transition-all duration-300 ${
                      activeTab === 'hourly'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'bg-white/20 text-white/70 hover:bg-white/30 hover:text-white'
                    }`}
                  >
                    {tabT.hourlyForecast}
                  </button>
                  <button
                    onClick={() => setActiveTab('daily')}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg transition-all duration-300 ${
                      activeTab === 'daily'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'bg-white/20 text-white/70 hover:bg-white/30 hover:text-white'
                    }`}
                  >
                    {tabT.dailyForecast}
                  </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'hourly' && (
                <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">{tabT.hourlyForecast}</h3>
                <div className="overflow-x-auto">
                  <div className="flex space-x-2 sm:space-x-4 min-w-max pb-4">
                    {forecast.forecast.forecastday[0].hour.slice(0, 12).map((item, index) => (
                      <div key={index} className="bg-white/15 rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center min-w-[90px] sm:min-w-[120px] hover:bg-white/25 transition-all duration-300 hover:scale-105">
                        <div className="text-white/90 text-xs sm:text-sm mb-2 sm:mb-3 font-semibold">
                          {new Date(item.time).toLocaleTimeString(language === 'en' ? 'en-US' : language === 'tr' ? 'tr-TR' : language === 'az' ? 'az-AZ' : 'ru-RU', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                        <img
                          src={`https:${item.condition.icon}`}
                          alt={item.condition.text}
                          className="w-10 h-10 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-4 drop-shadow-lg"
                        />
                        <div className="text-white font-bold text-lg sm:text-2xl mb-1 sm:mb-2">
                          {Math.round(item.temp_c)}°
                        </div>
                        <div className="text-white/80 text-xs sm:text-sm mb-1">
                          {Math.round(item.feelslike_c)}°
                        </div>
                        <div className="text-white/70 text-xs">
                          {item.chance_of_rain}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                  </div>
                )}

                {/* Daily Forecast Tab */}
                {activeTab === 'daily' && (
                <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">{tabT.dailyForecast}</h3>
                    <div className="space-y-3 sm:space-y-4">
                      {forecast.forecast.forecastday.map((day, index) => (
                        <div key={index} className="bg-white/15 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/25 transition-all duration-300 hover:scale-105">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                            <div className="flex items-center space-x-3 sm:space-x-6">
                              <div className="text-white/90 text-lg sm:text-xl font-semibold min-w-[120px] sm:min-w-[140px]">
                                {index === 0 ? t.today : getDayName(day.date)}
                              </div>
                              <img
                                src={`https:${day.day.condition.icon}`}
                                alt={day.day.condition.text}
                                className="w-12 h-12 sm:w-16 sm:h-16 drop-shadow-lg"
                              />
                              <div className="text-white/80 text-sm sm:text-lg capitalize font-medium">
                                {day.day.condition.text}
                              </div>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end space-x-4 sm:space-x-6">
                              <div className="text-white text-xl sm:text-2xl font-bold">
                                {Math.round(day.day.maxtemp_c)}°
                              </div>
                              <div className="text-white/70 text-lg sm:text-xl">
                                {Math.round(day.day.mintemp_c)}°
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 5-Day Forecast - Keep for backward compatibility */}
            {forecast && (
              <div className="bg-white/15 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-3xl">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">{t.fiveDayForecast}</h3>
                <div className="space-y-3 sm:space-y-4">
                  {getDailyForecast(forecast).map((day, index) => (
                    <div key={index} className="bg-white/15 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/25 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                        <div className="flex items-center space-x-3 sm:space-x-6">
                          <div className="text-white/90 text-lg sm:text-xl font-semibold min-w-[120px] sm:min-w-[140px]">
                            {index === 0 ? t.today : getDayName(day.date)}
                          </div>
                          <img
                            src={`https:${day.weather.icon}`}
                            alt={day.weather.text}
                            className="w-12 h-12 sm:w-16 sm:h-16 drop-shadow-lg"
                          />
                          <div className="text-white/80 text-sm sm:text-lg capitalize font-medium">
                            {day.weather.text}
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end space-x-4 sm:space-x-8">
                          <div className="text-white/70 text-sm sm:text-lg">
                            {Math.round(day.avgTemp)}°
                          </div>
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <span className="text-white font-bold text-xl sm:text-2xl">
                              {day.maxTemp}°
                            </span>
                            <span className="text-white/70 text-lg sm:text-2xl">
                              {day.minTemp}°
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
              <div className="bg-white/15 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-3xl">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">{t.sunMoon}</h3>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 text-sm sm:text-lg">{t.sunrise}</span>
                    <span className="text-white font-bold text-lg sm:text-xl">
                      06:30
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 text-sm sm:text-lg">{t.sunset}</span>
                    <span className="text-white font-bold text-lg sm:text-xl">
                      18:30
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/15 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-3xl">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">{t.wind}</h3>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 text-sm sm:text-lg">{t.speed}</span>
                    <span className="text-white font-bold text-lg sm:text-xl">{weather.current.wind_kph} km/h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 text-sm sm:text-lg">{t.direction}</span>
                    <span className="text-white font-bold text-lg sm:text-xl">{weather.current.wind_degree}°</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/15 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-3xl">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">{t.visibility}</h3>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 text-sm sm:text-lg">{t.distance}</span>
                    <span className="text-white font-bold text-lg sm:text-xl">{weather.current.vis_km} km</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 text-sm sm:text-lg">{t.uvIndex}</span>
                    <span className="text-white font-bold text-lg sm:text-xl">{weather.current.uv}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Message */}
        {!weather && !loading && !error && (
          <div className="text-center py-12 sm:py-20">
            <div className="bg-white/20 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-8 sm:p-16 shadow-2xl border border-white/30 max-w-3xl mx-auto hover:bg-white/25 transition-all duration-500 hover:scale-105 hover:shadow-3xl">
              <div className="text-6xl sm:text-9xl mb-6 sm:mb-8">🌤️</div>
              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 sm:mb-6">
                {t.discoverWeather}
              </h2>
              <p className="text-white/90 text-lg sm:text-2xl mb-8 sm:mb-10 font-medium">
                {t.welcomeMessage}
              </p>
              <div className="max-w-md mx-auto relative z-[100]">
                <SearchBar 
                  onSearch={handleSearch} 
                  placeholder={t.searchPlaceholder} 
                  buttonText={t.searchButton}
                  suggestions={searchSuggestions}
                  showSuggestions={showSuggestions}
                  onInputChange={getSearchSuggestions}
                  onSuggestionClick={(suggestion) => {
                    handleSearch(suggestion.name);
                    setShowSuggestions(false);
                  }}
                  onCloseSuggestions={() => setShowSuggestions(false)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black/20 backdrop-blur-xl border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-white/70 text-sm font-medium">
              © 2025 Babak Gasimzade. {t.copyright}
            </div>
            
            {/* Made with love */}
            <div className="flex items-center space-x-2 text-white/70 text-sm font-medium">
              <span>{t.madeWith}</span>
              <span className="text-pink-500 text-lg">❤️</span>
              <span>{t.inAzerbaijan}</span>
              <span className="text-blue-400 font-bold">{t.bgDev}</span>
              <span className="text-pink-500 text-lg">💖</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}