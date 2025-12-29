'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle } from 'lucide-react';

const questions = [
  {
    question: "Apa keunggulan utama Next.js dibanding React biasa?",
    options: ["Hanya untuk Mobile", "Server Side Rendering (SSR)", "Tidak butuh JavaScript", "Lebih lambat"],
    answer: 1 // index jawaban benar
  },
  {
    question: "Library CSS yang menggunakan pendekatan utility-first adalah?",
    options: ["Bootstrap", "Sass", "Tailwind CSS", "Material UI"],
    answer: 2
  },
];

export default function QuizSection() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    setSelectedOpt(index);
    if (index === questions[currentQ].answer) {
      setScore(score + 1);
      if (currentQ === questions.length - 1) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      }
    }
    
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedOpt(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setSelectedOpt(null);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-none shadow-xl bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Mini Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        {showResult ? (
          <div className="text-center py-8">
            <h3 className="text-3xl font-bold mb-4">Skor Kamu: {score} / {questions.length}</h3>
            <p className="text-zinc-500 mb-6">{score === questions.length ? "Sempurna! 🎉" : "Coba lagi yuk!"}</p>
            <Button onClick={resetQuiz}>Main Lagi</Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between text-sm text-zinc-500">
              <span>Pertanyaan {currentQ + 1} dari {questions.length}</span>
              <span>Skor Sementara: {score}</span>
            </div>
            <h3 className="text-xl font-medium">{questions[currentQ].question}</h3>
            <div className="grid gap-3">
              {questions[currentQ].options.map((opt, i) => (
                <Button
                  key={i}
                  variant={selectedOpt === i ? (i === questions[currentQ].answer ? "default" : "destructive") : "outline"}
                  className="w-full justify-start h-12 text-lg"
                  onClick={() => handleAnswer(i)}
                  disabled={selectedOpt !== null}
                >
                  {opt}
                  {selectedOpt === i && (
                    <span className="ml-auto">
                      {i === questions[currentQ].answer ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
