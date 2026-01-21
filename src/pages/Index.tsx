import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

type UserRole = 'parent' | 'player' | 'coach' | 'admin' | null;

const mockPlayer = {
  name: 'Александр Иванов',
  age: 12,
  position: 'Нападающий',
  number: 10,
  avatar: '/placeholder.svg',
  skills: [
    { name: 'Дриблинг', value: 85, color: 'bg-football-green' },
    { name: 'Удар', value: 78, color: 'bg-football-blue' },
    { name: 'Пас', value: 72, color: 'bg-football-green' },
    { name: 'Защита', value: 65, color: 'bg-football-blue' },
    { name: 'Скорость', value: 88, color: 'bg-football-green' },
    { name: 'Выносливость', value: 80, color: 'bg-football-blue' },
  ],
  achievements: [
    { icon: 'Trophy', title: 'Лучший бомбардир', date: 'Декабрь 2025' },
    { icon: 'Award', title: 'Игрок месяца', date: 'Ноябрь 2025' },
    { icon: 'Target', title: '10 голов в сезоне', date: 'Октябрь 2025' },
    { icon: 'Star', title: 'Прогресс недели', date: 'Январь 2026' },
  ],
  attendance: [
    { date: '15.01', status: 'present' },
    { date: '17.01', status: 'present' },
    { date: '18.01', status: 'absent' },
    { date: '20.01', status: 'present' },
    { date: '22.01', status: 'present' },
    { date: '24.01', status: 'present' },
    { date: '25.01', status: 'present' },
  ],
};

const mockSchedule = [
  { id: 1, day: 'Понедельник', time: '16:00 - 18:00', type: 'Основная тренировка', enrolled: true },
  { id: 2, day: 'Среда', time: '16:00 - 18:00', type: 'Основная тренировка', enrolled: true },
  { id: 3, day: 'Пятница', time: '16:00 - 18:00', type: 'Основная тренировка', enrolled: true },
  { id: 4, day: 'Суббота', time: '10:00 - 12:00', type: 'Игровая тренировка', enrolled: false },
];

const mockHomework = [
  { id: 1, title: 'Работа с мячом', description: '50 касаний правой ногой, 50 левой', completed: true },
  { id: 2, title: 'Финты и обводка', description: 'Отработать 5 финтов по 10 повторений', completed: true },
  { id: 3, title: 'Физическая подготовка', description: '30 приседаний, 20 отжиманий, планка 1 минута', completed: false },
];

const mockNotifications = [
  { id: 1, title: 'Товарищеский матч', text: 'Игра с командой "Юниор" в субботу в 14:00', time: '2 часа назад', type: 'info' },
  { id: 2, title: 'Новое достижение!', text: 'Поздравляем! Вы получили значок "Прогресс недели"', time: '1 день назад', type: 'success' },
  { id: 3, title: 'Домашнее задание', text: 'Тренер добавил новые упражнения', time: '2 дня назад', type: 'warning' },
];

