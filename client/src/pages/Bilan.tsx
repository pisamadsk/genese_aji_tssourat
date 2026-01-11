import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { BackIcon, CheckIcon, LegIcon, BalanceIcon, FlexibilityIcon, CoordinationIcon, CardioIcon, StrengthIcon, ProprioceptionIcon, RespirationIcon } from "@/components/Icons";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

/**
 * Design: Mobile-only with Light/Dark theme
 * Bilan Moteur page with 8 interactive tests - IMPROVED VERSION
 */

export default function Bilan() {
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();
  
  const tests = [
    {
      id: 1,
      name: t.hipMobility,
      description: t.hipMobilityDesc,
      iconComponent: LegIcon,
      duration: 2,
      score: 8,
      maxScore: 10,
      status: "completed",
      videoUrl: "/fenteavant.mp4",
    },
    {
      id: 2,
      name: t.balanceStability,
      description: t.balanceStabilityDesc,
      iconComponent: BalanceIcon,
      duration: 3,
      score: 7,
      maxScore: 10,
      status: "completed",
      videoUrl: "/equilibre.mp4",
    },
    {
      id: 3,
      name: t.muscleStrength,
      description: t.muscleStrengthDesc,
      iconComponent: StrengthIcon,
      duration: 4,
      score: 9,
      maxScore: 10,
      status: "completed",
      videoUrl: "/deepsquat.mp4",
    },
    {
      id: 4,
      name: t.spineFlexibility,
      description: t.spineFlexibilityDesc,
      iconComponent: FlexibilityIcon,
      duration: 2,
      score: 2,
      maxScore: 10,
      status: "completed",
      videoUrl: "/flexion.mp4",
    },
    {
      id: 5,
      name: t.coordination,
      description: t.coordinationDesc,
      iconComponent: CoordinationIcon,
      duration: 3,
      score: null,
      maxScore: 10,
      status: "pending",
      videoUrl: "/crosscrawl.mp4",
    },
    {
      id: 6,
      name: t.cardioEndurance,
      description: t.cardioEnduranceDesc,
      iconComponent: CardioIcon,
      duration: 5,
      score: 5,
      maxScore: 10,
      status: "completed",
      videoUrl: "/videos/cardio.mp4",
    },
    {
      id: 7,
      name: t.proprioception,
      description: t.proprioceptionDesc,
      iconComponent: ProprioceptionIcon,
      duration: 2,
      score: null,
      maxScore: 10,
      status: "pending",
      videoUrl: "/scan.mp4",
    },
    {
      id: 8,
      name: t.breathingRelaxation,
      description: t.breathingRelaxationDesc,
      iconComponent: RespirationIcon,
      duration: 3,
      score: 8,
      maxScore: 10,
      status: "completed",
      videoUrl: "/respiration.mp4",
    },
  ];

  const [selectedTest, setSelectedTest] = useState<any | null>(null);
  const [completedTests, setCompletedTests] = useState(
    tests.filter((t) => t.status === "completed").map((t) => t.id)
  );

  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  const bilanImages = [
    {
      src: "/bilan_mouteur1.jpg",
      alt: "Bilan Moteur 1",
    },
    {
      src: "/bilan_mouteur2.jpg",
      alt: "Bilan Moteur 2",
    },
    {
      src: "/bilan_mouteur3.jpg",
      alt: "Bilan Moteur 3",
    }
  ];

  const progress = (completedTests.length / tests.length) * 100;
  const totalScore = tests.reduce((sum, test) => sum + (test.score || 0), 0);
  const avgScore = Math.round(totalScore / completedTests.length);

  if (selectedTest) {
    return <TestDetail test={selectedTest} onBack={() => setSelectedTest(null)} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-card border-b border-border animate-slide-in-down">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => setLocation("/home")}
            className="p-2 hover:bg-secondary rounded-lg transition-colors text-foreground font-semibold"
          >
            <BackIcon /> {t.back}
          </button>
          <h1 className="text-lg font-bold text-foreground">{t.motorAssessment}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6 animate-slide-in-up">
        {/* Hero Image Carousel */}
        <div className="relative rounded-lg overflow-hidden mb-4">
          <Carousel
            opts={{ loop: true, direction: document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr' }}
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className={document.documentElement.dir === 'rtl' ? '-ml-0' : ''}>
              {bilanImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-40 w-full">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4 rounded-lg">
                      <span className="text-white font-medium">{t.evaluateBalance}</span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Progress Section */}
        <Card className="p-5 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-foreground">{t.yourProgress}</h2>
            <span className="text-sm font-semibold text-primary">
              {completedTests.length}/{tests.length}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-secondary rounded-full h-3 mb-4 overflow-hidden">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary">{avgScore}</div>
              <div className="text-xs text-muted-foreground">Score Moyen</div>
            </div>
            <div className="bg-card rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary">{completedTests.length}</div>
              <div className="text-xs text-muted-foreground">Complétés</div>
            </div>
          </div>
        </Card>

        {/* Tests Grid */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            {t.theTests}
          </h3>

          {tests.map((test) => (
            <Card
              key={test.id}
              onClick={() => setSelectedTest(test)}
              className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                test.status === "completed"
                  ? "bg-primary/5 border-primary/20"
                  : "bg-card border-border hover:border-primary/40"
              }`}
            >
              <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="flex-shrink-0 mt-1">
                {test.iconComponent && <test.iconComponent />}
              </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground text-sm">
                      {test.name}
                    </h3>
                    {test.status === "completed" && (
                      <div className="flex-shrink-0">
                        <CheckIcon />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {test.description}
                  </p>

                  {/* Score or Duration */}
                  <div className="flex items-center justify-between mb-2">
                    {test.score !== null ? (
                      <div className="flex items-center gap-2 flex-1">
                        {/* Score Bar */}
                        <div className="flex-1 bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{
                              width: `${(test.score / test.maxScore) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-primary whitespace-nowrap">
                          {test.score}/{test.maxScore}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        ⛱️ {test.duration} min
                      </span>
                    )}
                  </div>

                  {/* Evaluation Text */}
                  <div className="text-xs text-muted-foreground">
                    {test.status === "completed" ? "Refaire" : "Évaluez"}
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex-shrink-0">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTest(test);
                    }}
                    className={`text-xs py-1 px-3 h-auto ${
                      test.status === "completed"
                        ? "bg-primary/20 hover:bg-primary/30 text-primary"
                        : "bg-primary hover:bg-primary/90 text-primary-foreground"
                    }`}
                  >
                    {test.status === "completed" ? "Refaire" : "Démarrer"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Action Button */}
        <Button
          onClick={() => setLocation("/results")}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg"
        >
          {t.seeDetailedResults}
        </Button>
      </div>
    </div>
  );
}

/**
 * Test Detail Modal Component
 */
function TestDetail({
  test,
  onBack,
}: {
  test: any;
  onBack: () => void;
}) {
  const { t, language } = useLanguage();
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(test.duration * 60);
  const [score, setScore] = useState(5);
  const [step, setStep] = useState<"test" | "evaluation">("test");

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setStep("evaluation"); // Auto-switch to evaluation when timer ends
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Header with Timer */}
      <div className="sticky top-0 z-20 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3 justify-between">
          <button
            onClick={onBack}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <BackIcon />
          </button>
          <h1 className="text-lg font-bold text-foreground flex-1 text-center">{test.name}</h1>
          {step === "test" && (
            <div className="text-2xl font-bold text-primary font-mono min-w-20 text-right">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {step === "test" ? (
          <>
            {/* Test Icon */}
            <div className="text-center">
              {test.iconComponent && <div className="flex justify-center mb-4 scale-150"><test.iconComponent /></div>}
              <h2 className="text-2xl font-bold text-foreground mb-2">{test.name}</h2>
              <p className="text-muted-foreground">{test.description}</p>
            </div>

            {/* Instructions */}
            <Card className="p-4 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-2">{t.instructions}</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• {t.followInstructions}</li>
                <li>• {t.maintainPosture}</li>
                <li>• {t.goAtYourPace}</li>
                <li>• {t.stopIfPain}</li>
              </ul>
            </Card>

            {/* Video */}
            {test.videoUrl ? (
              <div className="w-full bg-black rounded-lg overflow-hidden">
                <video
                  width="100%"
                  height="auto"
                  controls
                  className="w-full"
                >
                  <source src={test.videoUrl} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéo.
                </video>
              </div>
            ) : (
              <div className="w-full aspect-video bg-secondary rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground text-sm">Vidéo de démonstration non disponible</p>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Evaluation Form - Only shown in evaluation step */
          <Card className="p-6 bg-card border-border animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <h2 className="text-2xl font-bold text-foreground">{t.testCompleted}</h2>
              <p className="text-muted-foreground">{t.evaluatePerformance}</p>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-foreground">
                    {t.scoreObtained}
                  </label>
                  <span className="text-2xl font-bold text-primary">{score}/10</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={score}
                  onChange={(e) => setScore(parseInt(e.target.value))}
                  className="w-full h-3 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>0 ({t.hard})</span>
                  <span>10 ({t.easy})</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t.observations}
                </label>
                <textarea
                  placeholder={t.describeObservations}
                  className="w-full px-3 py-2 bg-secondary text-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  rows={3}
                />
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Fixed Bottom Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="max-w-md mx-auto px-4 py-4 space-y-3">
          {step === "test" ? (
            <>
              <Button
                onClick={() => setIsRunning(!isRunning)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
              >
                {isRunning ? t.pause : t.start}
              </Button>
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setTimeLeft(test.duration * 60);
                    setIsRunning(false);
                  }}
                  className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground font-semibold py-2"
                >
                  {t.reset}
                </Button>
                <Button
                  onClick={() => {
                    setIsRunning(false);
                    setStep("evaluation");
                  }}
                  className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-600 dark:text-green-400 font-semibold py-2"
                >
                  ✓ {t.finish}
                </Button>
              </div>
            </>
          ) : (
            <Button
              onClick={onBack}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
            >
              {t.saveAndExit}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
