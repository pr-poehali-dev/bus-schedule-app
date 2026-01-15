import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface BusRoute {
  number: string;
  name: string;
  type: 'bus' | 'trolleybus' | 'tram';
  nextArrivals: string[];
}

interface BusStop {
  id: string;
  name: string;
  routes: string[];
  distance?: string;
}

const mockRoutes: BusRoute[] = [
  { number: '12', name: 'Вокзал - Автостанция', type: 'bus', nextArrivals: ['2 мин', '15 мин', '28 мин'] },
  { number: '5', name: 'Центр - Микрорайон', type: 'trolleybus', nextArrivals: ['5 мин', '20 мин', '35 мин'] },
  { number: '3', name: 'Площадь - Парк', type: 'tram', nextArrivals: ['8 мин', '18 мин', '30 мин'] },
  { number: '21', name: 'Рынок - Больница', type: 'bus', nextArrivals: ['3 мин', '12 мин', '25 мин'] },
  { number: '7', name: 'Университет - Вокзал', type: 'bus', nextArrivals: ['6 мин', '19 мин', '32 мин'] },
  { number: '14', name: 'Центр - Спортивный комплекс', type: 'trolleybus', nextArrivals: ['10 мин', '22 мин', '40 мин'] },
];

const mockStops: BusStop[] = [
  { id: '1', name: 'Центральная площадь', routes: ['12', '5', '7'], distance: '150 м' },
  { id: '2', name: 'Вокзал', routes: ['12', '21', '7'], distance: '300 м' },
  { id: '3', name: 'Парк Победы', routes: ['3', '14'], distance: '450 м' },
  { id: '4', name: 'Университет', routes: ['7', '5'], distance: '800 м' },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'routes' | 'stops'>('routes');

  const filteredRoutes = mockRoutes.filter(route =>
    route.number.includes(searchQuery) ||
    route.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStops = mockStops.filter(stop =>
    stop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stop.routes.some(route => route.includes(searchQuery))
  );

  const getTypeIcon = (type: BusRoute['type']) => {
    switch (type) {
      case 'bus': return 'Bus';
      case 'trolleybus': return 'Cable';
      case 'tram': return 'Train';
    }
  };

  const getTypeColor = (type: BusRoute['type']) => {
    switch (type) {
      case 'bus': return 'bg-primary text-primary-foreground';
      case 'trolleybus': return 'bg-green-500 text-white';
      case 'tram': return 'bg-orange-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Расписание автобусов</h1>
          <p className="text-muted-foreground">Актуальная информация о транспорте в реальном времени</p>
        </div>

        <div className="mb-6 relative">
          <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            type="text"
            placeholder="Поиск маршрута или остановки..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('routes')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'routes'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-muted-foreground hover:bg-secondary'
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon name="Bus" size={18} />
              Маршруты
            </div>
          </button>
          <button
            onClick={() => setActiveTab('stops')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'stops'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-muted-foreground hover:bg-secondary'
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size={18} />
              Остановки
            </div>
          </button>
        </div>

        {activeTab === 'routes' && (
          <div className="space-y-3">
            {filteredRoutes.length > 0 ? (
              filteredRoutes.map((route) => (
                <Card key={route.number} className="p-5 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-14 h-14 rounded-xl ${getTypeColor(route.type)} flex items-center justify-center font-bold text-xl`}>
                        {route.number}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{route.name}</h3>
                          <Icon name={getTypeIcon(route.type)} size={16} className="text-muted-foreground" />
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Icon name="Clock" size={14} className="text-muted-foreground" />
                          <div className="flex gap-3">
                            {route.nextArrivals.map((time, index) => (
                              <Badge key={index} variant={index === 0 ? 'default' : 'secondary'} className="font-mono">
                                {time}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-muted-foreground mt-3" />
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">Маршруты не найдены</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'stops' && (
          <div className="space-y-3">
            {filteredStops.length > 0 ? (
              filteredStops.map((stop) => (
                <Card key={stop.id} className="p-5 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                        <Icon name="MapPin" size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{stop.name}</h3>
                        {stop.distance && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                            <Icon name="Navigation" size={14} />
                            {stop.distance}
                          </div>
                        )}
                        <div className="flex gap-2 flex-wrap">
                          {stop.routes.map((route) => (
                            <Badge key={route} variant="outline" className="font-mono">
                              {route}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-muted-foreground mt-2" />
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">Остановки не найдены</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 p-4 bg-card rounded-lg border border-border">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Информация обновляется в реальном времени</p>
              <p>Время прибытия может меняться в зависимости от дорожной ситуации</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
