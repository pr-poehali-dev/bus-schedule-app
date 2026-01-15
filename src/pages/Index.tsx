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
  { number: '1', name: 'Вокзал - Красный Октябрь', type: 'bus', nextArrivals: ['3 мин', '18 мин', '33 мин'] },
  { number: '2', name: 'Вокзал - Красный Профинтерн', type: 'bus', nextArrivals: ['5 мин', '20 мин', '35 мин'] },
  { number: '3', name: 'Шёлковый Комбинат - Красный Профинтерн', type: 'bus', nextArrivals: ['7 мин', '22 мин', '37 мин'] },
  { number: '4', name: 'Вокзал - Посёлок Первомайский', type: 'bus', nextArrivals: ['4 мин', '19 мин', '34 мин'] },
  { number: '5', name: 'Автовокзал - Красный Октябрь', type: 'bus', nextArrivals: ['6 мин', '21 мин', '36 мин'] },
  { number: '6', name: 'Вокзал - Посёлок Шёлковый Комбинат', type: 'bus', nextArrivals: ['8 мин', '23 мин', '38 мин'] },
  { number: '7', name: 'Автовокзал - Городская Больница', type: 'bus', nextArrivals: ['10 мин', '25 мин', '40 мин'] },
  { number: '101', name: 'Киржач - Владимир (межгород)', type: 'bus', nextArrivals: ['15 мин', '45 мин', '75 мин'] },
];

const mockStops: BusStop[] = [
  { id: '1', name: 'Автовокзал', routes: ['1', '2', '4', '5', '6', '7'], distance: '200 м' },
  { id: '2', name: 'Площадь 50-летия СССР', routes: ['1', '2', '3', '5'], distance: '350 м' },
  { id: '3', name: 'Шёлковый Комбинат', routes: ['3', '6'], distance: '1.2 км' },
  { id: '4', name: 'Красный Октябрь', routes: ['1', '5'], distance: '1.8 км' },
  { id: '5', name: 'Красный Профинтерн', routes: ['2', '3'], distance: '2.1 км' },
  { id: '6', name: 'Городская Больница', routes: ['7'], distance: '950 м' },
  { id: '7', name: 'Посёлок Первомайский', routes: ['4'], distance: '3.5 км' },
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Расписание автобусов Киржача</h1>
          <p className="text-muted-foreground">Актуальная информация о городском и пригородном транспорте</p>
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