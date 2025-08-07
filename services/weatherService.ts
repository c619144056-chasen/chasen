export class WeatherService {
  // 获取天气信息 (模拟API调用)
  static async getCurrentWeather(location?: string) {
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟天气数据
      const weatherConditions = [
        { temperature: '22°C', condition: '晴朗', suggestion: '完美的户外探索天气！', code: 'sunny' },
        { temperature: '18°C', condition: '多云', suggestion: '适合户外活动的好天气', code: 'cloudy' },
        { temperature: '15°C', condition: '小雨', suggestion: '记得带伞，室内活动更适合', code: 'rainy' },
        { temperature: '25°C', condition: '炎热', suggestion: '注意防晒和补水', code: 'hot' },
      ];
      
      const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
      
      return { data: randomWeather, error: null };
    } catch (error) {
      console.error('获取天气信息错误:', error);
      return { 
        data: { 
          temperature: '22°C', 
          condition: '晴朗', 
          suggestion: '完美的户外探索天气！',
          code: 'sunny'
        }, 
        error: null 
      };
    }
  }

  // 获取天气建议
  static getWeatherAdvice(weatherCode: string) {
    const advice = {
      sunny: ['记得涂防晒霜', '带上遮阳帽', '多喝水'],
      cloudy: ['适合长时间户外活动', '温度适宜'],
      rainy: ['带上雨具', '选择有遮蔽的路线', '注意路面湿滑'],
      hot: ['避开中午时段', '准备充足的水', '寻找阴凉处休息'],
    };
    
    return advice[weatherCode] || advice.sunny;
  }
}