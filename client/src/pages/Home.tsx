import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useLocation } from "wouter";
import ConnectionStatus from "@/components/ConnectionStatus";
import { requestNotificationPermission } from "@/lib/notifications";
import { useLanguage } from "@/contexts/LanguageContext";
import { HeartIcon, BrainIcon, HandIcon, ActivityIcon, TrophyIcon, SettingsIcon, LogoutIcon, HomeIcon, ChartIcon, BackIcon, SessionsIcon, DaysIcon, ProgressIcon } from "@/components/Icons";

/**
 * Design: Dark Mode with Orange Accent
 * Main dashboard showing user progress and navigation
 */

export default function Home() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("home");

  const [metScore, setMetScore] = useState<number>(0);
  const [profileLevel, setProfileLevel] = useState<string>("Non disponible");
  const [profileColor, setProfileColor] = useState<string>("text-gray-500");

  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  const heroImages = [
    {
      src: "/1.png",
      alt: "Image 1",
      text: t.welcome
    },
    {
      src: "/2.jpg",
      alt: "Image 2",
      text: t.healthPartner
    },
    {
      src: "/3.jpg",
      alt: "Image 3",
      text: t.improveForm
    }
  ];

  useEffect(() => {
    const userData = localStorage.getItem("user");
    
    if (!userData) {
      setLocation("/login");
      return;
    }

    const user = JSON.parse(userData);
    const onboardingKey = `onboardingCompleted_${user.email}`;
    const onboardingCompleted = localStorage.getItem(onboardingKey);
    const profileKey = `userProfile_${user.email}`;
    const userProfile = localStorage.getItem(profileKey);
    const metScoreKey = "metScore";
    const metScoreValue = localStorage.getItem(metScoreKey);

    if (!onboardingCompleted) {
      setLocation("/onboarding");
    } else {
      setUser(user);
      if (userProfile) {
        const profile = JSON.parse(userProfile);
        // Récupérer le score MET
        if (metScoreValue) {
          const met = parseInt(metScoreValue);
          setMetScore(met);
        }
        // Récupérer le niveau IPAQ
        setProfileLevel(profile.level);
        // Définir la couleur selon le niveau
        let color = "text-gray-500";
        if (profile.level.includes("Faible")) color = "text-red-500";
        else if (profile.level.includes("Modéré")) color = "text-yellow-500";
        else if (profile.level.includes("Élevé")) color = "text-green-500";
        setProfileColor(color);
      }
      // Demander la permission pour les notifications
      requestNotificationPermission();
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLocation("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen pb-20 animate-fade-in relative">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border/40 animate-slide-in-down shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 shadow-inner flex items-center justify-center overflow-hidden border border-orange-100/50">
              <img src="/logo-aji.png" alt="Aji Tssourat" className="w-10 h-10 object-contain drop-shadow-sm" />
            </div>
          </div>
          <button
            onClick={() => setLocation("/settings")}
            className="p-3 hover:bg-secondary/80 rounded-2xl transition-all duration-300 hover:shadow-md active:scale-95"
          >
            <SettingsIcon />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-8 animate-slide-in-up pb-28">
        {/* Hero Carousel */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/10 transform hover:scale-[1.02] transition-transform duration-500">
          <Carousel
            opts={{ loop: true }}
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {heroImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-56 w-full">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                      <p className="text-white font-bold text-lg tracking-wide drop-shadow-md transform translate-y-0 transition-transform duration-300 group-hover:-translate-y-1">{image.text}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Score Circle Card - Motricité Moyenne */}
        <Card className="p-8 text-center transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5 border-border/50 bg-gradient-to-b from-card to-card/50 backdrop-blur-sm rounded-3xl">
          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full drop-shadow-lg" viewBox="0 0 120 120">
                {/* Background circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="55"
                  fill="none"
                  className="stroke-muted/20"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Progress circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="55"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeDasharray={`${(metScore / 3500) * 345.6} 345.6`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                  style={{ transition: "stroke-dasharray 1s cubic-bezier(0.4, 0, 0.2, 1)" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <div className={`text-3xl font-black tracking-tight ${profileColor}`}>{metScore}</div>
                <div className="text-xs font-medium text-muted-foreground/80 uppercase tracking-wider mt-1">MET-min/sem</div>
              </div>
            </div>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2 tracking-tight">
            {t.averageMotricity}
          </h2>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-opacity-10 ${profileColor.replace('text-', 'bg-')} ${profileColor} mb-3`}>
            {profileLevel}
          </div>
          <p className="text-sm text-muted-foreground/80 leading-relaxed max-w-[280px] mx-auto">
            {t.keepEfforts}
          </p>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: <SessionsIcon />, value: "3", label: t.sessions, delay: "0" },
            { icon: <DaysIcon />, value: "5", label: t.days, delay: "100" },
            { icon: <ProgressIcon />, value: "+15%", label: t.progress, delay: "200" }
          ].map((stat, i) => (
            <Card key={i} className="p-4 text-center hover:bg-secondary/30 transition-colors border-border/40 bg-card/50 backdrop-blur-sm rounded-2xl group cursor-default">
              <div className="flex justify-center mb-3 text-orange-500 transform group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
              <div className="text-xl font-bold text-foreground mb-1 tracking-tight">{stat.value}</div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={() => setLocation("/bilan")}
            className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {t.startAssessment}
          </Button>
          <Button
            onClick={() => setLocation("/program")}
            className="w-full h-14 bg-white hover:bg-gray-50 text-slate-900 font-bold text-lg rounded-2xl border-2 border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
          >
            {t.myProgram}
          </Button>
        </div>

        {/* Recent Activity */}
        <Card className="p-6 border-border/40 bg-card/50 backdrop-blur-sm rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-foreground text-lg tracking-tight">
              {t.recentActivity}
            </h3>
            <button className="text-xs font-bold text-orange-500 hover:text-orange-600 uppercase tracking-wide transition-colors">{t.seeAll}</button>
          </div>
          <div className="space-y-4">
            {[
              { date: "Aujourd'hui", activity: t.assessmentCompleted, icon: "✓" },
              { date: "Hier", activity: t.mobilitySession, icon: "💪" },
              { date: "Il y a 2 jours", activity: t.consciousBreathing, icon: "🧘" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between group p-2 hover:bg-secondary/30 rounded-xl transition-colors -mx-2">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100/50 text-orange-600 flex items-center justify-center font-bold text-sm">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-orange-600 transition-colors">{item.activity}</p>
                    <p className="text-xs font-medium text-muted-foreground/70">{item.date}</p>
                  </div>
                </div>
                <span className="text-muted-foreground/40 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Coach Message */}
        <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/10 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
          <div className="flex gap-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 shadow-inner">
              <span className="text-2xl">👨‍⚕️</span>
            </div>
            <div>
              <p className="text-xs font-bold text-orange-600 uppercase tracking-wide mb-1">{t.coachMessage}</p>
              <p className="text-sm text-foreground/80 font-medium leading-relaxed italic">
                "{t.coachAdvice}"
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Connection Status */}
      <ConnectionStatus />

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border z-50">
        <div className="max-w-md mx-auto flex justify-around items-center py-1.5">
          {[
            { id: "home", label: t.home, path: "/home", Icon: HomeIcon },
            { id: "bilan", label: t.assessment, path: "/bilan", Icon: ChartIcon },
            { id: "program", label: t.program, path: "/program", Icon: ActivityIcon },
            { id: "settings", label: t.settings, path: "/settings", Icon: SettingsIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setLocation(tab.path);
              }}
              className={`flex flex-col items-center gap-0.5 transition-colors ${
                activeTab === tab.id
                  ? "text-orange-500"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className={`${activeTab === tab.id ? "scale-110" : ""} transition-transform duration-200`}>
                <tab.Icon width="24" height="24" />
              </div>
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
