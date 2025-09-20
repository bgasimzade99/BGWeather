export default function WeatherCard({ weather, forecast, isMain = false }) {
  if (!weather) return null;

  // 5 günlük tahmin için günlük ortalama verileri hesapla
  const getDailyForecast = () => {
    if (!forecast) return [];
    
    const dailyData = {};
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyData[date]) {
        dailyData[date] = {
          temps: [],
          weather: item.weather[0],
          date: date
        };
      }
      dailyData[date].temps.push(item.main.temp);
    });

    return Object.values(dailyData).slice(0, 5).map(day => ({
      ...day,
      minTemp: Math.round(Math.min(...day.temps)),
      maxTemp: Math.round(Math.max(...day.temps)),
      avgTemp: Math.round(day.temps.reduce((a, b) => a + b, 0) / day.temps.length)
    }));
  };

  const dailyForecast = getDailyForecast();

  // Hava durumu ikonunu getir
  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  // Gün adını Türkçe'ye çevir
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    return days[date.getDay()];
  };

  if (isMain) {
    return (
      <div className="space-y-6">
        {/* Ana Hava Durumu */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white">
                {weather.name}, {weather.sys.country}
              </h2>
              <p className="text-gray-300 text-lg">
                {new Date().toLocaleDateString('tr-TR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="text-right">
              <div className="text-6xl font-light text-white">
                {Math.round(weather.main.temp)}°
              </div>
              <p className="text-gray-300 text-lg capitalize">
                {weather.weather[0].description}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={getWeatherIcon(weather.weather[0].icon)}
                alt={weather.weather[0].description}
                className="w-20 h-20"
              />
              <div className="ml-4">
                <div className="text-2xl font-semibold text-white">
                  {Math.round(weather.main.temp_max)}° / {Math.round(weather.main.temp_min)}°
                </div>
                <p className="text-gray-300">Maksimum / Minimum</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg text-white">
                Hissedilen: {Math.round(weather.main.feels_like)}°
              </div>
              <div className="text-sm text-gray-300">
                Nem: {weather.main.humidity}% | Rüzgar: {weather.wind.speed} m/s
              </div>
            </div>
          </div>
        </div>

        {/* 5 Günlük Tahmin */}
        {dailyForecast.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-6">5 Günlük Tahmin</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {dailyForecast.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-gray-300 text-sm mb-2">
                    {index === 0 ? 'Bugün' : getDayName(day.date)}
                  </div>
                  <img
                    src={getWeatherIcon(day.weather.icon)}
                    alt={day.weather.description}
                    className="w-12 h-12 mx-auto mb-2"
                  />
                  <div className="text-white font-semibold">
                    {day.maxTemp}° / {day.minTemp}°
                  </div>
                  <div className="text-gray-300 text-sm capitalize">
                    {day.weather.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Saatlik Tahmin */}
        {forecast && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-6">Saatlik Tahmin</h3>
            <div className="overflow-x-auto">
              <div className="flex space-x-4 min-w-max">
                {forecast.list.slice(0, 8).map((item, index) => (
                  <div key={index} className="text-center min-w-[80px]">
                    <div className="text-gray-300 text-sm mb-2">
                      {new Date(item.dt * 1000).toLocaleTimeString('tr-TR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                    <img
                      src={getWeatherIcon(item.weather[0].icon)}
                      alt={item.weather[0].description}
                      className="w-8 h-8 mx-auto mb-2"
                    />
                    <div className="text-white font-semibold text-sm">
                      {Math.round(item.main.temp)}°
                    </div>
                    <div className="text-gray-300 text-xs">
                      {Math.round(item.main.feels_like)}°
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-2">
          {weather.name}
        </h3>
        <div className="text-4xl font-light text-white mb-2">
          {Math.round(weather.main.temp)}°
        </div>
        <p className="text-gray-300 capitalize">
          {weather.weather[0].description}
        </p>
      </div>
    </div>
  );
}
