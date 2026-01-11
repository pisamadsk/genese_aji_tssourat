import { useState, useMemo } from "react";
import {
  MessageCircle,
  X,
  ChevronDown,
  Search,
  Zap,
  Activity,
  Dumbbell,
  Scale,
  Sofa,
  BarChart3,
  TrendingUp,
  Target,
  Clock,
  Droplet,
  Apple,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  icon?: React.ReactNode;
}

export default function FAQ() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(t.allCategories);
  const [searchQuery, setSearchQuery] = useState("");

  const FAQ_ITEMS: FAQItem[] = useMemo(() => [
    {
      id: "1",
      category: t.catPhysicalActivity,
      question: t.faqQ1,
      answer: t.faqA1,
      icon: <Activity className="w-5 h-5" />,
    },
    {
      id: "2",
      category: t.catPhysicalActivity,
      question: t.faqQ2,
      answer: t.faqA2,
      icon: <Dumbbell className="w-5 h-5" />,
    },
    {
      id: "3",
      category: t.catHealth,
      question: t.faqQ3,
      answer: t.faqA3,
      icon: <Scale className="w-5 h-5" />,
    },
    {
      id: "4",
      category: t.catHealth,
      question: t.faqQ4,
      answer: t.faqA4,
      icon: <Sofa className="w-5 h-5" />,
    },
    {
      id: "5",
      category: t.catIPAQ,
      question: t.faqQ5,
      answer: t.faqA5,
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      id: "6",
      category: t.catIPAQ,
      question: t.faqQ6,
      answer: t.faqA6,
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      id: "7",
      category: t.catAdvice,
      question: t.faqQ7,
      answer: t.faqA7,
      icon: <Target className="w-5 h-5" />,
    },
    {
      id: "8",
      category: t.catAdvice,
      question: t.faqQ8,
      answer: t.faqA8,
      icon: <Clock className="w-5 h-5" />,
    },
    {
      id: "9",
      category: t.catNutrition,
      question: t.faqQ9,
      answer: t.faqA9,
      icon: <Droplet className="w-5 h-5" />,
    },
    {
      id: "10",
      category: t.catNutrition,
      question: t.faqQ10,
      answer: t.faqA10,
      icon: <Apple className="w-5 h-5" />,
    },
  ], [t]);

  const categories = useMemo(() => [
    t.allCategories,
    ...Array.from(new Set(FAQ_ITEMS.map((item) => item.category))),
  ], [FAQ_ITEMS, t]);

  const filteredFAQ = useMemo(() => {
    let filtered = FAQ_ITEMS;

    if (selectedCategory !== t.allCategories) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery, FAQ_ITEMS, t]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-16 right-6 z-40 w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Ouvrir FAQ"
      >
        {isOpen ? (
          <X className="w-6 h-6 animate-spin" style={{ animationDuration: "0.3s" }} />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* FAQ Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-h-[600px] bg-card border border-border rounded-xl shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-t-xl">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5" />
              <h3 className="font-bold text-lg">{t.faqTitle}</h3>
            </div>
            <p className="text-xs opacity-90">{t.faqSubtitle}</p>
          </div>

          {/* Search Bar */}
          <div className="px-4 py-3 border-b border-border bg-secondary/30">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t.searchQuestion}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 p-3 border-b border-border overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-orange-500 text-white shadow-md scale-105"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-secondary">
            {filteredFAQ.length > 0 ? (
              <div className="space-y-0">
                {filteredFAQ.map((item, index) => (
                  <div
                    key={item.id}
                    className="border-b border-border last:border-b-0 animate-in fade-in slide-in-from-left duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <button
                      onClick={() =>
                        setExpandedId(expandedId === item.id ? null : item.id)
                      }
                      className="w-full text-left p-4 hover:bg-secondary/50 transition-all duration-200 flex items-start justify-between gap-3 group"
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="text-orange-500 flex-shrink-0 mt-0.5">
                          {item.icon}
                        </div>
                        <span className="text-sm font-medium text-foreground group-hover:text-orange-500 transition-colors line-clamp-2">
                          {item.question}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-orange-500 flex-shrink-0 transition-transform duration-300 ${
                          expandedId === item.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {expandedId === item.id && (
                      <div className="px-4 pb-4 text-sm text-muted-foreground bg-secondary/30 border-t border-border animate-in fade-in slide-in-from-top-2 duration-200">
                        <p className="leading-relaxed">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                <Search className="w-8 h-8 text-muted-foreground mb-2 opacity-50" />
                <p className="text-sm text-muted-foreground">
                  {t.noQuestionsFound}
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  {t.tryAnotherSearch}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-border bg-secondary/30 text-xs text-muted-foreground text-center">
            {filteredFAQ.length} {t.questionsFound}
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
