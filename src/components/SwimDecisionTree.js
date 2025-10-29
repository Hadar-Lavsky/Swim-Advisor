import React, { useState } from 'react';
import { ChevronLeft, RotateCcw, Waves, Target, Zap, Droplets } from 'lucide-react';

const SwimDecisionTree = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState('start');
  const [history, setHistory] = useState([]);
  const [fadeIn, setFadeIn] = useState(true);

  // Programs with descriptions and metadata
  const programs = {
    endurance: {
      title: "Endurance Swimming Program",
      description: "Build your cardiovascular fitness and stamina with structured distance training. Perfect for swimmers looking to improve their aerobic capacity.",
      icon: Waves,
      color: "from-blue-400 to-cyan-500",
      goal: "Endurance Swimming Program"
    },
    technique: {
      title: "Technique Refinement Program",
      description: "Perfect your stroke mechanics, body position, and efficiency. Ideal for swimmers who want to swim smarter, not just harder.",
      icon: Target,
      color: "from-purple-400 to-pink-500",
      goal: "Technique Refinement Program"
    },
    performance: {
      title: "Performance & Speed Program",
      description: "High-intensity training focused on explosive power, race pace, and competitive performance. For ambitious swimmers ready to level up.",
      icon: Zap,
      color: "from-orange-400 to-red-500",
      goal: "Performance & Speed Program"
    },
    styleExpansion: {
      title: "Style Expansion Program",
      description: "Learn new swimming styles and expand your aquatic skillset. Master butterfly, improve your IM, or refine secondary strokes.",
      icon: Droplets,
      color: "from-teal-400 to-green-500",
      goal: "Style Expansion Program"
    },
    waterConfidence: {
      title: "Water Confidence Program",
      description: "Start your swimming journey by building comfort and confidence in the water. We'll help you overcome fear and feel at ease.",
      icon: Droplets,
      color: "from-sky-300 to-blue-400",
      goal: "Water Confidence Program"
    },
    balanceGliding: {
      title: "Balance & Gliding Program",
      description: "Develop body awareness, stability, and streamline position. Learn to feel at home in the water before adding propulsion.",
      icon: Waves,
      color: "from-cyan-300 to-teal-400",
      goal: "Balance & Gliding Program"
    },
    
    movementKickingFreestyle: {
      title: "Movement freestyle Program",
      description: "Build fundamental propulsion through basic kicking and movement patterns. Get comfortable moving through the water.",
      icon: Droplets,
      color: "from-violet-400 to-purple-500",
      goal: "Movement freestyle Program"
    },
    movementKickingBreaststroke: {
      title: "Breaststroke Movement Program",
      description: "Build fundamental propulsion through basic kicking and movement patterns. Get comfortable moving through the water.",
      icon: Droplets,
      color: "from-violet-400 to-purple-500",
      goal: "Breaststroke Movement Program"
    },
    
    coordinationBreathingFreestyle: {
      title: "Coordination & Breathing Freestyle Program",
      description: "Combine movement with breathing technique. You're almost there - let's put it all together for confident swimming!",
      icon: Target,
      color: "from-pink-400 to-rose-500",
      goal: "Coordination & Breathing Program"
    },

    coordinationBreathingBreaststroke: {
      title: "Coordination & Breathing Program breaststroke",
      description: "Combine arm pull, frog kick, and breathing timing. You're almost there - let's master the breaststroke rhythm!",
      icon: Target,
      color: "from-pink-400 to-rose-500",
      goal: "Coordination & Breathing Program breaststroke"
    }
  };

  // Decision tree structure
  const steps = {
    start: {
      question: "Do you know how to swim?",
      subtitle: "Can you move through the water independently and keep yourself afloat?",
      options: [
        { label: "Yes, I can swim", value: "canSwim", next: "goal" },
        { label: "No, I'm learning", value: "cannotSwim", next: "waterComfort" }
      ]
    },
    goal: {
      question: "What's your main swimming goal?",
      subtitle: "Choose what you'd like to focus on improving",
      options: [
        { label: "🎯 Perfect My Technique", value: "technique", result: "technique" },
        { label: "⚡ Speed & Performance", value: "performance", result: "performance" },
        { label: "🌊 Learn New Styles", value: "newStyle", result: "styleExpansion" }
      ]
    },
    waterComfort: {
      question: "Are you comfortable in the water?",
      subtitle: "Can you put your face in the water and feel relaxed?",
      options: [
        { label: "Yes, I feel comfortable", value: "comfortable", next: "bodyBalance" },
        { label: "Not really, I'm nervous", value: "notComfortable", result: "waterConfidence" }
      ]
    },
    bodyBalance: {
      question: "Can you maintain balance in the water?",
      subtitle: "Can you float on your back or front with control?",
      options: [
        { label: "Yes, I can balance", value: "stable", next: "firstStyle" },
        { label: "No, I feel unstable", value: "unstable", result: "balanceGliding" }
      ]
    },
    firstStyle: {
      question: "Which movement feels more natural?",
      subtitle: "Let's find the best stroke to start with",
      options: [
        { label: " Breaststroke kicks", value: "breaststroke", next: "basicMovementBreaststroke" },
        { label: "floating on your back", value: "freestyle", next: "basicMovementFreestyle" },
      ]
    },
    basicMovementFreestyle: {
      question: "Can you move forward in the water?",
      subtitle: "Even with basic kicks or arm movements",
      options: [
        { label: "Yes", value: "canMove", result: "coordinationBreathingFreestyle" },
        { label: "No", value: "cannotMove", result: "movementKickingFreestyle" }
      ]
    },
    basicMovementBreaststroke: {
      question: "Can you move forward in the water?",
      subtitle: "Even with basic kicks or arm movements",
      options: [
        { label: "Yes", value: "canMove", result: "coordinationBreathingBreaststroke" },
        { label: "No", value: "cannotMove", result: "movementKickingBreaststroke" }
      ]
    }
  };

  const handleAnswer = (option) => {
    // Fade out animation
    setFadeIn(false);
    
    setTimeout(() => {
      // Save current step to history for back navigation
      setHistory([...history, currentStep]);
      
      // Move to next step or show result
      if (option.result) {
        setCurrentStep(`result:${option.result}`);
      } else {
        setCurrentStep(option.next);
      }
      
      // Fade in animation
      setFadeIn(true);
    }, 200);
  };

  const handleBack = () => {
    if (history.length > 0) {
      setFadeIn(false);
      setTimeout(() => {
        const previousStep = history[history.length - 1];
        setHistory(history.slice(0, -1));
        setCurrentStep(previousStep);
        setFadeIn(true);
      }, 200);
    }
  };

  const handleRestart = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentStep('start');
      setHistory([]);
      setFadeIn(true);
    }, 200);
  };

  // Check if we're showing a result
  const isResult = currentStep.startsWith('result:');
  const resultKey = isResult ? currentStep.replace('result:', '') : null;
  const program = resultKey ? programs[resultKey] : null;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-swim-blue-700 mb-3">
          Find Your Perfect Program
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Answer a few quick questions to get a personalized training recommendation
        </p>
      </div>

      {/* Main Content Card */}
      <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-10 min-h-[400px] flex flex-col justify-center transition-all duration-300 ${
        fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        
        {isResult && program ? (
          // Result View
          <div className="text-center space-y-6 animate-fadeIn">
            <div className={`mx-auto w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${program.color} flex items-center justify-center shadow-lg`}>
              <program.icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
            
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                {program.title}
              </h3>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                {program.description}
              </p>
            </div>

            <div className="pt-4 space-y-3">
              <div className="flex flex-col md:flex-row gap-3 justify-center">
                {onComplete && (
                  <button
                    onClick={() => onComplete({  goal: program.goal })}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Save to Profile ✓
                  </button>
                )}
                <button
                  onClick={handleRestart}
                  className="px-8 py-3 bg-gradient-to-r from-swim-blue-500 to-swim-blue-600 text-white font-semibold rounded-xl hover:from-swim-blue-600 hover:to-swim-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Start Over
                </button>
              </div>
              
              <p className="text-sm text-gray-500 italic text-center">
                💡 Tip: {onComplete ? 'Save this to your profile or redo the questions' : 'Discuss this recommendation with your coach!'}
              </p>
            </div>
          </div>
        ) : (
          // Question View
          <div className="space-y-8">
            {/* Question */}
            <div className="text-center space-y-3">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                {steps[currentStep]?.question}
              </h3>
              <p className="text-gray-500 text-sm md:text-base">
                {steps[currentStep]?.subtitle}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 md:space-y-4">
              {steps[currentStep]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full px-6 py-4 md:py-5 bg-gradient-to-r from-swim-blue-50 to-blue-50 hover:from-swim-blue-100 hover:to-blue-100 text-gray-800 font-medium rounded-xl border-2 border-transparent hover:border-swim-blue-300 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-1 text-left md:text-center"
                >
                  <span className="text-base md:text-lg">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        {history.length > 0 && !isResult && (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-swim-blue-600 transition-colors duration-200"
          >
            <ChevronLeft size={20} />
            <span className="font-medium">Back</span>
          </button>
        )}
        
        {(history.length > 0 || isResult) && (
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-swim-blue-600 transition-colors duration-200"
          >
            <RotateCcw size={20} />
            <span className="font-medium">Restart</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SwimDecisionTree;

