import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Award,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
  RotateCw,
  Lock,
  LogIn
} from 'lucide-react';
import { CONTRACTOR_QUESTIONNAIRE } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function ContractorQuizPage() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const initialState = location.state || {};

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(initialState.userAnswers || {});
  const [quizSubmitted, setQuizSubmitted] = useState(Boolean(initialState.reviewMode));
  const [quizScore, setQuizScore] = useState(initialState.quizScore || 0);
  const [showResultsSummary, setShowResultsSummary] = useState(false);

  const handleSelectAnswer = (qId, optionIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: optionIndex,
    }));
  };

  const handleQuizSubmit = () => {
    let score = 0;
    CONTRACTOR_QUESTIONNAIRE.forEach((q) => {
      const selectedOptIdx = userAnswers[q.id];
      if (selectedOptIdx !== undefined && q.options[selectedOptIdx]?.isCorrect) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    setShowResultsSummary(true);
  };

  const handleRetake = () => {
    setUserAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setCurrentQIndex(0);
    setShowResultsSummary(false);
  };

  const handleBackToOnboarding = () => {
    navigate('/contractor', {
      state: {
        quizSubmitted,
        quizScore,
        userAnswers,
      },
    });
  };

  if (user?.role !== 'contractor') {
    return (
      <div className="min-h-screen bg-white dark:bg-[#212428] text-slate-900 dark:text-slate-100 py-12 px-4 flex items-center justify-center transition-colors duration-200">
        <Card className="max-w-lg w-full bg-white dark:bg-[#181A1D] border-slate-200 dark:border-white/15 rounded-2xl shadow-lg">
          <CardContent className="p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-[#7E8056]/15 text-[#7E8056] dark:text-[#A4A77E] flex items-center justify-center mx-auto border border-[#7E8056]/25">
              <Lock className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">
                Contractor Account Required
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {!user
                  ? 'Please sign in or create a contractor account before starting the Local Mechanical certification questionnaire.'
                  : 'Only Contractor accounts can take the Local Mechanical certification questionnaire.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <Button
                asChild
                size="sm"
                className="h-9 px-5 rounded-lg bg-[#7E8056] hover:bg-[#6c6e49] text-white text-xs font-semibold"
              >
                <Link to="/login">
                  <LogIn className="w-3.5 h-3.5 mr-1.5" />
                  <span>{user ? 'Switch Account' : 'Login'}</span>
                </Link>
              </Button>
              {!user && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="h-9 px-5 rounded-lg border-slate-300 dark:border-white/15 text-xs font-semibold"
                >
                  <Link to="/signup">Sign Up</Link>
                </Button>
              )}
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="h-9 px-4 rounded-lg text-xs font-semibold"
              >
                <Link to="/contractor">← Back to Onboarding</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#212428] text-slate-900 dark:text-slate-100 py-8 lg:py-12 transition-colors duration-200">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Top Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleBackToOnboarding}
              className="h-8 px-3 rounded-lg border-slate-300 dark:border-white/15 bg-white dark:bg-[#181A1D] text-slate-700 dark:text-slate-200 text-xs font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Contractor Onboarding</span>
            </Button>

            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Passing Score: 8/10 (80%)
            </span>
          </div>

          {showResultsSummary ? (
            /* Results Summary View */
            <Card className="bg-white dark:bg-[#181A1D] border-slate-200 dark:border-white/10 shadow-md">
              <CardContent className="p-6 sm:p-10 text-center space-y-5">
                <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center border-2 ${
                  quizScore >= 8
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
                    : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/40'
                }`}>
                  {quizScore >= 8 ? <CheckCircle2 className="w-8 h-8" /> : <Award className="w-8 h-8" />}
                </div>

                <div className="space-y-1.5">
                  <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
                    {quizScore >= 8 ? 'Certification Quiz Passed!' : 'Keep Practicing — Review & Retake'}
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    You scored <strong className="font-mono text-base text-[#7E8056] dark:text-[#A4A77E]">{quizScore} / 10 ({quizScore * 10}%)</strong> on the Local Mechanical technical questionnaire.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCurrentQIndex(0);
                      setShowResultsSummary(false);
                    }}
                    className="h-8 px-4 rounded-lg border-slate-300 dark:border-white/15 text-xs font-semibold"
                  >
                    Review Answers & Explanations
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleRetake}
                    className="h-8 px-4 rounded-lg border-slate-300 dark:border-white/15 text-xs font-semibold inline-flex items-center gap-1.5"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    onClick={handleBackToOnboarding}
                    className="h-8 px-4 rounded-lg bg-[#7E8056] hover:bg-[#6c6e49] text-white text-xs font-semibold shadow-sm"
                  >
                    <span>Return to Onboarding →</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Active Quiz Question Card */
            <Card className="bg-white dark:bg-[#181A1D] border-slate-200 dark:border-white/15 rounded-2xl shadow-md">
              <CardContent className="p-6 sm:p-8 space-y-6">

                {/* Quiz Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#7E8056] text-white text-[10px] font-bold uppercase tracking-wider">
                        Local Mechanical Quiz
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        Question {currentQIndex + 1} of {CONTRACTOR_QUESTIONNAIRE.length}
                      </span>
                    </div>
                    <h1 className="text-lg sm:text-2xl font-bold font-serif text-slate-900 dark:text-white mt-2">
                      {CONTRACTOR_QUESTIONNAIRE[currentQIndex].topic}
                    </h1>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="w-full bg-slate-200 dark:bg-black/50 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#7E8056] dark:bg-[#A4A77E] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${((currentQIndex + 1) / CONTRACTOR_QUESTIONNAIRE.length) * 100}%` }}
                  />
                </div>

                {/* Question & Options */}
                <div className="space-y-4">
                  <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                    {CONTRACTOR_QUESTIONNAIRE[currentQIndex].question}
                  </p>

                  <div className="space-y-2.5">
                    {CONTRACTOR_QUESTIONNAIRE[currentQIndex].options.map((opt, optIdx) => {
                      const isSelected = userAnswers[CONTRACTOR_QUESTIONNAIRE[currentQIndex].id] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectAnswer(CONTRACTOR_QUESTIONNAIRE[currentQIndex].id, optIdx)}
                          className={`w-full p-3.5 rounded-xl text-xs sm:text-sm text-left transition-all border flex items-center gap-3 cursor-pointer ${
                            isSelected
                              ? 'bg-[#7E8056]/15 border-[#7E8056] text-slate-900 dark:text-white shadow-sm ring-1 ring-[#7E8056]'
                              : 'bg-slate-50 dark:bg-black/30 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:border-slate-300'
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${
                            isSelected
                              ? 'bg-[#7E8056] text-white'
                              : 'bg-white dark:bg-white/10 text-slate-600 dark:text-white border border-slate-200 dark:border-white/10'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-relaxed font-medium">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Show explanation if reviewing submitted quiz */}
                  {quizSubmitted && (
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-[#C2B59B] space-y-1">
                      <span className="font-bold block uppercase tracking-wider text-[10px] text-[#7E8056] dark:text-[#A4A77E]">
                        Official Technical Rationale (from PDF):
                      </span>
                      <p>{CONTRACTOR_QUESTIONNAIRE[currentQIndex].explanation}</p>
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={currentQIndex === 0}
                    onClick={() => setCurrentQIndex((prev) => prev - 1)}
                    className="h-8 px-3 rounded-lg border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-200 text-xs font-semibold"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Previous
                  </Button>

                  <div className="flex items-center gap-2">
                    {currentQIndex < CONTRACTOR_QUESTIONNAIRE.length - 1 ? (
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => setCurrentQIndex((prev) => prev + 1)}
                        className="h-8 px-4 rounded-lg bg-[#7E8056] hover:bg-[#6c6e49] text-white text-xs font-semibold"
                      >
                        <span>Next Question</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleQuizSubmit}
                        className="h-8 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>Submit Answers & Score</span>
                      </Button>
                    )}
                  </div>
                </div>

              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}