const LoginScreen = ({ onLogin }: { onLogin: (role: UserRole) => void }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-football-dark p-4">
      <Card className="w-full max-w-md border-2 border-primary/20 shadow-2xl animate-scale-in">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-football-green to-football-blue rounded-full flex items-center justify-center">
            <Icon name="Trophy" size={40} className="text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-football-green to-football-blue bg-clip-text text-transparent">
            Футбольная Академия
          </CardTitle>
          <CardDescription className="text-base">
            Выберите роль для входа в систему
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            onClick={() => onLogin('player')} 
            className="w-full h-14 text-lg bg-gradient-to-r from-football-green to-emerald-600 hover:from-emerald-600 hover:to-football-green transition-all duration-300"
          >
            <Icon name="User" className="mr-2" size={24} />
            Игрок
          </Button>
          <Button 
            onClick={() => onLogin('parent')} 
            className="w-full h-14 text-lg bg-gradient-to-r from-football-blue to-cyan-600 hover:from-cyan-600 hover:to-football-blue transition-all duration-300"
          >
            <Icon name="Users" className="mr-2" size={24} />
            Родитель
          </Button>
          <Button 
            onClick={() => onLogin('coach')} 
            className="w-full h-14 text-lg bg-gradient-to-r from-football-gold to-amber-600 hover:from-amber-600 hover:to-football-gold transition-all duration-300"
          >
            <Icon name="Clipboard" className="mr-2" size={24} />
            Тренер
          </Button>
          <Button 
            onClick={() => onLogin('admin')} 
            className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-violet-600 hover:to-purple-600 transition-all duration-300"
          >
            <Icon name="ShieldCheck" className="mr-2" size={24} />
            Администратор
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [activeTab, setActiveTab] = useState('profile');

  if (!userRole) {
    return <LoginScreen onLogin={setUserRole} />;
  }

  const getRoleBadge = () => {
    const roleConfig = {
      player: { label: 'Игрок', color: 'bg-football-green' },
      parent: { label: 'Родитель', color: 'bg-football-blue' },
      coach: { label: 'Тренер', color: 'bg-football-gold' },
      admin: { label: 'Администратор', color: 'bg-purple-600' },
    };
    const config = roleConfig[userRole as keyof typeof roleConfig];
    return <Badge className={cn(config.color, 'text-white')}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-football-dark">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-football-green to-football-blue rounded-full flex items-center justify-center">
              <Icon name="Trophy" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Футбольная Академия</h1>
              <p className="text-sm text-muted-foreground">Личный кабинет</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {getRoleBadge()}
            <Button variant="outline" size="sm" onClick={() => setUserRole(null)}>
              <Icon name="LogOut" size={16} className="mr-2" />
              Выход
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-5 gap-2 bg-card/50 p-2">
            <TabsTrigger value="profile" className="data-[state=active]:bg-football-green">
              <Icon name="User" size={18} className="mr-2" />
              <span className="hidden sm:inline">Профиль</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-football-blue">
              <Icon name="Calendar" size={18} className="mr-2" />
              <span className="hidden sm:inline">Расписание</span>
            </TabsTrigger>
            <TabsTrigger value="homework" className="data-[state=active]:bg-football-gold">
              <Icon name="BookOpen" size={18} className="mr-2" />
              <span className="hidden sm:inline">Задания</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-secondary">
              <Icon name="Bell" size={18} className="mr-2" />
              <span className="hidden sm:inline">Уведомления</span>
            </TabsTrigger>
            {userRole === 'admin' && (
              <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
                <Icon name="BarChart3" size={18} className="mr-2" />
                <span className="hidden sm:inline">Аналитика</span>
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="profile" className="space-y-6 animate-fade-in">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-1 border-2 border-football-green/20">
                <CardHeader className="text-center">
                  <Avatar className="w-32 h-32 mx-auto border-4 border-football-green">
                    <AvatarImage src={mockPlayer.avatar} />
                    <AvatarFallback className="text-3xl bg-football-green">
                      {mockPlayer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="mt-4">{mockPlayer.name}</CardTitle>
                  <CardDescription className="text-base">
                    <div className="flex items-center justify-center gap-4 mt-2">
                      <span>#{mockPlayer.number}</span>
                      <span>•</span>
                      <span>{mockPlayer.position}</span>
                      <span>•</span>
                      <span>{mockPlayer.age} лет</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="BarChart3" size={18} className="text-football-green" />
                      Посещаемость (7 дней)
                    </h4>
                    <div className="flex gap-2 justify-between">
                      {mockPlayer.attendance.map((day, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-1">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110",
                            day.status === 'present' ? 'bg-football-green' : 'bg-destructive'
                          )}>
                            <Icon name={day.status === 'present' ? 'Check' : 'X'} size={16} className="text-white" />
                          </div>
                          <span className="text-xs text-muted-foreground">{day.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {userRole === 'coach' && (
                    <Button className="w-full bg-football-gold hover:bg-amber-600">
                      <Icon name="Edit" size={16} className="mr-2" />
                      Редактировать профиль
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 border-2 border-football-blue/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Zap" size={24} className="text-football-blue" />
                    Навыки игрока
                  </CardTitle>
                  <CardDescription>Прогресс и развитие за сезон</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {mockPlayer.skills.map((skill, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm font-bold text-football-gold">{skill.value}%</span>
                        </div>
                        <Progress value={skill.value} className="h-3" />
                      </div>
                    ))}
                  </div>
                  {userRole === 'coach' && (
                    <Button className="w-full mt-6 bg-football-green hover:bg-emerald-600">
                      <Icon name="TrendingUp" size={16} className="mr-2" />
                      Обновить показатели
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 border-football-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Award" size={24} className="text-football-gold" />
                  Достижения
                </CardTitle>
                <CardDescription>Награды и успехи игрока</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {mockPlayer.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-football-gold to-amber-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Icon name={achievement.icon as any} size={32} className="text-white" />
                      </div>
                      <h4 className="font-semibold mb-1">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground">{achievement.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6 animate-fade-in">
            <Card className="border-2 border-football-blue/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calendar" size={24} className="text-football-blue" />
                  Расписание тренировок
                </CardTitle>
                <CardDescription>Запишитесь на тренировки или отмените участие</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockSchedule.map((training) => (
                    <div key={training.id} className="flex items-center justify-between p-4 rounded-lg border-2 border-border hover:border-football-blue/50 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-football-blue/20 flex items-center justify-center">
                          <Icon name="Dumbbell" size={24} className="text-football-blue" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{training.day}</h4>
                          <p className="text-sm text-muted-foreground">{training.time}</p>
                          <Badge variant="outline" className="mt-1">{training.type}</Badge>
                        </div>
                      </div>
                      {training.enrolled ? (
                        <Button variant="destructive" size="sm">
                          <Icon name="X" size={16} className="mr-2" />
                          Отменить
                        </Button>
                      ) : (
                        <Button className="bg-football-green hover:bg-emerald-600" size="sm">
                          <Icon name="Plus" size={16} className="mr-2" />
                          Записаться
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="homework" className="space-y-6 animate-fade-in">
            <Card className="border-2 border-football-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BookOpen" size={24} className="text-football-gold" />
                  Домашние задания
                </CardTitle>
                <CardDescription>Упражнения от тренера для самостоятельной работы</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockHomework.map((hw) => (
                    <div key={hw.id} className="flex items-start gap-4 p-4 rounded-lg border-2 border-border hover:border-football-gold/50 transition-all">
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1",
                        hw.completed ? 'bg-football-green' : 'bg-muted'
                      )}>
                        {hw.completed && <Icon name="Check" size={16} className="text-white" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{hw.title}</h4>
                        <p className="text-sm text-muted-foreground">{hw.description}</p>
                      </div>
                      {!hw.completed && (
                        <Button size="sm" className="bg-football-green hover:bg-emerald-600">
                          Выполнено
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                {userRole === 'coach' && (
                  <Button className="w-full mt-6 bg-football-gold hover:bg-amber-600">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить задание
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 animate-fade-in">
            <Card className="border-2 border-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Bell" size={24} className="text-secondary" />
                  Центр уведомлений
                </CardTitle>
                <CardDescription>Важные анонсы и сообщения</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockNotifications.map((notif) => (
                    <div key={notif.id} className="flex gap-4 p-4 rounded-lg border-2 border-border hover:border-secondary/50 transition-all">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                        notif.type === 'info' && 'bg-football-blue/20',
                        notif.type === 'success' && 'bg-football-green/20',
                        notif.type === 'warning' && 'bg-football-gold/20'
                      )}>
                        <Icon 
                          name={notif.type === 'info' ? 'Info' : notif.type === 'success' ? 'CheckCircle2' : 'AlertCircle'} 
                          size={24} 
                          className={cn(
                            notif.type === 'info' && 'text-football-blue',
                            notif.type === 'success' && 'text-football-green',
                            notif.type === 'warning' && 'text-football-gold'
                          )}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{notif.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{notif.text}</p>
                        <span className="text-xs text-muted-foreground">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {userRole === 'admin' && (
            <TabsContent value="analytics" className="space-y-6 animate-fade-in">
              <Card className="border-2 border-purple-600/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BarChart3" size={24} className="text-purple-600" />
                    Аналитика академии
                  </CardTitle>
                  <CardDescription>Общая статистика и показатели</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="p-6 rounded-lg bg-gradient-to-br from-football-green/20 to-football-green/5 border-2 border-football-green/20">
                      <Icon name="Users" size={32} className="text-football-green mb-2" />
                      <p className="text-3xl font-bold">48</p>
                      <p className="text-sm text-muted-foreground">Всего игроков</p>
                    </div>
                    <div className="p-6 rounded-lg bg-gradient-to-br from-football-blue/20 to-football-blue/5 border-2 border-football-blue/20">
                      <Icon name="Calendar" size={32} className="text-football-blue mb-2" />
                      <p className="text-3xl font-bold">156</p>
                      <p className="text-sm text-muted-foreground">Тренировок в месяц</p>
                    </div>
                    <div className="p-6 rounded-lg bg-gradient-to-br from-football-gold/20 to-football-gold/5 border-2 border-football-gold/20">
                      <Icon name="Trophy" size={32} className="text-football-gold mb-2" />
                      <p className="text-3xl font-bold">23</p>
                      <p className="text-sm text-muted-foreground">Достижений за сезон</p>
                    </div>
                    <div className="p-6 rounded-lg bg-gradient-to-br from-purple-600/20 to-purple-600/5 border-2 border-purple-600/20">
                      <Icon name="TrendingUp" size={32} className="text-purple-600 mb-2" />
                      <p className="text-3xl font-bold">94%</p>
                      <p className="text-sm text-muted-foreground">Средняя посещаемость</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
